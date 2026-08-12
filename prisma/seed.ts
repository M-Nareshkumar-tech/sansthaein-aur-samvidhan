import { seedArticles } from '../src/data/articles';
import { prisma } from '../src/lib/prisma';
import { GAME_SEED_DATA } from './game-seed-data';


// Comprehensive Hindi translation mapping for the seed articles to populate in the DB
const HINDI_ARTICLES_MAP: Record<string, { title: string; simplified: string; child: string; takeaways: string[] }> = {
  "Article 52": {
    title: "भारत के राष्ट्रपति",
    simplified: "राष्ट्रपति भारत के राज्य के आधिकारिक प्रमुख हैं। वे देश की एकता, अखंडता और एकजुटता का प्रतीक हैं। संघ के सभी कार्यकारी कार्य राष्ट्रपति के नाम पर किए जाते हैं।",
    child: "इन्हें हमारे देश के सबसे प्रमुख व्यक्ति (प्रथम नागरिक) के रूप में समझें! वे पूरे भारत का प्रतिनिधित्व करते हैं और महत्वपूर्ण दस्तावेजों पर हस्ताक्षर करते हैं जिससे बिल कानून बन जाते हैं।",
    takeaways: [
      "राष्ट्रपति भारत के प्रथम नागरिक हैं।",
      "वे देश के औपचारिक प्रमुख के रूप में कार्य करते हैं।",
      "सभी महत्वपूर्ण अंतरराष्ट्रीय संधियाँ और सरकारी आदेश राष्ट्रपति के नाम पर जारी किए जाते हैं।"
    ]
  },
  "Article 74": {
    title: "राष्ट्रपति को सहायता और सलाह देने के लिए मंत्रिपरिषद",
    simplified: "यद्यपि राष्ट्रपति राज्य के प्रमुख हैं, वास्तविक शक्तियां प्रधानमंत्री और मंत्रिपरिषद के पास होती हैं। राष्ट्रपति को आमतौर पर उनकी सलाह पर ही कार्य करना होता है।",
    child: "भले ही राष्ट्रपति प्रमुख हैं, वे सलाहकारों की एक टीम की सुनते हैं! इस टीम को मंत्रिपरिषद कहा जाता है जिसके प्रमुख प्रधानमंत्री होते हैं।",
    takeaways: [
      "प्रधानमंत्री सरकार के कार्यकारी शाखा का नेतृत्व करते हैं।",
      "राष्ट्रपति को प्रधानमंत्री की कैबिनेट की सलाह के अनुसार कार्य करना आवश्यक है।",
      "यह प्रणाली भारत में संसदीय लोकतंत्र की स्थापना करती है।"
    ]
  },
  "Article 79": {
    title: "संसद का गठन",
    simplified: "भारत की संसद सर्वोच्च कानून बनाने वाली संस्था है। इसमें तीन घटक शामिल हैं: राष्ट्रपति, राज्यसभा (राज्यों की परिषद), और लोकसभा (लोगों की सभा)।",
    child: "संसद देश के नेताओं का एक बड़ा सभागार है! इसके तीन हिस्से हैं: राष्ट्रपति, राज्यसभा और लोकसभा, जहाँ पूरे देश के लिए नियम बनाए जाते हैं।",
    takeaways: [
      "संसद राष्ट्रपति, लोकसभा और राज्यसभा से मिलकर बनती है।",
      "लोकसभा सीधे जनता द्वारा चुने गए प्रतिनिधियों की सभा है।",
      "राज्यसभा अप्रत्यक्ष रूप से राज्यों का प्रतिनिधित्व करती है।"
    ]
  },
  "Article 110": {
    title: "धन विधेयक की परिभाषा",
    simplified: "धन विधेयक वह विधेयक है जो केवल सरकारी वित्त, कराधान या उधार लेने से संबंधित होता है। लोकसभा के अध्यक्ष तय करते हैं कि कोई विधेयक धन विधेयक है या नहीं।",
    child: "यह देश के खर्च और टैक्स से जुड़ा विशेष विधेयक है। चूंकि इसमें जनता का पैसा होता है, इसलिए लोकसभा के पास ही इसका अंतिम फैसला होता है।",
    takeaways: [
      "यह विशेष रूप से कर और सरकारी खर्चों से संबंधित है।",
      "इसे राष्ट्रपति की पूर्व सहमति से केवल लोकसभा में पेश किया जा सकता है।",
      "लोकसभा अध्यक्ष का निर्णय अंतिम होता है कि कोई बिल धन विधेयक है या नहीं।"
    ]
  },
  "Article 124": {
    title: "उच्चतम न्यायालय की स्थापना और गठन",
    simplified: "यह अनुच्छेद भारत के सर्वोच्च न्यायालय (सुप्रीम कोर्ट) की स्थापना करता है, जो देश का सबसे बड़ा कोर्ट है। इसमें जजों की नियुक्ति और उनकी योग्यताएं दी गई हैं।",
    child: "सर्वोच्च न्यायालय पूरे देश का मुख्य रेफरी है! वे नई दिल्ली में बैठते हैं और देखते हैं कि सरकार सहित हर कोई संविधान के नियमों का पालन कर रहा है या नहीं।",
    takeaways: [
      "उच्चतम न्यायालय भारत का शीर्ष न्यायिक निकाय है।",
      "न्यायाधीशों की नियुक्ति राष्ट्रपति द्वारा की जाती है।",
      "यह संविधान का रक्षक है और नागरिकों के मूल अधिकारों की रक्षा करता है।"
    ]
  },
  "Article 153": {
    title: "राज्यों के राज्यपाल",
    simplified: "जिस प्रकार राष्ट्रपति संघ के औपचारिक प्रमुख हैं, उसी प्रकार राज्यपाल प्रत्येक राज्य के औपचारिक प्रमुख होते हैं। राज्यपाल की नियुक्ति राष्ट्रपति द्वारा की जाती. है।",
    child: "राज्यपाल हर राज्य में राष्ट्रपति के विशेष प्रतिनिधि की तरह हैं! वे देखते हैं कि राज्य सरकार नियम के अनुसार चल रही है या नहीं।",
    takeaways: [
      "राज्यपाल राज्य प्रशासन में केंद्र सरकार का प्रतिनिधित्व करते हैं।",
      "उनकी नियुक्ति राष्ट्रपति द्वारा की जाती है और वे उनके प्रसादपर्यंत पद धारण करते हैं।",
      "एक ही व्यक्ति एक से अधिक राज्यों का राज्यपाल हो सकता है।"
    ]
  },
  "Article 163": {
    title: "राज्यपाल को सलाह देने के लिए मंत्रिपरिषद",
    simplified: "मुख्यमंत्री और उनकी कैबिनेट राज्य के राज्यपाल को सहायता और सलाह देती है। हालांकि, राज्यपाल के पास कुछ विवेकाधीन शक्तियां भी होती हैं जहाँ कैबिनेट की सलाह जरूरी नहीं होती।",
    child: "जैसे राष्ट्रपति के पास प्रधानमंत्री की टीम होती है, वैसे ही राज्यपाल के पास मुख्यमंत्री और उनके मंत्रियों की टीम सलाह देने के लिए होती है।",
    takeaways: [
      "मुख्यमंत्री राज्य सरकार के कार्यकारी प्रमुख होते हैं।",
      "राज्यपाल सामान्यतः राज्य कैबिनेट की सलाह पर काम करते हैं।",
      "राज्यपाल के पास राष्ट्रपति की तुलना में अधिक विवेकाधीन शक्तियां हैं।"
    ]
  },
  "Article 168": {
    title: "राज्यों के विधानमंडलों का गठन",
    simplified: "प्रत्येक राज्य में कानून बनाने वाली संस्था होती है। इसमें राज्यपाल और विधानसभा (कुछ राज्यों में विधान परिषद भी) शामिल होते हैं।",
    child: "राज्य विधानमंडल आपके राज्य के लिए कानून बनाते हैं (जैसे स्कूल नियम या बस किराए)। अधिकांश राज्यों में एक सदन (विधानसभा) होता है।",
    takeaways: [
      "इसमें राज्यपाल, विधानसभा और जहाँ लागू हो वहां विधान परिषद शामिल होती है।",
      "विधानसभा के सदस्यों (विधायक / MLA) को जनता सीधे वोट देकर चुनती है।",
      "केवल कुछ ही राज्यों में द्विसदनीय व्यवस्था है।"
    ]
  },
  "Article 213": {
    title: "राज्यपाल की अध्यादेश जारी करने की शक्ति",
    simplified: "जब राज्य विधानसभा सत्र में नहीं होती, तो राज्यपाल आपातकालीन परिस्थितियों से निपटने के लिए अस्थायी कानून बना सकते हैं, जिसे 'अध्यादेश' कहा जाता है।",
    child: "अगर विधानसभा की छुट्टियां चल रही हों और कोई जरूरी कानून बनाना हो, तो राज्यपाल अस्थायी अध्यादेश जारी कर सकते हैं। विधानसभा के शुरू होते ही इस पर वोटिंग करानी होती है।",
    takeaways: [
      "अध्यादेश एक अस्थायी कानून है जब विधानसभा सत्र में न हो।",
      "इसका प्रभाव विधानसभा के कानून जैसा ही होता है।",
      "सत्र शुरू होने के छह सप्ताह के भीतर इसका विधानसभा से पारित होना अनिवार्य है।"
    ]
  },
  "Article 226": {
    title: "उच्च न्यायालयों की रिट जारी करने की शक्ति",
    simplified: "उच्च न्यायालयों के पास नागरिकों के मौलिक अधिकारों की रक्षा के लिए पाँच प्रकार के आदेश (रिट) जारी करने की शक्ति है। इसका दायरा सुप्रीम कोर्ट से भी विस्तृत है।",
    child: "रिट एक सुपर-कमांड है! अगर कोई अधिकारी या पुलिस आपके साथ गलत व्यवहार करती है, तो आप कोर्ट से उन्हें रोकने के लिए रिट मंगवा सकते हैं।",
    takeaways: [
      "यह उच्च न्यायालय को मौलिक अधिकारों की रक्षा करने की शक्ति देता है।",
      "रिट के प्रकार: बंदी प्रत्यक्षीकरण (Habeas Corpus), परमादेश (Mandamus) आदि।",
      "अनुच्छेद 226 उच्च न्यायालयों को बेहद शक्तिशाली अधिकार प्रदान करता है।"
    ]
  }
};

