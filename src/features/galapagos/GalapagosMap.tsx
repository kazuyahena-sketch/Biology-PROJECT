import { type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react'
import { islands } from './data'

type Props = {
  selectedIslandId?: string
  onSelect?: (id: string, opener: SVGGElement) => void
  cameraIslandId?: string
  cameraPhase?: 'highlight' | 'zooming' | 'revealing' | 'leaving'
  interactive?: boolean
}

const mapImage = `${import.meta.env.BASE_URL}assets/galapagos/map/galapagos-map.jpg`

export default function GalapagosMap({
  selectedIslandId = '',
  onSelect,
  cameraIslandId,
  cameraPhase = 'highlight',
  interactive = true,
}: Props) {
  const targetIsland = islands.find((island) => island.id === cameraIslandId)
  const zoomed = Boolean(targetIsland && (cameraPhase === 'zooming' || cameraPhase === 'revealing'))
  const scale = 2.45
  const centerX = targetIsland?.mapCenter[0] ?? 550
  const centerY = targetIsland?.mapCenter[1] ?? 410
  const cameraStyle: CSSProperties = {
    transform: zoomed
      ? 'translate(' + (550 - centerX * scale) + 'px, ' + (410 - centerY * scale) + 'px) scale(' + scale + ')'
      : 'translate(0px, 0px) scale(1)',
  }

  const activateWithKeyboard = (event: KeyboardEvent<SVGGElement>, islandId: string) => {
    if (!interactive || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    onSelect?.(islandId, event.currentTarget)
  }

  const activateWithPointer = (event: MouseEvent<SVGPathElement>, islandId: string) => {
    const islandControl = event.currentTarget.parentElement as SVGGElement | null
    if (islandControl) onSelect?.(islandId, islandControl)
  }

  return <div className="galapagos-map-canvas" aria-label="แผนที่หมู่เกาะกาลาปากอส">
    <svg
      className="galapagos-map-svg"
      viewBox="0 0 1100 820"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden={!interactive}
    >
      <title>แผนที่หมู่เกาะกาลาปากอส</title>
      <defs>
        <linearGradient id="satellite-ocean-fade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#194d67" stopOpacity=".56"/>
          <stop offset=".52" stopColor="#0a293e" stopOpacity=".46"/>
          <stop offset="1" stopColor="#102f45" stopOpacity=".66"/>
        </linearGradient>
        <filter id="island-highlight" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1100" height="820" fill="#102e43"/>
      <g className="satellite-camera" style={cameraStyle}>
          <image className="satellite-base" href={mapImage} x="0" y="0" width="1100" height="820" preserveAspectRatio="none"/>
          <rect className="satellite-color-grade" x="0" y="0" width="1100" height="820" fill="url(#satellite-ocean-fade)"/>

          {islands.map((island) => {
          const selected = (cameraIslandId ?? selectedIslandId) === island.id
          const titleId = 'island-title-' + island.id
          return <g
            className={'map-island-control map-island-' + island.id + (selected ? ' is-selected' : '')}
            key={island.id}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : -1}
            aria-labelledby={interactive ? titleId : undefined}
            aria-pressed={interactive ? selected : undefined}
            data-map-center={island.mapCenter.join(',')}
            onKeyDown={interactive ? (event) => activateWithKeyboard(event, island.id) : undefined}
            style={!interactive ? { pointerEvents: 'none' } : undefined}
          >
            <path className="island-hit-area" d={island.mapPath} onClick={interactive ? (event) => activateWithPointer(event, island.id) : undefined}/>
            <path className="island-hover-shape" d={island.mapPath} aria-hidden="true"/>
            <text
              id={titleId}
              className="map-island-label"
              x={island.labelPosition[0]}
              y={island.labelPosition[1]}
              textAnchor={island.labelAnchor ?? 'middle'}
              aria-hidden={!interactive}
            >{island.name}</text>
          </g>
          })}
      </g>
    </svg>
  </div>
}
