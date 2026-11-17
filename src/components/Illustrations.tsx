type PlantArtProps = { bent?: boolean; compact?: boolean; glowing?: boolean; showSun?: boolean }

export function PlantArt({ bent = false, compact = false, glowing = false, showSun = true }: PlantArtProps) {
  return (
    <svg className={`plant-art ${compact ? 'plant-art-compact' : ''} ${glowing ? 'plant-art-glowing' : ''}`} viewBox="0 0 480 480" role="img" aria-label="ภาพประกอบต้นอ่อนในกระถาง มีใบและราก">
      <defs>
        <linearGradient id="leaf" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#c2db9e"/><stop offset="1" stopColor="#4e9d6d"/></linearGradient>
        <linearGradient id="leafDeep" x1="0" x2="1"><stop stopColor="#70be84"/><stop offset="1" stopColor="#21634d"/></linearGradient>
        <linearGradient id="pot" x1="0" x2="1"><stop stopColor="#bb7757"/><stop offset="1" stopColor="#744836"/></linearGradient>
        <radialGradient id="halo"><stop stopColor="#8ddba0" stopOpacity=".24"/><stop offset="1" stopColor="#8ddba0" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="244" cy="233" rx="190" ry="186" fill="url(#halo)" />
      {showSun && <><circle cx="363" cy="81" r="32" fill="#ebd5a1" opacity=".16" /><circle cx="363" cy="81" r="18" fill="#efd69b" opacity=".76" /><path d="M363 39v-14M405 81h14M393 51l10-10M333 51l-10-10" stroke="#efd69b" strokeWidth="2" opacity=".4" /></>}
      <path d={bent ? 'M239 343C237 294 245 253 240 201C239 176 216 151 178 130' : 'M239 343C237 294 245 253 240 201C238 169 239 142 246 113'} fill="none" stroke="#8bc28a" strokeWidth="12" strokeLinecap="round" />
      <path d="M243 340C247 370 233 385 227 403M243 341C259 365 260 386 266 402M238 350C219 367 214 381 211 394" fill="none" stroke="#c7ac7a" strokeWidth="4" strokeLinecap="round" opacity=".62" />
      <path d={`M240 235C212 225 197 210 180 192M242 274C270 261 290 242 304 222${bent ? 'M228 190C253 182 278 164 291 145' : 'M241 189C263 177 282 162 291 145'}`} fill="none" stroke="#6caa79" strokeWidth="5" strokeLinecap="round" />
      <path d="M191 205C133 218 107 186 118 152C156 149 189 169 200 197C199 201 196 204 191 205Z" fill="url(#leaf)" />
      <path d="M289 237C336 251 366 225 359 188C326 180 293 198 280 226C281 231 284 235 289 237Z" fill="url(#leafDeep)" />
      <path d="M287 161C310 120 343 121 360 139C351 174 325 189 292 175C288 171 286 166 287 161Z" fill="url(#leaf)" />
      <path d="M236 151C204 127 207 97 232 80C265 96 273 124 247 151C243 153 239 153 236 151Z" fill="url(#leafDeep)" transform={bent ? 'translate(-58 22)' : undefined} />
      <path d="M127 162C153 169 173 182 192 199M351 197C326 203 305 218 287 231M350 145C328 149 309 160 291 173M235 91C239 108 242 127 243 146" fill="none" stroke="#d3e2b1" strokeWidth="2" opacity=".62" />
      <path d="M174 328L192 424Q239 447 288 424L307 328Z" fill="url(#pot)" />
      <ellipse cx="240" cy="329" rx="68" ry="16" fill="#d3ba8c" />
      <path d="M178 330Q240 349 302 330" fill="none" stroke="#e0c297" strokeWidth="3" opacity=".6" />
      <path d="M203 392Q240 405 277 392" fill="none" stroke="#d4956c" strokeWidth="3" opacity=".4" />
      <g fill="#d6c17f" opacity=".6"><circle cx="143" cy="260" r="3"/><circle cx="330" cy="291" r="2.5"/><circle cx="159" cy="121" r="2"/><circle cx="326" cy="108" r="3"/></g>
      {bent && <path className="light-rays" d="M41 128h98M48 145h81M40 111h83" stroke="#f1cb78" strokeWidth="3" strokeLinecap="round" />}
    </svg>
  )
}