// Comprehensive Tamil translation mapping for the seed articles
const TAMIL_ARTICLES_MAP: Record<string, { title: string; simplified: string; child: string; takeaways: string[]; questionTa: { question: string; options: string[]; explanation: string } }> = {
  "Article 52": {
    title: "இந்தியக் குடியரசுத் தலைவர் (ஜனாதிபதி)",
    simplified: "ஜனாதிபதி இந்திய நாட்டின் அதிகாரப்பூர்வ தலைவர் ஆவார். நாட்டின் ஒற்றுமை மற்றும் ஒருமைப்பாட்டின் அடையாளமாக விளங்குபவர். மத்திய அரசின் அனைத்து நிர்வாக முடிவுகளும் இவரின் பெயரிலேயே மேற்கொள்ளப்படுகின்றன.",
    child: "நம் நாட்டின் முதல் குடிமகன் ஜனாதிபதி ஆவார். இவர் நாட்டின் அனைத்து முக்கிய ஆவணங்களிலும் கையெழுத்திட்டு சட்டங்களை உருவாக்குவார்.",
    takeaways: [
      "குடியரசுத் தலைவர் இந்தியாவின் முதல் குடிமகன்.",
      "நாட்டின் பெயரளவு தலைவராக செயல்படுகிறார்.",
      "அனைத்து முக்கிய அரசாங்க ஆணைகளும் இவரது பெயரிலேயே வெளியாகும்."
    ],
    questionTa: {
      question: "இந்தியக் குடியரசுத் தலைவரின் முதன்மைப் பொறுப்பு என்ன?",
      options: [
        "அன்றாட அரசாங்க நிர்வாகத்தை நடத்துவது",
        "நாட்டின் ஒருமைப்பாட்டைப் பிரதிநிதித்துவப்படுத்துவது மற்றும் பெயரளவு தலைவராகச் செயல்படுவது",
        "நீதிமன்ற வழக்குகளில் தீர்ப்பளிப்பது",
        "மக்களவையில் பட்ஜெட் தாக்கல் செய்வது"
      ],
      explanation: "விதி 52-ன் படி, குடியரசுத் தலைவர் நாட்டின் அரசுத் தலைவர் ஆவார். அவர் நாட்டின் ஒற்றுமை மற்றும் ஒருமைப்பாட்டின் அடையாளமாக விளங்குகிறார்."
    }
  },
  "Article 74": {
    title: "குடியரசுத் தலைவருக்கு உதவ அமைச்சரவை குழு",
    simplified: "குடியரசுத் தலைவர் பெயரளவு தலைவராக இருந்தாலும், உண்மையான அதிகாரம் பிரதமர் தலைமையிலான அமைச்சரவைக் குழுவிடமே உள்ளது. குடியரசுத் தலைவர் இக்குழுவின் ஆலோசனையின் படியே செயல்பட வேண்டும்.",
    child: "நாட்டை வழிநடத்த பிரதமரின் தலைமையிலான அமைச்சர்கள் குழு ஜனாதிபதிக்கு ஆலோசனை வழங்கும்.",
    takeaways: [
      "பிரதமர் நாட்டின் நிர்வாகத்தின் உண்மையான தலைவர்.",
      "அமைச்சரவையின் ஆலோசனைக்கு கட்டுப்பட்டு குடியரசுத் தலைவர் செயல்பட வேண்டும்.",
      "இது நாடாளுமன்ற ஜனநாயக முறையை உறுதி செய்கிறது."
    ],
    questionTa: {
      question: "இந்தியாவில் உண்மையான நிர்வாக அதிகாரம் யாரிடம் உள்ளது?",
      options: [
        "குடியரசுத் தலைவர்",
        "நாடாளுமன்ற சபாநாயகர்",
        "பிரதமர் தலைமையிலான அமைச்சரவை",
        "உச்ச நீதிமன்ற தலைமை நீதிபதி"
      ],
      explanation: "அரசியலமைப்புச் சட்டத்தின்படி, குடியரசுத் தலைவர் பெயரளவு தலைவராகவும், பிரதமர் தலைமையிலான அமைச்சரவை உண்மையான நிர்வாக அமைப்பாகவும் செயல்படுகிறது."
    }
  },
  "Article 79": {
    title: "நாடாளுமன்றத்தின் அமைப்பு",
    simplified: "நாடாளுமன்றம் என்பது நாட்டின் உச்சபட்ச சட்டம் இயற்றும் அமைப்பாகும். இதில் குடியரசுத் தலைவர், மக்களவை (லோக் சபா), மற்றும் மாநிலங்களவை (ராஜ்ய சபா) ஆகிய மூன்று பிரிவுகள் உள்ளன.",
    child: "நாட்டிற்கு தேவையான புதிய விதிகளை (சட்டங்களை) உருவாக்கும் முக்கிய இடம் தான் நாடாளுமன்றம்.",
    takeaways: [
      "நாடாளுமன்றம் ஜனாதிபதி, மக்களவை மற்றும் மாநிலங்களவையை உள்ளடக்கியது.",
      "மக்களவை உறுப்பினர்கள் மக்களால் நேரடியாக தேர்ந்தெடுக்கப்படுகிறார்கள்.",
      "மாநிலங்களவை மாநிலங்களின் பிரதிநிதிகளைக் கொண்டது."
    ],
    questionTa: {
      question: "நாடாளுமன்றத்தின் மூன்று முக்கிய அங்கங்கள் எவை?",
      options: [
        "பிரதமர், சபாநாயகர், நீதிபதி",
        "குடியரசுத் தலைவர், மக்களவை, மாநிலங்களவை",
        "மக்களவை, சட்டப்பேரவை, உயர் நீதிமன்றம்",
        "அமைச்சரவை, ஆளுநர், ஜனாதிபதி"
      ],
      explanation: "விதி 79-ன் படி, இந்திய நாடாளுமன்றமானது குடியரசுத் தலைவர், மக்களவை மற்றும் மாநிலங்களவை ஆகிய மூன்றும் இணைந்ததாகும்."
    }
  },
  "Article 110": {
    title: "நிதி மசோதாவின் வரையறை",
    simplified: "வரி விதிப்பு, அரசாங்கத்தின் செலவுகள் மற்றும் கடன் பெறுதல் தொடர்பான சிறப்பு மசோதா தான் நிதி மசோதா ஆகும். ஒரு மசோதா நிதி மசோதாவா இல்லையா என்பதை மக்களவை சபாநாயகரே முடிவு செய்வார்.",
    child: "அரசாங்கத்தின் பணம் மற்றும் வரி தொடர்பான சிறப்பு சட்டவரைவு இதுவாகும். இதற்கு மக்களவையின் ஒப்புதல் மிகவும் முக்கியம்.",
    takeaways: [
      "இது முழுக்க முழுக்க வரி மற்றும் பொது நிதி தொடர்பான மசோதா.",
      "இதை ஜனாதிபதியின் ஒப்புதலுடன் மக்களவையில் மட்டுமே அறிமுகப்படுத்த முடியும்.",
      "சபாநாயகரின் முடிவே இறுதியானது."
    ],
    questionTa: {
      question: "ஒரு மசோதா நிதி மசோதாவா என்பதைத் தீர்மானிக்கும் இறுதி அதிகாரம் யாருக்கு உள்ளது?",
      options: [
        "இந்தியப் பிரதமர்",
        "நாடாளுமன்ற விவகார அமைச்சர்",
        "மக்களவை சபாநாயகர்",
        "குடியரசுத் தலைவர்"
      ],
      explanation: "அரசியலமைப்புச் சட்டப்படி, ஒரு மசோதா நிதி மசோதாவா இல்லையா என்பதைத் தீர்மானிக்கும் இறுதி அதிகாரம் மக்களவை சபாநாயகருக்கே உண்டு."
    }
  },
  "Article 124": {
    title: "உச்ச நீதிமன்றத்தின் அமைப்பு மற்றும் நிறுவல்",
    simplified: "இந்தியாவின் மிக உயரிய நீதிமன்றமான உச்ச நீதிமன்றத்தை இந்த விதி நிறுவுகிறது. இதன் தலைமை நீதிபதி மற்றும் பிற நீதிபதிகளை குடியரசுத் தலைவர் நியமிப்பார்.",
    child: "உச்ச நீதிமன்றம் தான் நாட்டின் மிகப்பெரிய நீதிபதி! அரசாங்கம் உட்பட அனைவரும் அரசியலமைப்பு சட்டத்தை பின்பற்றுகிறார்களா என்பதை இது கண்காணிக்கும்.",
    takeaways: [
      "உச்ச நீதிமன்றம் நாட்டின் மிக உயர்ந்த நீதிமன்றமாகும்.",
      "நீதிபதிகள் ஜனாதிபதியால் நியமிக்கப்படுகிறார்கள்.",
      "இது அரசியலமைப்பின் பாதுகாவலன் ஆகும்."
    ],
    questionTa: {
      question: "உச்ச நீதிமன்ற நீதிபதிகளை நியமிப்பவர் யார்?",
      options: [
        "பிரதமர்",
        "மக்களவை சபாநாயகர்",
        "குடியரசுத் தலைவர்",
        "மத்திய சட்ட அமைச்சர்"
      ],
      explanation: "விதி 124-ன் கீழ், உச்ச நீதிமன்றத்தின் தலைமை நீதிபதி மற்றும் பிற நீதிபதிகளை குடியரசுத் தலைவர் நியமிக்கிறார்."
    }
  },
  "Article 153": {
    title: "மாநிலங்களின் ஆளுநர்கள்",
    simplified: "மத்திய அரசுக்கு ஜனாதிபதி எப்படியோ, அப்படியே ஒவ்வொரு மாநிலத்திற்கும் ஆளுநர் (கவர்னர்) தலைவராக இருப்பார். ஆளுநரை குடியரசுத் தலைவர் நியமிக்கிறார்.",
    child: "ஒவ்வொரு மாநிலத்திலும் ஜனாதிபதியின் நேரடி பிரதிநிதியாக ஆளுநர் செயல்படுகிறார்.",
    takeaways: [
      "மாநில நிர்வாகத்தின் பெயரளவு தலைவர் ஆளுநர் ஆவார்.",
      "குடியரசுத் தலைவரால் நியமிக்கப்பட்டு அவரது விருப்பப்படி பதவியில் நீடிப்பார்.",
      "ஒருவர் ஒன்றுக்கு மேற்பட்ட மாநிலங்களுக்கும் ஆளுநராக இருக்கலாம்."
    ],
    questionTa: {
      question: "மாநில ஆளுநரை நியமிப்பவர் யார்?",
      options: [
        "மாநில முதலமைச்சர்",
        "குடியரசுத் தலைவர்",
        "உயர் நீதிமன்ற தலைமை நீதிபதி",
        "மாநில சட்டப்பேரவை சபாநாயகர்"
      ],
      explanation: "மாநில ஆளுநரை குடியரசுத் தலைவர் நியமிக்கிறார் மற்றும் அவர் குடியரசுத் தலைவரின் விருப்பம் உள்ளவரை பதவியில் நீடிப்பார்."
    }
  },
  "Article 163": {
    title: "ஆளுநருக்கு உதவ மாநில அமைச்சரவை குழு",
    simplified: "மாநில ஆளுநருக்கு உதவவும் ஆலோசனை வழங்கவும் முதலமைச்சர் தலைமையிலான மாநில அமைச்சரவை செயல்படும். எனினும், ஆளுநருக்கு சில தனிப்பட்ட அதிகாரங்களும் உண்டு.",
    child: "மாநில அளவில் முதலமைச்சர் தலைமையிலான குழு ஆளுநருக்கு நாட்டை வழிநடத்த ஆலோசனை வழங்கும்.",
    takeaways: [
      "முதலமைச்சர் மாநில நிர்வாகத்தின் உண்மையான தலைவர்.",
      "ஆளுநர் பொதுவாக மாநில அமைச்சரவையின் ஆலோசனைப்படியே செயல்படுவார்.",
      "ஆளுநருக்கு ஜனாதிபதியை விட கூடுதல் தனிப்பட்ட அதிகாரங்கள் உள்ளன."
    ],
    questionTa: {
      question: "மாநிலத்தில் அமைச்சரவையின் ஆலோசனைக்கு உட்படாத சிறப்பு அதிகாரங்கள் யாருக்கு உள்ளன?",
      options: [
        "முதலமைச்சர்",
        "ஆளுநர்",
        "சட்டமன்ற சபாநாயகர்",
        "உயர் நீதிமன்ற நீதிபதி"
      ],
      explanation: "மாநில ஆளுநருக்கு அரசியலமைப்புச் சட்டத்தின்படி சில தனிப்பட்ட விவேக அதிகாரங்கள் (Discretionary Powers) வழங்கப்பட்டுள்ளன."
    }
  },
  "Article 168": {
    title: "மாநில சட்டமன்றங்களின் அமைப்பு",
    simplified: "ஒவ்வொரு மாநிலத்திற்கும் சட்டம் இயற்ற சட்டமன்றம் உண்டு. இதில் ஆளுநர் மற்றும் சட்டமன்ற பேரவை (சில மாநிலங்களில் சட்ட மேலவை) அடங்கும்.",
    child: "உங்கள் மாநிலத்திற்கு தேவையான நல்ல விதிகளை உருவாக்கும் இடம் தான் சட்டமன்றம்.",
    takeaways: [
      "சட்டமன்றம் ஆளுநர் மற்றும் சட்டமன்ற பேரவையை உள்ளடக்கியது.",
      "உறுப்பினர்கள் (எம்.எல்.ஏ / MLA) மக்களால் நேரடியாக தேர்ந்தெடுக்கப்படுகிறார்கள்.",
      "தமிழ்நாட்டில் ஓரவை (சட்டமன்ற பேரவை மட்டும்) சட்டமன்ற முறை உள்ளது."
    ],
    questionTa: {
      question: "சட்டமன்ற பேரவை உறுப்பினர்கள் (எம்.எல்.ஏ) எவ்வாறு தேர்ந்தெடுக்கப்படுகிறார்கள்?",
      options: [
        "மக்களால் நேரடியாக வாக்களித்துத் தேர்ந்தெடுக்கப்படுகிறார்கள்",
        "ஆளுநரால் நியமிக்கப்படுகிறார்கள்",
        "உள்ளாட்சி அமைப்புகளால் தேர்ந்தெடுக்கப்படுகிறார்கள்",
        "நாடாளுமன்றத்தால் தேர்ந்தெடுக்கப்படுகிறார்கள்"
      ],
      explanation: "மாநில சட்டமன்ற பேரவை உறுப்பினர்கள் (MLA) அந்தந்த மாநில வாக்காளர்களால் பொதுத் தேர்தல் மூலமாக நேரடியாகத் தேர்ந்தெடுக்கப்படுகிறார்கள்."
    }
  },
  "Article 213": {
    title: "ஆளுநரின் அவசரச் சட்டம் பிறப்பிக்கும் அதிகாரம்",
    simplified: "மாநில சட்டமன்றக் கூட்டத்தொடர் நடைபெறாத போது, அவசர தேவைகளுக்காக ஆளுநர் பிறப்பிக்கும் தற்காலிகச் சட்டம் அவசரச் சட்டம் எனப்படும்.",
    child: "சட்டமன்றம் இயங்காத அவசர நேரத்தில் தற்காலிக சட்டங்களை ஆளுநரே நேரடியாக உருவாக்க முடியும்.",
    takeaways: [
      "இது தற்காலிகமாக இயற்றப்படும் ஒரு அவசரச் சட்டமாகும்.",
      "இதற்கு சட்டமன்ற சட்டம் போன்றே முழு அதிகாரம் உண்டு.",
      "சட்டமன்றம் கூடிய 6 வாரத்திற்குள் இதற்கு ஒப்புதல் பெற வேண்டும்."
    ],
    questionTa: {
      question: "ஆளுநரால் பிறப்பிக்கப்படும் அவசரச் சட்டம் எவ்வளவு காலம் செல்லுபடியாகும்?",
      options: [
        "சட்டமன்றம் மீண்டும் கூடியதில் இருந்து 6 வாரங்கள்",
        "நிரந்தரமாகச் செல்லுபடியாகும்",
        "ஓராண்டு வரை",
        "முதலமைச்சர் விரும்பும் வரை"
      ],
      explanation: "அவசரச் சட்டம் சட்டமன்றம் மீண்டும் கூடிய தேதியிலிருந்து 6 வார காலத்திற்குள் அங்கீகரிக்கப்பட வேண்டும், இல்லையெனில் காலாவதியாகிவிடும்."
    }
  },
  "Article 226": {
    title: "உயர் நீதிமன்றங்களின் நீதிப்பேராணை அதிகாரங்கள்",
    simplified: "குடிமக்களின் அடிப்படை உரிமைகளை பாதுகாக்கவும், சட்டங்களை அமல்படுத்தவும் உயர் நீதிமன்றங்கள் ஐந்து வகையான பேராணைகளை (ரிட்) பிறப்பிக்க இந்த விதி அதிகாரம் அளிக்கிறது.",
    child: "உரிமைகளை மீறும் அதிகாரிகளுக்கு எதிராக உயர் நீதிமன்றம் பிறப்பிக்கும் மிக சக்திவாய்ந்த உத்தரவு தான் பேராணை.",
    takeaways: [
      "அடிப்படை உரிமைகள் மற்றும் பிற சட்ட உரிமைகளை பாதுகாக்க உதவுகிறது.",
      "ஆட்கொணர்வு (Habeas Corpus), செயலுறுத்தும் பேராணை போன்ற 5 வகைகள் உள்ளன.",
      "இதன் பேராணை அதிகாரம் உச்ச நீதிமன்றத்தை விட பரந்தது."
    ],
    questionTa: {
      question: "அடிப்படை உரிமைகள் மீறப்படும் போது பேராணை பிறப்பிக்க உயர் நீதிமன்றத்திற்கு அதிகாரம் அளிக்கும் விதி எது?",
      options: [
        "விதி 32",
        "விதி 226",
        "விதி 124",
        "விதி 52"
      ],
      explanation: "விதி 226 உயர் நீதிமன்றங்களுக்கும், விதி 32 உச்ச நீதிமன்றத்திற்கும் பேராணைகளை வெளியிடும் அதிகாரத்தை வழங்குகின்றன."
    }
  }
};

