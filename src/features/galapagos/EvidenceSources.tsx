import type { EvidenceSource } from './data'

type Props = {
  sources: EvidenceSource[]
  heading: string
  className?: string
}

export default function EvidenceSources({ sources, heading, className = '' }: Props) {
  if (!sources.length) return null

  return <aside className={`evidence-sources ${className}`} aria-label={heading}>
    <h2>{heading}</h2>
    <ul>
      {sources.map((source) => <li key={`${source.label}-${source.url}`}>
        <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span className="evidence-source-new-tab"> (เปิดในแท็บใหม่)</span></a>
        <p>{source.scope}</p>
      </li>)}
    </ul>
  </aside>
}
