export type FinchSpeciesId =
  | 'medium-ground'
  | 'large-cactus'
  | 'genovesa-cactus'
  | 'common-cactus'
  | 'medium-tree'
  | 'small-ground'
  | 'large-ground'

export type FoodResourceId = 'seeds' | 'cactus-fruit' | 'opuntia' | 'invertebrates'

export type FoodResource = {
  name: string
  image: string
  imageAlt: string
  photoCredit: string
  photoSource: string
}

export type EvidenceSource = {
  label: string
  url: string
  scope: string
}

export type FinchSpecies = {
  id: FinchSpeciesId
  commonName: string
  commonNameAlias?: string
  scientificName: string
  image: string
  imageSrcSet?: string
  imageAlt: string
  suppliedImage?: boolean
  detailPhoto: {
    image: string
    imageAlt: string
    credit: string
    source?: string
    license?: string
    licenseSource?: string
  }
  beak: string
  food: string
  feedingBehavior: string
  foodResource: FoodResourceId
  environmentConnection: string
  evidenceSources: EvidenceSource[]
}

export type Island = {
  id: 'daphne-major' | 'espanola' | 'genovesa' | 'floreana' | 'santa-cruz' | 'isabela'
  name: string
  overview: string
  habitat: string
  vegetation: string
  foodSources: string
  featuredFinch: FinchSpeciesId
  environmentImage: string
  environmentImageAlt: string
  environmentPhotoCredit: string
  environmentPhotoSource: string
  evidenceSources: EvidenceSource[]
  mapPath: string
  mapCenter: [number, number]
  labelPosition: [number, number]
  labelAnchor?: 'start' | 'middle' | 'end'
}

export const INSIDERS_SOURCE = 'https://galapagosinsiders.com/travel-blog/galapagos-darwin-finches/'
export const CDF_FIELD_GUIDE_SOURCE = 'https://www.darwinfoundation.org/en/documents/414/fcd_field_guide_landbirds_2022.pdf'
export const NATURE_SELECTION_SOURCE = 'https://www.nature.com/articles/309787a0'
export const NATURE_FINCH_GENOMICS_SOURCE = 'https://www.nature.com/articles/nature14181'

const cdfSpeciesSource = (speciesId: string) => `https://datazone.darwinfoundation.org/en/checklist/?species=${speciesId}`

const galapagosAsset = (path: string) => `${import.meta.env.BASE_URL}assets/galapagos/${path}`

export const foodResources: Record<FoodResourceId, FoodResource> = {
  seeds: {
    name: 'เมล็ดพืชและฝักเมล็ด',
    image: 'https://2.bp.blogspot.com/-OFLzib1xpKQ/T6WQUp9s3wI/AAAAAAAAFbU/dCDHmbmk-34/s1600/Piscidia%2Bcarthagenensis%2B1.JPG',
    imageAlt: 'ฝักเมล็ด Matazarno พื้นถิ่นบนกิ่งไม้ในหมู่เกาะกาลาปากอส',
    photoCredit: 'TravelMarx · Galápagos plant photographs',
    photoSource: 'https://blog.travelmarx.com/2012/05/selected-plants-of-galapagos-islands.html',
  },
  'cactus-fruit': {
    name: 'ดอกและผลกระบองเพชร',
    image: 'https://ecuadorenlinea.org/wp-content/uploads/2021/11/prickly-pears-g22981f71e_1920.jpg',
    imageAlt: 'ผลกระบองเพชรหนามสุกบนลำต้นแบนของ Opuntia',
    photoCredit: 'Ecuador en Línea · Galápagos flora',
    photoSource: 'https://ecuadorenlinea.org/flora/flora-de-las-islas-galapagos-ecuador/',
  },
  opuntia: {
    name: 'กระบองเพชร Opuntia',
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Opuntia_helleri.JPG',
    imageAlt: 'กระบองเพชร Opuntia เฉพาะถิ่นที่ขึ้นบนพื้นภูเขาไฟแห้งแล้งบนเกาะ Genovesa',
    photoCredit: 'Wikimedia Commons · Opuntia helleri',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Opuntia_helleri.JPG',
  },
  invertebrates: {
    name: 'สัตว์ไม่มีกระดูกสันหลังขนาดเล็ก',
    image: 'https://bihrmann.com/Travel/GAL/Invertebrates/slides/01608.jpg',
    imageAlt: 'ด้วงกาลาปากอสบนใบไม้สีเขียว',
    photoCredit: 'Bihrmann · Galápagos invertebrates',
    photoSource: 'https://www.bihrmann.com/travel/GAL/Invertebrates/',
  },
}