async function main() {
  console.log("Cleaning up database...");
  await prisma.auditLog.deleteMany({});
  await prisma.quizAttempt.deleteMany({});
  await prisma.gameSession.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.gameAttempt.deleteMany({});
  await prisma.gameContent.deleteMany({});
  await prisma.simulatorAttempt.deleteMany({});
  await prisma.masteredScenario.deleteMany({});
  await prisma.simulatorOption.deleteMany({});
  await prisma.simulatorScenario.deleteMany({});
  await prisma.simulatorPath.deleteMany({});
  await prisma.badge.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.scenarioQuestion.deleteMany({});
  await prisma.articleTranslation.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.chapter.deleteMany({});
  await prisma.part.deleteMany({});

  console.log("Seeding Part V and Part VI containers...");
  
  const partV = await prisma.part.create({
    data: {
      partNumber: "Part V",
      title: "The Union (संघ)",
    }
  });

  const partVI = await prisma.part.create({
    data: {
      partNumber: "Part VI",
      title: "The States (राज्य)",
    }
  });

  const chaptersMap: Record<string, any> = {};
  
  chaptersMap["Union_Executive"] = await prisma.chapter.create({
    data: {
      partId: partV.id,
      title: "Chapter I: The Executive (कार्यपालिका)",
    }
  });

  chaptersMap["Union_Legislature"] = await prisma.chapter.create({
    data: {
      partId: partV.id,
      title: "Chapter II: Parliament (विधायिका)",
    }
  });

  chaptersMap["Union_Judiciary"] = await prisma.chapter.create({
    data: {
      partId: partV.id,
      title: "Chapter IV: The Union Judiciary (न्यायपालिका)",
    }
  });

  chaptersMap["State_Executive"] = await prisma.chapter.create({
    data: {
      partId: partVI.id,
      title: "Chapter II: The Executive (कार्यपालिका)",
    }
  });

  chaptersMap["State_Legislature"] = await prisma.chapter.create({
    data: {
      partId: partVI.id,
      title: "Chapter III: The State Legislature (विधायिका)",
    }
  });

  chaptersMap["State_Judiciary"] = await prisma.chapter.create({
    data: {
      partId: partVI.id,
      title: "Chapter V: The High Courts in the States (न्यायपालिका)",
    }
  });

  console.log(`Seeding ${seedArticles.length} constitutional articles...`);

  for (const art of seedArticles) {
    const chapterKey = `${art.level}_${art.organ}`;
    const chapter = chaptersMap[chapterKey];
    
    if (!chapter) {
      console.warn(`Warning: Chapter mapping not found for ${chapterKey} (Article ${art.article_number})`);
      continue;
    }

    const createdArticle = await prisma.article.create({
      data: {
        articleNumber: art.article_number,
        title: art.title,
        chapterId: chapter.id,
        organ: art.organ.toUpperCase(),
        level: art.level.toUpperCase(),
        status: "PUBLISHED",
        version: 1,
        reviewerInfo: "System Autoseed",
      }
    });

    // Populate translations: English
    await prisma.articleTranslation.create({
      data: {
        articleId: createdArticle.id,
        language: "en",
        title: art.title,
        rawText: art.raw_text,
        simplifiedSummary: art.simplified_summary,
        childFriendlySummary: art.child_friendly_summary,
        keyTakeaways: JSON.stringify(art.key_takeaways),
      }
    });

    // Populate translations: Hindi
    const hiMap = HINDI_ARTICLES_MAP[art.article_number];
    if (hiMap) {
      await prisma.articleTranslation.create({
        data: {
          articleId: createdArticle.id,
          language: "hi",
          title: hiMap.title,
          rawText: art.raw_text,
          simplifiedSummary: hiMap.simplified,
          childFriendlySummary: hiMap.child,
          keyTakeaways: JSON.stringify(hiMap.takeaways),
        }
      });
    }

    // Populate translations: Tamil
    const taMap = TAMIL_ARTICLES_MAP[art.article_number];
    if (taMap) {
      await prisma.articleTranslation.create({
        data: {
          articleId: createdArticle.id,
          language: "ta",
          title: taMap.title,
          rawText: art.raw_text,
          simplifiedSummary: taMap.simplified,
          childFriendlySummary: taMap.child,
          keyTakeaways: JSON.stringify(taMap.takeaways),
        }
      });
    }

    // Populate Scenario Questions
    for (const q of art.scenario_questions) {
      // Find Tamil question equivalent
      const qTa = taMap ? taMap.questionTa : { question: q.question, options: q.options, explanation: q.explanation };
      
      await prisma.scenarioQuestion.create({
        data: {
          articleId: createdArticle.id,
          questionTextEn: q.question,
          questionTextHi: q.question, // Fallback for Hindi (we can expand this if needed)
          questionTextTa: qTa.question,
          optionsEn: JSON.stringify(q.options),
          optionsHi: JSON.stringify(q.options),
          optionsTa: JSON.stringify(qTa.options),
          correctAnswerIdx: q.answerIndex,
          explanationEn: q.explanation,
          explanationHi: q.explanation,
          explanationTa: qTa.explanation,
        }
      });
    }
  }

  // Seed a demo user
  console.log("Seeding demo citizen user...");
  const existingUser = await prisma.user.findUnique({
    where: { email: "citizen@india.gov.in" }
  });
  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: "citizen@india.gov.in",
        passwordHash: "$2a$12$R.Sj.YqNqGzO0R8kY6Lg5eS6w95Fk3Y1K4yZJc1pM/c1C3i5jYl6K", // Hash of "Samvidhan2026"
        role: "CITIZEN",
        profile: {
          create: {
            displayName: "Satyamev Jayate",
            languagePref: "en",
            points: 120,
            level: 2,
          }
        }
      }
    });
  }

  // Seed Simulator Scenarios Idempotently
  console.log("Seeding simulator paths and scenarios...");
  await seedSimulator();

  // Seed Games Idempotently
  console.log("Seeding game content...");
  await seedGames();

  console.log("Database seeded successfully with English, Hindi, and Tamil records!");
}

