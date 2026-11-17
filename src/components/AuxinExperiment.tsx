import { useRef, useState, type CSSProperties } from 'react'
import { PlantArt } from './Illustrations'

type Stage = 'plant' | 'zoom' | 'light' | 'auxin' | 'cells' | 'result'

const stageInfo: Record<Exclude<Stage, 'zoom'>, { number: string; title: string; copy: string }> = {
  plant: { number: '01', title: 'เริ่มจากการสังเกต', copy: 'ยอดอ่อนของพืชรับรู้ทิศทางของแสงได้ ลองเข้าไปสังเกตการตอบสนองอย่างใกล้ชิด' },
  light: { number: '02', title: 'กำหนดทิศทางแสง', copy: 'แสงส่องมาจากด้านซ้าย สังเกตว่ายอดอ่อนตอบสนองต่อสิ่งเร้านี้อย่างไร' },
  auxin: { number: '03', title: 'ติดตามการกระจายของ Auxin', copy: 'เมื่อแสงมาจากด้านเดียว Auxin จะกระจายมากขึ้นทางด้านที่ได้รับแสงน้อยกว่าในยอด' },
  cells: { number: '04', title: 'ซูมเข้าไปในเซลล์', copy: 'เซลล์ทางด้านที่มี Auxin มากกว่าได้รับการส่งเสริมให้ยืดตัวมากกว่า จึงเกิดความยาวไม่เท่ากัน' },
  result: { number: '05', title: 'สังเกตผลลัพธ์', copy: 'ด้านที่ยืดมากกว่าจะดันให้ยอดโค้งเข้าหาแสง เกิดการตอบสนองที่เรียกว่า Phototropism' },
}

