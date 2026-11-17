import { useState, type ImgHTMLAttributes } from 'react'

type FallbackKind = 'habitat' | 'finch' | 'food'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'onError'> & {
  src: string
  alt: string
  fallbackKind?: FallbackKind
}

export default function GalapagosImage({ src, alt, fallbackKind = 'food', className, ...imageProps }: Props) {
  const [failedSource, setFailedSource] = useState<string | null>(null)

  if (!src || failedSource === src) {
    const classes = ['galapagos-image-fallback', `galapagos-image-fallback--${fallbackKind}`, className]
      .filter(Boolean)
      .join(' ')

    return <div className={classes} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <circle cx="48" cy="16" r="6"/>
        <path d="M12 51c12-4 21-13 31-26M24 41c-8-1-12-6-11-14 8 0 13 4 13 11M33 34c2-8 8-12 16-10-1 8-6 13-14 13"/>
      </svg>
      <span>ไม่พบภาพนี้</span>
    </div>
  }

  return <img {...imageProps} className={className} src={src} alt={alt} onError={() => setFailedSource(src)}/>
}
