const { test } = require('node:test');
const assert = require('node:assert/strict');
const model = require('../estimate-model.js');
const pricing = require('../estimate-pricing.js');

test('one-page build has no invented recurring fee', () => {
  const result = model.calculate({});
  assert.deepEqual(result.setup, [18000, 28000]);
  assert.deepEqual(result.monthly, [0, 0]);
  assert.deepEqual(result.firstYear, [18000, 28000]);
  assert.equal(result.partial, false);
});

test('five-page rental separates setup, recurring and first-year totals without charging care twice', () => {
  const result = model.calculate({ type: 'business', service: 'rental', pages: 5, care: 'managed' });
  assert.deepEqual(result.setup, [15000, 24000]);
  assert.deepEqual(result.monthly, [2500, 4500]);
  assert.deepEqual(result.firstYear, [45000, 78000]);
  assert.equal(result.state.care, 'none');
  assert.equal(result.items.length, 2);
});

test('design, copy, per-page language, features and care are itemized accurately', () => {
  const result = model.calculate({ pages: 5, design: 'bespoke', content: 'write', features: ['form', 'catalogue', 'language'], care: 'managed' });
  // 18k base + 10k pages + 15k design + 7.5k copy + 3k form + 5k catalogue + 7.5k language.
  assert.deepEqual(result.setup, [66000, 109000]);
  assert.deepEqual(result.monthly, [3500, 6000]);
  assert.deepEqual(result.firstYear, [108000, 181000]);
  assert.equal(result.items.length, 8);
});

test('online shop and custom app cannot hide required unpriced work', () => {
  for (const [type, feature] of [['shop', 'checkout'], ['custom', 'accounts']]) {
    const result = model.calculate({ type, features: [] });
    assert.equal(result.partial, true);
    assert.ok(result.state.features.includes(feature));
    assert.ok(result.custom.includes(pricing.features[feature].label));
    assert.match(model.report(result.state), /These costs are not included in the displayed totals/);
  }
});

test('more than 20 pages and rush requests require review instead of silently capping the quote', () => {
  const result = model.calculate({ pages: 21, content: 'write', timeline: 'urgent', features: ['language'] });
  assert.equal(result.partial, true);
  assert.equal(result.custom.length, 4);
  assert.deepEqual(result.setup, [18000, 28000]);
  assert.match(model.report(result.state), /PRICED PORTION ONLY/);
});

test('tampered inputs and duplicate features cannot change the rate card', () => {
  const result = model.calculate({ pages: -3, service: '__proto__', design: 'constructor', content: 'toString', features: ['form', 'form', 'fake'], monthly: -99999, setup: 0 });
  assert.equal(result.state.service, 'build');
  assert.equal(result.state.design, 'tailored');
  assert.equal(result.state.pages, 1);
  assert.deepEqual(result.state.features, ['form']);
  assert.deepEqual(result.setup, [21000, 33000]);
  assert.deepEqual(model.normalize(null), model.normalize({}));
});

test('shared choices round-trip and exclude contact information and money', () => {
  const state = { type: 'portfolio', service: 'build', pages: 7, design: 'bespoke', content: 'polish', features: ['blog', 'booking'], care: 'technical', domain: 'new', timeline: 'month', name: 'PRIVATE', email: 'private@example.test', notes: 'PRIVATE', total: 1 };
  const search = model.toSearch(state);
  assert.deepEqual(model.fromSearch(search), model.normalize(state));
  assert.doesNotMatch(search, /PRIVATE|private|email|notes|total/);
  assert.deepEqual(model.calculate(model.fromSearch(search)).setup, model.calculate(state).setup);
});

test('reports retain proposed status, exclusions, rate version and Manila date', () => {
  const text = model.report({}, new Date('2026-11-07T23:00:00Z'));
  assert.match(text, /PROPOSED RATES, NOT AN OFFER/);
  assert.match(text, /November 8, 2026/);
  assert.match(text, /2026-11-08-proposal-1/);
  assert.match(text, /applicable taxes/);
  assert.match(text, /not a contract term/);
});

test('2,268 representative scope combinations produce ordered totals with correct yearly arithmetic', () => {
  for (const service of Object.keys(pricing.services)) {
    for (const type of Object.keys(pricing.types)) {
      for (let pages = 1; pages <= 21; pages++) {
        for (const content of Object.keys(pricing.contents)) {
          for (const care of Object.keys(pricing.care)) {
            const result = model.calculate({ type, service, pages, content, care, features: Object.keys(pricing.features) });
            for (const range of [result.setup, result.monthly, result.firstYear]) {
              assert.ok(range.every(value => Number.isFinite(value) && value >= 0));
              assert.ok(range[0] <= range[1]);
            }
            assert.deepEqual(result.firstYear, result.setup.map((value, index) => value + result.monthly[index] * 12));
          }
        }
      }
    }
  }
});