export const species: FinchSpecies[] = [
  {
    id: 'medium-ground',
    commonName: 'นกฟินช์พื้นดินขนาดกลาง',
    scientificName: 'Geospiza fortis',
    image: galapagosAsset('finches/medium-ground-finch-640.jpg'),
    imageSrcSet: `${galapagosAsset('finches/medium-ground-finch-640.jpg')} 640w, ${galapagosAsset('finches/medium-ground-finch.jpeg')} 1920w`,
    imageAlt: 'นกฟินช์พื้นดินขนาดกลางเกาะบนกิ่งไม้ มองเห็นจะงอยปากที่เหมาะกับการกินเมล็ดพืช',
    suppliedImage: true,
    detailPhoto: {
      image: galapagosAsset('finches/medium-ground-finch.jpeg'),
      imageAlt: 'ภาพนกฟินช์พื้นดินขนาดกลางท่ามกลางกิ่งไม้',
      credit: 'ภาพถ่ายที่จัดเตรียมสำหรับบทเรียนนี้',
    },
    beak: 'ขนาดจะงอยปากแตกต่างกันไปในนกแต่ละตัว โดยทั่วไปมีขนาดใหญ่กว่าของนกฟินช์พื้นดินขนาดเล็ก',
    food: 'กินเมล็ดพืชเป็นหลัก และกินผลไม้กับสัตว์ไม่มีกระดูกสันหลังด้วย',
    feedingBehavior: 'กินอาหารตามโอกาส โดยมีเมล็ดพืชเป็นแหล่งอาหารหลัก',
    foodResource: 'seeds',
    environmentConnection: 'สภาพของเมล็ดพืชอาจเอื้อต่อจะงอยปากขนาดต่างกัน เมื่อเวลาผ่านไปหลายรุ่น การอยู่รอดและการสืบพันธุ์อาจทำให้สัดส่วนของลักษณะในประชากรเปลี่ยนไป',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์พื้นดินขนาดกลาง', url: CDF_FIELD_GUIDE_SOURCE, scope: 'อาหาร เขตถิ่นอาศัย การกระจายพันธุ์ และความแปรผันของจะงอยปาก' },
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza fortis', url: cdfSpeciesSource('5094'), scope: 'ชื่อชนิดพันธุ์ที่ยอมรับ ขอบเขตการกระจาย และพฤติกรรมการกินเมล็ดพืชเป็นหลัก' },
      { label: 'Nature · งานศึกษาการคัดเลือกบน Daphne Major (1984)', url: NATURE_SELECTION_SOURCE, scope: 'หลักฐานภาคสนามของการคัดเลือกในนกฟินช์พื้นดินขนาดกลางเมื่อแหล่งอาหารลดลง' },
      { label: 'Ecological Monographs · นิเวศการกินอาหารบน Daphne Major (1984)', url: 'https://doi.org/10.2307/1942596', scope: 'ชุมชนพืช ทรัพยากรอาหารตามฤดูกาล และนิเวศการกินอาหารของนกฟินช์บน Daphne Major' },
      { label: 'Galápagos Insiders · นกฟินช์ของดาร์วิน', url: INSIDERS_SOURCE, scope: 'ภาพรวมที่อ่านง่ายเกี่ยวกับจะงอยปาก ถิ่นอาศัย และอาหารของนกฟินช์' },
    ],
  },
  {
    id: 'large-cactus',
    commonName: 'นกฟินช์กระบองเพชรเอสปันโญลา',
    commonNameAlias: 'มีอีกชื่อว่า นกฟินช์กระบองเพชรขนาดใหญ่',
    scientificName: 'Geospiza conirostris',
    image: galapagosAsset('finches/large-cactus.webp'),
    imageAlt: 'นกฟินช์กระบองเพชรขนาดใหญ่จากชุดภาพนกฟินช์กาลาปากอสที่จัดเตรียมไว้',
    suppliedImage: true,
    detailPhoto: {
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Geospiza_conirostris.jpg?width=640',
      imageAlt: 'ภาพนกฟินช์กระบองเพชรขนาดใหญ่ในหมู่เกาะกาลาปากอส',
      credit: 'Mark Putney',
      source: 'https://commons.wikimedia.org/wiki/File:Geospiza_conirostris.jpg',
      license: 'CC BY-SA 2.0',
      licenseSource: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
    beak: 'จะงอยปากเหมาะกับการใช้ประโยชน์จากอาหารของกระบองเพชร',
    food: 'ส่วนต่าง ๆ ของ Opuntia เมล็ดขนาดใหญ่ และสัตว์ขาข้อ',
    feedingBehavior: 'กินส่วนต่าง ๆ ของ Opuntia และอาจกินเมล็ดขนาดใหญ่กับสัตว์ขาข้อที่พบบนกิ่งไม้ตายหรือแผ่นกระบองเพชรที่เน่าเปื่อย',
    foodResource: 'cactus-fruit',
    environmentConnection: 'บนเกาะ Española กระบองเพชรเป็นแหล่งอาหารสำคัญ รูปร่างจะงอยปากเกี่ยวข้องกับวิธีที่นกฟินช์เข้าถึงและจัดการกับอาหาร',
    evidenceSources: [
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza conirostris', url: cdfSpeciesSource('5092'), scope: 'ชื่อชนิดพันธุ์ที่ยอมรับ ถิ่นไม้พุ่มและป่าโปร่งแห้งแล้งที่มี Opuntia อาหาร และการกระจายพันธุ์เฉพาะเกาะ Española' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์กระบองเพชรเอสปันโญลา', url: CDF_FIELD_GUIDE_SOURCE, scope: 'ชื่อที่ใช้เฉพาะเกาะ อาหาร เขตถิ่นอาศัย และความแตกต่างจากนกฟินช์กระบองเพชรบนเกาะ Genovesa' },
      { label: 'Galápagos Insiders · นกฟินช์ของดาร์วิน', url: INSIDERS_SOURCE, scope: 'ภาพรวมของนกฟินช์กระบองเพชรขนาดใหญ่และอาหารที่เกี่ยวข้องกับกระบองเพชร' },
    ],
  },
  {
    id: 'genovesa-cactus',
    commonName: 'นกฟินช์กระบองเพชรเกโนเวซา',
    scientificName: 'Geospiza propinqua',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Genovesa_Cactus_Finch_(Geospiza_propinqua),_female,_Genovesa.jpg?width=640',
    imageAlt: 'ภาพนกฟินช์กระบองเพชรเกโนเวซาเพศเมียบนเกาะ Genovesa',
    detailPhoto: {
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Genovesa_Cactus_Finch_(Geospiza_propinqua),_female,_Genovesa.jpg?width=960',
      imageAlt: 'ภาพนกฟินช์กระบองเพชรเกโนเวซาเพศเมียบนเกาะ Genovesa',
      credit: 'D. Gordon E. Robertson',
      source: 'https://commons.wikimedia.org/wiki/File:Genovesa_Cactus_Finch_(Geospiza_propinqua),_female,_Genovesa.jpg',
      license: 'CC BY-SA 4.0',
      licenseSource: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    beak: 'คู่มือไม่ได้ระบุรูปร่างจะงอยปากเฉพาะของนกชนิดนี้ ลองสังเกตจะงอยปากในภาพแล้วเปรียบเทียบกับแหล่งอาหาร',
    food: 'ทรัพยากรจาก Opuntia เมล็ดพืช และสัตว์ไม่มีกระดูกสันหลัง',
    feedingBehavior: 'งานศึกษารายงานการกินดอกและเมล็ดของ Opuntia ส่วนคู่มือภาคสนามระบุว่ากินสัตว์ไม่มีกระดูกสันหลังด้วย',
    foodResource: 'opuntia',
    environmentConnection: 'คู่มือภาคสนามระบุว่านี่คือนกฟินช์กระบองเพชรประจำเกาะ Genovesa โดยเฉพาะ และเชื่อมโยงกับเกาะผ่านถิ่นอาศัยแห้งแล้งและอาหารจาก Opuntia',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์กระบองเพชรเกโนเวซา', url: CDF_FIELD_GUIDE_SOURCE, scope: 'ชื่อชนิดพันธุ์ที่ยอมรับ ถิ่นอาศัยแห้งแล้งและชายฝั่ง เมล็ดพืชและสัตว์ไม่มีกระดูกสันหลัง และการกระจายพันธุ์เฉพาะเกาะ Genovesa' },
      { label: 'Evolutionary Journal of the Linnean Society (2025)', url: 'https://doi.org/10.1093/evolinnean/kzaf015', scope: 'รายงานการกินน้ำหวาน เกสร และเมล็ดของ Opuntia helleri ในปริมาณมากของ Geospiza propinqua' },
      { label: 'Wikimedia Commons · ภาพถ่ายชนิดพันธุ์', url: 'https://commons.wikimedia.org/wiki/File:Genovesa_Cactus_Finch_(Geospiza_propinqua),_female,_Genovesa.jpg', scope: 'ข้อมูลระบุภาพ ผู้สร้างภาพ และสัญญาอนุญาต CC BY-SA' },
    ],
  },
  {
    id: 'common-cactus',
    commonName: 'นกฟินช์กระบองเพชรทั่วไป',
    scientificName: 'Geospiza scandens',
    image: galapagosAsset('finches/common-cactus.webp'),
    imageAlt: 'นกฟินช์กระบองเพชรทั่วไปจากชุดภาพนกฟินช์กาลาปากอสที่จัดเตรียมไว้',
    suppliedImage: true,
    detailPhoto: {
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Common_Cactus-finch_%28Geospiza_scandens%29_%2820674925931%29.jpg/960px-Common_Cactus-finch_%28Geospiza_scandens%29_%2820674925931%29.jpg',
      imageAlt: 'ภาพนกฟินช์กระบองเพชรทั่วไปบนเกาะ South Plaza ในหมู่เกาะกาลาปากอส',
      credit: 'Lip Kee',
      source: 'https://commons.wikimedia.org/wiki/File:Common_Cactus-finch_(Geospiza_scandens)_(20674925931).jpg',
      license: 'CC BY-SA 2.0',
      licenseSource: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
    beak: 'จะงอยปากยาวและแหลมกว่าของนกฟินช์ชนิดอื่น',
    food: 'ดอก น้ำหวาน ผลและเมล็ดของ Opuntia รวมถึงสัตว์ไม่มีกระดูกสันหลัง',
    feedingBehavior: 'กินส่วนต่าง ๆ ของ Opuntia เป็นหลัก และกินเมล็ดกับสัตว์ไม่มีกระดูกสันหลังด้วย',
    foodResource: 'opuntia',
    environmentConnection: 'พบในถิ่นอาศัยแห้งแล้งที่มี Opuntia มาก คู่มือภาคสนามปี 2022 ระบุว่าไม่พบชนิดนี้บนเกาะ Genovesa และ Española',
    evidenceSources: [
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza scandens', url: cdfSpeciesSource('5097'), scope: 'ข้อมูลประกอบชื่อชนิดพันธุ์ที่ยอมรับและอาหารที่เน้น Opuntia; ดูคู่มือปี 2022 สำหรับการกระจายพันธุ์ตามเกาะ' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์กระบองเพชรทั่วไป', url: CDF_FIELD_GUIDE_SOURCE, scope: 'คำอธิบายจะงอยปาก อาหาร และการกระจายพันธุ์ โดยไม่รวมเกาะ Genovesa และ Española' },
      { label: 'Galápagos Insiders · นกฟินช์ของดาร์วิน', url: INSIDERS_SOURCE, scope: 'ภาพรวมทั่วไป; บทเรียนนี้ใช้ข้อมูลอนุกรมวิธานและการกระจายพันธุ์จาก CDF ปี 2022 ซึ่งเป็นข้อมูลที่ปรับปรุงกว่า' },
    ],
  },
  {
    id: 'medium-tree',
    commonName: 'นกฟินช์ต้นไม้ขนาดกลาง',
    scientificName: 'Camarhynchus pauper',
    image: galapagosAsset('finches/medium-tree.webp'),
    imageAlt: 'นกฟินช์ต้นไม้ขนาดกลางจากชุดภาพนกฟินช์กาลาปากอสที่จัดเตรียมไว้',
    suppliedImage: true,
    detailPhoto: {
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/MTF_male.jpg/960px-MTF_male.jpg?utm_campaign=index&utm_content=thumbnail&utm_source=commons.wikimedia.org',
      imageAlt: 'ภาพนกฟินช์ต้นไม้ขนาดกลางเพศผู้บนเกาะ Floreana',
      credit: 'Jody O’Connor · 2010',
      source: 'https://commons.wikimedia.org/wiki/File:MTF_male.jpg',
      license: 'Public domain',
    },
    beak: 'ใช้จะงอยปากแซะและงัดเปลือกไม้เพื่อหาเหยื่อ แต่คู่มือไม่ได้บรรยายรูปร่างจะงอยปากไว้แยกต่างหาก',
    food: 'ส่วนใหญ่เป็นสัตว์ไม่มีกระดูกสันหลังและเมล็ดพืช รวมถึงผลไม้และน้ำหวาน',
    feedingBehavior: 'มักแซะและงัดเปลือกไม้เพื่อหาเหยื่อ',
    foodResource: 'invertebrates',
    environmentConnection: 'นกฟินช์ชนิดนี้พบในพื้นที่สูงของเกาะ Floreana ซึ่งพืชพรรณและต้นไม้เป็นแหล่งหาอาหาร',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์ต้นไม้ขนาดกลาง', url: CDF_FIELD_GUIDE_SOURCE, scope: 'การกระจายพันธุ์เฉพาะเกาะ Floreana ถิ่นอาศัย อาหาร และพฤติกรรมหาอาหารตามเปลือกไม้' },
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Camarhynchus pauper', url: cdfSpeciesSource('5054'), scope: 'ชื่อชนิดพันธุ์ที่ยอมรับ การกระจายพันธุ์บนเกาะ Floreana และสถานภาพของชนิดพันธุ์' },
      { label: 'Galápagos Insiders · นกฟินช์ของดาร์วิน', url: INSIDERS_SOURCE, scope: 'ภาพรวมความเชื่อมโยงระหว่างนกชนิดนี้กับพื้นที่สูงของเกาะ Floreana' },
    ],
  },
  {
    id: 'small-ground',
    commonName: 'นกฟินช์พื้นดินขนาดเล็ก',
    scientificName: 'Geospiza fuliginosa',
    image: galapagosAsset('finches/small-ground-finch-640.jpg'),
    imageSrcSet: `${galapagosAsset('finches/small-ground-finch-640.jpg')} 640w, ${galapagosAsset('finches/small-ground-finch.jpg')} 1920w`,
    imageAlt: 'นกฟินช์พื้นดินขนาดเล็กเกาะอยู่ท่ามกลางกิ่งไม้',
    suppliedImage: true,
    detailPhoto: {
      image: galapagosAsset('finches/small-ground-finch.jpg'),
      imageAlt: 'นกฟินช์พื้นดินขนาดเล็กเกาะอยู่ท่ามกลางกิ่งไม้',
      credit: 'ภาพถ่ายที่จัดเตรียมสำหรับบทเรียนนี้',
    },
    beak: 'จะงอยปากขนาดเล็ก ปลายแหลมและโค้งเล็กน้อย เหมาะกับอาหารชิ้นเล็ก',
    food: 'ส่วนใหญ่เป็นเมล็ดพืช รวมถึงผลไม้และสัตว์ไม่มีกระดูกสันหลัง',
    feedingBehavior: 'กินอาหารจากทรัพยากรหลายชนิดตามโอกาส',
    foodResource: 'seeds',
    environmentConnection: 'เกาะ Santa Cruz มีถิ่นอาศัยหลากหลาย นกฟินช์ต่างชนิดอาจใช้ประโยชน์จากอาหารคนละขนาดและคนละประเภท',
    evidenceSources: [
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza fuliginosa', url: cdfSpeciesSource('5095'), scope: 'ชื่อชนิดพันธุ์ที่ยอมรับ อาหารหลากหลาย ถิ่นอาศัย และการกระจายพันธุ์ซึ่งรวมถึงเกาะ Santa Cruz' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์พื้นดินขนาดเล็ก', url: CDF_FIELD_GUIDE_SOURCE, scope: 'อาหาร เขตถิ่นอาศัย และการเปรียบเทียบขนาดจะงอยปากกับนกฟินช์พื้นดินขนาดกลาง' },
      { label: 'Galápagos Insiders · นกฟินช์ของดาร์วิน', url: INSIDERS_SOURCE, scope: 'ภาพรวมรูปร่างจะงอยปากและการใช้อาหาร' },
    ],
  },
  {
    id: 'large-ground',
    commonName: 'นกฟินช์พื้นดินขนาดใหญ่',
    scientificName: 'Geospiza magnirostris',
    image: galapagosAsset('finches/large-ground.webp'),
    imageAlt: 'นกฟินช์พื้นดินขนาดใหญ่จากชุดภาพนกฟินช์กาลาปากอสที่จัดเตรียมไว้',
    suppliedImage: true,
    detailPhoto: {
      image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Geospiza_magnirostris_558496145.jpg/960px-Geospiza_magnirostris_558496145.jpg?utm_campaign=index&utm_content=thumbnail&utm_source=commons.wikimedia.org',
      imageAlt: 'ภาพนกฟินช์พื้นดินขนาดใหญ่ในหมู่เกาะกาลาปากอส',
      credit: 'Charlotte Kirchner',
      source: 'https://commons.wikimedia.org/wiki/File:Geospiza_magnirostris_558496145.jpg',
      license: 'CC BY 4.0',
      licenseSource: 'https://creativecommons.org/licenses/by/4.0/',
    },
    beak: 'จะงอยปากขนาดใหญ่และแข็งแรงช่วยกะเทาะเมล็ดที่แข็งกว่าได้',
    food: 'ส่วนใหญ่เป็นเมล็ดขนาดใหญ่ รวมถึงผลไม้และสัตว์ไม่มีกระดูกสันหลัง',
    feedingBehavior: 'ใช้จะงอยปากใหญ่และสั้นกะเทาะเมล็ดและถั่ว',
    foodResource: 'seeds',
    environmentConnection: 'เกาะ Isabela มีถิ่นอาศัยหลากหลาย จะงอยปากแข็งแรงอาจช่วยให้นกฟินช์ชนิดนี้จัดการกับอาหารที่แข็งกว่าได้',
    evidenceSources: [
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza magnirostris', url: cdfSpeciesSource('5096'), scope: 'ชื่อชนิดพันธุ์ที่ยอมรับ การกินเมล็ดขนาดใหญ่ ขนาดจะงอยปาก และการกระจายพันธุ์ซึ่งรวมถึงเกาะ Isabela' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์พื้นดินขนาดใหญ่', url: CDF_FIELD_GUIDE_SOURCE, scope: 'อาหาร ถิ่นอาศัย จะงอยปากขนาดใหญ่ และการกระจายพันธุ์ตามเกาะ' },
      { label: 'Galápagos Insiders · นกฟินช์ของดาร์วิน', url: INSIDERS_SOURCE, scope: 'ภาพรวมจะงอยปากและพฤติกรรมกะเทาะเมล็ด' },
    ],
  },
]

