// High-resolution image assets
import whiteCoatImg from '../../../../assets/home/blog/white-coat-ceremony.jpg'
import heatIllnessImg from '../../../../assets/home/blog/heat-illness.jpg'
import slippingRibImg from '../../../../assets/home/blog/slipping-rib.jpg'
import optimismImg from '../../../../assets/home/blog/cultivate-optimism.jpg'
import fallPreventionImg from '../../../../assets/home/blog/fall-prevention.jpg'
import laparoscopicImg from '../../../../assets/home/procedures/laparoscopic-gi.jpg'
import cardiologyImg from '../../../../assets/home/procedures/interventional-cardiology.jpg'
import roboticKneeImg from '../../../../assets/home/procedures/robotic-knee.jpg'

// Doctor avatars
import docShahzad from '../../../../assets/home/doctor-image.jpg'
import docEjaz from '../../../../assets/home/doctor-2.jpg'
import docOrtho from '../../../../assets/home/doctor-3.jpg'
import docMed from '../../../../assets/home/doctor-4.jpg'
import docGynae from '../../../../assets/home/doctor-6.jpg'

export const BLOGS_DATABASE = [
  {
    id: 'laparoscopic-gi-advances',
    slug: 'laparoscopic-gi-advances',
    title: 'Advances in 3D 4K Laparoscopic GI Surgery: Faster Recovery, Less Pain & Minimal Scars',
    titleHi: 'उन्नत 3D 4K लेप्रोस्कोपिक जीआई सर्जरी: शीघ्र रिकवरी, कम दर्द और न्यूनतम निशान',
    category: 'Minimally Invasive Surgery',
    categoryHi: 'न्यूनतम इनवेसिव सर्जरी',
    categoryId: 'surgery',
    date: 'October 12, 2026',
    dateHi: '12 अक्टूबर 2026',
    readTime: '4 min read',
    readTimeHi: '4 मिनट पढ़ें',
    author: 'Dr. Shahzad Ejaz',
    authorHi: 'डॉ. शहजाद एजाज',
    authorRole: 'Senior Laparoscopic & GI Surgeon',
    authorRoleHi: 'वरिष्ठ लेप्रोस्कोपिक एवं जीआई सर्जन',
    authorDoctorId: 'dr-shahzad',
    authorPhoto: docShahzad,
    image: laparoscopicImg,
    excerpt: 'How modern 4K ultra-high-definition imaging and laparoscopic instrumentation are revolutionizing abdominal, gallbladder, and hernia surgeries with same-day discharge and accelerated healing.',
    excerptHi: 'आधुनिक 4K अल्ट्रा-एचडी विज़न और लेप्रोस्कोपिक तकनीक कैसे पेट, पित्ताशय और हर्निया सर्जरी को दर्दमुक्त और त्वरित रिकवरी वाला बना रही है।',
    keyHighlights: [
      'Sub-centimeter keyhole incisions replace large conventional surgical cuts.',
      '4K 3D magnification provides high-resolution anatomical precision, protecting critical vessels and nerves.',
      'Reduced post-operative analgesic needs and over 70% faster return to regular activities.',
      'Significantly lower risk of surgical site infections and post-incisional herniation.'
    ],
    keyHighlightsHi: [
      'पारंपरिक बड़े चीरों के स्थान पर केवल कुछ मिलीमीटर के कीहोल छेद।',
      '4K 3D मैग्निफिकेशन नसों और रक्त वाहिकाओं की सुरक्षा सुनिश्चित करता है।',
      'सर्जरी के बाद न्यूनतम दर्द और 70% तेज रिकवरी।',
      'संक्रमण और हर्निया होने की संभावना न के बराबर।'
    ],
    sections: [
      {
        heading: 'The Paradigm Shift in Abdominal & Gastrointestinal Surgery',
        headingHi: 'पेट और जीआई सर्जरी में आधुनिक बदलाव',
        content: 'For decades, major abdominal operations required large open incisions through abdominal muscles, resulting in prolonged hospital stays, high infection risks, and extensive recovery periods. At Ejaz Hospital, advanced laparoscopic gastrointestinal surgery utilizes pencil-thin instruments inserted through tiny punctures measuring just 5 to 10 millimeters.',
        contentHi: 'दशकों से पेट की बड़ी सर्जरी में बड़े चीरे लगाने पड़ते थे, जिससे मरीज को हफ्तों अस्पताल में रहना पड़ता था। एजाज अस्पताल में आधुनिक लेप्रोस्कोपिक सर्जरी के जरिए केवल 5 से 10 मिलीमीटर के छोटे छेदों से पूरी सर्जरी संपन्न की जाती है।',
        callout: 'Modern laparoscopic surgery at Ejaz Hospital enables most gallbladder and hernia patients to walk comfortably within 6 hours of surgery.',
        calloutHi: 'एजाज अस्पताल में लेप्रोस्कोपी के बाद अधिकांश पित्ताशय और हर्निया मरीज सर्जरी के 6 घंटे बाद आराम से चलने-फिरने लगते हैं।'
      },
      {
        heading: 'How 4K Ultra-High-Definition Vision Enhances Patient Safety',
        headingHi: '4K अल्ट्रा-एचडी विज़न से मरीज सुरक्षा कैसे बढ़ती है',
        content: 'Our state-of-the-art modular surgical suites feature 4K laparoscopic imaging towers. The surgeon operates with 4 times the resolution of standard full HD, revealing minute anatomical planes, vascular micro-structures, and mucosal margins with crystal clarity. This superior visualization virtually eliminates accidental tissue trauma.',
        contentHi: 'हमारे मॉड्यूलर ऑपरेशन थिएटर में 4K लेप्रोस्कोपिक कैमरे लगे हैं, जो सामान्य एचडी से 4 गुना अधिक स्पष्टता प्रदान करते हैं। इससे सर्जन सूक्ष्म रक्त वाहिकाओं को स्पष्ट रूप से देखकर बिना किसी रक्तस्राव के सटीकता से ऑपरेशन करते हैं।',
        bullets: [
          'High definition visualization of bile ducts during cholecystectomy.',
          'Tension-free 3D mesh placement in inguinal and ventral hernia repairs.',
          'Minimal tissue manipulation leading to negligible post-operative inflammation.'
        ],
        bulletsHi: [
          'पित्ताशय की थैली निकालते समय पित्त नलिकाओं का स्पष्ट विज़ुअलाइज़ेशन।',
          'हर्निया रिपेयर में टेंशन-फ्री 3D मेश का सटीक प्रत्यारोपण।',
          'मांसपेशियों को न्यूनतम खिंचाव जिससे सर्जरी के बाद सूजन नहीं होती।'
        ]
      },
      {
        heading: 'Clinical Advice: When Should You Consult a GI Surgeon?',
        headingHi: 'चिकित्सीय परामर्श: जीआई सर्जन से कब संपर्क करें?',
        content: 'If you experience recurrent right upper quadrant abdominal pain after meals, persistent acid reflux unresponsive to antacids, or a visible bulge in the groin or umbilical area that enlarges with coughing, prompt surgical consultation is advised. Early laparoscopic repair prevents complications like gallstone pancreatitis or incarcerated hernia.',
        contentHi: 'यदि भोजन के बाद पेट के ऊपरी हिस्से में दर्द, बार-बार एसिडिटी, या नाभि/कमर में कोई उभार (हर्निया) महसूस हो, तो तुरंत विशेषज्ञ सर्जन से परामर्श लें। समय पर जांच गंभीर जटिलताओं से बचाती है।'
      }
    ],
    tags: ['Laparoscopy', 'GI Surgery', 'Gallbladder', 'Hernia Repair', 'Ejaz Hospital']
  },
  {
    id: 'heat-illness',
    slug: 'heat-illness',
    title: 'Take Precautions and Monitor for Heat-Related Illness as Temperatures Soar',
    titleHi: 'सावधानी बरतें: तापमान बढ़ने के साथ गर्मी से जुड़ी बीमारियों पर निगरानी रखें',
    category: 'Preventive Health',
    categoryHi: 'निवारक स्वास्थ्य',
    categoryId: 'preventive',
    date: 'October 10, 2026',
    dateHi: '10 अक्टूबर 2026',
    readTime: '5 min read',
    readTimeHi: '5 मिनट पढ़ें',
    author: 'Dr. Tariq Anwar',
    authorHi: 'डॉ. तारिक अनवर',
    authorRole: 'Internal Medicine & Critical Care Specialist',
    authorRoleHi: 'इंटरनल मेडिसिन एवं क्रिटिकल केयर विशेषज्ञ',
    authorDoctorId: 'dr-internal-med',
    authorPhoto: docMed,
    image: heatIllnessImg,
    excerpt: 'High environmental temperatures dramatically increase the risk of heat exhaustion, heat stroke, electrolyte imbalance, and severe dehydration among children, manual laborers, and older adults.',
    excerptHi: 'अत्यधिक तापमान हीट स्ट्रोक, डिहाइड्रेशन और इलेक्ट्रोलाइट असंतुलन के खतरे को बढ़ाता है। जानिए इसके प्रारंभिक लक्षण और प्राथमिक उपचार।',
    keyHighlights: [
      'Heat exhaustion can rapidly transition into life-threatening heat stroke within minutes.',
      'Dehydration thickens blood viscosity, triggering acute kidney stress and cardiovascular strain.',
      'Drink oral rehydration solutions (ORS) and coconut water rather than sugary sodas or ice-cold caffeine.',
      'Seek urgent 24/7 hospital emergency evaluation if patient exhibits confusion, hot dry skin, or fainting.'
    ],
    keyHighlightsHi: [
      'हीट एग्जॉशन कुछ ही मिनटों में जानलेवा हीट स्ट्रोक में बदल सकता है।',
      'पानी की कमी से खून गाढ़ा होता है, जिससे किडनी और हृदय पर भारी दबाव पड़ता है।',
      'ओआरएस, नींबू पानी और नारियल पानी का सेवन करें; अत्यधिक मीठे पेय पदार्थों से बचें।',
      'बेहोशी, भ्रम या गर्म शुष्क त्वचा दिखने पर तुरंत इमरजेंसी में ले जाएं।'
    ],
    sections: [
      {
        heading: 'Understanding the Spectrum from Heat Exhaustion to Heat Stroke',
        headingHi: 'हीट एग्जॉशन और हीट स्ट्रोक के अंतर को समझें',
        content: 'When external temperatures surpass the body’s natural cooling mechanisms, physiological strain escalates. Mild heat cramps can rapidly develop into heat exhaustion, characterized by heavy perspiration, weak pulse, dizziness, nausea, and pale clammy skin. If cooling is not promptly initiated, heat stroke occurs when core body temperature rises above 104°F (40°C), resulting in neurological dysfunction.',
        contentHi: 'जब बाहरी तापमान शरीर की सहनशीलता से अधिक हो जाता है, तो शरीर का कूलिंग सिस्टम फेल हो जाता है। हीट एग्जॉशन में पसीना आना, चक्कर और कमजोरी होती है, जबकि हीट स्ट्रोक में पसीना बंद होकर शरीर का तापमान 104°F से ऊपर चला जाता है।',
        callout: 'Heat stroke is a medical emergency requiring rapid ice-bath cooling, IV hydration, and ICU hemodynamic monitoring.',
        calloutHi: 'हीट स्ट्रोक एक मेडिकल इमरजेंसी है जिसमें तुरंत मरीज को ठंडा करना और अस्पताल के आईसीयू में भर्ती कराना जरूरी होता है।'
      },
      {
        heading: 'High-Risk Vulnerabilities and Preventive Action Steps',
        headingHi: 'उच्च जोखिम वाले वर्ग और बचाव के उपाय',
        content: 'Senior citizens above 65, young children under 5, and individuals on antihypertensive or diuretic medications have impaired thermoregulation. Staying indoors between 11:00 AM and 4:00 PM, wearing loose-fitting cotton clothing, and monitoring urine color (aiming for pale straw rather than dark amber) provide practical protection.',
        contentHi: '65 वर्ष से अधिक उम्र के बुजुर्ग, छोटे बच्चे और बीपी की दवाएं लेने वाले लोग सबसे ज्यादा संवेदनशील होते हैं। सुबह 11 से शाम 4 बजे के बीच सीधी धूप से बचें, सूती कपड़े पहनें और पर्याप्त पानी पिएं।',
        bullets: [
          'Hydrate consistently with 3 to 4 liters of fluid daily in extreme weather.',
          'Never leave children or elderly relatives inside parked vehicles, even with windows cracked.',
          'Replenish electrolytes with lemon water, buttermilk (chaas), and fresh coconut water.'
        ],
        bulletsHi: [
          'गर्म मौसम में प्रतिदिन कम से कम 3 से 4 लीटर तरल पदार्थ पिएं।',
          'धूप में खड़ी गाड़ी में किसी को भी न छोड़ें।',
          'नींबू पानी, छाछ और नारियल पानी से इलेक्ट्रोलाइट्स की भरपाई करें।'
        ]
      }
    ],
    tags: ['Preventive Health', 'Heat Stroke', 'Summer Wellness', 'Emergency Care']
  },
  {
    id: 'interventional-cardiology',
    slug: 'interventional-cardiology',
    title: 'Understanding Heart Attack Warning Signs: Time-Critical Cath Lab & Stenting',
    titleHi: 'हार्ट अटैक के चेतावनी संकेत: कैथ लैब और त्वरित एंजियोप्लास्टी का महत्व',
    category: 'Cardiology & Critical Care',
    categoryHi: 'कार्डियोलॉजी एवं क्रिटिकल केयर',
    categoryId: 'cardiology',
    date: 'October 8, 2026',
    dateHi: '8 अक्टूबर 2026',
    readTime: '5 min read',
    readTimeHi: '5 मिनट पढ़ें',
    author: 'Dr. Shahzad Ejaz',
    authorHi: 'डॉ. शहजाद एजाज',
    authorRole: 'Chief of Surgery & Critical Care',
    authorRoleHi: 'प्रमुख सर्जन एवं क्रिटिकल केयर',
    authorDoctorId: 'dr-shahzad',
    authorPhoto: docShahzad,
    image: cardiologyImg,
    excerpt: 'In cardiovascular emergencies, every second counts. Learn how atypical warning signs differ in men and women, and how immediate coronary intervention inside a 24/7 Cath Lab preserves heart muscle.',
    excerptHi: 'हार्ट अटैक में हर सेकंड कीमती है। जानिए पुरुषों और महिलाओं में दिल के दौरे के विभिन्न लक्षण और समय पर एंजियोग्राफी का जीवनरक्षक महत्व।',
    keyHighlights: [
      '“Time is Muscle”: Myocardial cells begin dying within 30 minutes of a complete coronary artery blockage.',
      'Atypical symptoms in women and diabetic patients include unexplained jaw ache, nausea, and cold sweat without central chest pain.',
      'Primary PCI (emergency stenting) performed within the 90-minute “Golden Hour” restores vital perfusion.',
      'High-sensitivity Troponin-I testing provides definitive diagnostic clarity in emergency triage.'
    ],
    keyHighlightsHi: [
      '“समय ही जीवन है”: धमनी बंद होने के 30 मिनट के भीतर हृदय की कोशिकाएं नष्ट होने लगती हैं।',
      'महिलाओं और मधुमेह मरीजों में जबड़े का दर्द, उल्टी और ठंडा पसीना जैसे असामान्य लक्षण दिख सकते हैं।',
      '90 मिनट के "गोल्डन ऑवर" में की गई एंजियोप्लास्टी दिल की मांसपेशियों को पूर्ण नुकसान से बचाती है।',
      'इमरजेंसी में तुरंत ट्रोपोनिन टेस्ट और ईसीजी से स्थिति की तुरंत पुष्टि होती है।'
    ],
    sections: [
      {
        heading: 'Why Every Minute Matters During an Acute Coronary Event',
        headingHi: 'हार्ट अटैक के दौरान हर मिनट क्यों महत्वपूर्ण है',
        content: 'When an atherosclerotic plaque ruptures in a coronary artery, a blood clot rapidly occludes oxygenated blood delivery to the myocardium. Without prompt interventional reopening, irreversible myocardial necrosis occurs. Reaching an advanced cardiac center equipped with digital flat-panel catheterization suites is the single most decisive factor in patient survival.',
        contentHi: 'जब हृदय की धमनी में रुकावट आती है, तो दिल की मांसपेशियों को ऑक्सीजन मिलना बंद हो जाता है। जितनी जल्दी मरीज को कैथ लैब और आपातकालीन उपचार मिलता है, मरीज के बचने और पूरी तरह स्वस्थ होने की संभावना उतनी ही अधिक होती है।',
        callout: 'Ejaz Hospital maintains emergency cardiology triage and advanced ICU resuscitation ready 24 hours a day, 7 days a week.',
        calloutHi: 'एजाज अस्पताल में 24 घंटे आपातकालीन हृदय देखभाल और अत्याधुनिक आईसीयू हमेशा तैयार रहता है।'
      },
      {
        heading: 'Recognizing Atypical Symptoms: Not All Heart Attacks Feel Like Pressure',
        headingHi: 'असामान्य लक्षणों की पहचान: हर हार्ट अटैक में छाती में भारीपन नहीं होता',
        content: 'While crushing substernal chest pressure radiating to the left arm remains the classic presentation, nearly 35% of cardiac events manifest with subtle, atypical signs. Diabetics often experience painless heart attacks due to autonomic neuropathy.',
        contentHi: 'क्लासिक सीने के दर्द के अलावा कई मरीजों, विशेषकर डायबिटीज के मरीजों में केवल सांस फूलना, जबड़े या पीठ में दर्द, अत्यधिक पसीना आना और चक्कर आना जैसे लक्षण दिखाई देते हैं।',
        bullets: [
          'Unexplained shortness of breath with mild exertion.',
          'Sudden onset cold sweats, dizziness, or profound lightheadedness.',
          'Discomfort radiating to the back, neck, jaw, or epigastric stomach area.'
        ],
        bulletsHi: [
          'हल्का चलने पर भी अचानक अत्यधिक सांस फूलना।',
          'अचानक ठंडा पसीना आना और चक्कर महसूस होना।',
          'पीठ, गर्दन, जबड़े या पेट के ऊपरी हिस्से में खिंचाव या जलन।'
        ]
      }
    ],
    tags: ['Heart Care', 'Cardiology', 'Cath Lab', 'Emergency ICU', 'Ejaz Hospital']
  },
  {
    id: 'slipping-rib',
    slug: 'slipping-rib',
    title: 'Slipping Rib Syndrome: Causes of Lower Chest Pain & Modern Dynamic Diagnostics',
    titleHi: 'स्लिपिंग रिब सिंड्रोम: पसली के अस्थिर होने से दर्द के कारण एवं सटीक निदान',
    category: 'Thoracic & Pain Care',
    categoryHi: 'थोरेसिक एवं दर्द प्रबंधन',
    categoryId: 'pain-care',
    date: 'October 5, 2026',
    dateHi: '5 अक्टूबर 2026',
    readTime: '3 min read',
    readTimeHi: '3 मिनट पढ़ें',
    author: 'Dr. Shahzad Ejaz',
    authorHi: 'डॉ. शहजाद एजाज',
    authorRole: 'Senior Laparoscopic & GI Surgeon',
    authorRoleHi: 'वरिष्ठ लेप्रोस्कोपिक एवं जीआई सर्जन',
    authorDoctorId: 'dr-shahzad',
    authorPhoto: docShahzad,
    image: slippingRibImg,
    excerpt: 'Hypermobility in the false or floating ribs can lead to sharp intercostal nerve irritation and severe lower chest pain that is frequently misdiagnosed as gallbladder or visceral disease.',
    excerptHi: 'निचली पसलियों के कार्टिलेज में ढीलापन आने से नसों में जलन और सीने के निचले हिस्से में तीव्र दर्द होता है जिसे अक्सर पित्ताशय या पेट की बीमारी समझ लिया जाता है।',
    keyHighlights: [
      'Affects 8th, 9th, and 10th false ribs whose anterior cartilaginous attachments stretch or tear.',
      'Characterized by a palpable popping sensation (Hooking Maneuver) and intense localized tenderness.',
      'High-resolution dynamic musculoskeletal ultrasound offers definitive diagnosis when routine X-rays and CTs appear normal.',
      'Treatments range from ultrasound-guided intercostal nerve blocks to minimally invasive cartilage stabilization.'
    ],
    keyHighlightsHi: [
      '8वीं, 9वीं और 10वीं पसली के कार्टिलेज में खिंचाव या टूटने से यह समस्या होती है।',
      'करवट बदलने या खांसने पर पसली में पॉपिंग की आवाज और तेज चुभन महसूस होती है।',
      'सामान्य एक्स-रे में यह नहीं दिखता, डायनामिक अल्ट्रासाउंड से इसकी सटीक पहचान होती है।',
      'नर्व ब्लॉक इंजेक्शन और आधुनिक सर्जरी से इसका स्थायी समाधान संभव है।'
    ],
    sections: [
      {
        heading: 'Why Slipping Rib Syndrome is Often Misdiagnosed',
        headingHi: 'स्लिपिंग रिब सिंड्रोम की पहचान में भ्रम क्यों होता है',
        content: 'Patients with slipping rib syndrome frequently visit multiple clinics over months or years, undergoing extensive endoscopic exams, CT scans, and cardiac workups with non-conclusive results. Because rib cartilage does not show clearly on standard bone X-rays, the subluxation of the cartilage rubbing against the intercostal nerve goes undetected without clinical physical examination.',
        contentHi: 'इस बीमारी के मरीज अक्सर महीनों तक कई डॉक्टरों के चक्कर लगाते हैं और एंडोस्कोपी या सीटी स्कैन में कुछ नहीं निकलता। क्योंकि कार्टिलेज एक्स-रे में नहीं दिखता, इसलिए कुशल सर्जन द्वारा शारीरिक जांच और डायनामिक सोनोग्राफी से ही इसका पता चलता है।'
      },
      {
        heading: 'Advanced Diagnostic and Treatment Pathways at Ejaz Hospital',
        headingHi: 'एजाज अस्पताल में आधुनिक जांच और उपचार',
        content: 'Our specialized thoracic pain specialists perform the Hooking Maneuver under dynamic ultrasound guidance. When confirmed, ultrasound-guided nerve blocks provide immediate symptomatic relief. For recurrent severe instability, minimally invasive surgical excision or bio-absorbable rib plating stabilizes the chest wall permanently.',
        contentHi: 'एजाज अस्पताल में अल्ट्रासाउंड की निगरानी में हुकिंग टेस्ट किया जाता है। प्रारंभिक अवस्था में नर्व ब्लॉक इंजेक्शन से दर्द तुरंत बंद हो जाता है और गंभीर मामलों में न्यूनतम इनवेसिव विधि से पसली को स्थिर कर दिया जाता है।'
      }
    ],
    tags: ['Thoracic Pain', 'Chest Pain', 'Musculoskeletal', 'Ultrasound']
  },
  {
    id: 'robotic-knee',
    slug: 'robotic-knee',
    title: 'Robotic Knee Replacement: Precision Alignment and Accelerated Post-Op Mobility',
    titleHi: 'रोबोटिक घुटना प्रत्यारोपण: सटीक अलाइनमेंट और त्वरित पोस्ट-ऑपरेटिव मोबिलिटी',
    category: 'Orthopaedics & Joint Care',
    categoryHi: 'ऑर्थोपेडिक्स एवं जोड़ देखभाल',
    categoryId: 'ortho',
    date: 'October 3, 2026',
    dateHi: '3 अक्टूबर 2026',
    readTime: '4 min read',
    readTimeHi: '4 मिनट पढ़ें',
    author: 'Dr. Tariq Anwar',
    authorHi: 'डॉ. तारिक अनवर',
    authorRole: 'Joint Replacement & Orthopaedic Specialist',
    authorRoleHi: 'जोड़ प्रत्यारोपण एवं ऑर्थोपेडिक विशेषज्ञ',
    authorDoctorId: 'dr-ortho-specialist',
    authorPhoto: docOrtho,
    image: roboticKneeImg,
    excerpt: 'Explore how 3D computed kinematic planning and robotic-arm surgical precision protect healthy bone, balance soft tissue tension, and enable natural joint flexion with longevity exceeding 25 years.',
    excerptHi: 'जानिए कैसे 3D कम्प्यूटरीकृत रोबोटिक आर्म से घुटने का प्रत्यारोपण स्वस्थ हड्डियों की सुरक्षा करता है और मरीज को अगले ही दिन सहारा लेकर चलने में सक्षम बनाता है।',
    keyHighlights: [
      'Sub-millimeter implant positioning tailored to each patient’s unique anatomical geometry.',
      'Preservation of anterior and posterior cruciate ligaments whenever partial replacement is clinically indicated.',
      'Significantly less post-operative soft tissue trauma, cutting pain scores by more than half.',
      'Active physical therapy initiated within 24 hours of surgical completion.'
    ],
    keyHighlightsHi: [
      'मरीज की शारीरिक संरचना के अनुसार सब-मिलीमीटर स्तर की शुद्धता से इंप्लांट फिटिंग।',
      'स्वस्थ लिगामेंट्स और हड्डियों की अधिकतम सुरक्षा।',
      'कम खून का रिसाव और सर्जरी के बाद दर्द में 50% से अधिक की कमी।',
      'सर्जरी के 24 घंटे के भीतर फिजियोथेरेपी की शुरुआत।'
    ],
    sections: [
      {
        heading: 'The Technological Difference: Conventional vs Robotic Joint Replacement',
        headingHi: 'पारंपरिक और रोबोटिक घुटना सर्जरी में अंतर',
        content: 'In traditional knee replacement, manual cutting jigs and visual alignment are relied upon. Robotic-assisted joint replacement introduces dynamic optical tracking sensors and 3D intraoperative modeling. The robotic arm prevents deviations beyond pre-planned boundaries, ensuring precise implant balancing throughout the entire range of motion.',
        contentHi: 'पारंपरिक सर्जरी में हाथ के औजारों से हड्डी काटी जाती थी। रोबोटिक तकनीक में कंप्यूटर सेंसर 3D मॉडल बनाते हैं और रोबोटिक आर्म केवल उसी हिस्से को काटता है जो खराब हो चुका है, जिससे स्वस्थ हड्डी सुरक्षित रहती है।'
      },
      {
        heading: 'Accelerated Rehabilitation and Restored Quality of Life',
        headingHi: 'तेज रिकवरी और सक्रिय जीवनशैली की वापसी',
        content: 'Because surrounding collateral ligaments are uninjured during robotic resection, patients experience superior proprioceptive awareness—the joint feels like their natural knee rather than an artificial joint. Over 90% of our patients achieve full independent stair climbing within two weeks.',
        contentHi: 'रोबोटिक सर्जरी के बाद घुटना बिल्कुल प्राकृतिक महसूस होता है। 90% से अधिक मरीज दो सप्ताह के भीतर बिना किसी सहारे के सीढ़ियां चढ़ने और दैनिक कार्य करने में सक्षम हो जाते हैं।'
      }
    ],
    tags: ['Robotic Knee', 'Joint Replacement', 'Orthopaedics', 'Arthritis', 'Ejaz Hospital']
  },
  {
    id: 'cultivate-optimism',
    slug: 'cultivate-optimism',
    title: 'How Cultivating Optimism Accelerates Surgical Recovery and Immune Strength',
    titleHi: 'सकारात्मक दृष्टिकोण कैसे विकसित करें और सर्जरी के बाद तेजी से स्वस्थ हों',
    category: 'Mental Wellness & Recovery',
    categoryHi: 'मानसिक स्वास्थ्य एवं रिकवरी',
    categoryId: 'wellness',
    date: 'October 2, 2026',
    dateHi: '2 अक्टूबर 2026',
    readTime: '4 min read',
    readTimeHi: '4 मिनट पढ़ें',
    author: 'Dr. Shahzad Ejaz',
    authorHi: 'डॉ. शहजाद एजाज',
    authorRole: 'Chief of Surgery',
    authorRoleHi: 'मुख्य सर्जन',
    authorDoctorId: 'dr-shahzad',
    authorPhoto: docShahzad,
    image: optimismImg,
    excerpt: 'Evidence-based psychoneuroimmunology reveals that positive emotional states regulate cortisol levels, optimize natural killer cell activity, and reduce hospital stays following major surgeries.',
    excerptHi: 'वैज्ञानिक शोध बताते हैं कि सकारात्मक सोच और आत्मविश्वास से शरीर की रोग प्रतिरोधक क्षमता बढ़ती है और सर्जरी के बाद मरीज बहुत जल्दी ठीक होते हैं।',
    keyHighlights: [
      'Chronic stress impairs wound healing by elevating pro-inflammatory cytokines and catecholamines.',
      'Optimistic cognitive framing promotes active patient participation in post-operative physical rehabilitation.',
      'Daily 10-minute mindfulness and progressive muscle relaxation lower systemic blood pressure.',
      'Holistic clinical care addresses psychological confidence alongside surgical intervention.'
    ],
    keyHighlightsHi: [
      'अत्यधिक तनाव से घाव भरने में देरी होती है और सूजन बढ़ती है।',
      'सकारात्मक सोच मरीज को फिजियोथेरेपी में सक्रिय रूप से भाग लेने के लिए प्रेरित करती है।',
      'प्रतिदिन 10 मिनट का ध्यान और गहरी सांस लेने के व्यायाम रक्तचाप को नियंत्रित करते हैं।',
      'एजाज अस्पताल में शारीरिक इलाज के साथ मानसिक संबल भी दिया जाता है।'
    ],
    sections: [
      {
        heading: 'The Mind-Body Connection in Clinical Surgery',
        headingHi: 'सर्जिकल रिकवरी में मन और शरीर का गहरा संबंध',
        content: 'Clinical outcomes in surgery are profoundly shaped by emotional resilience. Studies demonstrate that surgical patients with optimistic mental outlooks release significantly lower circulating cortisol, allowing fibroblast migration and capillary angiogenesis to proceed without metabolic suppression.',
        contentHi: 'सर्जरी के परिणाम केवल दवाओं पर ही नहीं, मरीज के आत्मविश्वास पर भी निर्भर करते हैं। सकारात्मक सोच वाले मरीजों में तनाव हार्मोन कम रहते हैं, जिससे शरीर के घाव तेजी से भरते हैं।'
      },
      {
        heading: 'Practical Daily Habits to Cultivate Mental Resilience',
        headingHi: 'मानसिक दृढ़ता बढ़ाने के व्यावहारिक दैनिक उपाय',
        content: 'Cultivating optimism is an actionable discipline rather than mere wishful thinking. Incorporating gratitude journaling, maintaining supportive family dialogue, and focusing on incremental recovery benchmarks each morning systematically builds patient morale.',
        contentHi: 'प्रतिदिन सुबह अपने छोटे-छोटे सुधारों पर ध्यान दें, परिवार से खुलकर बात करें और सकारात्मक वातावरण में रहें। यह दृष्टिकोण मरीज को तेजी से नई ऊर्जा प्रदान करता है।'
      }
    ],
    tags: ['Mind Body', 'Wellness', 'Surgical Recovery', 'Holistic Health']
  },
  {
    id: 'fall-prevention',
    slug: 'fall-prevention',
    title: 'Confidence and Physical Strength: Comprehensive Fall Prevention for Seniors',
    titleHi: 'आत्मविश्वास और शारीरिक शक्ति: बुजुर्गों में गिरने से बचाव के संपूर्ण उपाय',
    category: 'Geriatrics & Orthopaedics',
    categoryHi: 'जेरियाट्रिक्स एवं ऑर्थोपेडिक्स',
    categoryId: 'ortho',
    date: 'October 1, 2026',
    dateHi: '1 अक्टूबर 2026',
    readTime: '4 min read',
    readTimeHi: '4 मिनट पढ़ें',
    author: 'Dr. Tariq Anwar',
    authorHi: 'डॉ. तारिक अनवर',
    authorRole: 'Orthopaedic & Trauma Specialist',
    authorRoleHi: 'ऑर्थोपेडिक एवं ट्रॉमा विशेषज्ञ',
    authorDoctorId: 'dr-ortho-specialist',
    authorPhoto: docOrtho,
    image: fallPreventionImg,
    excerpt: 'Accidental slips and falls represent the leading cause of hip fractures and loss of independence among seniors. Learn key balance conditioning exercises and home environmental modifications.',
    excerptHi: 'बुजुर्गों में फिसलकर गिरना कूल्हे के फ्रैक्चर और गंभीर चोट का मुख्य कारण है। जानिए संतुलन मजबूत करने वाले व्यायाम और सुरक्षित घरेलू उपाय।',
    keyHighlights: [
      'Over 90% of geriatric hip fractures result directly from a ground-level standing fall.',
      'Sarcopenia (age-related muscle wasting) can be reversed with low-impact resistance training.',
      'Simple home adjustments—such as grab bars, non-slip bathroom mats, and adequate night lighting—reduce fall risks by over 60%.',
      'Annual vision checks and medication reviews prevent drug-induced orthostatic hypotension.'
    ],
    keyHighlightsHi: [
      '90% से अधिक कूल्हे के फ्रैक्चर घर में फिसलने के कारण होते हैं।',
      'हल्के नियमित व्यायाम से उम्र के साथ कमजोर हो रही मांसपेशियों को फिर से मजबूत किया जा सकता है।',
      'बाथरूम में ग्रैब बार, नॉन-स्लिप मैट और रात में रोशनी रखने से 60% हादसे टल जाते हैं।',
      'आंखों की नियमित जांच और बीपी की दवाओं का समय पर मूल्यांकन अत्यंत आवश्यक है।'
    ],
    sections: [
      {
        heading: 'The Hidden Toll of Falls Among Aging Adults',
        headingHi: 'बुजुर्गों में गिरने से होने वाले गंभीर खतरे',
        content: 'A fall is rarely an isolated accident; it is often the culmination of progressive vestibular decline, reduced lower-limb muscle power, and environmental obstacles. When a senior fractures a femoral neck or pelvis, the prolonged bed rest can precipitate deep vein thrombosis, pneumonia, and severe loss of independence.',
        contentHi: 'बुजुर्गों के गिरने से सिर्फ हड्डी ही नहीं टूटती, बल्कि लंबे समय तक बिस्तर पर रहने से अन्य बीमारियां होने का खतरा भी बढ़ जाता है। इसलिए गिरने से पहले ही बचाव करना सबसे समझदारी है।'
      },
      {
        heading: 'Actionable Steps to Make Homes Fall-Proof',
        headingHi: 'घर को गिरने से सुरक्षित बनाने के सरल कदम',
        content: 'Conducting a home safety audit is the most effective preventative measure. Remove loose scatter rugs, install secure handrails on stairwells, ensure consistent 100-lumen night lighting between bedrooms and washrooms, and schedule routine bone mineral density (DEXA) scans at Ejaz Hospital.',
        contentHi: 'घर से फिसलन वाले पायदान हटा दें, सीढ़ियों पर रेलिंग लगवाएं, बेडरूम से बाथरूम के रास्ते में रात को हल्की रोशनी रखें और हड्डियों की मजबूती जांचने के लिए नियमित डेक्सा स्कैन कराएं।'
      }
    ],
    tags: ['Geriatrics', 'Fall Prevention', 'Bone Health', 'Senior Care', 'Physiotherapy']
  },
  {
    id: 'white-coat',
    slug: 'white-coat',
    title: 'Different Paths, Same Calling: Ejaz Hospital Welcomes Newest Surgical Fellows',
    titleHi: 'विभिन्न रास्ते, एक ही संकल्प: एजाज अस्पताल ने नए मेडिकल छात्रों एवं फेलो का स्वागत किया',
    category: 'Medical Education & Training',
    categoryHi: 'चिकित्सा शिक्षा एवं प्रशिक्षण',
    categoryId: 'education',
    date: 'September 28, 2026',
    dateHi: '28 सितंबर 2026',
    readTime: '3 min read',
    readTimeHi: '3 मिनट पढ़ें',
    author: 'Dr. Shahzad Ejaz',
    authorHi: 'डॉ. शहजाद एजाज',
    authorRole: 'Chief of Surgery & Medical Director',
    authorRoleHi: 'मुख्य सर्जन एवं मेडिकल डायरेक्टर',
    authorDoctorId: 'dr-shahzad',
    authorPhoto: docShahzad,
    image: whiteCoatImg,
    excerpt: 'Incoming surgical fellows and clinical scholars don white coats at the annual ceremony, pledging ethical patient-centered care and mastery of advanced laparoscopic disciplines.',
    excerptHi: 'वार्षिक समारोह में नए सर्जिकल फेलो और शोधकर्ताओं ने सफेद कोट पहनकर नैतिक स्वास्थ्य सेवा और उन्नत लेप्रोस्कोपिक सर्जरी का संकल्प लिया।',
    keyHighlights: [
      'Over 175 incoming medical students, surgical residents, and fellows inducted into the institution.',
      'Hands-on modular training curriculum in 3D 4K laparoscopy, critical care hemodynamic monitoring, and emergency surgical stabilization.',
      'Core institutional emphasis on compassionate, ethical healthcare accessible to every patient regardless of financial background.',
      'Keynote addresses by internationally renowned surgical leaders on patient safety protocols.'
    ],
    keyHighlightsHi: [
      '175 से अधिक नए मेडिकल छात्रों और सर्जिकल फेलो का एजाज अस्पताल में स्वागत।',
      '3D 4K लेप्रोस्कोपी, गहन आईसीयू मॉनिटरिंग और आपातकालीन ट्रॉमा में विशेष प्रशिक्षण।',
      'अस्पताल का मूल सिद्धांत: हर मरीज को बिना किसी भेदभाव के सर्वोत्तम और नैतिक इलाज।',
      'वरिष्ठ सर्जनों द्वारा मरीज सुरक्षा और आधुनिक तकनीकों पर विशेष व्याख्यान।'
    ],
    sections: [
      {
        heading: 'A Symbolic Milestone of Ethical Healthcare Delivery',
        headingHi: 'नैतिक स्वास्थ्य सेवा और समर्पण का पावन प्रतीक',
        content: 'The annual White Coat Ceremony at Ejaz Hospital represents far more than the donning of clinical attire; it is an enduring covenant of empathy, clinical diligence, and moral integrity. Welcoming doctors from across India and neighboring regions, the event underscored our mission to pioneer laparoscopic precision in Bihar.',
        contentHi: 'व्हाइट कोट समारोह केवल एक पोशाक पहनने का अवसर नहीं है, बल्कि मानवता की सेवा और ईमानदारी का संकल्प है। देश भर से आए नए डॉक्टर यहां उन्नत चिकित्सा का कड़ा प्रशिक्षण प्राप्त करेंगे।'
      },
      {
        heading: 'Comprehensive Curriculum Across Advanced Surgical Specialties',
        headingHi: 'उन्नत सर्जिकल विशेषज्ञताओं में व्यापक प्रशिक्षण',
        content: 'Fellows will train directly under senior faculty in our six modular surgical suites, mastering keyhole GI resection, bariatric procedures, oncological resections, and interventional critical care throughout their multi-year fellowships.',
        contentHi: 'छात्र वरिष्ठ डॉक्टरों के मार्गदर्शन में आधुनिक मॉड्यूलर ऑपरेशन थिएटर में लेप्रोस्कोपिक सर्जरी, कैंसर सर्जरी और क्रिटिकल केयर का गहन व्यावहारिक अनुभव प्राप्त करेंगे।'
      }
    ],
    tags: ['Medical Education', 'White Coat', 'Surgical Training', 'Ejaz Hospital']
  }
]

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Articles', labelHi: 'सभी लेख' },
  { id: 'surgery', label: 'Minimally Invasive Surgery', labelHi: 'न्यूनतम इनवेसिव सर्जरी' },
  { id: 'preventive', label: 'Preventive Health', labelHi: 'निवारक स्वास्थ्य' },
  { id: 'cardiology', label: 'Cardiology & Critical Care', labelHi: 'कार्डियोलॉजी एवं आईसीयू' },
  { id: 'ortho', label: 'Orthopaedics & Joint Care', labelHi: 'हड्डी एवं जोड़ रोग' },
  { id: 'pain-care', label: 'Thoracic & Pain Care', labelHi: 'थोरेसिक एवं दर्द प्रबंधन' },
  { id: 'wellness', label: 'Mental Wellness', labelHi: 'मानसिक स्वास्थ्य' },
  { id: 'education', label: 'Medical Training', labelHi: 'चिकित्सा प्रशिक्षण' }
]

export function getAllBlogs() {
  return BLOGS_DATABASE
}

export function getBlogById(id) {
  if (!id) return BLOGS_DATABASE[0]
  return BLOGS_DATABASE.find((b) => b.id === id || b.slug === id) || BLOGS_DATABASE[0]
}

export function getSuggestedBlogs(currentId, count = 3) {
  const filtered = BLOGS_DATABASE.filter((b) => b.id !== currentId && b.slug !== currentId)
  return filtered.slice(0, count)
}
