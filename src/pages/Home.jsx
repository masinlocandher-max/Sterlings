import {useState} from 'react';
import {ButtonLink, Icon, Link} from '../components/UI.jsx';

const solutions = [
  {name:'Self-Service Websites', lines:<>Self-Service<br/>Websites</>, icon:'laptop', href:'/templates', text:'Create your own professional website quickly and easily with our intuitive tools.'},
  {name:'Website Rental', lines:<>Website<br/>Rental</>, icon:'layers', href:'/website-rental', text:'A ready-to-use website for your brand or business, without the upfront build cost.'},
  {name:'Managed Websites', lines:<>Managed<br/>Websites</>, icon:'users', href:'/managed-websites', text:'A professional, fully managed website so you can focus on what you do best.'},
  {name:'Digital Business Solutions', lines:<>Digital<br/>Business Solutions</>, icon:'growth', href:'/digital-solutions', text:'Integrated digital solutions to build your presence, reach your audience, and grow your business.'},
];
const steps = [
  {name:'Choose', icon:'cursor', text:'Pick a solution that fits your goals.', href:'/solutions'},
  {name:'Customize', icon:'sliders', text:'Make it yours with your content and style.', href:'/templates'},
  {name:'Launch', icon:'rocket', text:'Go live and start connecting with your audience.', href:'/how-it-works'},
];
const benefits = [
  {name:'Professional Design', short:'Design', icon:'diamond', text:'Modern, refined, and business-ready spaces.'},
  {name:'Flexibility', short:'Flexibility', icon:'swap', text:'Solutions that grow with your needs.'},
  {name:'Support', short:'Support', icon:'support', text:'Real people, responsive and reliable.'},
  {name:'Digital Presence', short:'Presence', icon:'laptop', text:'Build credibility, reach more people, and create opportunity.'},
];
const featured = [
  {name:'Business Pro', category:'CORPORATE / SERVICES', image:'business-pro', id:'practice', alt:'A sunlit modern lounge with a cream chair and leafy tree'},
  {name:'Creative Studio', category:'CREATIVE / PORTFOLIO', image:'creative-studio', id:'studio', alt:'A laptop on a thoughtfully arranged desk beside a sunlit window'},
  {name:'Brand Space', category:'BRAND / SMALL BUSINESS', image:'sculptural-curves', id:'atelier', alt:'Sculptural ivory curves and warm architectural oak ribbing'},
];

export function GoldSweep({className=''}) {
  return <svg className={'gold-sweep '+className} viewBox="0 0 100 10" aria-hidden="true"><defs><linearGradient id={'gold-'+className.replace(/\W/g,'')}><stop stopColor="#8D642B"/><stop offset=".55" stopColor="#D1AF6F"/><stop offset="1" stopColor="#8D642B" stopOpacity=".3"/></linearGradient></defs><path d="M0 8 Q47 -4 100 8 Q50 2 0 8" fill={'url(#gold-'+className.replace(/\W/g,'')+')'}/></svg>;
}

function SectionLabel({children, id, className=''}) {
  return <h2 id={id} className={'ref-label '+className}><span>{children}</span><GoldSweep className={id||className}/></h2>;
}

function FeaturedTemplates() {
  const [active,setActive] = useState(0);
  const visible = featured.map((_,i)=>featured[(active+i)%featured.length]);
  const move = direction => setActive(current=>(current+direction+featured.length)%featured.length);
  return <section className="ref-featured ref-shell" aria-labelledby="featured-title">
    <div className="ref-featured-intro">
      <SectionLabel id="featured-title">Featured templates</SectionLabel>
      <p>Beautiful, versatile templates<br/>for businesses, creators,<br/>and professionals.</p>
      <ButtonLink to="/templates" secondary>Browse Templates <Icon size={17}/></ButtonLink>
    </div>
    <div className="ref-gallery" aria-roledescription="carousel" aria-label="Featured website templates">
      <div className="ref-template-track">
        {visible.map((template,index)=><Link key={template.id} className={'ref-template ref-template-'+index} to={'/templates?preview='+template.id} aria-label={'Preview '+template.name+' template'}>
          <img src={'/assets/'+template.image+'.webp'} alt={template.alt} width="1672" height="941" loading="lazy"/>
          <span className="ref-template-caption"><strong>{template.name}</strong><span>{template.category}</span></span>
        </Link>)}
      </div>
      <div className="ref-gallery-controls"><button aria-label="Previous template" onClick={()=>move(-1)}><Icon name="arrow" size={17}/></button><button aria-label="Next template" onClick={()=>move(1)}><Icon name="arrow" size={17}/></button></div>
      <span className="sr-only" aria-live="polite">{featured[active].name}, template {active+1} of {featured.length}</span>
    </div>
  </section>;
}

