import { useEffect, useRef, useState } from 'react'
import { CAMERA_TARGETS, CameraController, type CameraTarget, type CameraPosition } from './CameraController'
import HormoneWorld from './HormoneWorld'
import { hormones, type Hormone } from '../data/lessons'

type HormoneId = Hormone['id']
type StoryStep = { at: number; copy: string }
type CameraMove = { at: number; target: CameraTarget; duration: number }
type SceneDefinition = {
  title: string
  subtitle: string
  focusLabel: string
  duration: number
  initialCamera: CameraTarget
  cameraDuration: number
  completedCamera: CameraTarget
  cameraMoves: CameraMove[]
  steps: StoryStep[]
}

const scenes: Record<HormoneId, SceneDefinition> = {
  auxin: {
    title: 'ยอดพืชโค้งเข้าหาแสง',
    subtitle: 'Phototropism · การตอบสนองต่อแสง',
    focusLabel: 'SHOOT TIP · PHOTOTROPISM',
    duration: 7400,
    initialCamera: 'SHOOT_TIP',
    cameraDuration: 1450,
    completedCamera: 'AUXIN_RESULT',
    cameraMoves: [{ at: 5600, target: 'AUXIN_RESULT', duration: 1150 }],
    steps: [
      { at: 0, copy: 'เริ่มจากพืชทั้งต้น แล้วกล้องค่อย ๆ เคลื่อนเข้าใกล้ยอด' },
      { at: 950, copy: 'แสงค่อย ๆ ส่องมาจากด้านเดียวของยอด' },
      { at: 2050, copy: 'Auxin เคลื่อนไปสะสมมากขึ้นทางด้านที่ได้รับแสงน้อยกว่า' },
      { at: 3600, copy: 'เซลล์ด้านร่มค่อย ๆ ยืดตัวมากกว่าเซลล์ด้านรับแสง' },
      { at: 5250, copy: 'การยืดตัวที่ไม่เท่ากันทำให้ยอดค่อย ๆ โค้งเข้าหาแสง' },
      { at: 6800, copy: 'Phototropism · ยอดพืชโค้งเข้าหาแสง' },
    ],
  },
  ethylene: {
    title: 'ผลไม้ค่อย ๆ สุก',
    subtitle: 'Ethylene · การควบคุมกระบวนการสุก',
    focusLabel: 'FRUIT · RIPENING',
    duration: 7900,
    initialCamera: 'FRUIT',
    cameraDuration: 1450,
    completedCamera: 'FRUIT_INTERNAL',
    cameraMoves: [{ at: 4250, target: 'FRUIT_INTERNAL', duration: 1700 }],
    steps: [
      { at: 0, copy: 'กล้องเคลื่อนจากพืชทั้งต้นเข้าหาผลไม้' },
      { at: 1050, copy: 'เอทิลีนเป็นฮอร์โมนก๊าซที่ควบคุมกระบวนการสุกหลายด้าน' },
      { at: 2350, copy: 'ผลไม้ค่อย ๆ เปลี่ยนสีและเนื้อสัมผัสระหว่างการสุก' },
      { at: 4050, copy: 'กล้องเคลื่อนเข้าไปดูการเปลี่ยนแปลงภายในผล' },
      { at: 5700, copy: 'ในผลไม้บางชนิด เอนไซม์ช่วยย่อยแป้งเป็นน้ำตาลระหว่างการสุก' },
      { at: 7100, copy: 'เอทิลีนควบคุมกระบวนการสุก ซึ่งประกอบด้วยการเปลี่ยนแปลงหลายอย่าง' },
    ],
  },
  gibberellin: {
    title: 'ลำต้นยืดยาวขึ้น',
    subtitle: 'Gibberellin · การยืดตัวของลำต้น',
    focusLabel: 'STEM · INTERNODE GROWTH',
    duration: 7000,
    initialCamera: 'STEM',
    cameraDuration: 1250,
    completedCamera: 'SHOOT_RESULT',
    cameraMoves: [
      { at: 2650, target: 'STEM_FOLLOW', duration: 1750 },
      { at: 5650, target: 'SHOOT_RESULT', duration: 1050 },
    ],
    steps: [
      { at: 0, copy: 'กล้องตามลำต้นลงมาที่ช่วงปล้อง' },
      { at: 1250, copy: 'Gibberellin ส่งเสริมการยืดตัวของเซลล์ในลำต้น' },
      { at: 3000, copy: 'ช่วงปล้องค่อย ๆ ขยายและลำต้นยืดยาวขึ้น' },
      { at: 5200, copy: 'กล้องเลื่อนตามยอดที่เติบโตขึ้น' },
      { at: 6500, copy: 'การยืดตัวของเซลล์ช่วยให้ลำต้นเติบโตสูงขึ้น' },
    ],
  },
  cytokinin: {
    title: 'เซลล์แบ่งจำนวนเพิ่มขึ้น',
    subtitle: 'Cytokinin · การแบ่งเซลล์',
    focusLabel: 'SHOOT MERISTEM · CELL DIVISION',
    duration: 7000,
    initialCamera: 'SHOOT_TIP',
    cameraDuration: 1300,
    completedCamera: 'SHOOT_RESULT',
    cameraMoves: [{ at: 5150, target: 'SHOOT_RESULT', duration: 1200 }],
    steps: [
      { at: 0, copy: 'กล้องเคลื่อนเข้าไปยังเนื้อเยื่อเจริญที่ยอด' },
      { at: 1500, copy: 'เซลล์หนึ่งเซลล์เริ่มแบ่งตัว' },
      { at: 2850, copy: 'เซลล์ลูกแยกออกเป็นสองเซลล์' },
      { at: 4250, copy: 'เซลล์แบ่งต่อเป็นกลุ่มสี่เซลล์' },
      { at: 6050, copy: 'การแบ่งเซลล์ที่เนื้อเยื่อเจริญช่วยสร้างการเติบโตใหม่' },
    ],
  },
  aba: {
    title: 'พืชลดการสูญเสียน้ำ',
    subtitle: 'Abscisic acid · การตอบสนองต่อภาวะขาดน้ำ',
    focusLabel: 'LEAF → STOMATA · WATER STRESS',
    duration: 7400,
    initialCamera: 'LEAF',
    cameraDuration: 1250,
    completedCamera: 'STOMATA',
    cameraMoves: [{ at: 2750, target: 'STOMATA', duration: 1700 }],
    steps: [
      { at: 0, copy: 'กล้องเคลื่อนจากต้นพืชไปยังใบ' },
      { at: 1250, copy: 'สัญญาณภาวะขาดน้ำค่อย ๆ เพิ่มขึ้น' },
      { at: 2800, copy: 'กล้องเคลื่อนต่อไปยังปากใบบนผิวใบ' },
      { at: 4450, copy: 'ABA มีบทบาทในสัญญาณตอบสนองต่อความเครียดจากการขาดน้ำ' },
      { at: 6100, copy: 'ปากใบค่อย ๆ ปิด ช่วยลดการสูญเสียน้ำ' },
    ],
  },
}

