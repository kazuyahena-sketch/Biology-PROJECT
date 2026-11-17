import type { CSSProperties } from 'react'
import type { CameraPosition } from './CameraController'
import type { Hormone } from '../data/lessons'

type HormoneId = Hormone['id']
type Props = { hormone: HormoneId | null; elapsed: number; camera: CameraPosition; exitProgress: number }

const clamp = (value: number) => Math.max(0, Math.min(1, value))
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount

function colorMix(first: string, second: string, amount: number) {
  const toRgb = (hex: string) => hex.match(/[a-f\d]{2}/gi)!.map((part) => parseInt(part, 16))
  const a = toRgb(first)
  const b = toRgb(second)
  return `rgb(${a.map((value, index) => Math.round(lerp(value, b[index], amount))).join(' ')})`
}

function cameraTransform(camera: CameraPosition, parallax = 1) {
  const scale = camera.scale * parallax
  return `translate(350 450) scale(${scale}) translate(${-camera.x} ${-camera.y})`
}

const leafForms = [
  'M0 0 C20 -26 74 -51 132 -28 C123 1 76 35 24 17 C13 13 5 7 0 0Z',
  'M0 0 C30 -33 86 -46 142 -12 C128 20 82 41 30 17 C16 11 6 5 0 0Z',
  'M0 0 C27 -25 73 -61 124 -34 C119 -2 80 33 31 20 C15 15 5 7 0 0Z',
  'M0 0 C23 -31 88 -43 137 -21 C119 11 74 39 27 18 C14 12 5 6 0 0Z',
]

function Leaf({ x, y, angle, size, variant = 0, delay = 0, stressed = 0 }: { x: number; y: number; angle: number; size: number; variant?: number; delay?: number; stressed?: number }) {
  const path = leafForms[variant % leafForms.length]
  return <g transform={`translate(${x} ${y})`} className="leaf-anchor" style={{ '--leaf-delay': `${delay}s`, '--leaf-stress': stressed } as CSSProperties}>
    <g transform={`rotate(${angle}) scale(${size})`}>
      <g className="leaf-sway">
        <path d={path} fill={colorMix('#83a66d', '#87946c', stressed)} stroke="#607d54" strokeWidth=".9" strokeOpacity=".58"/>
        <path d="M5 3 C41 -5 81 -23 128 -27" fill="none" stroke="#d5dfb9" strokeWidth="1.5" strokeOpacity=".66"/>
        <path d="M34 -2 30 -14 M52 -8 50 -21 M72 -14 69 -28 M43 0 37 10 M68 -8 62 8 M92 -18 86 -3" fill="none" stroke="#d5dfb9" strokeWidth=".75" strokeOpacity=".4"/>
        <path d={path} fill="url(#leafGrain)" opacity=".19"/>
      </g>
    </g>
  </g>
}

