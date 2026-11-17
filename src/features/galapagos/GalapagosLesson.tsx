import { useCallback, useEffect, useRef, useState } from 'react'
import { islands } from './data'
import GalapagosMap from './GalapagosMap'
import GalapagosHomeLink from './GalapagosHomeLink'
import IslandExplorationScene from './IslandExplorationScene'
import './galapagos.css'
import './exploration.css'

export default function GalapagosLesson() {
  const [activeIslandId, setActiveIslandId] = useState<string | null>(null)
  const islandOpenerRef = useRef<SVGGElement | null>(null)
  const activeIsland = islands.find((island) => island.id === activeIslandId)
  const closeScene = useCallback(() => setActiveIslandId(null), [])
  const openScene = useCallback((islandId: string, opener: SVGGElement) => {
    islandOpenerRef.current = opener
    setActiveIslandId(islandId)
  }, [])

  useEffect(() => {
    if (activeIslandId || !islandOpenerRef.current) return
    islandOpenerRef.current.focus()
    islandOpenerRef.current = null
  }, [activeIslandId])

  return <div lang="th" className={'galapagos-page galapagos-map-home' + (activeIslandId ? ' is-scene-open' : '')}>
    <div inert={Boolean(activeIslandId)} aria-hidden={activeIslandId ? true : undefined}>
      <header className="galapagos-header">
        <a className="galapagos-brand" href="#/" aria-label="Plant Learning Hub — กลับหน้าหลัก">
          <span><strong>GALÁPAGOS FINCHES</strong><small>การคัดเลือกโดยธรรมชาติที่เกิดขึ้นจริง</small></span>
        </a>
        <GalapagosHomeLink className="galapagos-home-button"/>
      </header>

      <main className="galapagos-map-home-content">
        <GalapagosMap selectedIslandId={activeIslandId ?? ''} onSelect={openScene}/>
        <section className="galapagos-map-intro" aria-labelledby="galapagos-map-heading">
          <span className="galapagos-eyebrow">แผนที่สำรวจภาคสนามแบบโต้ตอบ</span>
          <h1 id="galapagos-map-heading">หมู่เกาะกาลาปากอส</h1>
          <p>เลือกเกาะเพื่อสำรวจสภาพแวดล้อมและสิ่งมีชีวิต</p>
        </section>
        <span className="map-imagery-credit">แผนที่ภูมิประเทศหมู่เกาะกาลาปากอส · ECUADOR</span>
      </main>
    </div>

    {activeIsland && <IslandExplorationScene key={activeIsland.id} island={activeIsland} onClose={closeScene}/>}
  </div>
}