async function seedSimulator() {
  const PATHS_DATA = [
    {
      id: 'beginner',
      titleEn: 'Beginner Path (Union & State Basics)',
      titleHi: 'शुरुआती पथ (संघ और राज्य की बुनियादी बातें)',
      titleTa: 'தொடக்கப் பாதை (மத்திய மற்றும் மாநில அடிப்படைகள்)',
      levelRequired: 1,
      scenarios: [
        {
          id: 'B1',
          titleEn: 'The Cabinet Appointment',
          titleHi: 'कैबिनेट की नियुक्ति',
          titleTa: 'அமைச்சரவை நியமனம்',
          descriptionEn: 'The Prime Minister advises you (the President) to appoint a close advisor as a Cabinet Minister. However, this advisor is not currently a member of either Lok Sabha or Rajya Sabha. What do you do?',
          descriptionHi: 'प्रधानमंत्री आपको (राष्ट्रपति को) एक करीबी सलाहकार को कैबिनेट मंत्री नियुक्त करने की सलाह देते हैं। हालांकि, यह सलाहकार वर्तमान में लोकसभा या राज्यसभा के सदस्य नहीं हैं। आप क्या करेंगे?',
          descriptionTa: 'நெருக்கமான ஒருவரை அமைச்சரவை அமைச்சராக நியமிக்குமாறு பிரதமர் உங்களுக்கு (ஜனாதிபதிக்கு) அறிவுறுத்துகிறார். ஆனால், இவர் தற்போது நாடாளுமன்றத்தில் உறுப்பினராக இல்லை. நீங்கள் என்ன செய்வீர்கள்?',
          articleLinked: 'Article 74 & 75',
          options: [
            {
              optionIndex: 0,
              textEn: 'Refuse the appointment, as ministers must be Members of Parliament.',
              textHi: 'नियुक्ति से इंकार करें, क्योंकि मंत्रियों को संसद का सदस्य होना चाहिए।',
              textTa: 'नियुक्ति से इंकार करें, क्योंकि मंत्रियों को संसद का सदस्य होना चाहिए।',
              points: 10,
              explanationEn: 'Incorrect. Article 75(5) allows a non-member to be appointed as a minister, but they must get elected to either House within six consecutive months.',
              explanationHi: 'गलत। अनुच्छेद 75(5) एक गैर-सदस्य को मंत्री नियुक्त करने की अनुमति देता है, लेकिन उन्हें छह महीने के भीतर संसद सदस्य बनना होगा।',
              explanationTa: 'गलत। अनुच्छेद 75(5) एक गैर-सदस्य को मंत्री नियुक्त करने की अनुमति देता है, लेकिन उन्हें छह महीने के भीतर संसद सदस्य बनना होगा।'
            },
            {
              optionIndex: 1,
              textEn: 'Appoint them, but warn that they must get elected to Parliament within 6 months.',
              textHi: 'उन्हें नियुक्त करें, लेकिन चेतावनी दें कि उन्हें 6 महीने के भीतर संसद के लिए निर्वाचित होना होगा।',
              textTa: 'அவர்களை நியமிக்கவும், ஆனால் 6 மாதங்களுக்குள் நாடாளுமன்றத்திற்கு தேர்ந்தெடுக்கப்பட வேண்டும் என்று எச்சரிக்கவும்.',
              points: 40,
              explanationEn: 'Correct! According to Article 75(5), a minister who is not a member of Parliament for six consecutive months ceases to be a minister.',
              explanationHi: 'सही! अनुच्छेद 75(5) के अनुसार, एक मंत्री जो लगातार छह महीने तक संसद का सदस्य नहीं रहता है, वह मंत्री पद पर नहीं रह सकता।',
              explanationTa: 'சரி! பிரிவு 75(5)-ன் படி, தொடர்ச்சியாக ஆறு மாதங்கள் நாடாளுமன்ற உறுப்பினராக இல்லாத நபர் அமைச்சர் பதவியில் நீடிக்க முடியாது.'
            },
            {
              optionIndex: 2,
              textEn: 'Appoint them permanently without any conditions, using presidential discretion.',
              textHi: 'राष्ट्रपति के विवेक का उपयोग करते हुए, बिना किसी शर्त के उन्हें स्थायी रूप से नियुक्त करें।',
              textTa: 'ஜனாதிபதியின் விருப்பத்தைப் பயன்படுத்தி எந்த நிபந்தனையுமின்றி நிரந்தரமாக நியமிக்கவும்.',
              points: 5,
              explanationEn: 'Incorrect. A minister cannot continue beyond six months without gaining election to Parliament.',
              explanationHi: 'गलत। कोई भी मंत्री संसद का सदस्य बने बिना छह महीने से अधिक समय तक पद पर नहीं रह सकता।',
              explanationTa: 'தवறு. நாடாளுமன்ற உறுப்பினராக தேர்ந்தெடுக்கப்படாமல் ஒருவர் ஆறு மாதங்களுக்கு மேல் அமைச்சராக தொடர முடியாது.'
            }
          ]
        },
        {
          id: 'B2',
          titleEn: 'Governor\'s Assent Dilemma',
          titleHi: 'राज्यपाल की सहमति की दुविधा',
          titleTa: 'ஆளுநரின் ஒப்புதல் சங்கடம்',
          descriptionEn: 'You are the Governor of a state. The State Assembly has passed a bill that significantly weakens the power of the State High Court. What is your constitutional action?',
          descriptionHi: 'आप एक राज्य के राज्यपाल हैं। राज्य विधानसभा ने एक ऐसा विधेयक पारित किया है जो राज्य उच्च न्यायालय की शक्ति को काफी कमजोर करता है। आपकी संवैधानिक कार्रवाई क्या है?',
          descriptionTa: 'நீங்கள் ஒரு மாநிலத்தின் ஆளுநர். மாநில உயர்நீதிமன்றத்தின் அதிகாரத்தை கணிசமாகக் குறைக்கும் மசோதாவை மாநில சட்டமன்றம் நிறைவேற்றியுள்ளது. உங்கள் அரசியலமைப்பு நடவடிக்கை என்ன?',
          articleLinked: 'Article 200',
          options: [
            {
              optionIndex: 0,
              textEn: 'Sign the bill immediately, since the state cabinet has advised you to do so.',
              textHi: 'विधेयक पर तुरंत हस्ताक्षर करें, क्योंकि राज्य कैबिनेट ने आपको ऐसा करने की सलाह दी है।',
              textTa: 'மசோதாவில் உடனடியாக கையெழுத்திடுங்கள், ஏனெனில் மாநில அமைச்சரவை உங்களுக்கு அவ்வாறு செய்ய அறிவுறுத்தியுள்ளது.',
              points: 5,
              explanationEn: 'Incorrect. If the bill derogates from the powers of the High Court, signing it would violate your oath to protect judicial independence.',
              explanationHi: 'गलत। यदि विधेयक उच्च न्यायालय की शक्तियों को कम करता है, तो उस पर हस्ताक्षर करना न्यायिक स्वतंत्रता की रक्षा करने की आपकी शपथ का उल्लंघन होगा।',
              explanationTa: 'தவறு. மசோதா உயர் நீதிமன்றத்தின் அதிகாரங்களைக் குறைத்தால், அதில் கையெழுத்திடுவது நீதித்துறையின் சுதந்திரத்தைப் பாதுகாப்பதற்கான உங்கள் உறுதிமொழியை மீறுவதாகும்.'
            },
            {
              optionIndex: 1,
              textEn: 'Reserve the bill for the consideration of the President of India.',
              textHi: 'विधेयक को भारत के राष्ट्रपति के विचारार्थ आरक्षित रखें।',
              textTa: 'மசோதாவை இந்திய ஜனாதிபதியின் பரிசீலனைக்காக நிறுத்தி வைக்கவும்.',
              points: 40,
              explanationEn: 'Correct! Under Article 200, the Governor MUST reserve any bill for the President if it would endanger the constitutional position of the High Court.',
              explanationHi: 'सही! अनुच्छेद 200 के तहत, राज्यपाल को राष्ट्रपति के लिए किसी भी विधेयक को आरक्षित रखना चाहिए यदि इससे उच्च न्यायालय की संवैधानिक स्थिति को खतरा हो।',
              explanationTa: 'சரி! பிரிவு 200-ன் கீழ், உயர் நீதிமன்றத்தின் அரசியலமைப்பு நிலைக்கு ஆபத்தை விளைவிக்கும் மசோதாவை ஆளுநர் ஜனாதிபதியின் பரிசீலனைக்கு அனுப்ப வேண்டும்.'
            },
            {
              optionIndex: 2,
              textEn: 'Veto the bill permanently and dissolve the Assembly.',
              textHi: 'विधेयक को स्थायी रूप से वीटो करें और विधानसभा को भंग कर दें।',
              textTa: 'மசோதாவை நிரந்தரமாக நிராகரித்து சட்டமன்றத்தைக் கலைக்கவும்.',
              points: 10,
              explanationEn: 'Incorrect. Governors do not have absolute veto power, nor can they dissolve the assembly arbitrarily without cabinet recommendation.',
              explanationHi: 'गलत। राज्यपालों के पास पूर्ण वीटो शक्ति नहीं होती है, और न ही वे कैबिनेट की सिफारिश के बिना मनमाने ढंग से विधानसभा को भंग कर सकते हैं।',
              explanationTa: 'தவறு. ஆளுநர்களுக்கு முழுமையான நிராகரிப்பு அதிகாரம் இல்லை, அமைச்சரவை பரிந்துரையின்றி தன்னிச்சையாக சட்டமன்றத்தை கலைக்க முடியாது.'
            }
          ]
        }
      ]
    },
    {
      id: 'intermediate',
      titleEn: 'Intermediate Path (Checks & Balances)',
      titleHi: 'मध्यम पथ (नियंत्रण और संतुलन)',
      titleTa: 'இடைநிலை பாதை (கட்டுப்பாடுகள் மற்றும் சமநிலைகள்)',
      levelRequired: 3,
      scenarios: [
        {
          id: 'I1',
          titleEn: 'The Rajya Sabha Delay',
          titleHi: 'राज्यसभा का विलंब',
          titleTa: 'ராஜ்யசபா தாமதம்',
          descriptionEn: 'Lok Sabha passes a crucial Money Bill regarding income tax reforms and sends it to Rajya Sabha. The Rajya Sabha disagrees with the tax brackets and decides to sit on the bill without returning it. What happens after 14 days?',
          descriptionHi: 'लोकसभा आयकर सुधारों के संबंध में एक महत्वपूर्ण धन विधेयक पारित करती है और इसे राज्यसभा भेजती है। राज्यसभा टैक्स स्लैब से असहमत है और इसे वापस किए बिना रखने का फैसला करती है। 14 दिनों के बाद क्या होता है?',
          descriptionTa: 'வருமான வரி சீர்திருத்தங்கள் தொடர்பான முக்கியமான பண மசோதாவை லோக்சபா நிறைவேற்றி ராஜ்யசபாவிற்கு அனுப்புகிறது. ராஜ்யசபா அதை திருப்பி அனுப்பாமல் வைத்திருக்க முடிவு செய்கிறது. 14 நாட்களுக்குப் பிறகு என்ன நடக்கும்?',
          articleLinked: 'Article 109',
          options: [
            {
              optionIndex: 0,
              textEn: 'The bill lapses and must be introduced again in the next session.',
              textHi: 'विधेयक समाप्त हो जाता है और इसे अगले सत्र में फिर से पेश किया जाना चाहिए।',
              textTa: 'மசோதா காலாவதியாகிவிடும் மற்றும் அடுத்த கூட்டத்தொடரில் மீண்டும் அறிமுகப்படுத்தப்பட வேண்டும்.',
              points: 5,
              explanationEn: 'Incorrect. Money bills have special rules and cannot lapse due to Rajya Sabha delay.',
              explanationHi: 'गलत। धन विधेयकों के विशेष नियम होते हैं और वे राज्यसभा के विलंब के कारण समाप्त नहीं हो सकते।',
              explanationTa: 'தவறு. பண மசோதாக்களுக்கு சிறப்பு விதிகள் உள்ளன, ராஜ்யசபா தாமதத்தால் அவை காலாவதியாகாது.'
            },
            {
              optionIndex: 1,
              textEn: 'A joint sitting of both Houses must be called by the President to resolve the deadlock.',
              textHi: 'गतिरोध को हल करने के लिए राष्ट्रपति द्वारा दोनों सदनों की संयुक्त बैठक बुलाई जानी चाहिए।',
              textTa: 'தேக்க நிலையைத் தீர்க்க ஜனாதிபதியால் இரு அவைகளின் கூட்டுக் கூட்டம் கூட்டப்பட வேண்டும்.',
              points: 15,
              explanationEn: 'Incorrect. Article 108 (Joint Sitting) does not apply to Money Bills.',
              explanationHi: 'गलत। अनुच्छेद 108 (संयुक्त बैठक) धन विधेयकों पर लागू नहीं होता है।',
              explanationTa: 'தவறு. பிரிவு 108 (கூட்டுக் கூட்டம்) பண மசோதாக்களுக்குப் பொருந்தாது.'
            },
            {
              optionIndex: 2,
              textEn: 'The bill is deemed to have been passed by both Houses in the form passed by Lok Sabha.',
              textHi: 'विधेयक को लोकसभा द्वारा पारित रूप में दोनों सदनों द्वारा पारित माना जाता है।',
              textTa: 'லோக்சபாவில் நிறைவேற்றப்பட்ட வடிவத்திலேயே இரு அவைகளிலும் மசோதா நிறைவேற்றப்பட்டதாகக் கருதப்படும்.',
              points: 40,
              explanationEn: 'Correct! Under Article 109(5), if Rajya Sabha does not return a Money Bill within 14 days, it is deemed passed by both Houses in the Lok Sabha version.',
              explanationHi: 'सही! अनुच्छेद 109(5) के तहत, यदि राज्यसभा 14 दिनों के भीतर धन विधेयक वापस नहीं करती है, तो इसे लोकसभा संस्करण में दोनों सदनों द्वारा पारित माना जाता है।',
              explanationTa: 'சரி! பிரிவு 109(5)-ன் படி, ராஜ்யசபா 14 நாட்களுக்குள் பண மசோதாவைத் திருப்பி அனுப்பவில்லை என்றால், லோக்சபா பதிப்பில் இரு அவைகளிலும் நிறைவேற்றப்பட்டதாகக் கருதப்படும்.'
            }
          ]
        },
        {
          id: 'I2',
          titleEn: 'State Machinery Breakdown',
          titleHi: 'राज्य तंत्र की विफलता',
          titleTa: 'மாநில இயந்திர முறிவு',
          descriptionEn: 'A state experiences severe internal rioting, and the state cabinet fails to contain it. The Governor reports that the state administration cannot be carried out in accordance with the Constitution. What step is taken?',
          descriptionHi: 'एक राज्य गंभीर आंतरिक दंगों का अनुभव करता है, और राज्य कैबिनेट इसे नियंत्रित करने में विफल रहती है। राज्यपाल रिपोर्ट देते हैं कि राज्य का प्रशासन संविधान के अनुसार नहीं चलाया जा सकता है। क्या कदम उठाया जाता है?',
          descriptionTa: 'ஒரு மாநிலத்தில் கடுமையான உள்நாட்டுக் கலவரம் ஏற்படுகிறது, மாநில அமைச்சரவை அதை கட்டுப்படுத்தத் தவறிவிட்டது. மாநில நிர்வாகத்தை அரசியலமைப்பின் படி நடத்த முடியாது என்று ஆளுநர் அறிக்கை அளிக்கிறார். என்ன நடவடிக்கை எடுக்கப்படும்?',
          articleLinked: 'Article 356',
          options: [
            {
              optionIndex: 0,
              textEn: 'The President issues a proclamation of President\'s Rule in the state.',
              textHi: 'राष्ट्रपति राज्य में राष्ट्रपति शासन की घोषणा जारी करते हैं।',
              textTa: 'ஜனாதிபதி மாநிலத்தில் ஜனாதிபதி ஆட்சியை அமல்படுத்துகிறார்.',
              points: 40,
              explanationEn: 'Correct! Under Article 356, if the President receives a report from the Governor and is satisfied that the state machinery has broken down, President\'s Rule can be imposed.',
              explanationHi: 'सही! अनुच्छेद 356 के तहत, यदि राष्ट्रपति को राज्यपाल से रिपोर्ट मिलती है और वह संतुष्ट हैं कि राज्य तंत्र विफल हो गया है, तो राष्ट्रपति शासन लगाया जा सकता है।',
              explanationTa: 'சரி! பிரிவு 356-ன் படி, ஆளுநரிடம் இருந்து அறிக்கை கிடைத்து, மாநில நிர்வாகம் முறிந்துவிட்டதாக ஜனாதிபதி திருப்தி அடைந்தால், ஜனாதிपति ஆட்சி விதிக்கப்படலாம்.'
            },
            {
              optionIndex: 1,
              textEn: 'The Supreme Court directly takes over the administration of the state.',
              textHi: 'सर्वोच्च न्यायालय सीधे राज्य का प्रशासन संभालता है।',
              textTa: 'உயர் நீதிமன்றம் நேரடியாக மாநில நிர்வாகத்தை ஏற்று நடத்துகிறது.',
              points: 5,
              explanationEn: 'Incorrect. The judiciary has no executive administration powers under the Constitution.',
              explanationHi: 'गलत। संविधान के तहत न्यायपालिका के पास कोई कार्यकारी प्रशासन शक्तियां नहीं हैं।',
              explanationTa: 'தவறு. அரசியலமைப்பின் கீழ் நீதித்துறைக்கு நிர்வாக அதிகாரங்கள் இல்லை.'
            },
            {
              optionIndex: 2,
              textEn: 'The Central Cabinet sends the Army to arrest the Chief Minister.',
              textHi: 'केंद्रीय कैबिनेट मुख्यमंत्री को गिरफ्तार करने के लिए सेना भेजती है।',
              textTa: 'மத்திய அமைச்சரவை முதலமைச்சரைக் கைது செய்ய ராணுவத்தை அனுப்புகிறது.',
              points: 10,
              explanationEn: 'Incorrect. The CM cannot be arrested arbitrarily; constitutional procedures under Article 356 must be followed.',
              explanationHi: 'गलत। सीएम को मनमाने ढंग से गिरफ्तार नहीं किया जा सकता; अनुच्छेद 356 के तहत संवैधानिक प्रक्रियाओं का पालन किया जाना चाहिए।',
              explanationTa: 'தவறு. முதலமைச்சரை தன்னிச்சையாக கைது செய்ய முடியாது; பிரிவு 356-ன் கீழ் அரசியலமைப்பு நடைமுறைகள் பின்பற்றப்பட வேண்டும்.'
            }
          ]
        }
      ]
    },
    {
      id: 'advanced',
      titleEn: 'Advanced Path (Judicial Review & Writs)',
      titleHi: 'उन्नत पथ (न्यायिक समीक्षा और रिट)',
      titleTa: 'உயர்நிலை பாதை (நீதித்துறை மறுஆய்வு மற்றும் நீதிப்பேராணைகள்)',
      levelRequired: 5,
      scenarios: [
        {
          id: 'A1',
          titleEn: 'Arbitrary Arrest Shield',
          titleHi: 'मनमानी गिरफ्तारी से सुरक्षा',
          titleTa: 'தன்னிச்சையான கைதுக்கு எதிரான கேடயம்',
          descriptionEn: 'Your cousin has been picked up by local police for questioning and has been kept in custody for over 48 hours without any production before a magistrate. What writ should you file in the High Court?',
          descriptionHi: 'आपके चचेरे भाई को स्थानीय पुलिस ने पूछताछ के लिए उठाया है और मजिस्ट्रेट के सामने पेश किए बिना 48 घंटे से अधिक समय तक हिरासत में रखा है। आपको उच्च न्यायालय में कौन सी रिट दायर करनी चाहिए?',
          descriptionTa: 'உங்கள் உறவினர் ஒருவரை உள்ளூர் போலீசார் விசாரணைக்காக அழைத்துச் சென்று, நீதிபதி முன் ஆஜர்படுத்தாமல் 48 மணி நேரத்திற்கும் மேலாக காவலில் வைத்துள்ளனர். உயர்நீதிமன்றத்தில் நீங்கள் என்ன மனு தாக்கல் செய்ய வேண்டும்?',
          articleLinked: 'Article 226 & 22',
          options: [
            {
              optionIndex: 0,
              textEn: 'Writ of Habeas Corpus ("Produce the Body")',
              textHi: 'बंदी प्रत्यक्षीकरण रिट ("शरीर को प्रस्तुत करें")',
              textTa: 'ஆட்கொணர்வு நீதிப்பேராணை ("உடலை ஆஜர்படுத்து")',
              points: 40,
              explanationEn: 'Correct! Habeas Corpus is filed under Article 226/32 to protect personal liberty against unlawful detention, commanding the state to produce the detained person.',
              explanationHi: 'सही! बंदी प्रत्यक्षीकरण अनुच्छेद 226/32 के तहत गैर-कानूनी हिरासत के खिलाफ व्यक्तिगत स्वतंत्रता की रक्षा के लिए दायर किया जाता है।',
              explanationTa: 'சரி! சட்டவிரோத காவலில் இருந்து தனிநபர் சுதந்திரத்தைப் பாதுகாக்க பிரிவு 226/32-ன் கீழ் ஆட்கொணர்வு மனு தாக்கல் செய்யப்படுகிறது.'
            },
            {
              optionIndex: 1,
              textEn: 'Writ of Mandamus ("We Command")',
              textHi: 'परमादेश रिट ("हम आदेश देते हैं")',
              textTa: 'செயலுறுத்தும் நீதிப்பேராணை ("நாங்கள் கட்டளையிடுகிறோம்")',
              points: 15,
              explanationEn: 'Incorrect. Mandamus is used to compel a public official to perform a duty, not for illegal detention release.',
              explanationHi: 'गलत। Mandamus का उपयोग किसी सार्वजनिक अधिकारी को कर्तव्य निभाने के लिए मजबूर करने के लिए किया जाता है, अवैध हिरासत से रिहाई के लिए नहीं।',
              explanationTa: 'தவறு. ஒரு அரசு அதிகாரி தனது கடமையை செய்ய கட்டாயப்படுத்த செயலுறுத்தும் பேராணை பயன்படுத்தப்படுகிறது, சட்டவிரோத காவலில் இருந்து விடுவிக்க அல்ல.'
            },
            {
              optionIndex: 2,
              textEn: 'Writ of Quo Warranto ("By What Authority")',
              textHi: 'अधिकार पृच्छा रिट ("किस अधिकार से")',
              textTa: 'தகுதிமுறை வினவும் நீதிப்பேராணை ("என்ன அதிகாரத்தால்")',
              points: 10,
              explanationEn: 'Incorrect. Quo Warranto challenges a person\'s right to hold a public office.',
              explanationHi: 'गलत। Quo Warranto किसी व्यक्ति के सार्वजनिक पद पर बने रहने के अधिकार को चुनौती देता है।',
              explanationTa: 'தவறு. தகுதிமுறை வினவும் பேராணை ஒருவர் அரசு பதவியை வகிக்கும் அதிகாரத்தை சவால் செய்கிறது.'
            }
          ]
        },
        {
          id: 'A2',
          titleEn: 'Conflict of Laws',
          titleHi: 'कानूनों का टकराव',
          titleTa: 'சட்டங்களின் முரண்பாடு',
          descriptionEn: 'Both Parliament and a State Legislature pass laws on the subject of "Contracts" (which is in the Concurrent List). The state law directly contradicts the federal law. Which law prevails?',
          descriptionHi: 'संसद और राज्य विधानमंडल दोनों "अनुबंध" (जो समवर्ती सूची में है) के विषय पर कानून बनाते हैं। राज्य का कानून सीधे संघीय कानून का विरोध करता है। कौन सा कानून लागू होगा?',
          descriptionTa: 'நாடாளுமன்றம் மற்றும் மாநில சட்டமன்றம் இரண்டும் "ஒப்பந்தங்கள்" (இது பொதுப்பட்டியலில் உள்ளது) என்ற விஷயத்தில் சட்டங்களை இயற்றுகின்றன. மாநில சட்டம் மத்திய சட்டத்திற்கு நேரடியாக முரணாக உள்ளது. எந்த சட்டம் மேலோங்கும்?',
          articleLinked: 'Article 254',
          options: [
            {
              optionIndex: 0,
              textEn: 'The state law always prevails within the state territory.',
              textHi: 'राज्य का कानून हमेशा राज्य क्षेत्र के भीतर लागू होता है।',
              textTa: 'மாநில சட்டம் எப்போதும் மாநில எல்லைக்குள் மேலோங்கும்.',
              points: 5,
              explanationEn: 'Incorrect. Under Article 254(1), federal law generally overrides state law on Concurrent List items.',
              explanationHi: 'गलत। अनुच्छेद 254(1) के तहत, संघीय कानून आमतौर पर समवर्ती सूची की वस्तुओं पर राज्य के कानून को खारिज कर देता है।',
              explanationTa: 'தவறு. பிரிவு 254(1)-ன் கீழ், பொதுப்பட்டியல் விஷயங்களில் பொதுவாக மத்திய சட்டமே மாநில சட்டத்தை விட மேலோங்கும்.'
            },
            {
              optionIndex: 1,
              textEn: 'The federal law prevails, and the state law is void to the extent of repugnancy.',
              textHi: 'संघीय कानून लागू होगा, और राज्य का कानून विरोध की सीमा तक शून्य होगा।',
              textTa: 'மத்திய சட்டமே மேலோங்கும், மாநில சட்டம் முரண்படும் அளவிற்கு செல்லாததாகும்.',
              points: 40,
              explanationEn: 'Correct! Under Article 254(1), the law made by Parliament shall prevail, unless the state law received the President\'s assent under Article 254(2).',
              explanationHi: 'सही! अनुच्छेद 254(1) के तहत, संसद द्वारा बनाया गया कानून लागू होगा, जब तक कि राज्य के कानून को राष्ट्रपति की सहमति न मिल गई हो।',
              explanationTa: 'சரி! பிரிவு 254(1)-ன் கீழ், நாடாளுமன்றம் இயற்றிய சட்டமே மேலோங்கும், மாநில சட்டம் ஜனாதிபதியின் ஒப்புதலைப் பெற்றிருந்தால் தவிர.'
            },
            {
              optionIndex: 2,
              textEn: 'Both laws are struck down and the subject goes to the Supreme Court for settlement.',
              textHi: 'दोनों कानूनों को रद्द कर दिया जाता है और विषय निपटारे के लिए सर्वोच्च न्यायालय में जाता है।',
              textTa: 'இரு சட்டங்களும் ரத்து செய்யப்பட்டு, தீர்வுக்காக விஷயம் உச்ச நீதிமன்றத்திற்குச் செல்லும்.',
              points: 10,
              explanationEn: 'Incorrect. The laws are not struck down automatically; the rule of federal supremacy resolves the conflict.',
              explanationHi: 'गलत। कानून अपने आप रद्द नहीं होते हैं; संघीय सर्वोच्चता का नियम संघर्ष को हल करता है।',
              explanationTa: 'தவறு. சட்டங்கள் தானாகவே ரத்து செய்யப்படுவதில்லை; கூட்டாட்சி மேலாதிக்க விதி முரண்பாட்டைத் தீர்க்கிறது.'
            }
          ]
        }
      ]
    },
    {
      id: 'expert',
      titleEn: 'Expert Path (Constitutional Crises)',
      titleHi: 'विशेषज्ञ पथ (संवैधानिक संकट)',
      titleTa: 'நிபுணர் பாதை (அரசியலமைப்பு நெருக்கடிகள்)',
      levelRequired: 7,
      scenarios: [
        {
          id: 'E1',
          titleEn: 'The Ordinance Loophole',
          titleHi: 'अध्यादेश का लूपहोल',
          titleTa: 'அவசரச் சட்டத்தின் ஓட்டை',
          descriptionEn: 'A state government repromulgates the same emergency Ordinance (temporary law) six times consecutively without ever putting it to vote in the Legislative Assembly. What is the constitutional validity of this ordinance?',
          descriptionHi: 'एक राज्य सरकार विधानसभा में बिना मतदान कराए लगातार छह बार एक ही आपातकालीन अध्यादेश (अस्थायी कानून) को फिर से लागू करती है। इस अध्यादेश की संवैधानिक वैधता क्या है?',
          descriptionTa: 'ஒரு மாநில அரசு ஒரே அவசரச் சட்டத்தை சட்டமன்றத்தில் வாக்கெடுப்புக்கு விடாமல் தொடர்ந்து ஆறு முறை மீண்டும் பிறப்பிக்கிறது. இந்த அவசரச் சட்டத்தின் அரசியலமைப்பு செல்லுபடி என்ன?',
          articleLinked: 'Article 213 & DC Wadhwa Case',
          options: [
            {
              optionIndex: 0,
              textEn: 'It is valid, as the governor has absolute power to repromulgate ordinances.',
              textHi: 'यह मान्य है, क्योंकि राज्यपाल के पास अध्यादेशों को फिर से लागू करने की पूर्ण शक्ति है।',
              textTa: 'இது செல்லுபடியாகும், ஏனெனில் ஆளுநருக்கு அவசரச் சட்டங்களை மீண்டும் பிறப்பிக்க முழு அதிகாரம் உள்ளது.',
              points: 10,
              explanationEn: 'Incorrect. The Governor\'s power is temporary and subject to legislative oversight.',
              explanationHi: 'गलत। राज्यपाल की शक्ति अस्थायी होती है और विधायी निरीक्षण के अधीन होती है।',
              explanationTa: 'தவறு. ஆளுநரின் அதிகாரம் தற்காலிகமானது மற்றும் சட்டமன்ற மேற்பார்வைக்கு உட்பட்டது.'
            },
            {
              optionIndex: 1,
              textEn: 'It is a fraud on the Constitution and void, as ruled in the D.C. Wadhwa case.',
              textHi: 'यह संविधान पर एक धोखा है और शून्य है, जैसा कि डी.सी. वाधवा मामले में फैसला सुनाया गया था।',
              textTa: 'இது அரசியலமைப்பிற்கு எதிரான மோசடி மற்றும் செல்லாதது, டி.சி.வாத்வா வழக்கில் தீர்ப்பளிக்கப்பட்டபடி.',
              points: 40,
              explanationEn: 'Correct! The Supreme Court held that repeated repromulgation of ordinances without legislative approval is an abuse of executive power and unconstitutional.',
              explanationHi: 'सही! सर्वोच्च न्यायालय ने माना कि विधायी मंजूरी के बिना अध्यादेशों को बार-बार लागू करना कार्यकारी शक्ति का दुरुपयोग और असंवैधानिक है।',
              explanationTa: 'சரி! சட்டமன்ற ஒப்புதல் இன்றி அவசரச் சட்டங்களை மீண்டும் மீண்டும் பிறப்பிப்பது நிர்வாக அதிகாரத்தை துஷ்பிரயோகம் செய்வதாகும் மற்றும் அரசியலமைப்பிற்கு முரணானது என்று உச்ச நீதிமன்றம் தீர்ப்பளித்தது.'
            },
            {
              optionIndex: 2,
              textEn: 'It is valid, provided the Chief Minister signs a declaration of emergency.',
              textHi: 'यह मान्य है, बशर्ते मुख्यमंत्री आपातकाल की घोषणा पर हस्ताक्षर करें।',
              textTa: 'இது செல்லுபடியாகும், முதலமைச்சர் அவசரநிலைப் பிரகடனத்தில் கையெழுத்திட்டால்.',
              points: 5,
              explanationEn: 'Incorrect. There is no such provision to bypass the legislature using executive declarations.',
              explanationHi: 'गलत। कार्यकारी घोषणाओं का उपयोग करके विधायिका को दरकिनार करने का ऐसा कोई प्रावधान नहीं है।',
              explanationTa: 'தவறு. நிர்வாகப் பிரகடனங்களைப் பயன்படுத்தி சட்டமன்றத்தைத் தவிர்ப்பதற்கு அத்தகைய வழிவகை இல்லை.'
            }
          ]
        },
        {
          id: 'E2',
          titleEn: 'Basic Structure Challenge',
          titleHi: 'मूल संरचना की चुनौती',
          titleTa: 'அடிப்படை கட்டமைப்பு சவால்',
          descriptionEn: 'Parliament passes a Constitutional Amendment Bill under Article 368 that removes the power of judicial review from the High Courts. Does Parliament have this power?',
          descriptionHi: 'संसद अनुच्छेद 368 के तहत एक संविधान संशोधन विधेयक पारित करती है जो उच्च न्यायालयों से न्यायिक समीक्षा की शक्ति को हटा देता है। क्या संसद के पास यह शक्ति है?',
          descriptionTa: 'நாடாளுமன்றம் பிரிவு 368-ன் கீழ் உயர்நீதிமன்றங்களின் நீதித்துறை மறுஆய்வு அதிகாரத்தை நீக்கும் அரசியலமைப்பு திருத்த மசோதாவை நிறைவேற்றுகிறது. நாடாளுமன்றத்திற்கு இந்த அதிகாரம் உள்ளதா?',
          articleLinked: 'Article 368 & Kesavananda Case',
          options: [
            {
              optionIndex: 0,
              textEn: 'Yes, Parliament has absolute power to amend any part of the Constitution.',
              textHi: 'हाँ, संसद के पास संविधान के किसी भी हिस्से में संशोधन करने की पूर्ण शक्ति है।',
              textTa: 'ஆம், அரசியலமைப்பின் எந்தப் பகுதியையும் திருத்த நாடாளுமன்றத்திற்கு முழு அதிகாரம் உள்ளது.',
              points: 10,
              explanationEn: 'Incorrect. Parliament\'s amending power is not absolute and is bounded by the Basic Structure.',
              explanationHi: 'गलत। संसद की संशोधन शक्ति पूर्ण नहीं है और यह मूल संरचना से बंधी है।',
              explanationTa: 'தவறு. நாடாளுமன்றத்தின் திருத்த அதிகாரம் முழுமையானது அல்ல, அது அடிப்படை கட்டமைப்பிற்கு உட்பட்டது.'
            },
            {
              optionIndex: 1,
              textEn: 'No, because judicial review is part of the Basic Structure of the Constitution and cannot be destroyed.',
              textHi: 'नहीं, क्योंकि न्यायिक समीक्षा संविधान की मूल संरचना का हिस्सा है और इसे नष्ट नहीं किया जा सकता।',
              textTa: 'இல்லை, ஏனெனில் நீதித்துறை மறுஆய்வு என்பது அரசியலமைப்பின் அடிப்படை கட்டமைப்பின் ஒரு பகுதியாகும், அதை அழிக்க முடியாது.',
              points: 40,
              explanationEn: 'Correct! The Kesavananda Bharati precedent holds that Parliament cannot amend the Constitution in a way that alters or destroys its "Basic Structure" (which includes judicial review).',
              explanationHi: 'सही! केशवानंद भारती मिसाल यह मानती है कि संसद संविधान में इस तरह से संशोधन नहीं कर सकती जो इसकी "मूल संरचना" को बदले या नष्ट करे।',
              explanationTa: 'சரி! கேசவானந்த பாரதி வழக்கு, நீதித்துறை மறுஆய்வை உள்ளடக்கிய அரசியலமைப்பின் "அடிப்படை கட்டமைப்பை" மாற்றும் அல்லது அழிக்கும் வகையில் நாடாளுமன்றம் திருத்தம் செய்ய முடியாது என்று கூறுகிறது.'
            },
            {
              optionIndex: 2,
              textEn: 'Yes, but it must be approved by a national referendum of citizens.',
              textHi: 'हाँ, लेकिन इसे नागरिकों के राष्ट्रीय जनमत संग्रह द्वारा अनुमोदित किया जाना चाहिए।',
              textTa: 'ஆம், ஆனால் அதற்கு குடிமக்களின் தேசிய பொது வாக்கெடுப்பு ஒப்புதல் அளிக்க வேண்டும்.',
              points: 10,
              explanationEn: 'Incorrect. The Indian Constitution does not have a provision for referendums.',
              explanationHi: 'गलत। भारतीय संविधान में जनमत संग्रह का कोई प्रावधान नहीं है।',
              explanationTa: 'தவறு. இந்திய அரசியலமைப்பில் பொது வாக்கெடுப்புக்கான வழிவகை இல்லை.'
            }
          ]
        }
      ]
    }
  ];

  for (const path of PATHS_DATA) {
    // 1. Upsert Path
    const createdPath = await prisma.simulatorPath.upsert({
      where: { id: path.id },
      update: {
        titleEn: path.titleEn,
        titleHi: path.titleHi,
        titleTa: path.titleTa,
        levelRequired: path.levelRequired
      },
      create: {
        id: path.id,
        titleEn: path.titleEn,
        titleHi: path.titleHi,
        titleTa: path.titleTa,
        levelRequired: path.levelRequired
      }
    });

    for (const scenario of path.scenarios) {
      // 2. Upsert Scenario
      const createdScenario = await prisma.simulatorScenario.upsert({
        where: { id: scenario.id },
        update: {
          pathId: createdPath.id,
          titleEn: scenario.titleEn,
          titleHi: scenario.titleHi,
          titleTa: scenario.titleTa,
          descriptionEn: scenario.descriptionEn,
          descriptionHi: scenario.descriptionHi,
          descriptionTa: scenario.descriptionTa,
          articleLinked: scenario.articleLinked
        },
        create: {
          id: scenario.id,
          pathId: createdPath.id,
          titleEn: scenario.titleEn,
          titleHi: scenario.titleHi,
          titleTa: scenario.titleTa,
          descriptionEn: scenario.descriptionEn,
          descriptionHi: scenario.descriptionHi,
          descriptionTa: scenario.descriptionTa,
          articleLinked: scenario.articleLinked
        }
      });

      for (const opt of scenario.options) {
        // 3. Upsert Option
        await prisma.simulatorOption.upsert({
          where: {
            scenarioId_optionIndex: {
              scenarioId: createdScenario.id,
              optionIndex: opt.optionIndex
            }
          },
          update: {
            textEn: opt.textEn,
            textHi: opt.textHi,
            textTa: opt.textTa,
            points: opt.points,
            explanationEn: opt.explanationEn,
            explanationHi: opt.explanationHi,
            explanationTa: opt.explanationTa
          },
          create: {
            scenarioId: createdScenario.id,
            optionIndex: opt.optionIndex,
            textEn: opt.textEn,
            textHi: opt.textHi,
            textTa: opt.textTa,
            points: opt.points,
            explanationEn: opt.explanationEn,
            explanationHi: opt.explanationHi,
            explanationTa: opt.explanationTa
          }
        });
      }
    }
  }
}

