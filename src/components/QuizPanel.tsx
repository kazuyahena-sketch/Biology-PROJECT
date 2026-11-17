import { useState } from 'react'

export type Question = { prompt: string; choices: string[]; answer: number; explanation: string }

type Props = { title?: string; questions: Question[]; compact?: boolean }

export default function QuizPanel({ title = 'เช็กความเข้าใจ', questions, compact = false }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)
  const question = questions[index]

  function advance() {
    if (!checked && selected !== null) {
      setChecked(true)
      if (selected === question.answer) setScore((value) => value + 1)
      return
    }
    if (index === questions.length - 1) { setComplete(true); return }
    setIndex((value) => value + 1)
    setSelected(null)
    setChecked(false)
  }

  function restart() { setIndex(0); setSelected(null); setChecked(false); setScore(0); setComplete(false) }

  return <section className={`quiz-panel ${compact ? 'quiz-compact' : ''}`} aria-labelledby="quiz-title">
    <div className="quiz-heading"><span className="quiz-icon" aria-hidden="true">✳</span><div><span className="eyebrow">QUICK CHECK · {questions.length} คำถาม</span><h2 id="quiz-title">{title}</h2></div></div>
    {complete ? <div className="quiz-result" aria-live="polite">
      <div className="result-ring"><strong>{score}/{questions.length}</strong><span>คะแนน</span></div>
      <div><h3>{score === questions.length ? 'เยี่ยมมาก เข้าใจกลไกแล้ว' : 'สำรวจอีกครั้งได้เสมอ'}</h3><p>กลับไปทบทวนลำดับเหตุและผล แล้วลองทำแบบทดสอบใหม่ได้เลย</p><button className="button button-secondary" onClick={restart}>ลองอีกครั้ง ↺</button></div>
    </div> : <>
      <div className="quiz-progress"><span>คำถาม {index + 1} จาก {questions.length}</span><div><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div></div>
      <h3 className="question-title">{question.prompt}</h3>
      <div className="choice-list" role="radiogroup" aria-label={`คำตอบข้อที่ ${index + 1}`}>
        {question.choices.map((choice, option) => {
          const stateClass = checked && option === question.answer ? 'choice-correct' : checked && option === selected ? 'choice-wrong' : ''
          return <button key={choice} role="radio" aria-checked={selected === option} disabled={checked} onClick={() => setSelected(option)} className={`quiz-choice ${selected === option ? 'selected' : ''} ${stateClass}`}><span className="choice-marker">{checked && option === question.answer ? '✓' : String.fromCharCode(65 + option)}</span>{choice}</button>
        })}
      </div>
      {checked && <p className={`answer-note ${selected === question.answer ? 'answer-good' : 'answer-review'}`} aria-live="polite"><strong>{selected === question.answer ? 'ถูกต้อง · ' : 'ลองทบทวน · '}</strong>{question.explanation}</p>}
      <div className="quiz-footer"><span>{checked ? 'อ่านคำอธิบาย แล้วไปต่อได้เลย' : 'เลือกคำตอบที่คิดว่าถูกต้อง'}</span><button className="button button-primary" disabled={selected === null} onClick={advance}>{checked ? index === questions.length - 1 ? 'ดูผลลัพธ์' : 'ข้อถัดไป →' : 'ตรวจคำตอบ'}</button></div>
    </>}
  </section>
}