const leftHormones: HormoneId[] = ['auxin', 'gibberellin']
const rightHormones: HormoneId[] = ['cytokinin', 'aba', 'ethylene']

export default function HormoneInfographic({ initialHormone }: { initialHormone?: HormoneId }) {
  const [activeHormone, setActiveHormone] = useState<HormoneId | null>(initialHormone ?? null)
  const [elapsed, setElapsed] = useState(0)
  const [exitProgress, setExitProgress] = useState(0)
  const [run, setRun] = useState(0)
  const [isReturning, setIsReturning] = useState(false)
  const [camera, setCamera] = useState<CameraPosition>(CAMERA_TARGETS.FULL_PLANT)
  const cameraRef = useRef<CameraController | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const controller = new CameraController(setCamera)
    cameraRef.current = controller
    return () => {
      controller.dispose()
      cameraRef.current = null
    }
  }, [])

  useEffect(() => {
    const controller = cameraRef.current
    if (isReturning && activeHormone) {
      const duration = 900
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        controller?.setPosition(CAMERA_TARGETS.FULL_PLANT)
        setActiveHormone(null)
        setIsReturning(false)
        setElapsed(0)
        setExitProgress(0)
        return
      }

      controller?.animateTo('FULL_PLANT', duration)
      const startedAt = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration)
        setExitProgress(progress)
        if (progress < 1) frameRef.current = requestAnimationFrame(tick)
        else {
          frameRef.current = null
          setActiveHormone(null)
          setIsReturning(false)
          setElapsed(0)
          setExitProgress(0)
        }
      }
      frameRef.current = requestAnimationFrame(tick)
      return () => {
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
        frameRef.current = null
        controller?.stop()
      }
    }

    if (!activeHormone) {
      setElapsed(0)
      setExitProgress(0)
      return
    }

    const scene = scenes[activeHormone]
    setElapsed(0)
    controller?.stop()
    const timers: number[] = []
    let lastUpdate = 0

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setElapsed(scene.duration)
      controller?.setPosition(CAMERA_TARGETS[scene.completedCamera])
      return () => controller?.stop()
    }

    controller?.animateTo(scene.initialCamera, scene.cameraDuration)
    scene.cameraMoves.forEach((move) => {
      timers.push(window.setTimeout(() => cameraRef.current?.animateTo(move.target, move.duration), move.at))
    })

    const startedAt = performance.now()
    const tick = (now: number) => {
      const nextElapsed = Math.min(scene.duration, now - startedAt)
      if (nextElapsed - lastUpdate >= 30 || nextElapsed >= scene.duration) {
        lastUpdate = nextElapsed
        setElapsed(nextElapsed)
      }
      if (nextElapsed < scene.duration) frameRef.current = requestAnimationFrame(tick)
      else frameRef.current = null
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
      timers.forEach(window.clearTimeout)
      controller?.stop()
    }
  }, [activeHormone, run, isReturning])

  function selectHormone(id: HormoneId) {
    setIsReturning(false)
    setExitProgress(0)
    setActiveHormone(id)
    setElapsed(0)
    setRun((value) => value + 1)
  }

  function backToPlant() {
    if (!activeHormone) return
    setIsReturning(true)
  }

  function replay() {
    setElapsed(0)
    setRun((value) => value + 1)
  }

  const scene = activeHormone ? scenes[activeHormone] : null
  const activeData = activeHormone ? hormones.find((hormone) => hormone.id === activeHormone) : null
  const stepIndex = scene ? scene.steps.reduce((current, step, index) => elapsed >= step.at ? index : current, 0) : 0
  const finished = Boolean(scene && elapsed >= scene.duration)
  const stepCount = scene?.steps.length ?? 0

  return <div className="page-wrap hormone-lab-page">
    <nav className="breadcrumb" aria-label="ตำแหน่งปัจจุบัน"><a href="#/">หน้าหลัก</a><span><i>›</i><strong>Plant Hormones</strong></span></nav>
    <header className="infographic-heading">
      <span className="infographic-kicker"><i/> INTERACTIVE BOTANICAL INFOGRAPHIC</span>
      <h1>สัญญาณเล็ก ๆ ที่ดูแล<br/><em>การเติบโตทั้งต้น</em></h1>
      <p>เลือกฮอร์โมน แล้วค่อย ๆ สำรวจพืชจากทั้งต้นไปยังจุดที่เกิดการเปลี่ยนแปลง</p>
    </header>

    <section className={`plant-map ${activeHormone ? `show-${activeHormone}` : ''}`} aria-label="แผนภาพฮอร์โมนพืชแบบโต้ตอบ">
      <div className="hormone-choices hormone-choices-left">
        {leftHormones.map((id) => <HormoneButton key={id} id={id} active={activeHormone === id} onSelect={selectHormone}/>)}
      </div>
      <div className="plant-visual">
        <span className="plant-visual-note">BOTANICAL FIELD · ONE CONTINUOUS WORLD</span>
        <HormoneWorld hormone={activeHormone} elapsed={elapsed} camera={camera} exitProgress={exitProgress}/>
      </div>
      <div className="hormone-choices hormone-choices-right">
        {rightHormones.map((id) => <HormoneButton key={id} id={id} active={activeHormone === id} onSelect={selectHormone}/>)}
      </div>
      <div className="diagram-caption"><span>{scene?.focusLabel ?? 'พืชทั้งต้น · รากถึงยอด'}</span><span>{scene ? `กำลังสำรวจ · ${Math.min(stepIndex + 1, stepCount)} / ${stepCount}` : 'เลือกฮอร์โมนเพื่อเริ่มสำรวจ'}</span></div>
    </section>

    <section className={`hormone-explanation ${activeHormone ? 'is-active' : ''}`} aria-live="polite" aria-atomic="true">
      {scene && activeData ? <>
        <div className={`explanation-symbol tone-${activeData.color}`} aria-hidden="true">{activeData.symbol}</div>
        <div className="explanation-copy">
          <span className="explanation-step">{finished ? 'สรุปการทำงาน' : `ขั้นที่ ${stepIndex + 1} จาก ${stepCount}`}</span>
          <h2>{scene.title}</h2>
          <p>{scene.steps[stepIndex]?.copy}</p>
          <small>{scene.subtitle}</small>
        </div>
        <div className="explanation-actions">
          <button type="button" className="button button-secondary" onClick={replay}>เล่นซ้ำ <span>↻</span></button>
          <button type="button" className="back-to-plant" onClick={backToPlant}>← กลับไปที่ต้นพืช</button>
        </div>
      </> : <div className="empty-explanation"><span aria-hidden="true">✳</span><p>แตะชื่อฮอร์โมนหนึ่งตัวเพื่อดูหน้าที่และการเปลี่ยนแปลงที่เกิดขึ้น</p></div>}
    </section>
    <p className="infographic-footnote">ภาพแสดงแบบจำลองการทำงานอย่างย่อ ฮอร์โมนพืชทำงานร่วมกับสัญญาณอื่นตามเนื้อเยื่อและสภาพแวดล้อม</p>
  </div>
}

function HormoneButton({ id, active, onSelect }: { id: HormoneId; active: boolean; onSelect: (id: HormoneId) => void }) {
  const hormone = hormones.find((item) => item.id === id)!
  return <button type="button" className={`hormone-control tone-${hormone.color} ${active ? 'is-selected' : ''}`} aria-pressed={active} onClick={() => onSelect(id)}>
    <span className="hormone-control-symbol">{hormone.symbol}</span>
    <span className="hormone-control-copy"><strong>{hormone.name}</strong><small>{hormone.thai}</small><em>{hormone.short}</em></span>
    <span className="hormone-control-arrow" aria-hidden="true">{active ? '●' : '↗'}</span>
  </button>
}
