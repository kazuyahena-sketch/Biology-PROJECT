import { useState, type FormEvent } from 'react'

type Props = { route: string }

const links = [
  { href: '#/', label: 'หน้าหลัก' },
  { href: '#/topics/plant-hormones', label: 'บทเรียน' },
  { href: '#/knowledge-map', label: 'แผนผังความรู้' },
  { href: '#/quiz', label: 'แบบทดสอบ' },
  { href: '#/about', label: 'เกี่ยวกับ' },
]

export default function Navigation({ route }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = query.trim().toLowerCase()
    if (!text) return
    const target = text.includes('เอทิล') || text.includes('ethy') ? '#/lessons/ethylene'
      : text.includes('ออกซิน') || text.includes('aux') ? '#/lessons/auxin'
        : '#/topics/plant-hormones'
    window.location.hash = target
    setSearchOpen(false)
    setQuery('')
  }

  return (
    <header className="topbar">
      <a className="brand" href="#/" aria-label="Plant Learning Hub หน้าหลัก">
        <span className="brand-mark" aria-hidden="true">✳</span>
        <span><strong>Plant Learning Hub</strong><small>BOTANICAL SCIENCE LAB</small></span>
      </a>
      <button className="mobile-menu-button icon-button" aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="menu-lines">☰</span>
      </button>
      <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`} aria-label="เมนูหลัก">
        {links.map((link) => {
          const active = link.href === '#/' ? route === '/' : link.href === '#/topics/plant-hormones' ? route.startsWith('/topics') || route.startsWith('/lessons') : route === link.href.slice(1)
          return <a key={link.href} href={link.href} className={active ? 'active' : ''} onClick={() => setMenuOpen(false)}>{link.label}</a>
        })}
      </nav>
      <div className="nav-tools">
        <button className="icon-button search-toggle" aria-label="ค้นหาบทเรียน" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); setProfileOpen(false) }}><span aria-hidden="true">⌕</span></button>
        <button className="profile-button" aria-label="ข้อมูลผู้เรียน" aria-expanded={profileOpen} onClick={() => { setProfileOpen(!profileOpen); setSearchOpen(false) }}><span>PL</span></button>
      </div>
      {searchOpen && <form className="search-popover" onSubmit={submitSearch}>
        <label htmlFor="lesson-search">ค้นหาบทเรียน</label>
        <div><input id="lesson-search" autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ลองค้นหา Auxin…"/><button type="submit" aria-label="ไปยังผลการค้นหา">↗</button></div>
        <small>ค้นหาได้ทั้งชื่อภาษาไทยและภาษาอังกฤษ</small>
      </form>}
      {profileOpen && <div className="profile-popover"><span className="eyebrow">GUEST LEARNER</span><strong>ยินดีต้อนรับสู่ห้องทดลอง</strong><p>ความคืบหน้าของบทเรียนจะถูกเก็บไว้ในอุปกรณ์นี้</p><a href="#/topics/plant-hormones" onClick={() => setProfileOpen(false)}>ดูเส้นทางการเรียนรู้ ↗</a></div>}
    </header>
  )
}