export const speciesById = Object.fromEntries(species.map((bird) => [bird.id, bird])) as Record<FinchSpeciesId, FinchSpecies>

export const islands: Island[] = [
  {
    id: 'daphne-major',
    name: 'Daphne Major',
    overview: 'Daphne Major เป็นพื้นที่ศึกษาแห้งแล้ง ซึ่งเมล็ดพืชและปริมาณอาหารที่เปลี่ยนแปลงมีความสำคัญต่อนกฟินช์พื้นดิน',
    habitat: 'พื้นที่ราบต่ำแห้งแล้งและเป็นหิน มีพืชพรรณขึ้นอยู่น้อย',
    vegetation: 'มีไม้พุ่มประปรายและพืชที่ทนต่อความแห้งแล้ง',
    foodSources: 'นกฟินช์พื้นดินกินเมล็ดพืชเป็นหลัก และกินอาหารชนิดอื่นด้วย',
    featuredFinch: 'medium-ground',
    environmentImage: 'https://galapagosinformation.com/images/pics-gallery/flora/colors-of-daphne-island-galapagos-island.jpg',
    environmentImageAlt: 'กระบองเพชรและไม้พุ่มเตี้ยบนเนินหินแห้งแล้งของเกาะ Daphne',
    environmentPhotoCredit: 'GalápagosInformation · พืชพรรณบนเกาะ',
    environmentPhotoSource: 'https://galapagosinformation.com/pics-gallery-flora-galapagos-island.html',
    evidenceSources: [
      { label: 'Nature · งานศึกษาการคัดเลือกบน Daphne Major (1984)', url: NATURE_SELECTION_SOURCE, scope: 'หลักฐานภาคสนามโดยตรงที่เชื่อมโยงการลดลงของอาหารกับการคัดเลือกในนกฟินช์พื้นดินขนาดกลาง' },
      { label: 'Ecological Monographs · นิเวศการกินอาหารบน Daphne Major (1984)', url: 'https://doi.org/10.2307/1942596', scope: 'ชุมชนพืชและทรัพยากรอาหารตามฤดูกาลที่ศึกษาไว้บน Daphne Major' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์พื้นดินขนาดกลาง', url: CDF_FIELD_GUIDE_SOURCE, scope: 'อาหารที่เน้นเมล็ดพืชและการพบในเขตแห้งแล้ง แต่ไม่ได้เป็นการสำรวจพืชบน Daphne Major อย่างครบถ้วน' },
    ],
    mapPath: 'M562 424 C565 417 571 413 578 414 L586 418 590 424 587 431 580 435 572 433 566 429 Z',
    mapCenter: [576, 424],
    labelPosition: [534, 436],
    labelAnchor: 'end',
  },
  {
    id: 'espanola',
    name: 'Española',
    overview: 'เกาะแห้งแล้งที่กระบองเพชร Opuntia เป็นแหล่งดอก ผล และเมล็ด',
    habitat: 'ถิ่นอาศัยแห้งแล้งบริเวณชายฝั่งและพื้นที่ราบต่ำที่มีไม้พุ่ม',
    vegetation: 'มี Opuntia จำนวนมากขึ้นปะปนกับไม้พุ่มและป่าโปร่งในเขตแห้งแล้ง',
    foodSources: 'นกฟินช์ตัวอย่างกิน Opuntia เมล็ดขนาดใหญ่ และสัตว์ขาข้อ',
    featuredFinch: 'large-cactus',
    environmentImage: 'https://datazone.darwinfoundation.org/images/checklist/DSCN3202.jpg',
    environmentImageAlt: 'กระบองเพชร Opuntia ในถิ่นอาศัยแห้งแล้งบนเกาะ Española',
    environmentPhotoCredit: 'Charles Darwin Foundation · พืชพรรณกาลาปากอส',
    environmentPhotoSource: 'https://datazone.darwinfoundation.org/en/checklist/?species=250',
    evidenceSources: [
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza conirostris', url: cdfSpeciesSource('5092'), scope: 'ถิ่นไม้พุ่มและป่าโปร่งแห้งแล้งที่มี Opuntia จำนวนมาก รวมถึงอาหารของนกฟินช์กระบองเพชรเอสปันโญลา' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์กระบองเพชรเอสปันโญลา', url: CDF_FIELD_GUIDE_SOURCE, scope: 'การพบในถิ่นอาศัยชายฝั่งและเขตแห้งแล้ง อาหาร และการกระจายพันธุ์เฉพาะเกาะ Española' },
    ],
    mapPath: 'M829 758 C838 747 851 742 866 744 L886 750 899 761 900 773 890 782 875 784 856 779 839 774 830 767 Z',
    mapCenter: [866, 763],
    labelPosition: [870, 787],
  },
  {
    id: 'genovesa',
    name: 'Genovesa',
    overview: 'ถิ่นอาศัยแห้งแล้งบนเกาะ Genovesa เป็นแหล่งอาศัยของนกฟินช์กระบองเพชรประจำเกาะและ Opuntia พื้นถิ่น',
    habitat: 'ถิ่นอาศัยแห้งแล้งบริเวณชายฝั่งและพื้นที่ราบต่ำบนเกาะภูเขาไฟ',
    vegetation: 'กระบองเพชร Opuntia พื้นถิ่นขึ้นร่วมกับพืชในเขตแห้งแล้ง',
    foodSources: 'น้ำหวาน เกสร และเมล็ดของ Opuntia; นกฟินช์ยังกินสัตว์ไม่มีกระดูกสันหลังด้วย',
    featuredFinch: 'genovesa-cactus',
    environmentImage: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Opuntia_helleri.JPG',
    environmentImageAlt: 'กระบองเพชร Opuntia helleri บนพื้นภูเขาไฟแห้งแล้งของเกาะ Genovesa',
    environmentPhotoCredit: 'Wikimedia Commons · Opuntia helleri',
    environmentPhotoSource: 'https://commons.wikimedia.org/wiki/File:Opuntia_helleri.JPG',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์กระบองเพชรเกโนเวซา', url: CDF_FIELD_GUIDE_SOURCE, scope: 'ชนิดพันธุ์เฉพาะเกาะ Genovesa ถิ่นอาศัยแห้งแล้งและชายฝั่ง อาหาร และการกระจายพันธุ์' },
      { label: 'Evolutionary Journal of the Linnean Society (2025)', url: 'https://doi.org/10.1093/evolinnean/kzaf015', scope: 'การใช้ประโยชน์จากน้ำหวาน เกสร และเมล็ดของ Opuntia helleri โดย Geospiza propinqua' },
    ],
    mapPath: 'M731 128 C734 119 741 115 749 117 L758 121 763 129 760 138 753 143 744 142 737 138 Z',
    mapCenter: [748, 130],
    labelPosition: [748, 162],
  },
  {
    id: 'floreana',
    name: 'Floreana',
    overview: 'พื้นที่สูงของเกาะ Floreana มีพืชพรรณหนาแน่นกว่าพื้นที่ราบต่ำแห้งแล้ง',
    habitat: 'พื้นที่ราบต่ำแห้งแล้งบริเวณชายฝั่งต่อเนื่องขึ้นไปถึงถิ่นอาศัยพื้นที่สูงที่ชุ่มชื้นกว่า',
    vegetation: 'ป่าบนพื้นที่สูงมีพืชสกุล Scalesia และพืชชนิดอื่น',
    foodSources: 'นกฟินช์ต้นไม้ขนาดกลางกินสัตว์ไม่มีกระดูกสันหลังและเมล็ดพืชเป็นหลัก รวมถึงผลไม้และน้ำหวาน',
    featuredFinch: 'medium-tree',
    environmentImage: 'https://galapagosconservation.org.uk/wp-content/uploads/2023/02/Floreana-highlands-%C2%A9-Just-Janza-1174x0-c-default.jpg',
    environmentImageAlt: 'พุ่มไม้สีเขียวและต้นไม้ประปรายบนพื้นที่สูงที่มีพืชพรรณหนาแน่นของเกาะ Floreana',
    environmentPhotoCredit: 'Galápagos Conservation Trust · พื้นที่สูงของ Floreana',
    environmentPhotoSource: 'https://galapagosconservation.org.uk/floreana-a-model-island-for-holistic-restoration/',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · นกฟินช์ต้นไม้ขนาดกลาง', url: CDF_FIELD_GUIDE_SOURCE, scope: 'การกระจายพันธุ์เฉพาะเกาะ Floreana การพบในถิ่นอาศัยพื้นที่สูง อาหาร และพฤติกรรมหาอาหารตามเปลือกไม้' },
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Camarhynchus pauper', url: cdfSpeciesSource('5054'), scope: 'ชื่อชนิดพันธุ์ที่ยอมรับและการกระจายพันธุ์บนเกาะ Floreana' },
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · เขตพืชพรรณ', url: CDF_FIELD_GUIDE_SOURCE, scope: 'เขตพืชพรรณที่สัมพันธ์กับระดับความสูงบนเกาะที่มีพื้นที่สูง' },
    ],
    mapPath: 'M519 722 C522 709 533 698 548 696 L563 699 576 707 583 720 580 734 569 745 553 750 537 746 525 737 Z',
    mapCenter: [551, 723],
    labelPosition: [551, 767],
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    overview: 'เกาะ Santa Cruz มีตั้งแต่พื้นที่ราบต่ำแห้งแล้งไปจนถึงพื้นที่สูงที่เขียวชอุ่มและมีเขตถิ่นอาศัยแตกต่างกัน',
    habitat: 'ถิ่นอาศัยแห้งแล้งบริเวณชายฝั่งต่อเนื่องขึ้นไปถึงเขตพื้นที่สูงชุ่มชื้น',
    vegetation: 'พืชในเขตแห้งแล้งค่อย ๆ เปลี่ยนเป็นพืชพรรณเขียวชอุ่มบนพื้นที่สูง',
    foodSources: 'นกฟินช์พื้นดินขนาดเล็กกินเมล็ดพืชเป็นหลัก รวมถึงผลไม้และสัตว์ไม่มีกระดูกสันหลัง',
    featuredFinch: 'small-ground',
    environmentImage: 'https://d2ujpqfu85jxzw.cloudfront.net/website/panth-live/styles/full_width_varied_height/s3/artwork/P1990-51-2323/carter_p1990-51-2323_o2_14.jpg',
    environmentImageAlt: 'ต้น Scalesia บนพื้นที่สูงที่มีพืชพรรณหนาแน่นของเกาะ Santa Cruz',
    environmentPhotoCredit: 'Eliot Porter · Amon Carter Museum of American Art',
    environmentPhotoSource: 'https://www.cartermuseum.org/collection/scalesia-tree-santa-cruz-island-galapagos-islands-april-23-1966-p1990512323',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · เขตพืชพรรณบนเกาะพื้นที่สูง', url: CDF_FIELD_GUIDE_SOURCE, scope: 'เกาะ Santa Cruz มีทั้งพื้นที่ราบต่ำแห้งแล้งและพื้นที่สูงชุ่มชื้น' },
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza fuliginosa', url: cdfSpeciesSource('5095'), scope: 'อาหารและการกระจายพันธุ์ของนกฟินช์พื้นดินขนาดเล็กบนเกาะ Santa Cruz' },
    ],
    mapPath: 'M502 478 C505 464 516 452 531 445 L550 443 570 447 588 455 601 468 605 483 599 496 586 505 568 509 552 504 540 512 523 507 511 496 504 488 Z',
    mapCenter: [554, 478],
    labelPosition: [570, 548],
    labelAnchor: 'start',
  },
  {
    id: 'isabela',
    name: 'Isabela',
    overview: 'เกาะ Isabela มีเขตถิ่นอาศัยหลายแบบ โดยนกฟินช์พื้นดินขนาดใหญ่เป็นตัวอย่างหนึ่งของนกที่กินเมล็ดพืช',
    habitat: 'เกาะขนาดใหญ่ที่มีทั้งเขตชายฝั่งแห้งแล้งและพื้นที่สูงชุ่มชื้น',
    vegetation: 'พืชบริเวณชายฝั่งแห้งแล้งและพืชพรรณเขียวชอุ่มบนพื้นที่สูงพบได้ในระดับความสูงต่างกัน',
    foodSources: 'นกฟินช์พื้นดินขนาดใหญ่กินเมล็ดขนาดใหญ่เป็นหลัก ส่วนนกฟินช์ชนิดอื่นใช้แหล่งอาหารแบบอื่น',
    featuredFinch: 'large-ground',
    environmentImage: 'https://d2ujpqfu85jxzw.cloudfront.net/website/panth-live/styles/full_width_varied_height/s3/artwork/P1990-51-2336/carter_p1990-51-2336_o2_15.jpg',
    environmentImageAlt: 'ต้น Palo Santo และกระบองเพชรที่ขึ้นท่ามกลางหินภูเขาไฟบริเวณอ่าว Cartago บนเกาะ Isabela',
    environmentPhotoCredit: 'Eliot Porter · Amon Carter Museum of American Art',
    environmentPhotoSource: 'https://www.cartermuseum.org/collection/palo-santo-and-cactus-cartago-bay-isabella-island-galapagos-islands-may-8-1966',
    evidenceSources: [
      { label: 'คู่มือภาคสนาม CDF ปี 2022 · เขตพืชพรรณบนเกาะพื้นที่สูง', url: CDF_FIELD_GUIDE_SOURCE, scope: 'เกาะ Isabela มีทั้งถิ่นอาศัยแห้งแล้งบนพื้นที่ราบต่ำและถิ่นอาศัยชุ่มชื้นบนพื้นที่สูง' },
      { label: 'ฐานข้อมูลชนิดพันธุ์กาลาปากอส · Geospiza magnirostris', url: cdfSpeciesSource('5096'), scope: 'อาหาร คำอธิบายจะงอยปาก และการพบของนกฟินช์พื้นดินขนาดใหญ่บนเกาะ Isabela' },
    ],
    mapPath: 'M150 190 C170 172 192 160 214 161 L237 170 255 189 263 215 260 242 270 271 284 300 289 330 283 358 296 387 310 418 308 447 322 476 345 505 361 531 359 553 346 573 325 587 300 592 277 587 253 574 231 564 211 558 188 548 167 541 146 531 128 516 116 497 121 479 136 460 153 447 169 430 173 407 166 384 159 358 151 332 147 305 152 278 148 249 153 221 Z',
    mapCenter: [231, 390],
    labelPosition: [244, 202],
    labelAnchor: 'start',
  },
]
