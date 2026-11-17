# Plant Learning Hub

ห้องทดลองชีววิทยาพฤกษศาสตร์แบบ interactive สร้างด้วย React, TypeScript และ Vite เนื้อหาเวอร์ชันแรกเน้นเรื่องฮอร์โมนพืช และออกแบบข้อมูลบทเรียนให้เพิ่มหัวข้อใหม่ได้ในภายหลัง

## เริ่มใช้งานในเครื่อง

ต้องมี Node.js 24 และ pnpm 11 ขึ้นไป

```sh
pnpm install
pnpm run dev
```

Vite จะแสดงที่อยู่เว็บไซต์ใน terminal กด `Ctrl+C` เพื่อหยุดเซิร์ฟเวอร์

## Build และ preview

```sh
pnpm run build
pnpm run preview
```

ไฟล์ static สำหรับเผยแพร่อยู่ใน `dist/`

## Deploy ไป GitHub Pages

มี workflow ใน `.github/workflows/deploy.yml` สำหรับ build และเผยแพร่เว็บไซต์เมื่อ push ไปที่ branch `main`

1. Push โปรเจกต์ขึ้น GitHub
2. เปิด **Settings → Pages** ของ repository แล้วตั้ง Source เป็น **GitHub Actions**
3. Push การเปลี่ยนแปลงไปที่ `main` หรือสั่ง workflow จากแท็บ **Actions**

เว็บไซต์ใช้ URL และ asset path แบบ relative พร้อม hash routing จึงทำงานกับ project site ใต้ `https://<username>.github.io/<repository>/` ได้

## โครงสร้าง

```text
src/
├── components/       # Navigation, SVG illustrations, experiment, quiz
├── data/             # Topic และ hormone definitions
├── App.tsx            # Hash routes และหน้า Home, Lessons, Map, Quiz, About
└── styles.css         # Design system, animation และ responsive layouts
.github/workflows/     # GitHub Pages build และ deployment
```

เพิ่ม Topic ได้จาก `src/data/lessons.ts` และเพิ่ม hormone lesson ด้วยข้อมูลใน `hormones` พร้อมหน้า lesson ที่ใช้ component ร่วมกัน