export default function Home() {
  return <div className="reference-home">
    <section className="ref-hero" aria-labelledby="home-heading">
      <picture className="ref-hero-art"><source media="(max-width: 680px)" srcSet="/assets/architecture-mobile.webp"/><img src="/assets/architecture-hero.webp" alt="" width="2048" height="683" fetchPriority="high"/></picture>
      <div className="ref-hero-copy">
        <p className="ref-eyebrow">THE STERLINGS</p>
        <h1 id="home-heading">Digital Spaces,<br/><em>Thoughtfully Made.</em></h1>
        <GoldSweep className="hero-sweep"/>
        <p className="ref-promise">A place online, built around you.</p>
        <p className="ref-description">Create, rent, or let us manage a professional digital space<br className="desktop-break"/> for your brand, business, or next big idea.</p>
        <div className="ref-hero-actions"><ButtonLink to="/get-started">Get Started <Icon size={19}/></ButtonLink><ButtonLink to="/solutions" secondary>Explore Solutions</ButtonLink></div>
      </div>
    </section>

    <section className="ref-solutions ref-shell" aria-labelledby="solutions-title">
      <div className="ref-section-top"><SectionLabel id="solutions-title">Our solutions</SectionLabel><p>Complete digital spaces for individuals and businesses.</p></div>
      <div className="ref-solution-grid">{solutions.map((solution,i)=><Link key={solution.href} to={solution.href} className={'ref-solution ref-solution-'+i}>
        <Icon name={solution.icon} size={36}/><h3><span className="solution-desktop-title">{solution.lines}</span><span className="solution-mobile-title">{solution.name}</span></h3><p>{solution.text}</p><span className="ref-card-arrow"><Icon className="ref-desktop-arrow" size={17}/><Icon className="ref-mobile-arrow" name="next" size={17}/></span>
      </Link>)}</div>
    </section>

    <section className="ref-process ref-shell" aria-labelledby="process-title">
      <div className="ref-process-intro"><SectionLabel id="process-title">A simple process</SectionLabel><p>Get your digital space up and running<br/>in three easy steps.</p></div>
      <ol>{steps.map(step=><li key={step.name}><Link to={step.href}><span className="ref-step-icon"><Icon name={step.icon} size={35}/></span><span><strong>{step.name}</strong><span>{step.text}</span></span></Link><Icon name="next" size={19}/></li>)}</ol>
    </section>

    <section className="ref-benefits ref-shell" aria-labelledby="benefits-title">
      <SectionLabel id="benefits-title">Why choose<br className="desktop-break"/> THE STERLINGS</SectionLabel>
      <div className="ref-benefit-list">{benefits.map(benefit=><div className="ref-benefit" key={benefit.name}><Icon name={benefit.icon} size={33}/><div><h3><span className="benefit-desktop-title">{benefit.name}</span><span className="benefit-mobile-title">{benefit.short}</span></h3><p>{benefit.text}</p></div></div>)}</div>
    </section>

    <FeaturedTemplates/>

    <section className="ref-quote ref-shell" aria-labelledby="promise-title">
      <SectionLabel id="promise-title">Built around<br/>your next idea</SectionLabel>
      <div className="ref-quote-content"><span className="quote-mark" aria-hidden="true">“</span><blockquote>“A place online, built around you.”<span>Digital Spaces, Thoughtfully Made.</span></blockquote></div>
      <div className="ref-quote-attribution"><span className="ref-monogram"><img src="/assets/favicon.svg" alt="" width="64" height="64" loading="lazy"/></span><div><strong>THE STERLINGS</strong><span>OUR BRAND PROMISE</span><small>Thoughtfully made.</small></div></div>
    </section>

    <section className="ref-closing" aria-labelledby="closing-title"><div className="ref-closing-copy"><h2 id="closing-title">Ready to build your digital space?</h2><p>Create, rent, or let us manage it for you — all in one trusted place.</p></div><ButtonLink to="/get-started" secondary>Get Started <Icon size={18}/></ButtonLink></section>
  </div>;
}

export function HomeFooter(){return <footer className="ref-footer"><span>© {new Date().getFullYear()} THE STERLINGS</span><nav aria-label="Footer navigation"><Link to="/workspace">My workspace</Link><Link to="/privacy">Privacy</Link><Link to="/about-preview">About this preview</Link></nav></footer>;}