export default function HormoneWorld({ hormone, elapsed, camera, exitProgress }: Props) {
  const returnMix = 1 - clamp(exitProgress)
  const auxin = hormone === 'auxin'
  const gibberellin = hormone === 'gibberellin'
  const cytokinin = hormone === 'cytokinin'
  const aba = hormone === 'aba'
  const ethylene = hormone === 'ethylene'

  const light = auxin ? clamp((elapsed - 350) / 1250) * returnMix : 0
  const auxinFlow = auxin ? clamp((elapsed - 1100) / 1850) * returnMix : 0
  const cellGrowth = auxin ? clamp((elapsed - 2950) / 1900) * returnMix : 0
  const shootBend = auxin ? clamp((elapsed - 4300) / 1750) * returnMix : 0
  const auxinPullback = auxin ? clamp((elapsed - 5600) / 1000) * returnMix : 0

  const stemGrowth = gibberellin ? clamp((elapsed - 1450) / 3650) * returnMix : 0
  const cellDivision = cytokinin ? clamp((elapsed - 1500) / 3600) * returnMix : 0
  const splitTwo = clamp((cellDivision - .28) / .31)
  const splitFour = clamp((cellDivision - .66) / .28)
  const meristemFocus = cytokinin ? clamp((elapsed - 900) / 650) * (1 - .28 * clamp((elapsed - 5200) / 1000)) * returnMix : 0

  const waterStress = aba ? clamp((elapsed - 1750) / 3650) * returnMix : 0
  const stomataFocus = aba ? clamp((elapsed - 2900) / 1050) * returnMix : 0
  const waterDropOpacity = aba ? (1 - clamp((elapsed - 2200) / 2400)) * returnMix : 0

  const ripening = ethylene ? clamp((elapsed - 1200) / 3300) * returnMix : 0
  const insideFruit = ethylene ? clamp((elapsed - 4300) / 1700) * returnMix : 0
  const sugarProgress = ethylene ? clamp((elapsed - 5000) / 1900) * returnMix : 0
  const fruitColor = ripening < .48
    ? colorMix('#6f984f', '#c3ae51', ripening / .48)
    : colorMix('#c3ae51', '#d9834f', (ripening - .48) / .52)

  const upperPlantGrowth = gibberellin ? `translate(0 640) scale(1 ${1 + .2 * stemGrowth}) translate(0 -640)` : undefined
  const shootPath = `M350 630 C330 555 374 494 351 420 C336 350 ${lerp(370, 424, shootBend)} ${lerp(264, 302, shootBend)} ${lerp(350, 255, shootBend)} ${lerp(174, 158, shootBend)}`

  const targetMatrix = cameraTransform(camera)
  const backgroundMatrix = cameraTransform(camera, .94)
  const foregroundMatrix = cameraTransform(camera, 1.025)

  const particles = Array.from({ length: 18 }, (_, index) => {
    const seed = (index * 37 + 11) % 101 / 101
    const startX = 329 + seed * 37
    const endX = 370 + seed * 23
    const y = 183 + ((index * 43) % 139)
    const cx = lerp(startX, endX, auxinFlow)
    const cy = y + Math.sin((elapsed / 850) + index) * 3.5 * auxinFlow
    const radius = 2.4 + (index % 4) * .48
    const opacity = auxin ? Math.max(0, clamp((elapsed - 820) / 900) * (.52 + seed * .42)) : 0
    return { cx, cy, radius, opacity }
  })

  const normalCellHeight = 28 + cellGrowth * 54
  const shadedCellHeight = 28 + cellGrowth * 105
  const divisionCenter = { x: 350, y: 180 }
  const divisionPairSpread = splitTwo * 19
  const fourCellSpread = splitFour * 17
  const innerStomaGap = lerp(22, 2.8, waterStress)

  return <svg className={`botanical-world ${hormone ? 'world-is-active' : 'world-is-idle'}`} viewBox="0 0 700 900" role="img" aria-label="ภาพวาดพฤกษศาสตร์ของพืชทั้งต้น พร้อมราก ลำต้น ใบ ยอด และผล" preserveAspectRatio="xMidYMid meet">
    <defs>
      <radialGradient id="worldGlow"><stop stopColor="#dfe9d5" stopOpacity=".7"/><stop offset="1" stopColor="#f8f8f1" stopOpacity="0"/></radialGradient>
      <linearGradient id="leafTone" x1=".15" y1=".1" x2=".9" y2="1"><stop stopColor="#a7bf81"/><stop offset=".44" stopColor="#7f9e68"/><stop offset="1" stopColor="#56774f"/></linearGradient>
      <pattern id="leafGrain" width="19" height="17" patternUnits="userSpaceOnUse"><path d="M3 2q4 3 1 6m12 3q-2 3-5 2" fill="none" stroke="#f2f0cf" strokeWidth=".7" strokeOpacity=".35"/></pattern>
      <linearGradient id="stemTone" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#526e46"/><stop offset=".45" stopColor="#8ba26a"/><stop offset=".72" stopColor="#6e8a55"/><stop offset="1" stopColor="#506b46"/></linearGradient>
      <linearGradient id="rootTone" x1="0" x2="1"><stop stopColor="#a27c51"/><stop offset="1" stopColor="#cfb38a"/></linearGradient>
      <radialGradient id="fruitSkin" cx=".36" cy=".24" r=".76"><stop stopColor="#f2d58b"/><stop offset=".15" stopColor={fruitColor}/><stop offset=".75" stopColor={fruitColor}/><stop offset="1" stopColor="#9e6147" stopOpacity=".88"/></radialGradient>
      <radialGradient id="fleshTone"><stop stopColor="#fff0ce"/><stop offset=".58" stopColor="#f0c995"/><stop offset="1" stopColor="#d99a6c"/></radialGradient>
      <filter id="softLeafShadow" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="2"/><feOffset dy="3"/><feComponentTransfer><feFuncA type="linear" slope=".14"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <filter id="moleculeGlow" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    <g className="world-atmosphere" transform={backgroundMatrix}>
      <ellipse cx="350" cy="415" rx="330" ry="420" fill="url(#worldGlow)"/>
      <ellipse className="ambient-light" cx="280" cy="250" rx="155" ry="190" fill="#f4e8bd" opacity={light * .18 + (aba ? waterStress * .1 : 0)}/>
      <path d="M65 651Q350 620 635 651" fill="none" stroke="#d9ddcb" strokeWidth="2" strokeOpacity=".45"/>
      <path d="M83 658q50-11 89 0t79 0m105 1q55-13 103 0t84-2" fill="none" stroke="#c8cdb8" strokeWidth="1" strokeOpacity=".34"/>
    </g>

    <g className="camera-world" transform={targetMatrix}>
      <g className="botanical-plant" opacity={1 - auxinPullback * .12}>
        <g className="rear-foliage" opacity=".62" filter="url(#softLeafShadow)">
          <Leaf x={278} y={322} angle={202} size={.82} variant={2} delay={1.8}/>
          <Leaf x={407} y={292} angle={-18} size={.83} variant={1} delay={2.7}/>
          <Leaf x={256} y={472} angle={192} size={.76} variant={3} delay={4.2}/>
        </g>

        <g className="root-system" fill="none" stroke="url(#rootTone)" strokeLinecap="round">
          <path d="M350 628 C346 681 355 716 337 760 C322 798 314 821 319 851" strokeWidth="8"/>
          <path d="M351 650 C369 699 404 716 411 760 C418 797 438 819 460 838" strokeWidth="6"/>
          <path d="M344 672 C315 700 280 712 260 754 C244 787 220 802 197 815" strokeWidth="5"/>
          <path d="M359 687 C390 711 448 720 472 757 C492 787 515 797 546 805" strokeWidth="4.5"/>
          <path d="M331 709 C306 747 308 775 291 800 M395 708 C389 748 403 774 422 797 M277 731 C248 739 224 757 211 780 M453 733 C487 739 505 753 522 774 M343 739 C344 785 359 809 359 845 M375 735 C401 769 397 802 390 829" strokeWidth="3"/>
          <path d="M322 748q-28 18-42 42m-33-8q-21 4-36 19m104-7q-14 22-15 40m105-80q30 12 42 34m20-19q23 8 34 24m-70 27q14 19 31 31m-194-97q-6 24-20 39m258-84q6 20 25 34" strokeWidth="1.6" opacity=".75"/>
          <path d="M338 733q-18 13-20 29m76 4q-2 22 13 37m-149-69q-15 9-23 21m275-21q12 9 17 21" strokeWidth="1" opacity=".65"/>
        </g>

        <g className="soil-rim"><path d="M131 638Q350 620 568 640" fill="none" stroke="#ad9870" strokeWidth="3" strokeLinecap="round"/><path d="M150 645q31 10 57 2m215 0q28 10 53-1" fill="none" stroke="#cfbea0" strokeWidth="1.5"/></g>

        <g className="growing-shoot" transform={upperPlantGrowth}>
          <path className="main-stem" d={shootPath} fill="none" stroke="url(#stemTone)" strokeWidth="17" strokeLinecap="round"/>
          <path d={shootPath} fill="none" stroke="#c1c794" strokeWidth="3" strokeOpacity=".34" strokeLinecap="round"/>
          <path d="M351 506 C312 485 277 461 224 414 C204 397 185 382 163 367 M351 462 C401 440 444 408 492 370 M351 388 C311 361 285 331 244 294 M354 347 C397 322 432 285 475 261 M351 276 C319 251 296 223 267 203 M353 255 C383 230 406 204 427 183" fill="none" stroke="url(#stemTone)" strokeWidth="9" strokeLinecap="round"/>
          <path d="M351 506 C312 485 277 461 224 414 M351 462 C401 440 444 408 492 370 M351 388 C311 361 285 331 244 294 M354 347 C397 322 432 285 475 261 M351 276 C319 251 296 223 267 203 M353 255 C383 230 406 204 427 183" fill="none" stroke="#c4cc9a" strokeWidth="2" strokeOpacity=".42" strokeLinecap="round"/>

          <Leaf x={167} y={371} angle={187} size={1.03} variant={0} delay={.2}/>
          <Leaf x={245} y={434} angle={202} size={.82} variant={3} delay={1.2}/>
          <Leaf x={478} y={379} angle={-24} size={1.06} variant={1} delay={2.2}/>
          <Leaf x={247} y={296} angle={198} size={.91} variant={2} delay={3.1}/>
          <Leaf x={461} y={274} angle={-17} size={.88} variant={0} delay={4}/>
          <Leaf x={272} y={211} angle={199} size={.8} variant={1} delay={5}/>
          <Leaf x={418} y={191} angle={-30} size={.77} variant={3} delay={.7}/>
          <g className="shoot-tip" transform={`translate(${-95 * shootBend} ${-15 * shootBend})`}>
            <Leaf x={352} y={182} angle={-70} size={.71} variant={2} delay={1.5}/>
            <Leaf x={352} y={181} angle={204} size={.69} variant={3} delay={2.4}/>
            <path d="M350 192q-11-13-4-26 8-12 17-1 7 10-3 24" fill="#88a76a" stroke="#59784e" strokeWidth="1.4"/>
          </g>
        </g>

        <g className="near-foliage" transform={foregroundMatrix} opacity=".46">
          <Leaf x={187} y={510} angle={190} size={.73} variant={1} delay={2.8}/>
          <Leaf x={502} y={450} angle={-14} size={.71} variant={0} delay={3.7}/>
        </g>

        <g className="fruit-branch" transform={upperPlantGrowth}>
          <path d="M489 371q23-13 38-30" fill="none" stroke="#647d4b" strokeWidth="7" strokeLinecap="round"/>
          <g className="fruit-exterior" transform={`translate(540 352) scale(${1 + .045 * ripening}) translate(-540 -352)`} opacity={1 - insideFruit}>
            <path d="M542 302 C524 282 505 288 503 304 C472 301 459 323 466 357 C472 389 492 414 523 412 C531 411 537 407 543 403 C550 408 557 412 565 411 C594 407 610 382 610 350 C611 318 588 300 558 305 C553 303 548 301 542 302Z" fill="url(#fruitSkin)" stroke="#967751" strokeWidth="2.5"/>
            <path d="M542 303q-4-20 5-34 6-7 11-2" fill="none" stroke="#685339" strokeWidth="7" strokeLinecap="round"/>
            <path d="M552 269q21-18 43-5-12 22-39 18" fill="#78945e" stroke="#687e51" strokeWidth="1.5"/>
            <path d="M484 330q-8 20 2 41m99-41q8 16 3 32" fill="none" stroke="#fff0c6" strokeWidth="5" strokeLinecap="round" strokeOpacity=".25"/>
            <g fill="#7c6949" opacity={.16 + ripening * .28}>
              <ellipse cx="493" cy="351" rx="2.7" ry="1.4"/><ellipse cx="511" cy="377" rx="1.8" ry="1.3"/><ellipse cx="573" cy="330" rx="2.2" ry="1.3"/><ellipse cx="582" cy="373" rx="2.8" ry="1.5"/><ellipse cx="533" cy="390" rx="1.8" ry="1.2"/><ellipse cx="555" cy="344" rx="2" ry="1.3"/>
            </g>
          </g>

          <g className="fruit-interior" transform={`translate(540 352) scale(${1 + .035 * sugarProgress}) translate(-540 -352)`} opacity={insideFruit}>
            <path d="M542 300 C520 282 496 291 489 316 C463 319 461 354 474 378 C484 404 514 415 540 400 C568 417 595 397 601 370 C612 340 594 312 571 311 C564 302 552 298 542 300Z" fill="url(#fleshTone)" stroke="#d9a47c" strokeWidth="4"/>
            <path d="M541 312q-7 22 1 37t-1 42m-45-74q18 19 17 37t-10 29m69-64q-18 21-15 38t13 24" fill="none" stroke="#d89c76" strokeWidth="3" strokeOpacity=".55"/>
            <g className="starch-chain" opacity={1 - sugarProgress}>
              <path d="M501 355l20-15 22 13 22-14 20 16" fill="none" stroke="#8c9b68" strokeWidth="3" strokeDasharray="4 3"/>
              <circle cx="501" cy="355" r="8" fill="#f6e9bf" stroke="#829362" strokeWidth="2"/><circle cx="521" cy="340" r="8" fill="#f6e9bf" stroke="#829362" strokeWidth="2"/><circle cx="543" cy="353" r="8" fill="#f6e9bf" stroke="#829362" strokeWidth="2"/><circle cx="565" cy="339" r="8" fill="#f6e9bf" stroke="#829362" strokeWidth="2"/><circle cx="585" cy="355" r="8" fill="#f6e9bf" stroke="#829362" strokeWidth="2"/>
              <text x="543" y="382" textAnchor="middle" className="world-label">แป้ง</text>
            </g>
            <g className="simple-sugars" opacity={sugarProgress} filter="url(#moleculeGlow)">
              <circle cx="510" cy="345" r="11" fill="#f8e1a5" stroke="#c28d48" strokeWidth="2"/><circle cx="535" cy="361" r="11" fill="#ffe9ad" stroke="#c28d48" strokeWidth="2"/><circle cx="564" cy="342" r="11" fill="#f8e1a5" stroke="#c28d48" strokeWidth="2"/><circle cx="579" cy="370" r="9" fill="#ffedbd" stroke="#c28d48" strokeWidth="2"/>
              <text x="543" y="382" textAnchor="middle" className="world-label">เอนไซม์ช่วยย่อย</text><text x="543" y="402" textAnchor="middle" className="world-label">น้ำตาลอย่างง่าย</text>
            </g>
            <path d="M539 341v17" stroke="#ad8751" strokeWidth="2" opacity={sugarProgress}/><path d="m534 354 5 6 5-6" fill="none" stroke="#ad8751" strokeWidth="2" opacity={sugarProgress}/>
          </g>
        </g>
      </g>

      <g className="auxin-light-world" opacity={light}>
        <path d="M88 105 310 157 306 186 88 144Z" fill="#f1d684" opacity=".16"/>
        <path d="M65 118 318 167M89 94 321 152M81 151 319 185" fill="none" stroke="#d7ae55" strokeWidth="3" strokeLinecap="round" strokeOpacity=".65"/>
        <circle cx="79" cy="125" r="29" fill="#f2d275" fillOpacity=".2"/><circle cx="79" cy="125" r="14" fill="#efcd70" fillOpacity=".85"/>
      </g>

      <g className="auxin-particles" filter="url(#moleculeGlow)">
        {particles.map((particle, index) => <circle key={index} cx={particle.cx} cy={particle.cy} r={particle.radius} fill={index % 3 === 0 ? '#e7bd62' : '#c9a65c'} opacity={particle.opacity}/>) }
      </g>
      <g className="auxin-cell-view" opacity={auxin ? clamp((elapsed - 2350) / 700) * (1 - .38 * auxinPullback) : 0}>
        <rect x="296" y="212" width="43" height={normalCellHeight} rx="18" fill="#f4f6e9" stroke="#b7c7a8" strokeWidth="2"/>
        <rect x="304" y={217 - normalCellHeight * .38} width="26" height={normalCellHeight * .38} rx="12" fill="#e4edda" opacity=".9"/>
        <rect x="371" y={240 - shadedCellHeight} width="43" height={shadedCellHeight} rx="20" fill="#eef3de" stroke="#a8bc8d" strokeWidth="2"/>
        <rect x="380" y={246 - shadedCellHeight * .4} width="25" height={shadedCellHeight * .4} rx="12" fill="#dce8ce" opacity=".94"/>
        <text x="316" y="310" textAnchor="middle" className="world-label">รับแสง</text><text x="393" y="310" textAnchor="middle" className="world-label">ด้านร่ม</text>
      </g>
      <text className="world-label auxin-shaded-label" x="395" y="152" textAnchor="middle" opacity={auxinFlow * (1 - auxinPullback * .45)}>ด้านร่ม · Auxin มากขึ้น</text>

      <g className="growth-indicator" opacity={stemGrowth}>
        <path d={`M423 520v-${62 + stemGrowth * 74}`} fill="none" stroke="#99a66d" strokeWidth="2" strokeDasharray="5 5"/>
        <path d={`m418 ${462 - stemGrowth * 74} 5-7 5 7`} fill="none" stroke="#99a66d" strokeWidth="2"/>
        <text x="438" y={478 - stemGrowth * 38} className="world-label">เซลล์ยืดตัว</text>
      </g>

      <g className="meristem-division" opacity={meristemFocus}>
        <circle cx={divisionCenter.x} cy={divisionCenter.y} r="53" fill="#f6f7ed" fillOpacity=".9" stroke="#a8bd94" strokeWidth="2"/>
        <circle cx={divisionCenter.x} cy={divisionCenter.y} r="22" fill="#dce8d1" stroke="#709064" strokeWidth="2.3" opacity={1 - splitTwo}/>
        <circle cx={divisionCenter.x - divisionPairSpread} cy={divisionCenter.y} r={17 - splitFour * 4} fill="#e3ecd9" stroke="#74966e" strokeWidth="2" opacity={splitTwo * (1 - splitFour * .38)}/>
        <circle cx={divisionCenter.x + divisionPairSpread} cy={divisionCenter.y} r={17 - splitFour * 4} fill="#e3ecd9" stroke="#74966e" strokeWidth="2" opacity={splitTwo * (1 - splitFour * .38)}/>
        <circle cx={divisionCenter.x - fourCellSpread} cy={divisionCenter.y - fourCellSpread} r="12" fill="#e3ecd9" stroke="#74966e" strokeWidth="1.7" opacity={splitFour}/>
        <circle cx={divisionCenter.x + fourCellSpread} cy={divisionCenter.y - fourCellSpread} r="12" fill="#e3ecd9" stroke="#74966e" strokeWidth="1.7" opacity={splitFour}/>
        <circle cx={divisionCenter.x - fourCellSpread} cy={divisionCenter.y + fourCellSpread} r="12" fill="#e3ecd9" stroke="#74966e" strokeWidth="1.7" opacity={splitFour}/>
        <circle cx={divisionCenter.x + fourCellSpread} cy={divisionCenter.y + fourCellSpread} r="12" fill="#e3ecd9" stroke="#74966e" strokeWidth="1.7" opacity={splitFour}/>
        <text x="350" y="247" className="world-label" textAnchor="middle">เนื้อเยื่อเจริญที่ยอด</text>
      </g>

      <g className="water-stress-glow" opacity={waterStress * .55}>
        <ellipse cx="186" cy="414" rx="104" ry="72" fill="#e6d7aa" fillOpacity=".18"/>
        <path d="M109 445q22 11 45 2" fill="none" stroke="#bd9c62" strokeWidth="2" strokeDasharray="4 5"/>
      </g>
      <g className="water-drops" opacity={waterDropOpacity} fill="#86b6c1" stroke="#eff7f4" strokeWidth="1.5">
        <path d="M168 366q-11 16 0 22 12-6 0-22Z"/><path d="M207 392q-9 13 0 19 11-5 0-19Z"/><path d="M144 418q-9 13 0 18 10-6 0-18Z"/>
      </g>
      <g className="stomata-world" opacity={aba ? clamp((elapsed - 1450) / 850) : 0}>
        <circle cx="183" cy="420" r={lerp(17, 31, stomataFocus)} fill="#f4f5e8" fillOpacity=".94" stroke="#78936d" strokeWidth="2"/>
        <ellipse cx={183 - innerStomaGap / 2 - 7} cy="420" rx="9" ry="17" fill="#739a6f" stroke="#587a58" strokeWidth="1.5" transform={`rotate(-17 ${183 - innerStomaGap / 2 - 7} 420)`}/>
        <ellipse cx={183 + innerStomaGap / 2 + 7} cy="420" rx="9" ry="17" fill="#739a6f" stroke="#587a58" strokeWidth="1.5" transform={`rotate(17 ${183 + innerStomaGap / 2 + 7} 420)`}/>
        <path d={`M${183 - innerStomaGap / 2} 413q${innerStomaGap / 2} 7 ${innerStomaGap} 0v14q-${innerStomaGap / 2} -6 -${innerStomaGap} 0z`} fill="#344d41" opacity=".82"/>
        <text x="183" y="466" className="world-label" textAnchor="middle" opacity={stomataFocus}>ปากใบ · ค่อย ๆ ปิด</text>
      </g>
    </g>
  </svg>
}
