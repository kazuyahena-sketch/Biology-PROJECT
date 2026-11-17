export type Hormone = {
  id: string
  name: string
  thai: string
  symbol: string
  color: string
  short: string
  detail: string
  effects: string[]
  status: 'interactive' | 'preview'
}

export type Topic = {
  id: string
  title: string
  englishTitle: string
  description: string
  icon: string
  status: 'available' | 'coming-soon'
  count?: number
  difficulty?: string
}

export const topics: Topic[] = [
  {
    id: 'plant-hormones', title: 'ฮอร์โมนพืช', englishTitle: 'Plant Hormones',
    description: 'สำรวจบทบาทของฮอร์โมนพืชที่ควบคุมการเจริญเติบโต การพัฒนา และการตอบสนองของพืช',
    icon: '✳', status: 'available', count: 5, difficulty: 'มัธยมปลาย',
  },
  {
    id: 'darwins-finches', title: 'การคัดเลือกโดยธรรมชาติ', englishTitle: "Darwin's Finches",
    description: 'สังเกตว่าความแปรผัน การอยู่รอด และการสืบพันธุ์เปลี่ยนสัดส่วนลักษณะในประชากรได้อย่างไร',
    icon: '⌁', status: 'available', count: 6, difficulty: 'มัธยมปลาย',
  },
  { id: 'photosynthesis', title: 'การสังเคราะห์ด้วยแสง', englishTitle: 'Photosynthesis', description: 'ติดตามการเปลี่ยนพลังงานแสงให้กลายเป็นพลังงานเคมี', icon: '☼', status: 'coming-soon' },
  { id: 'respiration', title: 'การหายใจระดับเซลล์', englishTitle: 'Cellular Respiration', description: 'สำรวจเส้นทางที่เซลล์ใช้ปลดปล่อยพลังงานจากอาหาร', icon: '◉', status: 'coming-soon' },
  { id: 'transport', title: 'การลำเลียงในพืช', englishTitle: 'Plant Transport', description: 'ตามรอยน้ำ แร่ธาตุ และน้ำตาลที่เคลื่อนที่ทั่วทั้งต้น', icon: '↟', status: 'coming-soon' },
  { id: 'anatomy', title: 'กายวิภาคของพืช', englishTitle: 'Plant Anatomy', description: 'มองเข้าไปในเนื้อเยื่อและอวัยวะที่สร้างชีวิตของพืช', icon: '❋', status: 'coming-soon' },
]

export const hormones: Hormone[] = [
  {
    id: 'auxin', name: 'Auxin', thai: 'ออกซิน', symbol: 'A', color: 'mint', short: 'ทิศทางการเจริญเติบโต',
    detail: 'ออกซินช่วยควบคุมการยืดตัวของเซลล์ และมีบทบาทต่อการตอบสนองของยอดต่อแสง',
    effects: ['การยืดตัวของเซลล์', 'Phototropism', 'การพัฒนาของราก'], status: 'interactive',
  },
  {
    id: 'gibberellin', name: 'Gibberellin', thai: 'จิบเบอเรลลิน', symbol: 'G', color: 'lilac', short: 'การยืดตัวและการงอก',
    detail: 'จิบเบอเรลลินเกี่ยวข้องกับการยืดตัวของลำต้นและการงอกของเมล็ด',
    effects: ['การยืดตัวของลำต้น', 'การงอกของเมล็ด'], status: 'preview',
  },
  {
    id: 'cytokinin', name: 'Cytokinin', thai: 'ไซโทไคนิน', symbol: 'C', color: 'sky', short: 'การแบ่งเซลล์',
    detail: 'ไซโทไคนินส่งเสริมการแบ่งเซลล์และมีส่วนช่วยในการพัฒนาของยอด',
    effects: ['การแบ่งเซลล์', 'การพัฒนาของยอด'], status: 'preview',
  },
  {
    id: 'aba', name: 'Abscisic acid', thai: 'กรดแอบไซซิก (ABA)', symbol: 'A', color: 'gold', short: 'การตอบสนองต่อความเครียด',
    detail: 'ABA ช่วยประสานการตอบสนองต่อความเครียด เช่น การปิดปากใบเมื่อพืชขาดน้ำ',
    effects: ['การตอบสนองต่อความเครียด', 'การปิดปากใบ'], status: 'preview',
  },
  {
    id: 'ethylene', name: 'Ethylene', thai: 'เอทิลีน', symbol: 'E', color: 'rose', short: 'การสุกของผลไม้',
    detail: 'เอทิลีนเป็นฮอร์โมนในรูปก๊าซที่มีบทบาทสำคัญต่อการสุกของผลไม้หลายชนิด',
    effects: ['การสุกของผลไม้', 'การเปลี่ยนสีและเนื้อสัมผัส'], status: 'interactive',
  },
]

export function topicHref(topicId: string) {
  return `#/topics/${topicId}`
}

export function lessonHref(lessonId: string) {
  return `#/lessons/${lessonId}`
}
