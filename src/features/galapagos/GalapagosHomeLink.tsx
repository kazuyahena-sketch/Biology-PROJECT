type Props = { className?: string }

export default function GalapagosHomeLink({ className = '' }: Props) {
  return <a className={className} href="#/" aria-label="กลับหน้าหลัก">
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="m2.5 9 7.5-6 7.5 6M4.5 8v9h11V8M8 17v-5h4v5"/>
    </svg>
    <span>กลับหน้าหลัก</span>
  </a>
}
