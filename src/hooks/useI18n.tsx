'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'ta';

const translations = {
  en: {
    app_name: "Sansthaein Aur Samvidhan",
    app_tagline: "Institutions & Constitution of India",
    dashboard: "Dashboard",
    explorer: "Article Explorer",
    games: "Games",
    profile: "Citizen Profile",
    language: "Language",
    points: "Civic Points",
    level: "Level",
    badges: "Unlocked Badges",
    legislature: "Legislature",
    executive: "Executive",
    judiciary: "Judiciary",
    union: "Union Level",
    state: "State Level",
    all_organs: "All Organs",
    all_levels: "All Levels",
    search_placeholder: "Search by article number or keyword (e.g. Article 52, President)...",
    raw_text: "Original Constitutional Text",
    simplified: "Simplified Summary",
    child_friendly: "Kid's Corner",
    key_takeaways: "Key Takeaways",
    quiz_title: "Civic Challenge",
    submit: "Submit",
    next: "Next",
    close: "Close",
    correct: "Correct Answer!",
    incorrect: "Incorrect Answer!",
    score: "Score",
    play_now: "Play Now",
    back_to_dashboard: "Back to Dashboard",
    governance_challenges: "Governance Challenges",
    feedback_title: "Citizen Feedback",
    feedback_placeholder: "Help us make this platform better! Leave your comments here...",
    send_feedback: "Send Feedback",
    feedback_success: "Thank you for your feedback!",
    spin_wheel_desc: "Spin the wheel of democracy! Land on a topic and answer real-world scenario questions to earn badges.",
    snakes_ladders_desc: "Navigate the grid of Governance. Climb ladders by making constitutional decisions; avoid snakes representing violations.",
    board_game_desc: "Travel through 'Samvidhan Nagri'. Visit Parliament, Supreme Court, and Rashtrapati Bhavan to manage institutional crises.",
    flashcards_desc: "Compare Union vs State offices. Test your knowledge in quick-fire trivia duel cards.",
    spin_btn: "SPIN THE WHEEL",
    roll_dice: "Roll Dice",
    rating: "Rating",
  },
  hi: {
    app_name: "संस्थाएं और संविधान",
    app_tagline: "भारत की शासन व्यवस्था और संविधान",
    dashboard: "डैशबोर्ड",
    explorer: "अनुच्छेद खोजक",
    games: "खेल-कूद",
    profile: "नागरिक प्रोफ़ाइल",
    language: "भाषा",
    points: "नागरिक अंक",
    level: "स्तर",
    badges: "अनलॉक किए गए बैज",
    legislature: "विधायिका (संसद)",
    executive: "कार्यपालिका",
    judiciary: "न्यायपालिका",
    union: "संघीय (केंद्र) स्तर",
    state: "राज्य स्तर",
    all_organs: "सभी अंग",
    all_levels: "सभी स्तर",
    search_placeholder: "अनुच्छेद संख्या या मुख्य शब्द से खोजें (जैसे Article 52, राष्ट्रपति)...",
    raw_text: "मूल संवैधानिक पाठ",
    simplified: "सरल सारांश",
    child_friendly: "बच्चों का कोना",
    key_takeaways: "मुख्य बिंदु",
    quiz_title: "नागरिक चुनौती",
    submit: "जमा करें",
    next: "अगला",
    close: "बंद करें",
    correct: "सही उत्तर!",
    incorrect: "गलत उत्तर!",
    score: "अंक",
    play_now: "खेलें",
    back_to_dashboard: "डैशबोर्ड पर लौटें",
    governance_challenges: "शासन की चुनौतियाँ",
    feedback_title: "नागरिक प्रतिक्रिया",
    feedback_placeholder: "इस मंच को बेहतर बनाने में हमारी सहायता करें! अपनी टिप्पणियाँ यहाँ लिखें...",
    send_feedback: "प्रतिक्रिया भेजें",
    feedback_success: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
    spin_wheel_desc: "लोकतंत्र का पहिया घुमाएं! किसी विषय पर रुकें और बैज अर्जित करने के लिए वास्तविक जीवन के परिदृश्यों के उत्तर दें।",
    snakes_ladders_desc: "सुशासन के ग्रिड पर चलें। संवैधानिक निर्णय लेकर सीढ़ियां चढ़ें; संवैधानिक उल्लंघनों के सांपों से बचें।",
    board_game_desc: "'संविधान नगरी' की यात्रा करें। संस्थागत संकटों को संभालने के लिए संसद, सुप्रीम कोर्ट और राष्ट्रपति भवन का दौरा करें।",
    flashcards_desc: "संघ बनाम राज्य के पदों की तुलना करें। त्वरित-फायर ट्रिविया कार्ड में अपने ज्ञान का परीक्षण करें।",
    spin_btn: "पहिया घुमाएं",
    roll_dice: "पासा फेंकें",
    rating: "रेटिंग",
  },
  ta: {
    app_name: "அமைப்புகளும் அரசியலமைப்பும்",
    app_tagline: "இந்தியாவின் அரசு அமைப்புகளும் அரசியலமைப்பும்",
    dashboard: "முகப்புப்பலகை",
    explorer: "அரசியலமைப்பு தேடல்",
    games: "விளையாட்டுகள்",
    profile: "குடிமகன் விவரக்குறிப்பு",
    language: "மொழி",
    points: "குடிமை புள்ளிகள்",
    level: "நிலை",
    badges: "வென்ற பதக்கங்கள்",
    legislature: "சட்டமன்றம் (நாடாளுமன்றம்)",
    executive: "நிர்வாகத்துறை",
    judiciary: "நீதித்துறை",
    union: "மத்திய அரசு நிலை",
    state: "மாநில அரசு நிலை",
    all_organs: "அனைத்து துறைகளும்",
    all_levels: "அனைத்து நிலைகளும்",
    search_placeholder: "விதி எண் அல்லது முக்கிய வார்த்தை கொண்டு தேடுக (உதாரணம்: Article 52)...",
    raw_text: "அரசியலமைப்பு சட்டத்தின் அசல் உரை",
    simplified: "எளிமைப்படுத்தப்பட்ட சுருக்கம்",
    child_friendly: "குழந்தைகளுக்கான பகுதி",
    key_takeaways: "முக்கிய குறிப்புகள்",
    quiz_title: "குடிமை சவால்",
    submit: "சமர்ப்பி",
    next: "அடுத்து",
    close: "மூடு",
    correct: "சரியான விடை!",
    incorrect: "தவறான விடை!",
    score: "மதிப்பெண்",
    play_now: "விளையாடு",
    back_to_dashboard: "முகப்பு பக்கத்திற்கு செல்க",
    governance_challenges: "ஆட்சி சவால்கள்",
    feedback_title: "குடிமக்கள் கருத்து",
    feedback_placeholder: "இத்தளத்தை மேம்படுத்த உதவுங்கள்! உங்கள் கருத்துக்களை இங்கே எழுதவும்...",
    send_feedback: "கருத்துக்களை அனுப்பு",
    feedback_success: "உங்கள் கருத்துக்களுக்கு நன்றி!",
    spin_wheel_desc: "ஜனநாயக சக்கரத்தை சுழற்றுங்கள்! அரசியலமைப்பு வினாக்களுக்கு விடையளித்து பதக்கங்களை வெல்லுங்கள்.",
    snakes_ladders_desc: "நல்லாட்சி கட்டங்களில் பயணம் செய்யுங்கள். அரசியலமைப்பு முடிவுகளை சரியாக எடுத்து ஏணிகளில் ஏறுங்கள்; விதிமீறல் பாம்புகளைத் தவிருங்கள்.",
    board_game_desc: "'சம்விதான் நகரி'க்கு பயணம் செய்யுங்கள். நாடாளுமன்றம், உச்ச நீதிமன்றம் மற்றும் குடியரசுத் தலைவர் மாளிகைக்குச் சென்று நிர்வாக சவால்களை தீர்க்கவும்.",
    flashcards_desc: "மத்திய மற்றும் மாநில பதவிகளை ஒப்பிடுங்கள். விரைவான வினாடி வினா அட்டைப் போட்டியில் உங்கள் அறிவை சோதியுங்கள்.",
    spin_btn: "சக்கரத்தை சுழற்று",
    roll_dice: "பகடையை உருட்டு",
    rating: "மதிப்பீடு",
  }
};

interface I18nContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('samvidhan_lang') as Language;
    if (saved === 'en' || saved === 'hi' || saved === 'ta') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('samvidhan_lang', lang);
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
