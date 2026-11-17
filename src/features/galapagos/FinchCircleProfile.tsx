import type { Ref } from 'react'
import type { FinchSpecies } from './data'
import GalapagosImage from './GalapagosImage'

export default function FinchCircleProfile({ bird, beakHighlighted = false, compact = false, onSelect, buttonRef }: { bird: FinchSpecies; beakHighlighted?: boolean; compact?: boolean; onSelect?: () => void; buttonRef?: Ref<HTMLButtonElement> }) {
  const portrait = <span className="finch-circle-frame">
    <GalapagosImage src={bird.image} srcSet={bird.imageSrcSet} alt={bird.imageAlt} loading="lazy" decoding="async" sizes="(max-width: 680px) 56vw, (max-width: 950px) 190px, (max-width: 1390px) 20vw, 278px" fallbackKind="finch"/>
    {beakHighlighted && <span className="beak-spotlight" aria-hidden="true"><i/></span>}
  </span>

  return <figure className={`finch-circle-profile finch-species-${bird.id}${compact ? ' is-compact' : ''}${beakHighlighted ? ' is-beak-highlighted' : ''}`}>
    {onSelect ? <button ref={buttonRef} className="finch-photo-button" type="button" aria-label={`ดูข้อมูล${bird.commonName}`} onClick={onSelect}>{portrait}</button> : portrait}
    <figcaption><strong>{bird.commonName}</strong><em>{bird.scientificName}</em></figcaption>
  </figure>
}
