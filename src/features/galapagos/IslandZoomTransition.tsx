import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import type { Island } from './data'
import GalapagosMap from './GalapagosMap'

type Phase = 'highlight' | 'zooming' | 'revealing' | 'leaving'

type Props = {
  island: Island
  onClose: () => void
  children: (controls: { phase: Phase; exit: () => void }) => ReactNode
}

export default function IslandZoomTransition({ island, onClose, children }: Props) {
  const [phase, setPhase] = useState<Phase>('highlight')
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = dialogRef.current?.querySelector<HTMLElement>('#scene-island-heading')
    heading?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const highlightTimer = window.setTimeout(() => setPhase('zooming'), reducedMotion ? 0 : 170)
    const revealTimer = window.setTimeout(() => setPhase('revealing'), reducedMotion ? 30 : 1050)

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      window.clearTimeout(highlightTimer)
      window.clearTimeout(revealTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'leaving') return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(onClose, reducedMotion ? 0 : 620)
    return () => window.clearTimeout(timer)
  }, [phase, onClose])

  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setPhase('leaving')
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const keepFocusInside = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return
    const dialog = dialogRef.current
    if (!dialog) return

    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => element.getClientRects().length > 0)
    if (focusable.length === 0) {
      event.preventDefault()
      dialog.focus()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const active = document.activeElement
    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
      event.preventDefault()
      first.focus()
    }
  }

  return <div ref={dialogRef} className={'island-zoom-transition is-' + phase} role="dialog" aria-modal="true" aria-labelledby="scene-island-heading" onKeyDown={keepFocusInside}>
    <div className="island-zoom-stage" aria-hidden="true">
      <GalapagosMap cameraIslandId={island.id} cameraPhase={phase} interactive={false}/>
    </div>
    <div className="island-scene-wash" aria-hidden="true"/>
    <div className="island-scene-content">{children({ phase, exit: () => setPhase('leaving') })}</div>
  </div>
}
