import { useEffect, useState, type ReactNode } from 'react'
import Navigation from './components/Navigation'
import QuizPanel, { type Question } from './components/QuizPanel'
import { LabIllustration, PlantArt } from './components/Illustrations'
import HormoneInfographic from './components/HormoneInfographic'
import GalapagosLesson from './features/galapagos/GalapagosLesson'
import { hormones, lessonHref, topicHref, topics, type Hormone, type Topic } from './data/lessons'

const auxinQuestions: Question[] = [
  { prompt: 'แสงส่องมาจากด้านซ้าย ยอดพืชมีแนวโน้มโค้งไปทางใด?', choices: ['เข้าหาแสงทางด้านซ้าย', 'หนีแสงไปทางขวา', 'ไม่เปลี่ยนทิศทาง'], answer: 0, explanation: 'ยอดพืชโค้งเข้าหาแสง เพราะ Auxin กระจายมากขึ้นทางด้านที่ได้รับแสงน้อยกว่าและส่งเสริมการยืดตัวของเซลล์ด้านนั้น' },
  { prompt: 'ด้านใดของยอดมักมี Auxin กระจายมากกว่าเมื่อได้รับแสงด้านเดียว?', choices: ['ด้านที่รับแสงมากกว่า', 'ด้านที่รับแสงน้อยกว่า', 'Auxin มีปริมาณเท่ากันทุกด้านเสมอ'], answer: 1, explanation: 'ในยอดพืชที่ได้รับแสงจากด้านเดียว Auxin จะกระจายมากขึ้นทางด้านที่ได้รับแสงน้อยกว่า' },
  { prompt: 'เหตุใดลำต้นจึงโค้งเข้าหาแสง?', choices: ['เซลล์ด้านรับแสงยืดมากกว่า', 'เซลล์ด้านรับแสงน้อยยืดมากกว่า', 'เซลล์ทั้งสองด้านหยุดยืดตัว'], answer: 1, explanation: 'Auxin ส่งเสริมการยืดตัวในลำต้น เซลล์ด้านที่มี Auxin มากกว่าจึงยืดมากกว่าและทำให้ยอดโค้งเข้าหาแสง' },
]

const hormoneQuestions: Question[] = [
  ...auxinQuestions,
  { prompt: 'ฮอร์โมนใดเป็นก๊าซและมีบทบาทสำคัญต่อการสุกของผลไม้หลายชนิด?', choices: ['Ethylene', 'Auxin', 'Cytokinin'], answer: 0, explanation: 'เอทิลีนเป็นฮอร์โมนในรูปก๊าซและมีบทบาทสำคัญต่อกระบวนการสุกของผลไม้หลายชนิด' },
]

