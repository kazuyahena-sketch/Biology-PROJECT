import type { FoodResourceId } from './data'
import { foodResources } from './data'
import GalapagosImage from './GalapagosImage'

export default function FoodResource({ id }: { id: FoodResourceId }) {
  const resource = foodResources[id]
  return <figure className="food-resource">
    <GalapagosImage className="food-resource-image" src={resource.image} alt={resource.imageAlt} loading="lazy" decoding="async" fallbackKind="food"/>
    <figcaption>
      <strong>{resource.name}</strong>
      <a href={resource.photoSource} target="_blank" rel="noreferrer">ภาพถ่าย: {resource.photoCredit}</a>
    </figcaption>
  </figure>
}
