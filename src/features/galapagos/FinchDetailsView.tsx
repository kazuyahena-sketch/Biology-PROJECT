import type { RefObject } from 'react'
import type { FinchSpecies, Island } from './data'
import GalapagosImage from './GalapagosImage'
import FoodResource from './FoodResource'
import EvidenceSources from './EvidenceSources'

type Props = {
  island: Island
  bird: FinchSpecies
  headingRef: RefObject<HTMLHeadingElement | null>
  onBack: () => void
  onNext: () => void
}

export default function FinchDetailsView({ island, bird, headingRef, onBack, onNext }: Props) {
  return <section className="lesson-stage finch-detail-stage" aria-labelledby="scene-island-heading">
    <div className="finch-detail-inner">
      <div className="finch-detail-topline">
        <span className="profile-eyebrow">ช่วงที่ 1 · ข้อมูลนกฟินช์</span>
        <span className="selection-island-context">บันทึกภาคสนาม · {island.name.toUpperCase()}</span>
      </div>

      <div className="finch-detail-grid">
        <div className="finch-detail-portrait">
          <figure className="finch-detail-main-photo">
            <span className="finch-detail-photo-frame">
              <GalapagosImage src={bird.detailPhoto.image} alt={bird.detailPhoto.imageAlt} loading="lazy" decoding="async" sizes="(max-width: 680px) 66vw, (max-width: 1100px) 36vw, 390px" fallbackKind="finch"/>
            </span>
            <figcaption>
              {bird.detailPhoto.source ? <a href={bird.detailPhoto.source} target="_blank" rel="noreferrer">ภาพถ่าย · {bird.detailPhoto.credit}</a> : <span>{bird.detailPhoto.credit}</span>}
              {bird.detailPhoto.licenseSource ? <a href={bird.detailPhoto.licenseSource} target="_blank" rel="noreferrer">{bird.detailPhoto.license}</a> : bird.detailPhoto.license && <span>{bird.detailPhoto.license}</span>}
            </figcaption>
          </figure>
          {bird.suppliedImage && <div className="finch-detail-supplied-photo">
            <span className="finch-detail-supplied-photo-frame"><GalapagosImage src={bird.image} srcSet={bird.imageSrcSet} alt={bird.imageAlt} loading="lazy" decoding="async" sizes="72px" fallbackKind="finch"/></span>
            <span>ภาพถ่ายต้นฉบับที่ใช้ในบทเรียนนี้</span>
          </div>}
        </div>

        <div className="finch-detail-copy">
          <h1 id="scene-island-heading" ref={headingRef} tabIndex={-1}>{bird.commonName}</h1>
          {bird.commonNameAlias && <p className="finch-detail-common-name-alias">{bird.commonNameAlias}</p>}
          <p className="finch-detail-scientific-name">{bird.scientificName}</p>
          <InfoBlock title="จะงอยปาก" text={bird.beak}/>
          <InfoBlock title="อาหาร" text={bird.food}/>
          <InfoBlock title="ความเชื่อมโยงกับสิ่งแวดล้อม" text={bird.environmentConnection}/>
          <div className="finch-detail-food">
            <span className="profile-eyebrow">แหล่งอาหาร</span>
            <FoodResource id={bird.foodResource}/>
          </div>
          <EvidenceSources sources={bird.evidenceSources} heading="หลักฐานและแหล่งข้อมูลเกี่ยวกับชนิดพันธุ์"/>
        </div>
      </div>

      <footer className="finch-detail-footer">
        <button type="button" onClick={onBack}><span aria-hidden="true">←</span> กลับไปที่เกาะ{island.name}</button>
        <button className="stage-next-button" type="button" onClick={onNext}>ถัดไป: การคัดเลือกโดยธรรมชาติ <span aria-hidden="true">→</span></button>
      </footer>
    </div>
  </section>
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return <section className="finch-detail-info-block">
    <h2>{title}</h2>
    <p>{text}</p>
  </section>
}
