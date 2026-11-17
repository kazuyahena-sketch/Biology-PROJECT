import { useEffect, useMemo, useState, type Ref } from 'react'
import type { FinchSpecies, Island } from './data'
import EvidenceSources from './EvidenceSources'
import FinchCircleProfile from './FinchCircleProfile'
import FoodResource from './FoodResource'
import GalapagosImage from './GalapagosImage'
import {
  BILL_CATEGORIES,
  SIMULATION_TRANSITIONS,
  islandSimulationScenarios,
} from './simulationData'
import {
  buildPopulationSequence,
  getCategoryPercent,
  getChangingCategories,
  getPopulationSize,
} from './simulationModel'
import type { PopulationCounts } from './simulationData'

type Props = {
  island: Island
  bird: FinchSpecies
  headingRef: Ref<HTMLHeadingElement>
  onBack: () => void
}

export default function NaturalSelectionActivity({ island, bird, headingRef, onBack }: Props) {
  const scenario = islandSimulationScenarios[island.id]
  const sequence = useMemo(() => buildPopulationSequence(scenario), [scenario])
  const finalGeneration = sequence.length - 1
  const [generation, setGeneration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const population = sequence[generation]
  const previousPopulation = sequence[Math.max(0, generation - 1)]
  const total = getPopulationSize(population)
  const finalPopulation = sequence[finalGeneration]
  const stepChanges = getChangingCategories(previousPopulation, population)

  useEffect(() => {
    if (!isPlaying) return
    if (generation >= finalGeneration) {
      setIsPlaying(false)
      return
    }

    const timer = window.setTimeout(() => setGeneration((current) => Math.min(current + 1, finalGeneration)), 1350)
    return () => window.clearTimeout(timer)
  }, [finalGeneration, generation, isPlaying])

  const pause = () => setIsPlaying(false)
  const restart = () => {
    setIsPlaying(false)
    setGeneration(0)
  }

  const changesExplanation = `จากรุ่นที่ ${generation} ถึงรุ่นที่ ${generation + 1} ${stepChanges.increased.length ? `ลักษณะ ${stepChanges.increased.join(', ')} พบได้บ่อยขึ้น` : 'ไม่มีหมวดหมู่ใดพบได้บ่อยขึ้น'} และ ${stepChanges.decreased.length ? `ลักษณะ ${stepChanges.decreased.join(', ')} พบได้น้อยลง` : 'ไม่มีหมวดหมู่ใดพบได้น้อยลง'}`
  const stepExplanation = generation === 0
    ? 'รุ่นที่ 1 แสดงนกตัวอย่าง 20 ตัวที่มีลักษณะ S, M และ L ความแปรผัน XS ที่ถ่ายทอดได้มีอยู่ในประชากรโดยรวม แต่ยังไม่อยู่ในตัวอย่างนี้'
    : generation === 1
      ? `${changesExplanation} รุ่นที่ 2 ยังไม่มี XS ในตัวอย่าง; ความแปรผัน XS ที่ถ่ายทอดได้มีอยู่ในประชากรโดยรวมและอาจปรากฏในรุ่นถัดไป`
      : generation === 2
        ? `${changesExplanation} XS ปรากฏในตัวอย่างรุ่นที่ 3 ผ่านการสืบพันธุ์จากความแปรผันที่ถ่ายทอดได้ซึ่งมีอยู่ก่อนแล้ว ไม่ได้เกิดจากอาหารสร้างลักษณะใหม่`
        : generation === finalGeneration
          ? `${changesExplanation} รุ่นสุดท้ายมี XS ${population.XS} ตัว มากกว่า S ${population.S} ตัว; เมื่อรวมสองหมวดนี้มีครบ ${population.XS + population.S} ตัว`
          : `${changesExplanation} สัดส่วนของลักษณะเปลี่ยนผ่านการอยู่รอดและการสืบพันธุ์ในแบบจำลอง`

  return <section className="natural-selection-activity" aria-labelledby="population-simulation-heading">
    <div className="population-simulation-inner">
      <button className="simulation-back-button" type="button" onClick={onBack}>
        <span aria-hidden="true">←</span> กลับไปที่เกาะ{island.name}
      </button>

      <header className="population-simulation-heading">
        <div>
          <span className="profile-eyebrow">การคัดเลือกโดยธรรมชาติ · แบบจำลองเพื่อการเรียนรู้</span>
          <h1 id="population-simulation-heading" ref={headingRef} tabIndex={-1}>ประชากรนกฟินช์ในแต่ละรุ่น</h1>
        </div>
        <p>ติดตามความแปรผันที่ถ่ายทอดทางพันธุกรรมผ่านสภาพอาหาร การคัดเลือก และการสืบพันธุ์ นกแต่ละตัวไม่ได้เปลี่ยนจะงอยปากของตน</p>
      </header>

      <div className="simulation-context-grid">
        <section className="simulation-island-context" aria-labelledby="simulation-island-heading">
          <div className="simulation-context-finch">
            <FinchCircleProfile bird={bird} compact/>
          </div>
          <div className="simulation-island-copy">
            <span className="profile-eyebrow">บริบทของเกาะจริง · นกฟินช์ตัวอย่าง</span>
            <h2 id="simulation-island-heading">{island.name}</h2>
            <p><strong>{bird.commonName}</strong> <em>{bird.scientificName}</em></p>
            <dl>
              <div><dt>ถิ่นอาศัยและพืชพรรณ</dt><dd>{island.habitat} {island.vegetation}</dd></div>
              <div><dt>อาหารในตัวอย่างบทเรียน</dt><dd>{island.foodSources}</dd></div>
            </dl>
          </div>
        </section>

        <section className="simulation-model-setting" aria-labelledby="simulation-setting-heading">
          <span className="profile-eyebrow">เงื่อนไขในแบบจำลอง · ไม่ใช่ข้อมูลภาคสนาม</span>
          <h2 id="simulation-setting-heading">{scenario.modelSetting.resources}</h2>
          <dl className="simulation-setting-details">
            <div><dt>ขนาดอาหาร</dt><dd>{scenario.modelSetting.foodSize}</dd></div>
            <div><dt>ความแข็ง</dt><dd>{scenario.modelSetting.hardness}</dd></div>
            <div><dt>ปริมาณที่หาได้</dt><dd>{scenario.modelSetting.availability}</dd></div>
          </dl>
          <p>{scenario.selectionSummary}</p>
          <FoodResource id={bird.foodResource}/>
        </section>
      </div>

      <ol className="simulation-process" aria-label="ขั้นตอนของแบบจำลอง">
        <li>ความแปรผันที่ถ่ายทอดทางพันธุกรรม</li>
        <li>สภาพอาหาร</li>
        <li>แรงคัดเลือก</li>
        <li>การสืบพันธุ์</li>
        <li>รุ่นถัดไป</li>
      </ol>

      <section className="simulation-population-panel" aria-labelledby="simulation-generation-heading">
        <div className="simulation-generation-heading">
          <div>
            <span className="profile-eyebrow">ตัวอย่างประชากร · {island.name.toUpperCase()}</span>
            <h2 id="simulation-generation-heading" aria-live="polite">
              รุ่นที่ {generation + 1}{generation === 0 ? ' · ประชากรเริ่มต้น' : generation === finalGeneration ? ' · ประชากรสุดท้าย' : ''}
            </h2>
          </div>
          <p><strong>{total}</strong> ตัวอย่าง · พบลักษณะ {categoryCount(population)} หมวดหมู่</p>
        </div>

        <p className="simulation-category-note">XS / S / M / L เป็นหมวดหมู่ลักษณะโดยประมาณ ไม่ใช่ค่าที่วัดหรือชื่อชนิดพันธุ์ แต่ละรุ่นเป็นตัวอย่าง 20 ตัว ความแปรผัน XS ที่ถ่ายทอดได้มีอยู่ในประชากรโดยรวม แต่อาจไม่อยู่ในตัวอย่างรุ่นที่ 1 และ 2 ก่อนปรากฏในรุ่นที่ 3 ผ่านการสืบพันธุ์ นกแต่ละตัวไม่เปลี่ยนหมวดหมู่ของตนเอง; อาหารไม่ได้สร้างลักษณะใหม่ จำนวนและค่าน้ำหนักเป็นสมมติฐานเพื่อการเรียนรู้ ไม่ใช่ข้อมูลภาคสนาม และการปัดเศษอาจมีผลต่อจำนวนที่แสดง</p>

        <ul className="simulation-bird-population" aria-label={`ตัวอย่างประชากร${bird.commonName} รุ่นที่ ${generation + 1}`}>
          {BILL_CATEGORIES.flatMap((category) => Array.from({ length: population[category.id] }, (_, index) => (
            <li className={`simulation-bird simulation-bird-${category.id.toLowerCase()}`} key={`${generation}-${category.id}-${index}`}>
              <span className="simulation-bird-portrait">
                <GalapagosImage className="simulation-bird-image" src={bird.image} srcSet={bird.imageSrcSet} sizes="(max-width: 680px) 48px, 58px" alt="" fallbackKind="finch" loading="lazy" decoding="async"/>
                <BeakMark category={category.id}/>
              </span>
              <span className="simulation-bird-label">{category.id}</span>
            </li>
          ))) }
        </ul>

        <div className="simulation-proportions" role="group" aria-label={`สัดส่วนของแต่ละหมวดหมู่ในรุ่นที่ ${generation + 1}`}>
          {BILL_CATEGORIES.map((category) => {
            const count = population[category.id]
            const percent = getCategoryPercent(count, total)
            return <div className={`simulation-proportion simulation-proportion-${category.id.toLowerCase()}`} key={category.id}>
              <div className="simulation-proportion-label"><strong>{category.id}</strong><span>{count} จาก {total} · {percent}%</span></div>
              <div className="simulation-proportion-track" role="img" aria-label={`${category.label}: ${count} จาก ${total} ตัว, ${percent}%`}>
                <span style={{ width: `${percent}%` }}/>
              </div>
            </div>
          })}
        </div>

        <p className="simulation-step-explanation" aria-live="polite" aria-atomic="true">
          <strong>{generation === 0 ? 'ความแปรผันตั้งต้น' : `สิ่งที่เปลี่ยนแปลงในรุ่นที่ ${generation + 1}`}</strong>
          <span>{stepExplanation}</span>
        </p>

        <div className="simulation-controls" role="group" aria-label="ปุ่มควบคุมรุ่นของประชากร">
          <button type="button" onClick={() => { pause(); setGeneration((current) => Math.max(0, current - 1)) }} disabled={generation === 0}>รุ่นก่อนหน้า</button>
          {isPlaying
            ? <button type="button" className="simulation-play-button" onClick={pause}>หยุดชั่วคราว</button>
            : <button type="button" className="simulation-play-button" onClick={() => setIsPlaying(true)} disabled={generation >= finalGeneration}>เล่น</button>}
          <button type="button" onClick={() => { pause(); setGeneration((current) => Math.min(finalGeneration, current + 1)) }} disabled={generation >= finalGeneration}>รุ่นถัดไป</button>
          <button type="button" className="simulation-restart-button" onClick={restart}>เริ่มใหม่</button>
        </div>
        <p className="simulation-control-status" aria-live="polite">{isPlaying ? 'กำลังเล่นลำดับรุ่น' : generation === finalGeneration ? 'ถึงรุ่นสุดท้ายแล้ว' : 'หยุดแบบจำลองชั่วคราว'}</p>
      </section>

      {generation === finalGeneration && <FinalPopulationSummary
        bird={bird}
        initial={sequence[0]}
        final={finalPopulation}
        setting={scenario.modelSetting.resources}
        selectionSummary={scenario.selectionSummary}
      />}

      <EvidenceSources sources={bird.evidenceSources} heading="แหล่งข้อมูลเกี่ยวกับเกาะและนกฟินช์ตัวอย่าง" className="simulation-evidence-sources"/>
    </div>
  </section>
}

function FinalPopulationSummary({ bird, initial, final, setting, selectionSummary }: {
  bird: FinchSpecies
  initial: PopulationCounts
  final: PopulationCounts
  setting: string
  selectionSummary: string
}) {
  const changes = getChangingCategories(initial, final)
  const initialTotal = getPopulationSize(initial)
  const finalTotal = getPopulationSize(final)

  return <section className="simulation-final-summary" aria-labelledby="simulation-final-heading">
    <span className="profile-eyebrow">ผลลัพธ์ · ประชากรในแบบจำลอง</span>
    <h2 id="simulation-final-heading">การคัดเลือกโดยธรรมชาติเปลี่ยนลักษณะของประชากรในแต่ละรุ่น</h2>
    <p className="simulation-final-intro">ตัวอย่าง{bird.commonName}นี้ติดตามประชากรแบบย่อภายใต้เงื่อนไขในแบบจำลอง <strong>{setting}</strong></p>

    <div className="simulation-final-comparison">
      <PopulationSnapshot label="เริ่มต้น · รุ่นที่ 1" counts={initial} total={initialTotal}/>
      <PopulationSnapshot label={`สุดท้าย · รุ่นที่ ${SIMULATION_TRANSITIONS + 1}`} counts={final} total={finalTotal}/>
    </div>

    <div className="simulation-final-changes">
      <p><strong>พบได้บ่อยขึ้นในแบบจำลองนี้</strong><span>{categoryList(changes.increased, 'ไม่มีหมวดหมู่ใดเพิ่มขึ้น')}</span></p>
      <p><strong>พบได้น้อยลงในแบบจำลองนี้</strong><span>{categoryList(changes.decreased, 'ไม่มีหมวดหมู่ใดลดลง')}</span></p>
    </div>
    <p className="simulation-final-explanation">{selectionSummary} ในตัวอย่างนี้ กลุ่มลักษณะ XS และ S รวมกันเพิ่มจาก {initial.XS + initial.S} ใน {initialTotal} ตัว เป็น {final.XS + final.S} ใน {finalTotal} ตัว โดย XS มี {final.XS} ตัว มากกว่า S ที่มี {final.S} ตัว ความแปรผัน XS ถ่ายทอดได้และมีอยู่ในประชากรโดยรวมตั้งแต่ต้น ไม่ใช่ลักษณะที่เกิดขึ้นเพราะนกต้องการอาหาร ผลนี้เป็นสถานการณ์เพื่อการเรียนรู้ ไม่ใช่ข้อมูลประชากรจริง</p>
    <p className="simulation-final-takeaway">การคัดเลือกโดยธรรมชาติเปลี่ยนลักษณะของประชากรเมื่อเวลาผ่านไปหลายรุ่น และไม่มีลักษณะใดดีที่สุดในทุกสภาพแวดล้อม</p>
  </section>
}

function PopulationSnapshot({ label, counts, total }: { label: string; counts: PopulationCounts; total: number }) {
  return <div className="simulation-population-snapshot">
    <h3>{label}</h3>
    <div className="simulation-snapshot-categories">
      {BILL_CATEGORIES.map((category) => {
        const count = counts[category.id]
        const percent = getCategoryPercent(count, total)
        return <div className={`simulation-snapshot-category simulation-proportion-${category.id.toLowerCase()}`} key={category.id}>
          <div><strong>{category.id}</strong><span>{count} ตัว · {percent}%</span></div>
          <div className="simulation-proportion-track"><span style={{ width: `${percent}%` }}/></div>
        </div>
      })}
    </div>
  </div>
}

function BeakMark({ category }: { category: string }) {
  const widths: Record<string, number> = { XS: 3, S: 6, M: 9, L: 12 }
  const width = widths[category] ?? 6
  return <svg className={`simulation-beak-mark simulation-beak-${category.toLowerCase()}`} viewBox="0 0 24 14" aria-hidden="true" focusable="false">
    <path d={`M3 7 Q8 2 14 6 L${14 + width} 7 L14 8 Q8 12 3 7 Z`} fill="currentColor"/>
  </svg>
}

function categoryCount(population: PopulationCounts) {
  return BILL_CATEGORIES.filter((category) => population[category.id] > 0).length
}

function categoryList(categories: string[], emptyLabel: string) {
  return categories.length > 0 ? categories.join(', ') : emptyLabel
}
