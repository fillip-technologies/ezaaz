import SpecialtyHero from '../common/SpecialtyHero'
import RoboticAboutSection from './components/RoboticAboutSection'
import RoboticTypesSection from './components/RoboticTypesSection'
import SpecialtyHighlightsSection from '../common/SpecialtyHighlightsSection'
import SpecialtyEquipmentSection from '../common/SpecialtyEquipmentSection'
import TestimonialsSection from '../../home/components/TestimonialsSection'

// Real Hospital & OT Images from Ejaz Clinic & Advanced Surgical Hospital
import roboticHeroImg from '../../../assets/robotic-surgery.JPG'
import otTeamImg from '../../../assets/OT-PHOTOS/DSC00761.JPG'
import microSurgeryImg from '../../../assets/DSC00771.JPG'
import modularOtSuiteImg from '../../../assets/OT-PHOTOS/DSC00453.JPG'

export default function RoboticSurgeryView() {
  const roboticHighlights = [
    {
      num: '01',
      textEn: 'Led by Internationally Trained Surgical Specialists With Deep Mastery in Advanced Robotic & Minimally Invasive Interventions',
      textHi: 'रोबोटिक और न्यूनतम इनवेसिव सर्जरी में अंतरराष्ट्रीय स्तर पर प्रशिक्षित विशेषज्ञ सर्जनों का वरिष्ठ नेतृत्व'
    },
    {
      num: '02',
      textEn: '3D Stereoscopic High-Magnification Providing Unprecedented 10x–15x Depth Perception of Critical Neurovascular Bundles',
      textHi: 'महत्वपूर्ण नसों और रक्त वाहिकाओं की सुरक्षा के लिए 10x–15x त्रि-आयामी आवर्धन वाला क्रिस्टल-क्लियर 3D विज़न'
    },
    {
      num: '03',
      textEn: 'EndoWrist Micro-Instruments With 7 Degrees of Freedom Delivering 360° Rotational Dexterity Exceeding Human Hand Range',
      textHi: 'मानव हाथ की सीमा से परे 360° घूमने वाले और 7 डिग्री ऑफ फ्रीडम वाले सूक्ष्म एंडो-रिस्ट सर्जिकल उपकरण'
    },
    {
      num: '04',
      textEn: 'Computer-Aided Tremor Suppression & Motion Scaling Ensuring Micron-Level Operative Precision in Confined Anatomical Spaces',
      textHi: 'हाथ के कंपनों को पूरी तरह समाप्त कर तंग आंतरिक अंगों में माइक्रोन-स्तरीय सटीकता सुनिश्चित करने वाली तकनीक'
    },
    {
      num: '05',
      textEn: 'Substantially Reduced Blood Loss, Minimal Reliance on Pain Medications, and Near-Zero Risk of Surgical Site Infection',
      textHi: 'अत्यंत कम रक्तस्राव, नगण्य घाव संक्रमण जोखिम और दर्द निवारक दवाओं की न्यूनतम आवश्यकता'
    },
    {
      num: '06',
      textEn: 'Accelerated Clinical Pathways Enabling Comfortable Walking Within 12 Hours and Rapid Hospital Discharge in 24–48 Hours',
      textHi: 'मरीजों को सर्जरी के 12 घंटे में चलाने और 24 से 48 घंटे में सुरक्षित घर लौटने में सक्षम बनाने वाला त्वरित रिकवरी मार्ग'
    }
  ]

  // 4 Real Surgical & Robotic Technology Machines with Real Hospital Images
  const roboticMachines = [
    {
      id: 'robotic-console',
      image: roboticHeroImg,
      num: '01',
      tagEn: 'Robotic Suite',
      tagHi: 'रोबोटिक सुइट',
      nameEn: 'Advanced Robotic Surgical Theatre',
      nameHi: 'उन्नत रोबोटिक सर्जिकल सुइट',
      descEn: 'State-of-the-art modular surgical environment equipped with robotic multi-arm manipulators, 3D high-magnification stereovision, and zero-infection HEPA laminar airflow.',
      descHi: 'अत्याधुनिक मॉड्यूलर सर्जिकल वातावरण, जिसमें रोबोटिक मल्टी-आर्म मैनिपुलेटर्स, 3D हाई-मैग्निफिकेशन स्टीरियोविज़न और शून्य-संक्रमण हेपा लैमिनार एयरफ्लो शामिल हैं।',
      specsEn: [
        'Articulated 360° EndoWrist micro-instruments',
        '10x–15x 3D Stereoscopic Optical Vision',
        'Active tremor-filtering motion scaling',
        'Laminar Air Flow with HEPA sterile filtration'
      ],
      specsHi: [
        '360° घूमने वाले एंडो-रिस्ट माइक्रो उपकरण',
        '10x–15x त्रि-आयामी 3D स्टीरियोस्कोपिक विज़न',
        'हाथ के कंपनों को समाप्त करने वाली मोशन स्केलिंग',
        'हेपा फिल्टर युक्त लैमिनार स्टेराइल एयरफ्लो'
      ]
    },
    {
      id: 'robotic-navigation',
      image: otTeamImg,
      num: '02',
      tagEn: 'Surgical Navigation',
      tagHi: 'सर्जिकल नेविगेशन',
      nameEn: 'High-Definition Laparo-Robotic Operating Station',
      nameHi: 'हाई-डेफिनिशन लैपरो-रोबोटिक ऑपरेटिंग स्टेशन',
      descEn: 'Advanced multi-screen surgical navigation and operative monitors providing real-time anatomical mapping for sub-millimeter surgical accuracy.',
      descHi: 'उन्नत मल्टी-स्क्रीन सर्जिकल नेविगेशन और ऑपरेटिव मॉनिटर्स, जो सब-मिलीमीटर सटीकता के लिए वास्तविक समय में आंतरिक अंगों का स्पष्ट त्रि-आयामी दृश्य प्रदान करते हैं।',
      specsEn: [
        'Multi-display real-time surgical visualization',
        'Ceiling-suspended articulated monitor arms',
        'Real-time anatomical & vascular mapping',
        'Integrated electrosurgical & ultrasonic dissection'
      ],
      specsHi: [
        'रीयल-टाइम मल्टी-डिस्प्ले सर्जिकल विज़ुअलाइज़ेशन',
        'सीलिंग-निलंबित एर्गोनोमिक मॉनिटर आर्म्स',
        'सटीक एनाटोमिकल एवं वैस्कुलर मैपिंग',
        'इंटीग्रेटेड इलेक्ट्रोसर्जिकल व अल्ट्रासोनिक डिसेक्शन'
      ]
    },
    {
      id: 'robotic-instruments',
      image: microSurgeryImg,
      num: '03',
      tagEn: 'Precision Instruments',
      tagHi: 'सटीक उपकरण',
      nameEn: 'Precision Articulated Micro-Instrument System',
      nameHi: 'प्रिसिजन आर्टिकुलेटेड माइक्रो-इंस्ट्रूमेंट सिस्टम',
      descEn: 'Micro-wrist surgical instruments offering 7 degrees of freedom, enabling delicate tissue dissection and micro-suturing in deep, confined anatomical spaces.',
      descHi: '7 डिग्री ऑफ फ्रीडम वाले माइक्रो-रिस्ट सर्जिकल उपकरण, जो तंग आंतरिक अंगों में संवेदनशील नसों और ऊतकों को बचाते हुए अत्यधिक सूक्ष्म चीरे लगाने में सक्षम हैं।',
      specsEn: [
        '7 Degrees of Freedom rotational dexterity',
        'Sub-millimeter nerve & vessel sparing',
        'Micro-bipolar & vessel sealing integration',
        'Minimally invasive keyhole puncture access'
      ],
      specsHi: [
        '7 डिग्री ऑफ फ्रीडम रोटेशनल लचीलापन',
        'सब-मिलीमीटर तंत्रिका एवं रक्त वाहिका सुरक्षा',
        'माइक्रो-बाइपोलर वेसल सीलिंग तकनीक',
        'न्यूनतम चीरे वाले कीहोल पंक्चर उपकरण'
      ]
    },
    {
      id: 'modular-ot',
      image: modularOtSuiteImg,
      num: '04',
      tagEn: 'Modular OT',
      tagHi: 'मॉड्यूलर ओटी',
      nameEn: 'Sterile Modular Surgical Environment',
      nameHi: 'स्टेरिल मॉड्यूलर सर्जिकल सुइट',
      descEn: 'Ultra-clean positive pressure surgical theatre with anti-bacterial seamless cladding, motorized multi-axis surgical table, and advanced anesthesia workstations.',
      descHi: 'अल्ट्रा-क्लीन पॉजिटिव प्रेशर सर्जिकल थिएटर, जिसमें एंटी-बैक्टीरियल सीमलेस दीवारें, मोटराइज्ड मल्टी-एक्सिस सर्जिकल टेबल और आधुनिक एनेस्थीसिया वर्कस्टेशन शामिल हैं।',
      specsEn: [
        'Positive pressure laminar sterile airflow',
        'Motorized multi-axis radiolucent surgical table',
        'Integrated advanced anesthesia delivery system',
        'Shadowless LED operating surgical illuminators'
      ],
      specsHi: [
        'पॉजिटिव प्रेशर लैमिनार स्टेराइल एयरफ्लो',
        'मोटराइज्ड मल्टी-एक्सिस सर्जिकल टेबल',
        'उन्नत एनेस्थीसिया डिलीवरी सिस्टम',
        'शैडोलेस एलईडी सर्जिकल ऑपरेटिंग लाइट्स'
      ]
    }
  ]

  return (
    <div className="w-full bg-slate-950 text-white min-h-screen">
      {/* Hero Banner Section */}
      <SpecialtyHero
        image={roboticHeroImg}
        titlePrefixEn="Robotic"
        titleHighlightEn="Surgery"
        titlePrefixHi="रोबोटिक"
        titleHighlightHi="सर्जरी"
        altTextEn="Advanced Robotic-Assisted Surgery at Ejaz Hospital"
        altTextHi="एजाज अस्पताल में उन्नत रोबोटिक सर्जरी"
      />

      {/* About Section with Left Narrative & Right Shared Enquiry Form */}
      <RoboticAboutSection />

      {/* Specialized Types of Robotic Surgeries */}
      <RoboticTypesSection />

      {/* Robotic Care Highlights (S-Curve Notched Cards) */}
      <SpecialtyHighlightsSection
        titlePrefixEn="Robotic Care"
        titleHighlightEn="Highlights"
        titlePrefixHi="रोबोटिक केयर"
        titleHighlightHi="हाइलाइट्स"
        highlights={roboticHighlights}
      />

      {/* Advanced Technology & Equipment We Use - Powered by 100% Real Ejaz Hospital OT Images */}
      <SpecialtyEquipmentSection
        titlePrefixEn="Advanced Robotic &"
        titleHighlightEn="Surgical Technology"
        titlePrefixHi="उन्नत रोबोटिक एवं"
        titleHighlightHi="सर्जिकल तकनीक"
        descEn="At Ejaz Clinic & Advanced Surgical Hospital, our robotic suites integrate 3D high-magnification stereovision, ergonomic surgeon master consoles, and multi-articulated patient-side robotic arms."
        descHi="एजाज क्लिनिक एवं एडवांस्ड सर्जिकल हॉस्पिटल में हमारे रोबोटिक सुइट्स 3D हाई-मैग्निफिकेशन स्टीरियोविज़न, एर्गोनोमिक सर्जन कंसोल और मल्टी-आर्टिकुलेटेड रोबोटिक भुजाओं से सुसज्जित हैं।"
        machines={roboticMachines}
      />

      {/* Real Patient Recovery Stories & Testimonials */}
      <TestimonialsSection />
    </div>
  )
}