export default function AuxinExperiment() {
  const [stage, setStage] = useState<Stage>('plant')
  const [showAuxin, setShowAuxin] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const zoomTimer = useRef<number | null>(null)
  const zoomRemaining = useRef(2600)
  const zoomStarted = useRef(0)

  function explore() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) setStage('light')
    else {
      setStage('zoom')
      zoomRemaining.current = 2600
      zoomStarted.current = Date.now()
      zoomTimer.current = window.setTimeout(() => setStage((current) => current === 'zoom' ? 'light' : current), zoomRemaining.current)
    }
  }

  function skip() { if (zoomTimer.current) window.clearTimeout(zoomTimer.current); setStage((current) => current === 'zoom' ? 'light' : current); setIsPaused(false) }
  function replay() { if (zoomTimer.current) window.clearTimeout(zoomTimer.current); setStage('plant'); setShowAuxin(true); setIsPaused(false) }
  function togglePause() {
    if (isPaused) {
      zoomStarted.current = Date.now()
      zoomTimer.current = window.setTimeout(() => setStage((current) => current === 'zoom' ? 'light' : current), zoomRemaining.current)
      setIsPaused(false)
    } else {
      if (zoomTimer.current) window.clearTimeout(zoomTimer.current)
      zoomRemaining.current = Math.max(0, zoomRemaining.current - (Date.now() - zoomStarted.current))
      setIsPaused(true)
    }
  }

  const activeStage = stage === 'zoom' ? 'plant' : stage
  const info = stageInfo[activeStage]
  const inPlantView = stage !== 'cells'

  return <section className="experiment" aria-labelledby="experiment-title">
    <div className="experiment-topline"><div><span className="eyebrow">INTERACTIVE EXPERIMENT · 01 / 02</span><h2 id="experiment-title">ยอดพืชตอบสนองต่อแสงอย่างไร?</h2></div><button className="replay-button" onClick={replay} aria-label="เริ่มการทดลองใหม่">↺ <span>เริ่มใหม่</span></button></div>
    <div className="experiment-grid">
      <div className={`scene scene-${stage} ${isPaused ? 'scene-paused' : ''}`} aria-label="ฉากจำลองการทดลอง Phototropism">
        <div className="scene-header"><span className="scene-live"><i /> LIVE SIMULATION</span><span>PLANT · 01</span></div>
        {inPlantView ? <>
          <div className="sunbeam"><span>☼</span><i /><i /><i /></div>
          <PlantArt bent={stage === 'result'} glowing={stage === 'light' || stage === 'auxin'} showSun={false} />
          {(stage === 'auxin' || stage === 'result') && showAuxin && <div className={`auxin-dots ${stage === 'result' ? 'dots-result' : ''}`} aria-label="Auxin กระจายมากกว่าทางด้านรับแสงน้อย">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((dot) => <span key={dot} style={{ '--dot': dot } as CSSProperties} />)}
          </div>}
          {(stage === 'auxin' || stage === 'result') && <span className="scene-label auxin-label">AUXIN · ด้านรับแสงน้อย</span>}
        </> : <div className="cell-scene" aria-label="ภาพเซลล์พืชสองด้านที่ยืดตัวไม่เท่ากัน">
          <span className="cell-side-label">ด้านรับแสง</span><span className="cell-side-label cell-more-auxin">ด้านรับแสงน้อย · Auxin มากกว่า</span>
          <div className="cells-row" aria-hidden="true">{Array.from({ length: 7 }, (_, cell) => <div key={cell} className={`plant-cell ${cell >= 4 ? 'cell-elongated' : ''}`}><i /></div>)}</div>
          <div className="cell-explanation"><span>เซลล์ยืดตัวน้อยกว่า</span><b>↗</b><span>เซลล์ยืดตัวมากกว่า</span></div>
        </div>}
        <div className="scene-caption"><span className="scene-scale">{stage === 'cells' ? 'CELL VIEW' : stage === 'result' ? 'RESULT' : 'WHOLE PLANT'}</span><span>แบบจำลองเพื่อการเรียนรู้</span></div>
        {stage === 'zoom' && <div className="zoom-wash" aria-hidden="true" />}
      </div>
      <aside className="experiment-guide">
        <div className="guide-progress"><span>การทดลอง</span><strong>{info.number}<small> / 05</small></strong><div><i style={{ width: `${(Number(info.number) / 5) * 100}%` }} /></div></div>
        <span className="step-kicker">STEP {info.number} · OBSERVE</span>
        <h3>{info.title}</h3>
        <p>{info.copy}</p>
        {stage === 'plant' && <button className="button button-primary button-wide" onClick={explore}>สำรวจยอดพืช <span>↗</span></button>}
        {stage === 'zoom' && <div className="camera-controls"><button className="button button-secondary" onClick={togglePause}>{isPaused ? '▶ เล่นต่อ' : 'Ⅱ พักภาพ'}</button><button className="text-button" onClick={skip}>ข้ามการซูม →</button></div>}
        {stage === 'light' && <button className="button button-primary button-wide" onClick={() => setStage('auxin')}>เปิดแสง <span>☼</span></button>}
        {stage === 'auxin' && <div className="guide-controls"><label className="toggle-control"><input type="checkbox" checked={showAuxin} onChange={(event) => setShowAuxin(event.target.checked)} /><span className="toggle-ui"/><span>แสดง Auxin</span></label><button className="button button-primary button-wide" onClick={() => setStage('cells')}>ดูในระดับเซลล์ <span>↗</span></button></div>}
        {stage === 'cells' && <button className="button button-primary button-wide" onClick={() => setStage('result')}>ดูผลที่ยอดพืช <span>↗</span></button>}
        {stage === 'result' && <div className="result-controls"><div className="result-equation"><span>แสงด้านเดียว</span><b>→</b><span>Auxin กระจายต่างกัน</span><b>→</b><span>เซลล์ยืดไม่เท่ากัน</span><b>→</b><strong>ยอดโค้งเข้าหาแสง</strong></div><a className="button button-primary button-wide" href="#/quiz">ไปทำแบบทดสอบ <span>→</span></a><button className="text-button" onClick={replay}>ดูการทดลองอีกครั้ง ↺</button></div>}
        <div className="guide-meta"><span><i className="meta-dot" /> AUXIN</span><span>Phototropism</span></div>
      </aside>
    </div>
    <div className="experiment-legend"><span><i className="legend-green" /> การเจริญเติบโต</span><span><i className="legend-blue" /> การกระจายของ Auxin</span><span className="legend-note">ภาพจำลองอย่างย่อ · ไม่แสดงสเกลจริง</span></div>
  </section>
}
