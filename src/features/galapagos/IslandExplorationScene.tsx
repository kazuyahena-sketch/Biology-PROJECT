import { useEffect, useRef, useState } from 'react'
import type { Island } from './data'
import FinchCircleProfile from './FinchCircleProfile'
import FinchDetailsView from './FinchDetailsView'
import FinchComparison from './FinchComparison'
import NaturalSelectionActivity from './NaturalSelectionActivity'
import LearningSummary from './LearningSummary'
import FoodResource from './FoodResource'
import GalapagosImage from './GalapagosImage'
import { speciesById } from './data'
import IslandZoomTransition from './IslandZoomTransition'
import EvidenceSources from './EvidenceSources'
import GalapagosHomeLink from './GalapagosHomeLink'

type LessonStage = 'explore' | 'natural-selection'

const selectionSteps = [
  {
    title: 'บรรพบุรุษร่วมกัน',
    copy: 'นกฟินช์ของดาร์วินมีบรรพบุรุษร่วมกัน และประชากรไปตั้งถิ่นฐานในส่วนต่าง ๆ ของหมู่เกาะ',
  },
  {
    title: 'ความแปรผัน',
    copy: 'นกฟินช์ในประชากรเดียวกันมีลักษณะแตกต่างกัน รวมถึงลักษณะที่ถ่ายทอดทางพันธุกรรม เช่น รูปร่างและขนาดของจะงอยปาก',
  },
  {
    title: 'สิ่งแวดล้อมและทรัพยากร',
    copy: 'สภาพแวดล้อมและอาหารที่หาได้ส่งผลว่าลักษณะใดอาจเป็นประโยชน์ในพื้นที่นั้น',
  },
  {
    title: 'ความสำเร็จในการสืบพันธุ์แตกต่างกัน',
    copy: 'สิ่งมีชีวิตที่มีลักษณะเหมาะกับสภาพขณะนั้นมากกว่าอาจมีลูกหลานสืบต่อได้มากกว่า',
  },
  {
    title: 'การเปลี่ยนแปลงของประชากร',
    copy: 'เมื่อเวลาผ่านไปหลายรุ่น ความถี่ของลักษณะที่ถ่ายทอดทางพันธุกรรมในประชากรอาจเปลี่ยนแปลง นกแต่ละตัวไม่ได้เปลี่ยนจะงอยปากเพราะต้องการปรับตัว',
  },
]

