import { useState } from 'react'
import EvidenceSources from './EvidenceSources'
import { CDF_FIELD_GUIDE_SOURCE, NATURE_FINCH_GENOMICS_SOURCE, NATURE_SELECTION_SOURCE } from './data'

const summarySources = [
  { label: 'Nature · จีโนมของนกฟินช์ดาร์วินและความแปรผันของจะงอยปาก (2015)', url: NATURE_FINCH_GENOMICS_SOURCE, scope: 'หลักฐานด้านสายวิวัฒนาการและความแปรผันทางพันธุกรรมที่ถ่ายทอดได้ ซึ่งเกี่ยวข้องกับความหลากหลายของรูปร่างจะงอยปาก' },
  { label: 'Nature · การคัดเลือกซ้ำบน Daphne Major (1984)', url: NATURE_SELECTION_SOURCE, scope: 'หลักฐานภาคสนามของการคัดเลือกโดยธรรมชาติในประชากรนกฟินช์พื้นดินขนาดกลาง เมื่อแหล่งอาหารลดลง' },
  { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกบกประจำถิ่น', url: CDF_FIELD_GUIDE_SOURCE, scope: 'การระบุชนิด การกระจาย ถิ่นอาศัย และนิเวศการกินอาหารที่ใช้ประกอบตัวอย่างของแต่ละเกาะ' },
]

const questions = [
  {
    prompt: 'ข้อใดอธิบายความหลากหลายของนกฟินช์ดาร์วินได้ดีที่สุด?',
    options: [
      'นกเหล่านี้มีบรรพบุรุษร่วมกัน ประชากรมีความแปรผันและพบสภาพแวดล้อมต่างกัน',
      'นกแต่ละตัวเปลี่ยนจะงอยปากเมื่อจำเป็นต้องกินอาหารชนิดใหม่',
      'แต่ละเกาะมีนกฟินช์เพียงชนิดเดียว',
    ],
    correct: 0,
    explanation: 'นกฟินช์มีบรรพบุรุษร่วมกัน ความแปรผันที่ถ่ายทอดทางพันธุกรรมและสภาพแวดล้อมที่แตกต่างกันอาจส่งผลต่อประชากรเมื่อเวลาผ่านไปหลายรุ่น',
  },
  {
    prompt: 'ความแตกต่างของรูปร่างและขนาดจะงอยปากส่งผลต่อสิ่งใดได้?',
    options: [
      'นกจะเลือกเปลี่ยนจะงอยปากของตนเองได้หรือไม่',
      'วิธีที่นกฟินช์เข้าถึงและจัดการกับอาหารที่หาได้',
      'นกฟินช์ทุกตัวบนเกาะจะกินอาหารเหมือนกันทุกประการหรือไม่',
    ],
    correct: 1,
    explanation: 'ลักษณะของจะงอยปากอาจส่งผลต่อวิธีที่นกฟินช์ใช้ทรัพยากรอาหาร และประโยชน์ของลักษณะหนึ่งขึ้นอยู่กับสภาพแวดล้อม',
  },
  {
    prompt: 'อะไรเปลี่ยนแปลงผ่านการคัดเลือกโดยธรรมชาติเมื่อเวลาผ่านไปหลายรุ่น?',
    options: [
      'จะงอยปากของนกแต่ละตัวตลอดช่วงชีวิต',
      'เป้าหมายที่ประชากรกำลังพยายามไปให้ถึง',
      'ความถี่ของลักษณะที่ถ่ายทอดทางพันธุกรรมในประชากร',
    ],
    correct: 2,
    explanation: 'สิ่งมีชีวิตแต่ละตัวไม่ได้เปลี่ยนจะงอยปากเพราะต้องการปรับตัว ความแตกต่างด้านการอยู่รอดและการสืบพันธุ์อาจทำให้ความถี่ของลักษณะในประชากรเปลี่ยนไปในแต่ละรุ่น',
  },
]

export default function LearningSummary() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const question = questions[questionIndex]
  const isCorrect = isSubmitted && selectedAnswer === question.correct

  const resetQuestion = () => {
    setSelectedAnswer(null)
    setIsSubmitted(false)
  }

  const nextQuestion = () => {
    if (questionIndex === questions.length - 1) {
      setQuestionIndex(0)
    } else {
      setQuestionIndex((current) => current + 1)
    }
    resetQuestion()
  }

  return <section className="learning-summary" aria-labelledby="learning-summary-heading">
    <div className="learning-summary-overview">
      <span className="profile-eyebrow">สรุปหลักฐาน</span>
      <h2 id="learning-summary-heading">จากบรรพบุรุษร่วมสู่ความหลากหลายของนกฟินช์</h2>
      <p>เกาะแต่ละแห่งมีถิ่นอาศัยและอาหารต่างกัน ขณะที่นกฟินช์มีความแปรผันทางพันธุกรรม เช่น รูปร่างและขนาดจะงอยปาก หากลักษณะหนึ่งช่วยให้มีลูกหลานมากขึ้นในสภาพแวดล้อมนั้น ความถี่ของลักษณะอาจเปลี่ยนในประชากรเมื่อผ่านไปหลายรุ่น</p>
      <p className="learning-summary-reminder">การคัดเลือกไม่มีเป้าหมายล่วงหน้า และนกแต่ละตัวไม่ได้เปลี่ยนจะงอยปากตามความต้องการ</p>
      <EvidenceSources sources={summarySources} heading="งานวิจัยประกอบคำอธิบายนี้" className="learning-summary-sources"/>
    </div>

    <div className="learning-quiz" aria-labelledby="learning-quiz-heading">
      <div className="learning-quiz-topline">
        <div>
          <span className="profile-eyebrow">ทบทวนความเข้าใจ</span>
          <h3 id="learning-quiz-heading">คำถามทบทวนสั้น ๆ</h3>
        </div>
        <span>ข้อที่ {questionIndex + 1} จาก {questions.length}</span>
      </div>

      <fieldset className="learning-quiz-fieldset" disabled={isSubmitted}>
        <legend>{question.prompt}</legend>
        {question.options.map((option, index) => <label className="learning-quiz-option" key={option}>
          <input type="radio" name={`finch-quiz-${questionIndex}`} checked={selectedAnswer === index} onChange={() => setSelectedAnswer(index)}/>
          <span>{option}</span>
        </label>)}
      </fieldset>

      {isSubmitted && <p className={`learning-quiz-feedback ${isCorrect ? 'is-correct' : 'is-incorrect'}`} role="status" aria-live="polite">
        <strong>{isCorrect ? 'ถูกต้อง' : 'ยังไม่ถูกต้อง'}</strong> {question.explanation}
      </p>}

      <div className="learning-quiz-actions">
        {!isSubmitted
          ? <button type="button" className="stage-next-button" onClick={() => setIsSubmitted(true)} disabled={selectedAnswer === null}>ตรวจคำตอบ</button>
          : isCorrect
            ? <button type="button" className="stage-next-button" onClick={nextQuestion}>{questionIndex === questions.length - 1 ? 'ทำแบบทบทวนอีกครั้ง' : 'คำถามถัดไป'}</button>
            : <button type="button" className="stage-next-button" onClick={resetQuestion}>ลองอีกครั้ง</button>}
      </div>
    </div>
  </section>
}