function currentRoute() { return window.location.hash.replace(/^#/, '') || '/' }

function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumb" aria-label="ตำแหน่งปัจจุบัน"><a href="#/">หน้าหลัก</a>{items.map((item, index) => <span key={`${item.label}-${index}`}><i>›</i>{item.href ? <a href={item.href}>{item.label}</a> : <strong>{item.label}</strong>}</span>)}</nav>
}

function SectionHeading({ kicker, title, copy, side }: { kicker: string; title: string; copy?: string; side?: string }) {
  return <div className="section-heading"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>{side && <span className="section-side-note">{side}</span>}</div>
}

function App() {
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const update = () => setRoute(currentRoute())
    window.addEventListener('hashchange', update)
    return () => window.removeEventListener('hashchange', update)
  }, [])

  useEffect(() => {
    if (route === '/topics/darwins-finches' || route === '/lessons/darwins-finches') window.scrollTo(0, 0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [route])

  let page: ReactNode
  if (route === '/') page = <HomePage />
  else if (route.startsWith('/topics/')) {
    const topic = topics.find((item) => item.id === route.split('/')[2])
    page = topic?.id === 'plant-hormones' ? <HormonesPage routeKey={route} /> : topic?.id === 'darwins-finches' ? <GalapagosLesson key={route} /> : topic ? <TopicPreviewPage topic={topic} /> : <NotFoundPage />
  }
  else if (route === '/lessons' || route === '/lessons/plant-hormones') page = <HormonesPage routeKey={route} />
  else if (route === '/lessons/darwins-finches') page = <GalapagosLesson key={route} />
  else if (route === '/knowledge-map') page = <KnowledgeMapPage />
  else if (route === '/quiz') page = <QuizPage />
  else if (route === '/about') page = <AboutPage />
  else if (route.startsWith('/lessons/')) {
    const id = route.split('/')[2]
    const hormone = hormones.find((item) => item.id === id)
    page = hormone ? <HormonesPage initialHormone={hormone.id} routeKey={route} /> : <NotFoundPage />
  } else page = <NotFoundPage />

  const isFinchesPage = route === '/topics/darwins-finches' || route === '/lessons/darwins-finches'
  if (isFinchesPage) return <div className="galapagos-main">{page}</div>
  return <><Navigation route={route} /><main>{page}</main><Footer /></>
}

function HomePage() {
  const available = topics.filter((topic) => topic.status === 'available')
  const future = topics.filter((topic) => topic.status === 'coming-soon')
  return <>
    <section className="home-hero page-wrap">
      <div className="hero-copy">
        <span className="hero-label"><i /> A LIVING BIOLOGY LABORATORY</span>
        <h1>โลกของพืช<br/><em>กำลังรอให้คุณ</em><br/>เข้าไปสำรวจ</h1>
        <p className="hero-intro">เรียนรู้ชีววิทยาผ่านการสังเกต ทดลอง และ Interactive</p>
        <p className="hero-detail">สำรวจกระบวนการทางชีววิทยาตั้งแต่ระดับสิ่งมีชีวิต เซลล์ ไปจนถึงระดับโมเลกุล</p>
        <a className="button button-primary hero-cta" href="#topics" onClick={(event) => { event.preventDefault(); document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' }) }}>เริ่มต้นสำรวจ <span>↓</span></a>
        <div className="hero-footnote"><span className="footnote-icon">⌁</span><span><strong>สังเกต · ทดลอง · ค้นพบ</strong><small>Biology, brought to life.</small></span></div>
      </div>
      <div className="hero-visual"><div className="hero-visual-note note-top"><span>FIELD NOTE 01</span><b>การเติบโต<br/>ที่ไม่หยุดนิ่ง</b></div><LabIllustration/><div className="hero-visual-note note-bottom"><i /> <span>BOTANICAL<br/>OBSERVATION</span><b>01 / 05</b></div><span className="hero-orbit orbit-one"/><span className="hero-orbit orbit-two"/></div>
      <div className="hero-scroll-mark"><span>SCROLL TO EXPLORE</span><i/></div>
    </section>

    <section className="topics-section page-wrap" id="topics">
      <SectionHeading kicker="CHOOSE A LEARNING PATH" title="เลือกสิ่งที่อยากเรียนรู้" copy="ทุกบทเรียนเริ่มจากคำถามหนึ่งข้อ แล้วค่อย ๆ คลี่คลายผ่านการสังเกต" side={`${available.length} TOPICS AVAILABLE`} />
      <div className="topic-feature-grid">
        {available.map((topic) => <a className="featured-topic" href={topicHref(topic.id)} key={topic.id}>
          <div className="featured-art"><div className="topic-orbit orbit-a"/><div className="topic-orbit orbit-b"/>{topic.id === 'darwins-finches' ? <ArchipelagoTeaser/> : <PlantArt compact glowing/>}<span className="topic-art-badge"><i/> AVAILABLE NOW</span><span className="topic-art-index">TOPIC {String(available.indexOf(topic) + 1).padStart(2, '0')} <b>↗</b></span></div>
          <div className="featured-body"><div><span className="eyebrow">{topic.id === 'darwins-finches' ? 'EVOLUTIONARY BIOLOGY · TOPIC 02' : 'PLANT BIOLOGY · TOPIC 01'}</span><h3>{topic.englishTitle}</h3><span className="thai-title">{topic.title}</span></div><span className="topic-arrow">↗</span><p>{topic.description}</p><div className="topic-meta"><span>◷ {topic.count} บทเรียน</span><span>◎ {topic.difficulty}</span><span className="text-link">เริ่มเรียนรู้ <b>→</b></span></div></div>
        </a>)}
        <aside className="upcoming-panel"><div className="upcoming-head"><span className="eyebrow">THE LAB IS GROWING</span><span className="coming-dot"/><small>IN THE GREENHOUSE</small></div><h3>พื้นที่สำหรับ<br/><em>การค้นพบครั้งถัดไป</em></h3><p>บทเรียนใหม่กำลังเติบโตในห้องทดลองของเรา</p><div className="upcoming-list">{future.map((topic, index) => <div key={topic.id} className="upcoming-item"><span className="upcoming-icon">{topic.icon}</span><span><strong>{topic.englishTitle}</strong><small>{topic.title}</small></span><span className="soon-label">SOON {String(index + 2).padStart(2, '0')}</span></div>)}</div></aside>
      </div>
    </section>

    <section className="learning-path page-wrap">
      <div className="path-intro"><span className="eyebrow">A BETTER WAY TO LEARN</span><h2>ไม่ใช่แค่เรียนรู้ว่า<br/><em>เกิดอะไรขึ้น</em></h2><p>แต่เข้าไปดูว่าเกิดขึ้นได้อย่างไร ผ่านฉากจำลองที่เชื่อมโยงการสังเกตเข้ากับคำอธิบายทางชีววิทยา</p><a className="text-link" href="#/topics/plant-hormones">ดูบทเรียนทั้งหมด <b>→</b></a></div>
      <div className="path-steps">{[{ no: '01', en: 'OBSERVE', th: 'สังเกต', icon: '◎' }, { no: '02', en: 'INTERACT', th: 'ทดลอง', icon: '⌁' }, { no: '03', en: 'ZOOM IN', th: 'มองให้ใกล้', icon: '⊙' }, { no: '04', en: 'UNDERSTAND', th: 'ทำความเข้าใจ', icon: '✳' }].map((step, index) => <div className="path-step" key={step.no}><span className="step-number">{step.no}</span><div className="step-illustration">{step.icon}{index < 3 && <i/>}</div><strong>{step.th}</strong><small>{step.en}</small></div>)}</div>
    </section>
  </>
}

function ArchipelagoTeaser() {
  return <svg className="topic-archipelago-teaser" viewBox="0 0 420 240" role="img" aria-label="Simplified illustration of the Galápagos Islands">
    <path d="M0 45c68-24 103 17 173 0s117-17 178 0 76 12 111 1M0 195c68-24 103 17 173 0s117-17 178 0 76 12 111 1" fill="none" stroke="#bdd8ce" strokeOpacity=".25" strokeWidth="2"/>
    <g fill="#71886b" stroke="#c1bd99" strokeWidth="2" strokeLinejoin="round">
      <path d="m35 48 16-19 28-4 20 13-4 19-23 11-27-5z"/><path d="m102 75 17-20 24 1 16 15-9 21-27 8-20-9z"/><path d="m163 44 19-17 26 2 15 16-13 19-26 5-21-9z"/>
      <path d="m112 123 23-29 30 1 16 25 2 42-17 40-23 2-20-31z"/><path d="m180 109 22-24 31 2 13 30-2 42-20 34-24-7-13-34z"/>
      <path d="m252 91 20-20 27 4 17 21-5 28-25 10-26-12z"/><path d="m295 135 18-17 24 5 9 21-15 20-26-2-14-13z"/><path d="m352 143 18-16 25 6 9 19-17 18-26-4-13-12z"/>
      <path d="m292 191 19-15 24 4 12 15-15 18-24-1-16-9z"/><path d="m365 204 17-12 24 5 8 17-18 14-24-4-11-11z"/>
    </g>
  </svg>
}

function HormonesPage({ initialHormone, routeKey }: { initialHormone?: Hormone['id']; routeKey: string }) {
  return <HormoneInfographic key={routeKey} initialHormone={initialHormone} />
}

function TopicPreviewPage({ topic }: { topic: Topic }) {
  return <div className="page-wrap inner-page">
    <Breadcrumb items={[{ label: 'บทเรียน', href: '#/' }, { label: topic.englishTitle }]} />
    <section className="topic-preview-page">
      <div><span className="hero-label"><i/> {topic.status === 'coming-soon' ? 'FIELD STATION · IN PREPARATION' : 'TOPIC FIELD GUIDE'}</span><h1>{topic.englishTitle}<br/><em>Learning path</em></h1><p className="thai-title">{topic.title}</p><p className="topic-preview-copy">{topic.description}</p><p className="topic-preview-note">เส้นทางการเรียนรู้นี้กำลังเติบโต เนื้อหาจะปรากฏที่นี่เมื่อพร้อมสำรวจ</p><a className="button button-secondary" href="#/topics/plant-hormones">สำรวจบทเรียนที่พร้อมแล้ว <span>→</span></a></div>
      <div className="topic-preview-art"><span className="preview-rings"/><PlantArt compact glowing/><span className="topic-preview-icon">{topic.icon}</span><span className="preview-art-caption">GROWING COLLECTION · {topic.id.toUpperCase()}</span></div>
    </section>
  </div>
}

function KnowledgeMapPage() {
  return <div className="page-wrap inner-page map-page">
    <Breadcrumb items={[{ label: 'แผนผังความรู้' }]} />
    <section className="page-title-block"><span className="hero-label"><i/> CONCEPT NETWORK · 01</span><h1>มองเห็นภาพรวม<br/><em>ของสัญญาณพืช</em></h1><p>ฮอร์โมนพืชเชื่อมโยงกับการเจริญเติบโตหลายด้าน เลือกแต่ละโหนดเพื่อเปิด field guide</p></section>
    <section className="knowledge-map" aria-label="แผนผังความสัมพันธ์ของฮอร์โมนพืช">
      <div className="map-center"><span className="map-center-ring">✳</span><span className="eyebrow">SIGNAL NETWORK</span><strong>Plant<br/>Hormones</strong><small>ฮอร์โมนพืช · 05</small></div>
      <svg className="map-lines" viewBox="0 0 1000 670" preserveAspectRatio="none" aria-hidden="true"><path d="M500 335C360 265 250 125 128 104"/><path d="M500 335C420 222 405 104 407 71"/><path d="M500 335C599 224 649 111 714 84"/><path d="M500 335C360 425 232 507 121 565"/><path d="M500 335C642 422 775 501 879 565"/><circle cx="128" cy="104" r="4"/><circle cx="407" cy="71" r="4"/><circle cx="714" cy="84" r="4"/><circle cx="121" cy="565" r="4"/><circle cx="879" cy="565" r="4"/></svg>
      {hormones.map((hormone, index) => <MapNode hormone={hormone} index={index} key={hormone.id}/>)}
    </section>
    <div className="map-caption"><span><i/> เลือกโหนดเพื่อไปยังบทเรียน</span><span>NETWORK VIEW · PLANT HORMONES</span></div>
    <section className="map-legend"><SectionHeading kicker="CONNECTED CONCEPTS" title="แต่ละสัญญาณมีผลต่ออะไรบ้าง?"/><div className="map-legend-grid">{hormones.map((hormone, index) => <a href={lessonHref(hormone.id)} className={`map-legend-item accent-${hormone.color}`} key={hormone.id}><span className="legend-num">0{index + 1}</span><div><strong>{hormone.name}</strong><span>{hormone.effects.join(' · ')}</span></div><b>↗</b></a>)}</div></section>
  </div>
}

function MapNode({ hormone, index }: { hormone: Hormone; index: number }) {
  return <a className={`map-node map-node-${index + 1} accent-${hormone.color}`} href={lessonHref(hormone.id)}><span className="node-topline">0{index + 1} · {hormone.status === 'interactive' ? 'EXPLORE' : 'FIELD GUIDE'}</span><span className="node-symbol">{hormone.symbol}</span><strong>{hormone.name}</strong><small>{hormone.effects[0]}</small><i>↗</i></a>
}

function QuizPage() {
  return <div className="page-wrap inner-page quiz-page">
    <Breadcrumb items={[{ label: 'แบบทดสอบ' }]} />
    <section className="quiz-page-heading"><div><span className="hero-label"><i/> LEARNING CHECK · 01</span><h1>ความเข้าใจที่<br/><em>เติบโตจากการทดลอง</em></h1><p>ทบทวนสิ่งที่ได้สังเกต แล้วเชื่อมโยงกับคำอธิบายทางชีววิทยา</p></div><div className="quiz-page-mark">?</div></section>
    <div className="quiz-topic-label"><span><i className="quiz-topic-dot"/> TOPIC 01</span><strong>Plant Hormones</strong><span>4 QUESTIONS · NO TIME LIMIT</span></div>
    <QuizPanel title="ฮอร์โมนพืช · ทบทวนความเข้าใจ" questions={hormoneQuestions}/>
    <div className="quiz-bottom-note"><span className="concept-icon">⌁</span><p>แบบทดสอบออกแบบมาเพื่อทบทวนแนวคิด คุณสามารถลองตอบใหม่ได้เสมอ</p><a href="#/topics/plant-hormones">กลับไปสำรวจบทเรียน →</a></div>
  </div>
}

function AboutPage() {
  return <div className="page-wrap inner-page about-page"><Breadcrumb items={[{ label: 'เกี่ยวกับ' }]} /><section className="about-hero"><span className="hero-label"><i/> A SMALL LAB FOR BIG QUESTIONS</span><h1>ชีววิทยาเกิดขึ้น<br/><em>รอบตัวเรา</em></h1><p>Plant Learning Hub คือพื้นที่เรียนรู้ชีววิทยาผ่านการสังเกต ทดลอง และลงไปดูความเปลี่ยนแปลงในระดับที่มองไม่เห็นด้วยตาเปล่า</p><div className="about-art"><LabIllustration/></div></section><section className="about-values"><div><span>01 / OBSERVE</span><h2>มองเห็นกระบวนการ</h2><p>เปลี่ยนคำอธิบายให้กลายเป็นสิ่งที่ผู้เรียนสังเกตได้</p></div><div><span>02 / EXPERIMENT</span><h2>เรียนรู้ผ่านการทดลอง</h2><p>ปรับปัจจัยและดูผลที่เปลี่ยนไปตามเหตุและผล</p></div><div><span>03 / CONNECT</span><h2>เชื่อมสู่ความเข้าใจ</h2><p>เชื่อมภาพจำลองกลับไปยังหลักการทางชีววิทยา</p></div></section><section className="about-next"><span className="eyebrow">A GROWING COLLECTION</span><h2>ทุกบทเรียนเริ่มต้น<br/>จากความสงสัย</h2><a className="button button-primary" href="#/topics/plant-hormones">เริ่มต้นสำรวจ <span>→</span></a></section></div>
}

function NotFoundPage() {
  return <section className="page-wrap not-found"><span className="eyebrow">FIELD NOTE NOT FOUND · 404</span><h1>ยังไม่มีข้อมูล<br/><em>ในหน้านี้</em></h1><p>กลับไปยังห้องทดลองเพื่อเลือกบทเรียนอื่นได้เลย</p><a className="button button-primary" href="#/">กลับหน้าหลัก →</a></section>
}

function Footer() {
  return <footer className="site-footer"><div className="page-wrap footer-inner"><a className="brand" href="#/"><span className="brand-mark">✳</span><span><strong>Plant Learning Hub</strong><small>BOTANICAL SCIENCE LAB</small></span></a><p>เรียนรู้ชีววิทยา ผ่านการสังเกต ทดลอง และค้นพบ</p><div className="footer-links"><a href="#/topics/plant-hormones">บทเรียน</a><a href="#/knowledge-map">แผนผังความรู้</a><a href="#/about">เกี่ยวกับเรา</a></div><small className="copyright">© 2026 PLANT LEARNING HUB <span>BUILT TO EXPLORE LIFE</span></small></div></footer>
}

export default App
