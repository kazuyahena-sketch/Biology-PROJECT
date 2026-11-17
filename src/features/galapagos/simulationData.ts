import type { Island } from './data'

export type BillCategory = 'XS' | 'S' | 'M' | 'L'
export type PopulationCounts = Record<BillCategory, number>

export const BILL_CATEGORIES: Array<{ id: BillCategory; label: string }> = [
  { id: 'XS', label: 'เล็กมาก' },
  { id: 'S', label: 'เล็ก' },
  { id: 'M', label: 'กลาง' },
  { id: 'L', label: 'ใหญ่' },
]

export const SIMULATION_POPULATION_SIZE = 20
export const SIMULATION_TRANSITIONS = 4

export type IslandSimulationScenario = {
  modelSetting: {
    resources: string
    foodSize: string
    hardness: string
    availability: string
  }
  initialPopulation: PopulationCounts
  unrepresentedInheritedVariation: Partial<PopulationCounts>
  relativeContribution: PopulationCounts
  selectionSummary: string
}

// These are conceptual teaching scenarios, not measured island food supplies
// or estimates of historical fitness. XS/S/M/L are visual trait bins only.
// The fixed relative-contribution weights differ by island and are illustrative;
// the required sample progression is not a reconstruction of field data.
export const islandSimulationScenarios: Record<Island['id'], IslandSimulationScenario> = {
  'daphne-major': {
    modelSetting: {
      resources: 'เมล็ดพืช',
      foodSize: 'ตั้งแต่ขนาดเล็กถึงใหญ่',
      hardness: 'มีหลายระดับ รวมถึงเมล็ดที่แข็งกว่า',
      availability: 'มีจำกัดในแบบจำลองนี้',
    },
    initialPopulation: { XS: 0, S: 7, M: 6, L: 7 },
    unrepresentedInheritedVariation: { XS: 1 },
    relativeContribution: { XS: 3, S: 1, M: 0.25, L: 0.01 },
    selectionSummary: 'ในตัวอย่างเมล็ดหลายขนาดนี้ ค่าน้ำหนักเพื่อการเรียนรู้ทำให้ M ยังพบในช่วงต้น ก่อนที่สัดส่วน XS และ S จะเพิ่มขึ้นในรุ่นหลัง',
  },
  espanola: {
    modelSetting: {
      resources: 'ผลและเมล็ดของ Opuntia',
      foodSize: 'ตั้งแต่ผลไม้ถึงเมล็ดขนาดใหญ่',
      hardness: 'ผลไม้นิ่มและเมล็ดที่แข็งกว่า',
      availability: 'เน้นทรัพยากรจากกระบองเพชร',
    },
    initialPopulation: { XS: 0, S: 8, M: 5, L: 7 },
    unrepresentedInheritedVariation: { XS: 1 },
    relativeContribution: { XS: 2.8, S: 1, M: 0.35, L: 0.02 },
    selectionSummary: 'ในตัวอย่างที่มีผลและเมล็ดจาก Opuntia นี้ S พบมากในช่วงต้น ส่วน XS ที่ถ่ายทอดได้มีสัดส่วนเพิ่มขึ้นในรุ่นหลัง',
  },
  genovesa: {
    modelSetting: {
      resources: 'Opuntia และสัตว์ไม่มีกระดูกสันหลัง',
      foodSize: 'ตั้งแต่ขนาดเล็กถึงปานกลาง',
      hardness: 'มีหลายระดับ',
      availability: 'มีทรัพยากรหลายชนิดในแบบจำลองนี้',
    },
    initialPopulation: { XS: 0, S: 10, M: 7, L: 3 },
    unrepresentedInheritedVariation: { XS: 1 },
    relativeContribution: { XS: 5, S: 1, M: 0.3, L: 0.01 },
    selectionSummary: 'ในตัวอย่างที่มี Opuntia และสัตว์ไม่มีกระดูกสันหลัง S พบมากในช่วงต้น และ XS เพิ่มขึ้นเด่นชัดในรุ่นหลังตามค่าน้ำหนักของแบบจำลอง',
  },
  floreana: {
    modelSetting: {
      resources: 'สัตว์ไม่มีกระดูกสันหลังและเมล็ดพืช',
      foodSize: 'ตั้งแต่ขนาดเล็กถึงปานกลาง',
      hardness: 'ส่วนใหญ่เป็นอาหารที่นิ่มกว่าในแบบจำลองนี้',
      availability: 'มีความหลากหลายตามพืชพรรณ',
    },
    initialPopulation: { XS: 0, S: 10, M: 7, L: 3 },
    unrepresentedInheritedVariation: { XS: 1 },
    relativeContribution: { XS: 3.7, S: 1, M: 0.3, L: 0.03 },
    selectionSummary: 'ในตัวอย่างอาหารนิ่มและสัตว์ไม่มีกระดูกสันหลัง S พบมากในช่วงต้น จากนั้น XS ที่ถ่ายทอดได้เพิ่มสัดส่วนขึ้นในรุ่นหลัง',
  },
  'santa-cruz': {
    modelSetting: {
      resources: 'เมล็ดพืช ผลไม้ และสัตว์ไม่มีกระดูกสันหลัง',
      foodSize: 'มีหลายขนาด',
      hardness: 'มีทั้งอาหารนิ่มและแข็ง',
      availability: 'มีทรัพยากรหลายชนิดในแบบจำลองนี้',
    },
    initialPopulation: { XS: 0, S: 12, M: 5, L: 3 },
    unrepresentedInheritedVariation: { XS: 1 },
    relativeContribution: { XS: 3.3, S: 1, M: 0.35, L: 0.01 },
    selectionSummary: 'ตัวอย่างอาหารหลายชนิดนี้ทำให้ S พบได้มากในช่วงต้น ขณะที่ XS เพิ่มขึ้นในรุ่นหลังตามค่าน้ำหนักที่กำหนดไว้',
  },
  isabela: {
    modelSetting: {
      resources: 'เมล็ดพืชและอาหารชนิดอื่น',
      foodSize: 'หลากหลายตามเขตถิ่นอาศัย',
      hardness: 'มีหลายระดับในแบบจำลองนี้',
      availability: 'ทรัพยากรแตกต่างกันไปในแต่ละเขต',
    },
    initialPopulation: { XS: 0, S: 8, M: 7, L: 5 },
    unrepresentedInheritedVariation: { XS: 1 },
    relativeContribution: { XS: 4.5, S: 1, M: 0.4, L: 0.04 },
    selectionSummary: 'ในตัวอย่างถิ่นอาศัยหลากหลาย M ยังอยู่ในตัวอย่างช่วงต้น ก่อนที่ XS และ S จะมีสัดส่วนสูงขึ้นในรุ่นหลัง ทั้งนี้ผลนี้เป็นสมมติฐานของแบบจำลอง',
  },
}