async function seedGames() {
  for (const item of GAME_SEED_DATA) {
    await prisma.gameContent.upsert({
      where: {
        gameType_identifier: {
          gameType: item.gameType,
          identifier: item.identifier
        }
      },
      update: {
        titleEn: item.titleEn,
        titleHi: item.titleHi,
        titleTa: item.titleTa,
        descriptionEn: item.descriptionEn,
        descriptionHi: item.descriptionHi,
        descriptionTa: item.descriptionTa,
        questionEn: item.questionEn,
        questionHi: item.questionHi,
        questionTa: item.questionTa,
        optionsEn: JSON.stringify(item.optionsEn),
        optionsHi: JSON.stringify(item.optionsHi),
        optionsTa: JSON.stringify(item.optionsTa),
        correctAnswerIdx: item.correctAnswerIdx,
        points: item.points,
        explanationEn: item.explanationEn,
        explanationHi: item.explanationHi,
        explanationTa: item.explanationTa
      },
      create: {
        gameType: item.gameType,
        identifier: item.identifier,
        titleEn: item.titleEn,
        titleHi: item.titleHi,
        titleTa: item.titleTa,
        descriptionEn: item.descriptionEn,
        descriptionHi: item.descriptionHi,
        descriptionTa: item.descriptionTa,
        questionEn: item.questionEn,
        questionHi: item.questionHi,
        questionTa: item.questionTa,
        optionsEn: JSON.stringify(item.optionsEn),
        optionsHi: JSON.stringify(item.optionsHi),
        optionsTa: JSON.stringify(item.optionsTa),
        correctAnswerIdx: item.correctAnswerIdx,
        points: item.points,
        explanationEn: item.explanationEn,
        explanationHi: item.explanationHi,
        explanationTa: item.explanationTa
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

