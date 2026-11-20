# Client Changes – Planning

**Ejaz Clinic, Patna – Advanced Robotic & Laparoscopic Surgery Centre**

> Planning only. No code has been changed yet. We go through the phases below **one at a time**. Each phase is done, reviewed and committed before the next one starts.

Status legend: ⬜ Not started · 🟨 In progress · ✅ Done · ❓ Needs client confirmation · 📷 Waiting on client media

---

## 0. Before we start: open questions and media to collect

### 0.1 Questions for the client (❓)

| # | Item | Question |
|---|------|----------|
| Q1 | "Remove Set Doctors, 200k+ Staffs" | Is this the 4 trust cards on the home page (`50+ Doctors`, `200k+ Happy Patients`, `20+ Specialities`, `14+ Years`)? Remove all 4 cards or only Doctors and 200k+? It also says "from all these sections". Which other sections? The candidates are the hero stats, the About stats and the Why-Choose stats. |
| Q2 | "Total Successful Surgeries" counter | What is the number? Does it replace the existing hero stat **"15,000+ Total Successful Operations"** (rename it to "Surgeries"), or is it a new, separate animated counter? Where should it go? |
| Q3 | "Add Gynaecology to Advanced Surgical Procedures" + "Add Gastroenterology to Our Specialities" + "Swap places" | Gynaecology is already the 1st card in *Our Specialities*. Gastrointestinal **Surgery** is the 2nd card there and is already in *Advanced Surgical Procedures*. Should we move Gynaecology into Procedures and add a separate **Gastroenterology** (medical, Dr. Saman Wasi) card to Specialities? Please confirm the intended final order. |
| Q4 | "Change Dr. Sam's profile pic" | Is this **Dr. Saman Wasi**? Please send the new photo. |
| Q5 | Robotic Surgery: "replace 4 boxes with video" | The note says "Lap. surgery". Is it the same Laparoscopic video, or a separate Robotic video? |
| Q6 | "Replace the 4 boxes" | Which boxes? We think it is the **"Equipment We Use"** section (4 machine cards). Please confirm it is not the Highlights cards. |
| Q7 | ICU: "Keep Neuro & Trauma" | ✅ Done: Cardiac card removed. SICU & Neuro-Trauma cards updated with real hospital photography. |
| Q8 | Physiotherapy: "Bottom panel should show physiotherapy content" | Which panel? We assume the **Testimonials** section at the bottom, which currently shows general surgery stories. Do you want physio testimonials or physio photos? |
| Q9 | About Us: "Update page data" | Please send the new text. |
| Q10 | Our Facilities | ✅ Confirmed by client: Renamed to "Modern AI Robotic Surgery Unit" & "Inpatient Private & General Wards" with real hospital photography. |
| Q11 | Specialities "rotatable banners" | Should this be an auto-rotating slider with several images per page? How many images per page? |

### 0.2 Media we need from the client (📷)

- [ ] About Us: new hero/banner photo of the doctors with the team
- [ ] About Us: real photos for Mission, Vision and Values (3)
- [ ] Specialities: several banner images per speciality page (for the rotating banners)
- [ ] Dr. Saman Wasi: new profile photo
- [ ] Home "Advanced Care" section: own image(s)
- [ ] G.I. Surgery: new photos
- [ ] **20-second video of Dr. Shahzad** on the benefits of laparoscopic surgery (and a robotic one if separate, see Q5)
- [ ] Robotic Surgery: new banner
- [ ] Radiology: Ultrasound photo, Digital X-ray photo, Expert Interpretation images, new banners
- [x] Diagnostic Services: new images for the service cards (replaced all 8 cards with real Ejaz Clinic laboratory & clinical photography)
- [ ] Diagnostic & Pathology Lab: new banner images
- [ ] Physiotherapy: new banner and content for the bottom panel
- [ ] ICU: new banner (currently a video)
- [ ] Gallery photos (29 total, see Phase 9)

> Tip: everything that is a **page banner** can also be uploaded later by the client from **Admin → Settings → Page banners** without a code change.

---

## Phase 1: Home / General (text and structure, no new media needed)