export default function IslandExplorationScene({ island, onClose }: { island: Island; onClose: () => void }) {
  const bird = speciesById[island.featuredFinch]
  const [stage, setStage] = useState<LessonStage>('explore')
  const [finchDetailsOpen, setFinchDetailsOpen] = useState(false)
  const [simulationOpen, setSimulationOpen] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const stageHeadingRef = useRef<HTMLHeadingElement>(null)
  const finchPhotoButtonRef = useRef<HTMLButtonElement>(null)
  const previousDetailsOpenRef = useRef(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
    if (simulationOpen) {
      stageHeadingRef.current?.focus({ preventScroll: true })
    } else if (stage === 'explore' && previousDetailsOpenRef.current && !finchDetailsOpen) {
      finchPhotoButtonRef.current?.focus({ preventScroll: true })
    } else {
      stageHeadingRef.current?.focus({ preventScroll: true })
    }
    previousDetailsOpenRef.current = finchDetailsOpen
  }, [stage, finchDetailsOpen, simulationOpen])

  const showNaturalSelection = () => {
    setFinchDetailsOpen(false)
    setStage('natural-selection')
  }

  return <IslandZoomTransition island={island} onClose={onClose}>
    {({ exit }) => <div className="island-profile" aria-labelledby="scene-island-heading">
      <main className="profile-scroll" ref={scrollRef}>
        <nav className="profile-toolbar" aria-label="เมนูนำทางบทเรียนเกาะ">
          <button className="profile-map-return" type="button" onClick={exit}>
            <span aria-hidden="true">←</span> กลับไปที่แผนที่
          </button>
          <GalapagosHomeLink className="profile-home-button"/>
        </nav>

        {simulationOpen ? <NaturalSelectionActivity
          island={island}
          bird={bird}
          headingRef={stageHeadingRef}
          onBack={() => setSimulationOpen(false)}
        /> : stage === 'explore' && finchDetailsOpen ? <FinchDetailsView
          island={island}
          bird={bird}
          headingRef={stageHeadingRef}
          onBack={() => setFinchDetailsOpen(false)}
          onNext={showNaturalSelection}
        /> : stage === 'explore' ? <div className="lesson-stage lesson-stage-explore" key="explore">
          <section className="profile-hero">
            <GalapagosImage className="profile-hero-image" src={island.environmentImage} alt={island.environmentImageAlt} fetchPriority="high" decoding="async" fallbackKind="habitat"/>
            <div className="profile-hero-shade" aria-hidden="true"/>
            <div className="profile-hero-copy">
              <div className="profile-hero-intro">
              <span className="profile-eyebrow">ช่วงที่ 1 จาก 2 · สำรวจหมู่เกาะ</span>
              <h1 id="scene-island-heading" ref={stageHeadingRef} tabIndex={-1}>{island.name}</h1>
              <p>{island.overview}</p>
              </div>
              <button className="experiment-entry" type="button" onClick={() => setSimulationOpen(true)}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M9 3h6M10 3v6.2l-5.4 8.9A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.9L14 9.2V3M8 14h8M9.5 11.5h5"/>
                  <path d="M8 17h8"/>
                </svg>
                <span className="experiment-entry-copy">
                  <strong>ทดลองการคัดเลือกโดยธรรมชาติ</strong>
                  <small>ดูการเปลี่ยนแปลงของประชากรนกฟินช์ผ่าน 5 รุ่น</small>
                </span>
                <span className="experiment-entry-arrow" aria-hidden="true">→</span>
              </button>
            </div>
            <a className="profile-photo-credit" href={island.environmentPhotoSource} target="_blank" rel="noreferrer">ภาพถ่าย · {island.environmentPhotoCredit}</a>
          </section>

          <div className="profile-body">
            <section className="environment-notes" aria-labelledby="environment-heading">
              <div className="profile-section-heading">
                <span className="profile-section-number">01</span>
                <div><span className="profile-eyebrow">ชีววิทยาบนเกาะ</span><h2 id="environment-heading">สภาพแวดล้อมที่มีชีวิต</h2></div>
              </div>
              <div className="environment-note-grid">
                <InfoBlock title="ถิ่นอาศัยและพืชพรรณ" text={`${island.habitat} ${island.vegetation}`}/>
                <InfoBlock title="แหล่งอาหาร" text={island.foodSources}/>
              </div>
              <EvidenceSources sources={island.evidenceSources} heading="หลักฐานเกี่ยวกับเกาะและอาหาร" className="island-evidence-sources"/>
            </section>

            <section className="featured-finch-section" aria-labelledby="featured-finch-heading">
              <div className="profile-section-heading">
                <span className="profile-section-number">02</span>
                <div><span className="profile-eyebrow">นกฟินช์ตัวอย่าง · กรณีศึกษา</span><h2 id="featured-finch-heading">จะงอยปากสัมพันธ์กับอาหาร</h2></div>
              </div>

              <div className="featured-finch-grid">
                <div className="featured-finch-portrait">
                  <FinchCircleProfile bird={bird} onSelect={() => setFinchDetailsOpen(true)} buttonRef={finchPhotoButtonRef}/>
                </div>

                <div className="finch-evidence">
                  <InfoBlock title="จะงอยปาก" text={bird.beak}/>
                  <InfoBlock title="อาหาร" text={bird.food}/>
                  <InfoBlock title="ความเชื่อมโยงกับสิ่งแวดล้อม" text={bird.environmentConnection}/>
                </div>

                <div className="food-evidence">
                  <span className="profile-eyebrow">แหล่งอาหาร</span>
                  <FoodResource id={bird.foodResource}/>
                </div>
              </div>
            </section>

            <FinchComparison featuredFinchId={island.featuredFinch}/>

            <footer className="profile-footer">
              <span>ช่วงที่ 1 · บันทึกภาคสนาม · {island.name.toUpperCase()}</span>
              <div className="profile-footer-actions">
                <button type="button" onClick={exit}><span aria-hidden="true">←</span> กลับไปยังหมู่เกาะ</button>
                <button className="stage-next-button" type="button" onClick={showNaturalSelection}>อ่านกระบวนการคัดเลือก <span aria-hidden="true">→</span></button>
              </div>
            </footer>
          </div>
        </div> : <section className="lesson-stage lesson-stage-selection" key="natural-selection" aria-labelledby="scene-island-heading">
          <div className="selection-stage-inner">
            <div className="selection-stage-topline">
              <span className="profile-eyebrow">ช่วงที่ 2 จาก 2 · การคัดเลือกโดยธรรมชาติ</span>
              <span className="selection-island-context">บันทึกภาคสนาม · {island.name.toUpperCase()}</span>
            </div>
            <h1 id="scene-island-heading" ref={stageHeadingRef} tabIndex={-1}>ประชากรเปลี่ยนแปลงได้อย่างไร</h1>
            <p className="selection-stage-intro">เชื่อมโยงถิ่นอาศัยและนกฟินช์ที่เพิ่งสำรวจเข้ากับกระบวนการที่เกิดขึ้นต่อเนื่องหลายรุ่น</p>

            <div className="selection-context" aria-label={`ตัวอย่างจากเกาะ${island.name}`}>
              <FinchCircleProfile bird={bird} compact/>
              <p><strong>{island.name}</strong><span>{bird.commonName} · {bird.scientificName}</span></p>
            </div>

            <ol className="selection-steps">
              {selectionSteps.map((step, index) => <li className="selection-step" key={step.title}>
                <span className="selection-step-number" aria-hidden="true">0{index + 1}</span>
                <div><h2>{step.title}</h2><p>{step.copy}</p></div>
              </li>)}
            </ol>

            <p className="selection-caution">การคัดเลือกโดยธรรมชาติไม่มีเป้าหมายล่วงหน้า ลักษณะที่เป็นประโยชน์ขึ้นอยู่กับสภาพแวดล้อมในช่วงเวลานั้น</p>

            <LearningSummary/>

            <footer className="selection-stage-footer">
              <button type="button" onClick={() => { setFinchDetailsOpen(false); setStage('explore') }}><span aria-hidden="true">←</span> กลับไปสำรวจเกาะ{island.name}</button>
              <button type="button" onClick={() => setSimulationOpen(true)}>สำรวจแบบจำลองประชากร <span aria-hidden="true">→</span></button>
              <button type="button" onClick={exit}>กลับไปยังหมู่เกาะ</button>
            </footer>
          </div>
        </section>}
      </main>
    </div>}
  </IslandZoomTransition>
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return <section className="island-info-block">
    <h3>{title}</h3>
    <p>{text}</p>
  </section>
}
