import { useState } from 'react'
import FoodResource from './FoodResource'
import GalapagosImage from './GalapagosImage'
import { islands, species, speciesById, type FinchSpecies, type FinchSpeciesId } from './data'

function defaultComparisonFinch(featuredFinchId: FinchSpeciesId): FinchSpeciesId {
  const featured = speciesById[featuredFinchId]
  return species.find((bird) => bird.id !== featuredFinchId && bird.foodResource !== featured.foodResource)?.id
    ?? species.find((bird) => bird.id !== featuredFinchId)!.id
}

export default function FinchComparison({ featuredFinchId }: { featuredFinchId: FinchSpeciesId }) {
  const [firstId, setFirstId] = useState(featuredFinchId)
  const [secondId, setSecondId] = useState(() => defaultComparisonFinch(featuredFinchId))
  const first = speciesById[firstId]
  const second = speciesById[secondId]

  return <section className="finch-comparison" aria-labelledby="finch-comparison-heading">
    <header className="finch-comparison-heading">
      <div className="profile-section-heading">
        <span className="profile-section-number" aria-hidden="true">03</span>
        <div>
          <span className="profile-eyebrow">เปรียบเทียบนกฟินช์</span>
          <h2 id="finch-comparison-heading">จะงอยปากต่างกัน ใช้ทรัพยากรต่างกัน</h2>
        </div>
      </div>
      <p>สลับเลือกนกสองชนิดเพื่อดูความต่าง</p>
    </header>

    <div className="finch-comparison-selectors">
      <label>
        <span>นกฟินช์ A</span>
        <select value={firstId} onChange={(event) => setFirstId(event.target.value as FinchSpeciesId)}>
          {species.map((bird) => <option key={bird.id} value={bird.id} disabled={bird.id === secondId}>{bird.commonName}</option>)}
        </select>
      </label>
      <span className="finch-comparison-versus" aria-hidden="true">เทียบ</span>
      <label>
        <span>นกฟินช์ B</span>
        <select value={secondId} onChange={(event) => setSecondId(event.target.value as FinchSpeciesId)}>
          {species.map((bird) => <option key={bird.id} value={bird.id} disabled={bird.id === firstId}>{bird.commonName}</option>)}
        </select>
      </label>
    </div>

    <div className="finch-comparison-grid">
      <ComparisonCard bird={first}/>
      <ComparisonCard bird={second}/>
    </div>

    <p className="finch-comparison-takeaway">จะงอยปากอาจช่วยให้นกใช้แหล่งอาหารต่างกัน ความได้เปรียบขึ้นอยู่กับสภาพแวดล้อม จึงไม่มีรูปแบบใดดีที่สุดในทุกพื้นที่</p>
    <p className="finch-comparison-note">เกาะหนึ่งอาจเป็นถิ่นอาศัยของนกฟินช์หลายชนิด ตัวอย่างนี้แสดงเพียงชนิดที่ใช้ศึกษา</p>
  </section>
}

function ComparisonCard({ bird }: { bird: FinchSpecies }) {
  const exampleIsland = islands.find((island) => island.featuredFinch === bird.id)

  return <article className="finch-comparison-card" aria-labelledby={`compare-${bird.id}-heading`}>
    <figure className="finch-comparison-portrait">
      <span className="finch-comparison-photo">
        <GalapagosImage src={bird.detailPhoto.image} alt={bird.detailPhoto.imageAlt} loading="lazy" decoding="async" sizes="(max-width: 680px) 88px, 116px" fallbackKind="finch"/>
      </span>
      <figcaption>
        <h3 id={`compare-${bird.id}-heading`}>{bird.commonName}</h3>
        {bird.commonNameAlias && <span className="finch-comparison-alias">{bird.commonNameAlias}</span>}
        <em>{bird.scientificName}</em>
      </figcaption>
    </figure>

    <dl className="finch-comparison-facts">
      <div><dt>จะงอยปาก</dt><dd>{bird.beak}</dd></div>
      <div><dt>อาหาร</dt><dd>{bird.food}</dd></div>
      <div><dt>พฤติกรรมการกิน</dt><dd>{bird.feedingBehavior}</dd></div>
      {exampleIsland && <div><dt>เกาะตัวอย่าง</dt><dd>{exampleIsland.name}</dd></div>}
    </dl>

    <div className="finch-comparison-food">
      <span className="profile-eyebrow">แหล่งอาหาร</span>
      <FoodResource id={bird.foodResource}/>
    </div>
  </article>
}