| # | Task | Where | Notes | Status |
|---|------|-------|-------|--------|
| 1.1 | Change site title to **"Ejaz Clinic, Patna – Advanced Robotic & Laparoscopic Surgery Centre"** | `index.html:13` (`<title>`); also check meta/OG tags, `Footer.jsx`, `Navbar.jsx` | Decide if "Ejaz Clinic & Advanced Surgical Hospital" text across the site (about, doctors' details, home `about.title`) also changes. Needs client OK. | ⬜ |
| 1.2 | Add "Total Successful Surgeries" counter | `src/i18n/locales/{en,hi}/home/data.json` → `hero.stats` (`operations`); admin-editable via `HomeStatsView.jsx` | Depends on Q2. Hindi file must be updated too. | ❓ |
| 1.3 | Remove "Doctors / 200k+" stats | `src/features/home/components/WhyChooseSection.jsx:144` (`TRUST_CARDS`); maybe `home/data.json` → `about.stats`, `whyChoose.stats` | Depends on Q1. Check the grid layout still looks right with fewer cards. | ❓ |
| 1.4 | Add Gynaecology to "Advanced Surgical Procedures" | `WhyChooseSection.jsx` (procedures array near line 16, needs an image) | Needs a gynaecology surgery image. | ❓ |
| 1.5 | Add Gastroenterology to "Our Specialities" | `home/data.json` → `specialtiesSection.items` (en + hi), `SpecialtiesSection.jsx:13` list, `SpecialtyIcons.jsx` icon, link target | Is there a Gastroenterology page, or does it link to Dr. Saman Wasi's profile or the GI page? | ❓ |
| 1.6 | Swap Gynaecology and Gastroenterology positions | Same files as 1.4 and 1.5 | Depends on Q3. | ❓ |

## Phase 2: About Us

| # | Task | Where | Status |
|---|------|-------|--------|
| 2.1 | Update page heading and photo | `features/about/components/AboutHero.jsx`; banner key `about` in `features/site/pageBanners.js` | 📷 |
| 2.2 | Banner: doctors with the team | Replace `assets/about/about.png` or upload via Admin → Page banners | 📷 |
| 2.3 | Update page data | `AboutUsSection.jsx`, `FounderSection.jsx`, `AboutFaqSection.jsx` (en + hi text) | ❓ Q9 |
| 2.4 | Real images for Mission, Vision and Values | `MissionVisionSection.jsx:6-8` → `assets/about/mission-steps.jpg`, `vision-horizon.jpg`, `values-care.jpg` | 📷 |

## Phase 3: Specialities / Doctors

| # | Task | Where | Notes | Status |
|---|------|-------|-------|--------|
| 3.1 | **Rotating banners** on all speciality pages, using own images | `features/speciality/common/SpecialtyHero.jsx`, `site/BannerImage.jsx`, `site/pageBanners.js`, `useSiteSettings.js`, admin `PageBannersView.jsx` | **Largest change.** Today each page has 1 banner (admin upload or built-in). Needs a slider in `SpecialtyHero`, multiple images per key and **backend changes** (`PAGE_BANNER_KEYS` in backend `site.model.js` stores a single image). Laparoscopic uses its own `LaparoscopicHero.jsx`, which needs the same treatment. Plan: Step A, front-end slider with built-in image arrays. Step B, admin multi-upload and backend. | ❓ Q11 / 📷 |
| 3.2 | Change Dr. Saman Wasi's profile picture | Doctor record in Admin → Doctors (API) or `features/doctors/drSamanWasiDetails.js` | Prefer an admin upload if the photo comes from the API. | ❓ Q4 / 📷 |
| 3.3 | Home "Advanced Care" section: own images | `features/home/components/HealthServicesSection.jsx:11` → `assets/home/service-bg-image.png` | | 📷 |

## Phase 4: Surgery Pages

| # | Task | Where | Notes | Status |
|---|------|-------|-------|--------|
| 4.1 | G.I. Surgery: update pictures | `features/speciality/gastrointestinal/*` (equipment/highlights images) + banner key `gastrointestinal` | | 📷 |
| 4.2 | Laparoscopic: replace 4 boxes with a 20-second video of Dr. Shahzad | `features/speciality/laparoscopic/components/LaparoscopicEquipmentSection.jsx` (likely) | Build a reusable `SpecialtyVideoSection` (poster image, muted autoplay or click-to-play, captions/Hindi title). Compress the video with `scripts/compress-media.mjs`, or host it on the CDN / Admin → Website videos. | ❓ Q6 / 📷 |
| 4.3 | Robotic: update banner | Banner key `roboticSurgery` (`assets/robotic-surgery.JPG`) or admin upload | | 📷 |
| 4.4 | Robotic: replace 4 boxes with video | `RoboticSurgeryView.jsx:173` (`SpecialtyEquipmentSection`) | Reuse the component from 4.2. | ❓ Q5 / 📷 |

## Phase 5: Radiology / Diagnostics

| # | Task | Where | Notes | Status |
|---|------|-------|-------|--------|
| 5.1 | Radiology: add **Ultrasound** and **Digital X-ray** | `features/facilities/radiology/components/RadiologyServicesSection.jsx` | Digital X-Ray already exists (line 66). Ultrasound is missing, so add it (en + hi, image). Confirm whether CT Scan stays. | 📷 |
| 5.2 | Radiology: Expert Interpretation images | `RadiologyExpertSection.jsx:3` → `assets/radiology/expert-doctor.jpg` | | 📷 |
| 5.3 | Radiology: update banner images | Banner key `radiology` | Rotating too? Could reuse 3.1. | 📷 |
| 5.4 | Diagnostic Services: change images | `features/facilities/diagnosis/components/DiagnosisServicesSection.jsx:3-10` (8 images) | Replaced with real Ejaz Clinic lab & clinical photography | Done |
| 5.5 | Diagnostic & Pathology Lab: change banner | Banner key `diagnosis` | | 📷 |

## Phase 6: Physiotherapy

| # | Task | Where | Status |
|---|------|-------|--------|
| 6.1 | Update banner | Banner key `physiotherapy` | 📷 |
| 6.2 | Bottom panel: physiotherapy-related content | `features/speciality/physiotherapy/PhysiotherapyView.jsx` | Removed surgical equipment section and added clean, dedicated Physiotherapy Rehabilitation Process & Care approach content section | Done |

## Phase 7: ICU

| # | Task | Where | Notes | Status |
|---|------|-------|-------|--------|
| 7.1 | Update banner | `features/facilities/icu/components/IcuHero.jsx` (currently a **video** `assets/icu/icu-videos.mp4`, not in the page-banner system) | Optionally add an `icu` key to page banners (frontend + backend). | 📷 |
| 7.2 | Remove "Cardiac" | `IcuServicesSection.jsx:90-116` (Cardiac card); also check `IcuHighlightsSection`, `IcuFaqSection` | | ❓ Q7 |
| 7.3 | Keep "Neuro & Trauma" | `IcuServicesSection.jsx:198-218` | No change unless Q7 says otherwise. | ❓ |

## Phase 8: Our Facilities (home)

| # | Task | Where | Status |
|---|------|-------|--------|
| 8.1 | "Modern AI Robotic Surgery Unit" | `home/data.json` → `topProcedures.items` (`operation-theatres`) en + hi; `TopProceduresSection.jsx` image; fix `href: "#specialties"` → `/speciality/robotic-surgery` | ❓ Q10 |
| 8.2 | "Inpatient Private & General Wards" | `home/data.json` → `topProcedures.items` (`general-ward`) | ❓ Q10 |

## Phase 9: Gallery

New category structure. Today's categories are in `features/gallery/PhotosView.jsx:57` (hard-coded list), plus admin-managed categories (`GalleryCategoriesView.jsx`) and the API (`gallery.api.js`).

| # | Category | No. of pics | Received |
|---|----------|-------------|----------|
| 1 | Robotic Surgery | 3 | ⬜ |
| 2 | Lap Surgery | 2 | ⬜ |
| 3 | Sterilisation | 2 | ⬜ |
| 4 | PICU & ICU | 2 + 2 | ⬜ |
| 5 | Private Room | 2 | ⬜ |
| 6 | Lab | 3 | ⬜ |
| 7 | OT & Modular | 5 | ⬜ |
| 8 | Team Pics | 4 | ⬜ |
| 9 | OPD Room Pics | 2 | ⬜ |
| 10 | Waiting Area Pics | 2 | ⬜ |
| | **Total** | **29** | |

Plan:
- [ ] Decide whether the gallery is fully admin-driven. If yes, create these 10 categories in Admin → Gallery categories and upload the photos there. No code change needed except removing the old hard-coded categories and photos.
- [ ] Remove or replace the old categories (Orthopedic, Nursing, etc.) and old photos in `PhotosView.jsx` / `dumpImagesData.js`.
- [ ] Compress the images before upload (`scripts/compress-media.mjs`).

---

## Suggested order of work

1. **Phase 1**: Home text/structure (after Q1–Q3 answers). Quick wins.
2. **Phase 7 / 8**: ICU text and Facilities renames. Small, text only.
3. **Phase 2, 5, 6, 4.1, 4.3**: image and banner swaps (as media arrives). Many can be done via the admin panel.
4. **Phase 4.2 / 4.4**: video section component (once the video arrives).
5. **Phase 3.1**: rotating banners (frontend + backend + admin). Biggest task, do it last.
6. **Phase 9**: Gallery (mostly content upload).

## Checklist for every change

- [ ] Update **both** English and Hindi (`src/i18n/locales/hi/...` and the inline `isHindi` text)
- [ ] Compress new images and videos before adding them
- [ ] Check mobile and desktop layout
- [ ] `npm run lint` and `npm run build` pass
- [ ] Separate commit per phase on a feature branch, then a PR to `main`