export function LabIllustration() {
  return (
    <svg className="lab-art" viewBox="0 0 660 520" role="img" aria-label="ห้องทดลองพฤกษศาสตร์ มีต้นอ่อน กล้องจุลทรรศน์ และหนังสือ">
      <defs>
        <linearGradient id="window" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ccddb5" stopOpacity=".62"/><stop offset="1" stopColor="#84b390" stopOpacity=".1"/></linearGradient>
        <linearGradient id="bench" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9f7352"/><stop offset="1" stopColor="#604532"/></linearGradient>
        <radialGradient id="roomGlow"><stop stopColor="#9ac99b" stopOpacity=".22"/><stop offset="1" stopColor="#9ac99b" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="342" cy="252" rx="245" ry="221" fill="url(#roomGlow)" />
      <path d="M155 40h356v252H155z" rx="18" fill="url(#window)" stroke="#d0e1ba" strokeOpacity=".32" strokeWidth="5" />
      <path d="M329 42v248M158 169h350" stroke="#d5e3c2" strokeOpacity=".34" strokeWidth="3" />
      <path d="M167 270C226 208 253 233 296 184C328 146 375 180 403 139C432 96 473 125 503 76" fill="none" stroke="#9dbe91" strokeOpacity=".26" strokeWidth="10" />
      <path d="M147 306H558V337H147z" fill="#3c4b3c" opacity=".52" />
      <path d="M62 344H608V376H62z" fill="url(#bench)" />
      <path d="M96 376h490l-17 104H112z" fill="#544132" />
      <path d="M111 389h463" stroke="#d0a077" strokeOpacity=".2" strokeWidth="4" />
      <ellipse cx="343" cy="351" rx="145" ry="18" fill="#1b2e24" opacity=".6" />
      <path d="M350 346V221" stroke="#85bd7f" strokeWidth="8" strokeLinecap="round" />
      <path d="M349 274c-31-3-49-18-48-42 24-6 46 7 54 33M351 244c30-15 39-35 29-53-21 5-35 24-33 46M348 305c-27-1-38-14-35-32 19-4 34 6 41 24" fill="#81b887" />
      <path d="M313 338h76l-8 34h-60z" fill="#8b6850" /><ellipse cx="351" cy="338" rx="38" ry="9" fill="#cbb88e" />
      <g transform="translate(174 250)">
        <path d="M62 19h74c15 0 25 8 27 21l4 21H83l-2-12H57z" fill="#bbd0bb" />
        <path d="M91 58c0 51-22 62-48 62v-15c22 0 31-12 31-47" fill="none" stroke="#a8c4ad" strokeWidth="11" strokeLinecap="round" />
        <path d="M82 49h83v12H82zM113 15V0h50v15" fill="none" stroke="#d6e2c9" strokeWidth="8" strokeLinecap="round" />
        <path d="M137 12v25" stroke="#d6e2c9" strokeWidth="7" />
        <path d="M159 47l17-17" stroke="#e3cf94" strokeWidth="4" />
        <circle cx="116" cy="41" r="10" fill="#385c4b" stroke="#d6e2c9" strokeWidth="5" />
      </g>
      <g transform="translate(459 276)">
        <path d="M0 0q31-10 60 5v49q-29-14-60-4z" fill="#7b5948" />
        <path d="M60 5q29-15 59-5v50q-30-10-59 4z" fill="#a47558" />
        <path d="M58 4v52M9 11q20-4 39 4M70 14q22-9 41-6" fill="none" stroke="#dcc9a0" strokeOpacity=".7" strokeWidth="2" />
      </g>
      <path d="M76 327q-10-27 2-51 9 15 8 28 4-26 20-39-1 31-11 49 15-21 34-22-13 27-36 38z" fill="#4b7657" />
      <path d="M82 330h43q-1 18-21 18t-22-18" fill="#9e6a51" />
      <g stroke="#d1b876" strokeWidth="2" opacity=".7"><path d="m476 145 13 0m-7-6v13"/><path d="m115 122 10 0m-5-5v10"/><path d="m554 223 9 0m-4-5v10"/></g>
      <circle cx="481" cy="120" r="5" fill="#dfcd91" opacity=".8" /><circle cx="128" cy="97" r="3" fill="#dfcd91" opacity=".8" />
    </svg>
  )
}

export function FruitArt({ ripe = false }: { ripe?: boolean }) {
  return (
    <svg className="fruit-art" viewBox="0 0 320 250" role="img" aria-label={ripe ? 'ผลไม้สุกสีอบอุ่น' : 'ผลไม้ที่ยังไม่สุก'}>
      <path d="M157 73q22-35 53-28" fill="none" stroke="#8d6d45" strokeWidth="8" strokeLinecap="round" />
      <path d="M190 56q32-31 60-12-21 34-57 27" fill="#75a878" />
      <path d="M143 79C92 58 58 94 68 146c12 61 58 82 96 48 40 31 84 10 96-50 10-49-22-88-73-65-17 8-29 8-44 0Z" fill={ripe ? '#e6a75f' : '#8cad66'} stroke={ripe ? '#f0c182' : '#b8ce8b'} strokeWidth="4" />
      <path d="M109 92q-28 29-10 65M214 91q29 26 16 62" fill="none" stroke="#fff4cb" strokeWidth="7" strokeLinecap="round" opacity=".28" />
      <circle cx="159" cy="130" r="53" fill="#f2d2a5" opacity=".15" />
      <g fill="#f8d78c"><circle cx="139" cy="125" r="4"/><circle cx="164" cy="146" r="3"/><circle cx="180" cy="116" r="3"/><circle cx="146" cy="159" r="2"/></g>
      {ripe && <path d="M102 179q53 43 107 2" fill="none" stroke="#b66c4f" strokeWidth="4" opacity=".48" />}
    </svg>
  )
}
