export interface GameContentSeed {
  gameType: "snakes" | "board" | "flashcards";
  identifier: string;
  titleEn: string;
  titleHi: string;
  titleTa: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionTa: string;
  questionEn: string;
  questionHi: string;
  questionTa: string;
  optionsEn: string[];
  optionsHi: string[];
  optionsTa: string[];
  correctAnswerIdx: number;
  points: number;
  explanationEn: string;
  explanationHi: string;
  explanationTa: string;
}

export const GAME_SEED_DATA: GameContentSeed[] = [
  // ==================== SNAKES & LADDERS ====================
  {
    gameType: "snakes",
    identifier: "ladder_4",
    titleEn: "Writ of Habeas Corpus filed (Article 226)",
    titleHi: "बंदी प्रत्यक्षीकरण रिट दायर (अनुच्छेद 226)",
    titleTa: "ஆட்கொணர்வு பேராணை தாக்கல் (பிரிவு 226)",
    descriptionEn: "A citizen was locked up without charge. Their family filed a Writ in High Court.",
    descriptionHi: "एक नागरिक को बिना किसी आरोप के बंद कर दिया गया। उनके परिवार ने उच्च न्यायालय में एक रिट दायर की।",
    descriptionTa: "குடிமகன் ஒருவர் குற்றச்சாட்டுகளின்றி சிறையில் அடைக்கப்பட்டார். அவரது குடும்பத்தினர் உயர்நீதிமன்றத்தில் பேராணை மனு தாக்கல் செய்தனர்.",
    questionEn: "Which organ of government issues Writs to protect fundamental rights?",
    questionHi: "मौलिक अधिकारों की रक्षा के लिए सरकार का कौन सा अंग रिट जारी करता है?",
    questionTa: "அடிப்படை உரிமைகளைப் பாதுகாக்க அரசாங்கத்தின் எந்த உறுப்பு பேராணைகளை வெளியிடுகிறது?",
    optionsEn: ["The Legislature (Parliament)", "The Executive (Police)", "The Judiciary (High/Supreme Court)", "The Cabinet Ministers"],
    optionsHi: ["विधायिका (संसद)", "कार्यपालिका (पुलिस)", "न्यायपालिका (उच्च/उच्चतम न्यायालय)", "कैबिनेट मंत्री"],
    optionsTa: ["சட்டமன்றம் (நாடாளுமன்றம்)", "நிர்வாகத்துறை (போலீஸ்)", "நீதித்துறை (உயர்/உச்ச நீதிமன்றம்)", "அமைச்சரவை அமைச்சர்கள்"],
    correctAnswerIdx: 2,
    points: 25,
    explanationEn: "Under Article 226 (High Court) and Article 32 (Supreme Court), the Judiciary has the special power to issue writs like Habeas Corpus to protect personal liberties from state misuse.",
    explanationHi: "अनुच्छेद 226 (उच्च न्यायालय) और अनुच्छेद 32 (उच्चतम न्यायालय) के तहत, न्यायपालिका के पास व्यक्तिगत स्वतंत्रता की रक्षा के लिए बंदी प्रत्यक्षीकरण जैसी रिट जारी करने की विशेष शक्ति है।",
    explanationTa: "பிரிவு 226 (உயர் நீதிமன்றம்) மற்றும் பிரிவு 32 (உச்ச நீதிமன்றம்) ஆகியவற்றின் கீழ், தனிமனித சுதந்திரத்தைப் பாதுகாப்பதற்காக ஆட்கொணர்வு போன்ற பேராணைகளை வழங்க நீதித்துறைக்கு சிறப்பு அதிகாரம் உள்ளது."
  },
  {
    gameType: "snakes",
    identifier: "ladder_12",
    titleEn: "Judicial Review of Unconstitutional Act",
    titleHi: "असंवैधानिक अधिनियम की न्यायिक समीक्षा",
    titleTa: "அரசியலமைப்பிற்கு முரணான சட்டத்தின் நீதித்துறை மறுஆய்வு",
    descriptionEn: "The legislature passed an emergency act violating personal privacy. The Court struck it down.",
    descriptionHi: "विधायिका ने व्यक्तिगत गोपनीयता का उल्लंघन करने वाला एक आपातकालीन अधिनियम पारित किया। न्यायालय ने इसे रद्द कर दिया।",
    descriptionTa: "சட்டமன்றம் தனிநபர் தனியுரிமையை மீறும் அவசரகால சட்டத்தை இயற்றியது. நீதிமன்றம் அதை ரத்து செய்தது.",
    questionEn: "What is this judicial power to check and cancel unconstitutional laws called?",
    questionHi: "असंवैधानिक कानूनों की जांच करने और उन्हें रद्द करने की इस न्यायिक शक्ति को क्या कहा जाता है?",
    questionTa: "அரசியலமைப்பிற்கு முரணான சட்டங்களை சரிபார்த்து ரத்து செய்யும் இந்த நீதித்துறை அதிகாரம் எவ்வாறு அழைக்கப்படுகிறது?",
    optionsEn: ["Legislative Veto", "Judicial Review", "Presidential Discretion", "Executive Order"],
    optionsHi: ["विधायी वीटो", "न्यायिक समीक्षा", "राष्ट्रपति का विवेक", "कार्यकारी आदेश"],
    optionsTa: ["சட்டமன்ற வீட்டோ", "நீதித்துறை மறுஆய்வு", "ஜனாதிபதியின் விருப்ப அதிகாரம்", "நிர்வாக ஆணை"],
    correctAnswerIdx: 1,
    points: 25,
    explanationEn: "Judicial Review is the power of courts to examine actions of the legislative, executive, and administrative arms of the government and determine whether such actions are consistent with the Constitution.",
    explanationHi: "न्यायिक समीक्षा अदालतों की वह शक्ति है जिसके तहत वे सरकार के विधायी, कार्यकारी and प्रशासनिक अंगों के कार्यों की जांच करती हैं और यह तय करती हैं कि क्या वे संविधान के अनुकूल हैं।",
    explanationTa: "நீதித்துறை மறுஆய்வு என்பது சட்டமன்றம், நிர்வாகம் மற்றும் அரசு நிர்வாகத்தின் நடவடிக்கைகளை ஆய்வு செய்து, அவை அரசியலமைப்பிற்கு இணங்க உள்ளதா என்பதை தீர்மானிக்கும் நீதிமன்றங்களின் அதிகாரமாகும்."
  },
  {
    gameType: "snakes",
    identifier: "ladder_36",
    titleEn: "Money Bill Certified Properly (Article 110)",
    titleHi: "धन विधेयक उचित रूप से प्रमाणित (अनुच्छेद 110)",
    titleTa: "பண மசோதா முறையாக சான்றளிக்கப்பட்டது (பிரிவு 110)",
    descriptionEn: "A dispute arose about a national budget bill. The Speaker resolved it according to the rulebook.",
    descriptionHi: "राष्ट्रीय बजट विधेयक को लेकर विवाद उत्पन्न हुआ। अध्यक्ष ने नियमावली के अनुसार इसका समाधान किया।",
    descriptionTa: "தேசிய வரவு செலவுத் திட்ட மசோதா தொடர்பாக சர்ச்சை எழுந்தது. சபாநாயகர் விதிமுறைப்படி அதைத் தீர்த்து வைத்தார்.",
    questionEn: "Who holds the final authority to certify whether a bill is a Money Bill or not?",
    questionHi: "कोई विधेयक धन विधेयक है या नहीं, इसे प्रमाणित करने का अंतिम अधिकार किसके पास है?",
    questionTa: "ஒரு மசோதா பண மசோதாவா இல்லையா என்பதை சான்றளிக்கும் இறுதி அதிகாரம் யாருக்கு உள்ளது?",
    optionsEn: ["The President", "The Finance Minister", "The Speaker of the Lok Sabha", "The Chief Justice of India"],
    optionsHi: ["राष्ट्रपति", "वित्त मंत्री", "लोकसभा अध्यक्ष", "भारत के मुख्य न्यायाधीश"],
    optionsTa: ["ஜனாதிபதி", "நிதி அமைச்சர்", "மக்களவை சபாநாயகர்", "இந்திய தலைமை நீதிபதி"],
    correctAnswerIdx: 2,
    points: 25,
    explanationEn: "Under Article 110(3), the decision of the Speaker of the Lok Sabha is final regarding whether a bill is a Money Bill.",
    explanationHi: "अनुच्छेद 110(3) के तहत, कोई विधेयक धन विधेयक है या नहीं, इस बारे में लोकसभा अध्यक्ष का निर्णय अंतिम होता है।",
    explanationTa: "பிரிவு 110(3)-ன் கீழ், ஒரு மசோதா பண மசோதாவா என்பது குறித்து மக்களவை சபாநாயகரின் முடிவே இறுதியானது."
  },
  {
    gameType: "snakes",
    identifier: "ladder_50",
    titleEn: "Governor Assents to Welfare Bill (Article 200)",
    titleHi: "राज्यपाल ने कल्याणकारी विधेयक को दी सहमति (अनुच्छेद 200)",
    titleTa: "ஆளுநர் நலத்திட்ட மசோதாவிற்கு ஒப்புதல் அளித்தார் (பிரிவு 200)",
    descriptionEn: "The state legislature passed a crucial free-education act, and the Governor signed it without delay.",
    descriptionHi: "राज्य विधायिका ने मुफ्त शिक्षा का एक महत्वपूर्ण अधिनियम पारित किया, और राज्यपाल ने बिना किसी देरी के इस पर हस्ताक्षर कर दिए।",
    descriptionTa: "மாநில சட்டமன்றம் முக்கியமான இலவச கல்விச் சட்டத்தை இயற்றியது, ஆளுநர் தாமதமின்றி அதில் கையெழுத்திட்டார்.",
    questionEn: "In state governance, whose signature formally turns a bill passed by the assembly into a binding State law?",
    questionHi: "राज्य शासन में, विधानसभा द्वारा पारित विधेयक किसके हस्ताक्षर से औपचारिक रूप से एक बाध्यकारी राज्य कानून में बदल जाता है?",
    questionTa: "மாநில ஆட்சியில், சட்டமன்றத்தால் நிறைவேற்றப்பட்ட மசோதாவை அதிகாரப்பூர்வ மாநில சட்டமாக மாற்றுவது யாருடைய கையொப்பம்?",
    optionsEn: ["The Chief Minister", "The State Governor", "The Prime Minister", "The High Court Chief Justice"],
    optionsHi: ["मुख्यमंत्री", "राज्य के राज्यपाल", "प्रधानमंत्री", "उच्च न्यायालय के मुख्य न्यायाधीश"],
    optionsTa: ["முதலமைச்சர்", "மாநில ஆளுநர்", "பிரதமர்", "உயர் நீதிமன்ற தலைமை நீதிபதி"],
    correctAnswerIdx: 1,
    points: 25,
    explanationEn: "Like the President at the Union level, the Governor's assent is required for all state-legislated bills to become official state laws under Article 200.",
    explanationHi: "संघीय स्तर पर राष्ट्रपति की तरह, राज्य द्वारा अधिनियमित सभी विधेयकों को आधिकारिक कानून बनने के लिए अनुच्छेद 200 के तहत राज्यपाल की सहमति आवश्यक है।",
    explanationTa: "மத்திய அளவில் ஜனாதிபதியைப் போலவே, மாநில சட்டமன்றத்தில் நிறைவேற்றப்படும் மசோதாக்கள் சட்டமாக மாற பிரிவு 200-ன் கீழ் ஆளுநரின் ஒப்புதல் தேவை."
  },
  {
    gameType: "snakes",
    identifier: "snake_28",
    titleEn: "Governor delays Welfare Bill indefinitely",
    titleHi: "राज्यपाल ने कल्याणकारी विधेयक को अनिश्चितकाल के लिए टाला",
    titleTa: "ஆளுநர் நலத்திட்ட மசோதாவை காலவரையின்றி தாமதப்படுத்துகிறார்",
    descriptionEn: "A public health bill is held up for months by the Governor without returning it or giving reason.",
    descriptionHi: "एक जन स्वास्थ्य विधेयक को राज्यपाल द्वारा बिना वापस किए या कारण बताए महीनों तक रोक कर रखा जाता है।",
    descriptionTa: "பொது சுகாதார மசோதா ஒன்றை ஆளுநர் திருப்பி அனுப்பாமலும், காரணம் கூறாமலும் பல மாதங்களாக நிறுத்தி வைத்துள்ளார்.",
    questionEn: "To bypass this delay, what must the Governor do under Article 200 if they wish to request changes?",
    questionHi: "इस देरी से बचने के लिए, यदि राज्यपाल बदलाव का अनुरोध करना चाहते हैं तो उन्हें अनुच्छेद 200 के तहत क्या करना चाहिए?",
    questionTa: "இந்த தாமதத்தைத் தவிர்க்க, ஆளுநர் மாற்றங்களை விரும்பினால் பிரிவு 200-ன் கீழ் என்ன செய்ய வேண்டும்?",
    optionsEn: ["Keep it in pocket veto forever", "Return it to the State Legislature as soon as possible with a message to reconsider", "Refer it to the local police chief", "Order the assembly to dissolve"],
    optionsHi: ["इसे हमेशा के लिए पॉकेट वीटो में रखें", "पुनर्विचार के संदेश के साथ जल्द से जल्द इसे राज्य विधायिका को लौटाएं", "इसे स्थानीय पुलिस प्रमुख को सौंपें", "विधानसभा भंग करने का आदेश दें"],
    optionsTa: ["மசோதாவை எப்போதும் நிறுத்தி வைக்கவும்", "மறுபரிசீலனை செய்யுமாறு கேட்டு சட்டமன்றத்திற்கு விரைவில் திருப்பி அனுப்ப வேண்டும்", "உள்ளூர் போலீஸ் அதிகாரியிடம் அனுப்ப வேண்டும்", "சட்டமன்றத்தை கலைக்க உத்தரவிட வேண்டும்"],
    correctAnswerIdx: 1,
    points: 0,
    explanationEn: "The first proviso of Article 200 requires that the Governor, if not assenting, should return the bill as soon as possible with a message asking the legislature to reconsider.",
    explanationHi: "अनुच्छेद 200 का पहला प्रावधान यह आवश्यक बनाता है कि यदि राज्यपाल सहमति नहीं दे रहे हैं, तो उन्हें जल्द से जल्द संदेश के साथ विधेयक विधायिका को पुनर्विचार के लिए लौटा देना चाहिए।",
    explanationTa: "பிரிவு 200-ன் படி, ஆளுநர் மசோதாவிற்கு ஒப்புதல் அளிக்காவிட்டால், அதை விரைவில் சட்டமன்றத்திற்கு மறுபரிசீலனைக்காக திருப்பி அனுப்ப வேண்டும்."
  },
  {
    gameType: "snakes",
    identifier: "snake_47",
    titleEn: "Ordinance misrule (Article 123/213 misuse)",
    titleHi: "अध्यादेश का दुरुपयोग (अनुच्छेद 123/213 का दुरुपयोग)",
    titleTa: "அவசரச் சட்ட துஷ்பிரயோகம் (பிரிவு 123/213-ன் தவறான பயன்பாடு)",
    descriptionEn: "The Executive bypasses parliament by repeatedly re-promulgating temporary emergency laws (Ordinances).",
    descriptionHi: "कार्यपालिका बार-बार अस्थायी आपातकालीन कानूनों (अध्यादेशों) को लागू करके संसद की अनदेखी करती है।",
    descriptionTa: "நிர்வாகத்துறை தற்காலிக அவசரச் சட்டங்களை மீண்டும் மீண்டும் பிறப்பித்து நாடாளுமன்றத்தை புறக்கணிக்கிறது.",
    questionEn: "What is the maximum time an Ordinance can last once the Parliament or State Assembly reconvenes?",
    questionHi: "संसद या राज्य विधानसभा के पुनः समवेत होने पर कोई अध्यादेश अधिकतम कितने समय तक प्रभावी रह सकता है?",
    questionTa: "நாடாளுமன்றம் அல்லது மாநில சட்டமன்றம் மீண்டும் கூடும் போது ஒரு அவசரச் சட்டம் அதிகபட்சமாக எவ்வளவு காலம் நீடிக்கும்?",
    optionsEn: ["6 months", "6 weeks", "1 year", "24 hours"],
    optionsHi: ["6 महीने", "6 सप्ताह", "1 वर्ष", "24 घंटे"],
    optionsTa: ["6 மாதங்கள்", "6 வாரங்கள்", "1 வருடம்", "24 மணி நேரம்"],
    correctAnswerIdx: 1,
    points: 0,
    explanationEn: "Under Article 123 (Union) and Article 213 (State), an Ordinance must be approved by the legislature within six weeks of its reassembly, otherwise it ceases to operate.",
    explanationHi: "अनुच्छेद 123 (संघ) और अनुच्छेद 213 (राज्य) के तहत, किसी अध्यादेश को विधायिका के पुनः समवेत होने के छह सप्ताह के भीतर मंजूरी मिलनी चाहिए, अन्यथा वह निष्प्रभावी हो जाता है।",
    explanationTa: "பிரிவு 123 (மத்திய) மற்றும் பிரிவு 213 (மாநில) ஆகியவற்றின் கீழ், சட்டமன்றம் கூடிய 6 வாரங்களுக்குள் அவசரச் சட்டத்திற்கு ஒப்புதல் பெற வேண்டும், இல்லையெனில் அது காலாவதியாகிவிடும்."
  },
  {
    gameType: "snakes",
    identifier: "snake_62",
    titleEn: "Unconstitutional State Emergency (Article 356)",
    titleHi: "असंवैधानिक राज्य आपातकाल (अनुच्छेद 356)",
    titleTa: "அரசியலமைப்பிற்கு முரணான மாநில அவசரநிலை (பிரிவு 356)",
    descriptionEn: "The Union Executive declares President's Rule in a state because of political differences, not actual system failure.",
    descriptionHi: "केंद्रीय कार्यपालिका वास्तविक व्यवस्था विफलता के बजाय राजनीतिक मतभेदों के कारण राज्य में राष्ट्रपति शासन घोषित करती है।",
    descriptionTa: "மத்திய அரசு அரசியல் வேறுபாடுகள் காரணமாக மாநிலத்தில் ஜனாதிபதி ஆட்சியை அறிவிக்கிறது, நிர்வாக முறிவினால் அல்ல.",
    questionEn: "Which organ checks and can declare this misuse of President's Rule null and void?",
    questionHi: "कौन सा अंग राष्ट्रपति शासन के इस दुरुपयोग की जांच कर सकता है और इसे शून्य घोषित कर सकता है?",
    questionTa: "ஜனாதிபதி ஆட்சியின் இந்த துஷ்பிரயோகத்தை எந்த உறுப்பு சரிபார்த்து செல்லாது என்று அறிவிக்க முடியும்?",
    optionsEn: ["The Prime Minister's office", "The Supreme Court", "The State Governor", "The state police force"],
    optionsHi: ["प्रधानमंत्री कार्यालय", "उच्चतम न्यायालय", "राज्य के राज्यपाल", "राज्य पुलिस बल"],
    optionsTa: ["பிரதமர் அலுவலகம்", "உச்ச நீதிமன்றம்", "மாநில ஆளுநர்", "மாநில காவல் துறை"],
    correctAnswerIdx: 1,
    points: 0,
    explanationEn: "In the famous S.R. Bommai case, the Supreme Court established that presidential proclamations under Article 356 are subject to judicial review, and the courts can restore the state assembly.",
    explanationHi: "प्रसिद्ध एस.आर. बोम्मई मामले में, उच्चतम न्यायालय ने स्थापित किया कि अनुच्छेद 356 के तहत राष्ट्रपति की घोषणाएं न्यायिक समीक्षा के अधीन हैं, और अदालतें राज्य विधानसभा को बहाल कर सकती हैं।",
    explanationTa: "புகழ்பெற்ற எஸ்.ஆர். பொம்மை வழக்கில், பிரிவு 356-ன் கீழ் ஜனாதிபதி பிரகடனங்கள் நீதித்துறை மறுஆய்வுக்கு உட்பட்டவை என்றும், நீதிமன்றங்கள் சட்டமன்றத்தை மீண்டும் கொண்டுவர முடியும் என்றும் உச்ச நீதிமன்றம் தீர்ப்பளித்தது."
  },
  {
    gameType: "snakes",
    identifier: "snake_85",
    titleEn: "Writs order ignored by executive officers",
    titleHi: "कार्यकारी अधिकारियों द्वारा रिट आदेश की अनदेखी",
    titleTa: "நிர்வாக அதிகாரிகளால் பேராணை உத்தரவு புறக்கணிக்கப்பட்டது",
    descriptionEn: "A government official refuses to release a wrongfully detained individual despite a High Court order.",
    descriptionHi: "एक सरकारी अधिकारी उच्च न्यायालय के आदेश के बावजूद गलत तरीके से हिरासत में लिए गए व्यक्ति को रिहा करने से इनकार करता है।",
    descriptionTa: "உயர்நீதிமன்ற உத்தரவு இருந்தபோதிலும், சட்டவிரோதமாக காவலில் வைக்கப்பட்ட நபர் ஒருவரை அரசு அதிகாரி விடுவிக்க மறுக்கிறார்.",
    questionEn: "Under Article 226, ignoring a High Court's writ command is a violation which represents what offence?",
    questionHi: "अनुच्छेद 226 के तहत, उच्च न्यायालय के रिट आदेश की अनदेखी करना किस अपराध के अंतर्गत आता है?",
    questionTa: "பிரிவு 226-ன் கீழ், உயர் நீதிமன்றத்தின் பேராணை உத்தரவை புறக்கணிப்பது எந்த குற்றத்திற்கு சமம்?",
    optionsEn: ["Breach of Privilege", "Contempt of Court", "Treason", "Administrative Discretion"],
    optionsHi: ["विशेषाधिकार हनन", "न्यायालय की अवमानना", "देशद्रोह", "प्रशासनिक विवेक"],
    optionsTa: ["விசேஷ உரிமை மீறல்", "நீதிமன்ற அவமதிப்பு", "தேசத்துரோகம்", "நிர்வாக தன்னிச்சை அதிகாரம்"],
    correctAnswerIdx: 1,
    points: 0,
    explanationEn: "Refusing to follow a direct judicial directive/writ order constitutes 'Contempt of Court', which allows judges to penalize the non-compliant officers with fines or imprisonment.",
    explanationHi: "सीधे न्यायिक निर्देश/रिट आदेश का पालन करने से इनकार करना 'न्यायालय की अवमानना' है, जो न्यायाधीशों को गैर-अनुपालन अधिकारियों को जुर्माने या कारावास से दंडित करने की अनुमति देता है।",
    explanationTa: "நீதிமன்ற பேராணை உத்தரவை நேரடியாக பின்பற்ற மறுப்பது 'நீதிமன்ற அவமதிப்பு' ஆகும், இது அதிகாரிகளுக்கு அபராதம் அல்லது சிறைத்தண்டனை வழங்க நீதிபதிகளுக்கு அதிகாரம் அளிக்கிறது."
  },

  // ==================== SAMVIDHAN NAGRI BOARD SPACES ====================
  {
    gameType: "board",
    identifier: "space_0",
    titleEn: "Lok Sabha (Parliament)",
    titleHi: "लोक सभा (संसद)",
    titleTa: "மக்களவை (நாடாளுமன்றம்)",
    descriptionEn: "Speaker of the House",
    descriptionHi: "सभाध्यक्ष",
    descriptionTa: "மக்களவை சபாநாயகர்",
    questionEn: "Which constitutional method can the Union Executive initiate to resolve a legislative deadlock between both Houses?",
    questionHi: "दोनों सदनों के बीच विधायी गतिरोध को हल करने के लिए केंद्रीय कार्यपालिका कौन सी संवैधानिक पद्धति शुरू कर सकती है?",
    questionTa: "இரு அவைகளுக்கும் இடையே உள்ள சட்டமன்ற தேக்கநிலையை தீர்க்க மத்திய அரசு எந்த அரசியலமைப்பு முறையை தொடங்கலாம்?",
    optionsEn: [
      "President summons a Joint Sitting of both Houses (Article 108)",
      "The Prime Minister vetoes the Rajya Sabha objection",
      "The Speaker dissolves Rajya Sabha permanently",
      "Ask the Supreme Court to pass the bill directly"
    ],
    optionsHi: [
      "राष्ट्रपति दोनों सदनों की संयुक्त बैठक बुलाते हैं (अनुच्छेद 108)",
      "प्रधानमंत्री राज्यसभा के विरोध को वीटो करते हैं",
      "अध्यक्ष राज्यसभा को स्थायी रूप से भंग करते हैं",
      "विधेयक को सीधे पारित करने के लिए उच्चतम न्यायालय से कहें"
    ],
    optionsTa: [
      "ஜனாதிபதி இரு அவைகளின் கூட்டுக் கூட்டத்தை கூட்டுகிறார் (பிரிவு 108)",
      "ராஜ்யசபாவின் எதிர்ப்பை பிரதமர் நிராகரிக்கிறார்",
      "சபாநாயகர் ராஜ்யசபாவை நிரந்தரமாக கலைக்கிறார்",
      "மசோதாவை நேரடியாக நிறைவேற்ற உச்ச நீதிமன்றத்தை கேட்டுக்கொள்வது"
    ],
    correctAnswerIdx: 0,
    points: 35,
    explanationEn: "Under Article 108, if a bill passed by one House is rejected by the other, the President may summon a Joint Sitting of both Houses to deliberate and vote on the bill.",
    explanationHi: "अनुच्छेद 108 के तहत, यदि एक सदन द्वारा पारित विधेयक को दूसरे सदन द्वारा खारिज कर दिया जाता है, तो राष्ट्रपति विधेयक पर विचार-विमर्श और मतदान के लिए दोनों सदनों की संयुक्त बैठक बुला सकते हैं।",
    explanationTa: "பிரிவு 108-ன் கீழ், ஒரு அவையினால் நிறைவேற்றப்பட்ட மசோதா மற்றொரு அவையினால் நிராகரிக்கப்பட்டால், ஜனாதிபதி இரு அவைகளின் கூட்டுக் கூட்டத்திற்கு உத்தரவிடலாம்."
  },
  {
    gameType: "board",
    identifier: "space_1",
    titleEn: "Prime Minister's Office",
    titleHi: "प्रधानमंत्री कार्यालय (PMO)",
    titleTa: "பிரதமர் அலுவலகம் (PMO)",
    descriptionEn: "Head of Government",
    descriptionHi: "सरकार के प्रमुख",
    descriptionTa: "அரசாங்கத் தலைவர்",
    questionEn: "What advice should the Prime Minister's cabinet give to the President to enact temporary rules?",
    questionHi: "अस्थायी नियम लागू करने के लिए प्रधानमंत्री की कैबिनेट को राष्ट्रपति को क्या सलाह देनी चाहिए?",
    questionTa: "தற்காலிக விதிகளை இயற்ற பிரதமரின் அமைச்சரவை ஜனாதிபதிக்கு என்ன அறிவுரை வழங்க வேண்டும்?",
    optionsEn: [
      "Request the Supreme Court to write a law",
      "Advise the President to promulgate an Ordinance (Article 123)",
      "Declare a National Emergency",
      "Implement the rule without any legal framework"
    ],
    optionsHi: [
      "कानून लिखने के लिए उच्चतम न्यायालय से अनुरोध करें",
      "अध्यादेश जारी करने के लिए राष्ट्रपति को सलाह दें (अनुच्छेद 123)",
      "राष्ट्रीय आपातकाल घोषित करें",
      "बिना किसी कानूनी ढांचे के नियम लागू करें"
    ],
    optionsTa: [
      "சட்டத்தை எழுத உச்ச நீதிமன்றத்தை கோர வேண்டும்",
      "அவசரச் சட்டத்தைப் பிறப்பிக்க ஜனாதிபதிக்கு அறிவுறுத்த வேண்டும் (பிரிவு 123)",
      "தேசிய அவசரநிலையை அறிவிக்க வேண்டும்",
      "எndவொரு சட்ட கட்டமைப்பும் இல்லாமல் விதியை செயல்படுத்த வேண்டும்"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "Under Article 123, if Parliament is recessing, the President can promulgate an Ordinance on the advice of the Prime Minister and cabinet to handle urgent matters.",
    explanationHi: "अनुच्छेद 123 के तहत, यदि संसद का सत्र नहीं चल रहा है, तो राष्ट्रपति तत्काल मामलों से निपटने के लिए प्रधानमंत्री और कैबिनेट की सलाह पर अध्यादेश जारी कर सकते हैं।",
    explanationTa: "பிரிவு 123-ன் கீழ், நாடாளுமன்ற கூட்டத்தொடர் இல்லாத போது, அவசர விஷயங்களைக் கையாள பிரதமரின் அமைச்சரவை ஆலோசனையின் பேரில் ஜனாதிபதி அவசரச் சட்டத்தைப் பிறப்பிக்கலாம்."
  },
  {
    gameType: "board",
    identifier: "space_2",
    titleEn: "Finance Ministry",
    titleHi: "वित्त मंत्रालय",
    titleTa: "நிதி அமைச்சகம்",
    descriptionEn: "Custodian of Treasury",
    descriptionHi: "कोष का संरक्षक",
    descriptionTa: "கருவூலப் பாதுகாவலர்",
    questionEn: "Under Article 112, in which house of Parliament must the Budget / Money Bills be introduced first?",
    questionHi: "अनुच्छेद 112 के तहत, बजट / धन विधेयक संसद के किस सदन में पहले पेश किया जाना चाहिए?",
    questionTa: "பிரிவு 112-ன் படி, வரவு செலவுத் திட்டம் / பண மசோதாக்கள் நாடாளுமன்றத்தின் எந்த அவையில் முதலில் அறிமுகப்படுத்தப்பட வேண்டும்?",
    optionsEn: [
      "Either Lok Sabha or Rajya Sabha",
      "Only in the Rajya Sabha",
      "Only in the Lok Sabha",
      "In a Joint Sitting directly"
    ],
    optionsHi: [
      "या तो लोकसभा या राज्यसभा",
      "केवल राज्यसभा में",
      "केवल लोकसभा में",
      "सीधे संयुक्त बैठक में"
    ],
    optionsTa: [
      "மக்களவை அல்லது மாநிலங்களவை இரண்டிலும்",
      "மாநிலங்களவையில் (ராஜ்யசபா) மட்டும்",
      "மக்களவையில் (லோக்சபா) மட்டும்",
      "நேரடியாக இரு அவைகளின் கூட்டுக் கூட்டத்தில்"
    ],
    correctAnswerIdx: 2,
    points: 35,
    explanationEn: "Under Article 109, a Money Bill (including the budget and taxation bills) can only be introduced in the Lok Sabha (House of the People) with the prior recommendation of the President.",
    explanationHi: "अनुच्छेद 109 के तहत, धन विधेयक (बजट और कराधान विधेयकों सहित) केवल राष्ट्रपति की पूर्व सिफारिश पर ही लोकसभा में पेश किया जा सकता है।",
    explanationTa: "பிரிவு 109-ன் கீழ், பண மசோதாக்கள் (வரவு செலவுத் திட்டம் மற்றும் வரி மசோதாக்கள்) ஜனாதிபதியின் பரிந்துரையுடன் மக்களவையில் மட்டுமே அறிமுகப்படுத்தப்பட முடியும்."
  },
  {
    gameType: "board",
    identifier: "space_3",
    titleEn: "Rashtrapati Bhavan",
    titleHi: "राष्ट्रपति भवन",
    titleTa: "ஜனாதிபதி பவன்",
    descriptionEn: "Head of State",
    descriptionHi: "राष्ट्र के प्रमुख",
    descriptionTa: "அரசுத் தலைவர்",
    questionEn: "Under Article 111, what is your constitutional option if you want the cabinet to rethink the bill?",
    questionHi: "अनुच्छेद 111 के तहत, यदि आप चाहते हैं कि कैबिनेट विधेयक पर पुनर्विचार करे, तो आपका संवैधानिक विकल्प क्या है?",
    questionTa: "விதி 111-ன் கீழ், அமைச்சரவை இந்த மசோதாவை மறுபரிசீலனை செய்ய வேண்டும் எனில், உங்களது அரசியலமைப்பு வழிமுறை என்ன?",
    optionsEn: [
      "Permanently cancel the bill using absolute veto",
      "Return the bill to the Houses with a message requesting reconsideration of specific clauses",
      "Order the arrest of the law sponsors",
      "Declare the parliament dissolved"
    ],
    optionsHi: [
      "पूर्ण वीटो का उपयोग करके विधेयक को स्थायी रूप से रद्द करें",
      "विशिष्ट धाराओं पर पुनर्विचार का अनुरोध करने वाले संदेश के साथ विधेयक को सदनों को लौटाएं",
      "कानून के प्रायोजकों की गिरफ्तारी का आदेश दें",
      "संसद भंग करने की घोषणा करें"
    ],
    optionsTa: [
      "முழு வீட்டோ அதிகாரத்தைப் பயன்படுத்தி மசோதாவை நிரந்தரமாக ரத்து செய்வது",
      "குறிப்பிட்ட பிரிவுகளை மறுபரிசீலனை செய்யக் கோரும் செய்தியுடன் மசோதாவை அவைகளுக்குத் திருப்பி அனுப்புவது",
      "மசோதா கொண்டுவந்தவர்களைக் கைது செய்ய உத்தரவிடுவது",
      "நாடாளுமன்றம் கலைக்கப்பட்டதாக அறிவிப்பது"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "Article 111 allows the President to return a bill (if it is not a Money Bill) to the Houses for reconsideration. However, if the bill is passed again by both Houses, the President must give assent.",
    explanationHi: "अनुच्छेद 111 राष्ट्रपति को पुनर्विचार के लिए विधेयक (यदि वह धन विधेयक नहीं है) सदनों को वापस करने की अनुमति देता है। हालाँकि, यदि दोनों सदनों द्वारा विधेयक फिर से पारित कर दिया जाता है, तो राष्ट्रपति को सहमति देनी होगी।",
    explanationTa: "பிரிவு 111 ஜனாதிபதி ஒரு மசோதாவை (பண மசோதா இல்லை எனில்) மறுபரிசீலனைக்காக திருப்பி அனுப்ப அனுமதிக்கிறது. இருப்பினும், இரு அவைகளும் அதை மீண்டும் நிறைவேற்றினால் ஜனாதிபதி ஒப்புதல் வழங்க வேண்டும்."
  },
  {
    gameType: "board",
    identifier: "space_4",
    titleEn: "Raj Bhavan (State Governor)",
    titleHi: "राजभवन (राज्य के राज्यपाल)",
    titleTa: "ராஜ் பவன் (மாநில ஆளுநர்)",
    descriptionEn: "Union Representative",
    descriptionHi: "संघ के प्रतिनिधि",
    descriptionTa: "மத்திய அரசின் பிரதிநிதி",
    questionEn: "What discretionary option does the Governor have to ensure federal compatibility under Article 200?",
    questionHi: "अनुच्छेद 200 के तहत संघीय अनुकूलता सुनिश्चित करने के लिए राज्यपाल के पास क्या विवेकाधीन विकल्प है?",
    questionTa: "விதி 200-ன் கீழ் மத்திய-மாநில சட்ட இணக்கத்தை உறுதிப்படுத்த ஆளுநருக்கு உள்ள விருப்ப அதிகாரம் என்ன?",
    optionsEn: [
      "Reserve the bill for the consideration of the President",
      "Reject the bill permanently on their own choices",
      "File a suit against the state Assembly in police court",
      "Sign it but order the state police to ignore it"
    ],
    optionsHi: [
      "विधेयक को राष्ट्रपति के विचारार्थ सुरक्षित रखें",
      "अपने विवेक से विधेयक को स्थायी रूप से खारिज करें",
      "पुलिस कोर्ट में राज्य विधानसभा के खिलाफ मुकदमा दायर करें",
      "हस्ताक्षर करें लेकिन राज्य पुलिस को इसकी अनदेखी करने का आदेश दें"
    ],
    optionsTa: [
      "மசோதாவை ஜனாதிபதியின் பரிசீலனைக்காக நிறுத்தி வைப்பது",
      "தங்கள் சொந்த விருப்பத்தின் பேரில் மசோதாவை நிரந்தரமாக நிராகரிப்பது",
      "சட்டமன்றத்திற்கு எதிராக நீதிமன்றத்தில் வழக்கு தொடர்வது",
      "ஒப்புதல் அளித்துவிட்டு மாநில காவல்துறையை அதை புறக்கணிக்க சொல்வது"
    ],
    correctAnswerIdx: 0,
    points: 35,
    explanationEn: "Under Article 200, the Governor can reserve a bill for the consideration of the President of India, maintaining federal harmony between the Union and the States.",
    explanationHi: "अनुच्छेद 200 के तहत, राज्यपाल विधेयक को भारत के राष्ट्रपति के विचारार्थ सुरक्षित रख सकते हैं, जिससे संघ और राज्यों के बीच संघीय समन्वय बना रहता है।",
    explanationTa: "பிரிவு 200-ன் கீழ், மத்திய-மாநிலங்களுக்கு இடையேயான கூட்டாட்சி இணக்கத்தை பராமரிக்க ஆளுநர் ஒரு மசோதாவை இந்திய ஜனாதிபதியின் பரிசீலனைக்கு அனுப்பலாம்."
  },
  {
    gameType: "board",
    identifier: "space_5",
    titleEn: "Vidhan Sabha (State Assembly)",
    titleHi: "विधान सभा (राज्य विधानमंडल)",
    titleTa: "சட்டமன்றப் பேரவை (மாநில சட்டமன்றம்)",
    descriptionEn: "State Lawmaker",
    descriptionHi: "राज्य के कानून निर्माता",
    descriptionTa: "மாநில சட்டமியற்றுபவர்",
    questionEn: "Under Article 213, what emergency legislative route is available to the state executive?",
    questionHi: "अनुच्छेद 213 के तहत, राज्य कार्यपालिका को कौन सा आपातकालीन विधायी मार्ग उपलब्ध है?",
    questionTa: "விதி 213-ன் கீழ், மாநில நிர்வாகத்திற்கு கிடைக்கும் அவசரகால சட்டமியற்றும் வழிமுறை எது?",
    optionsEn: [
      "The Governor can issue an Ordinance on the advice of the State cabinet",
      "The Chief Minister can pass a permanent law by decree",
      "Ask the local municipal corporation to make state-wide rules",
      "The state high court must draft the state budget"
    ],
    optionsHi: [
      "राज्यपाल राज्य मंत्रिमंडल की सलाह पर अध्यादेश जारी कर सकते हैं",
      "मुख्यमंत्री डिक्री द्वारा एक स्थायी कानून पारित कर सकते हैं",
      "स्थानीय नगर निगम से राज्यव्यापी नियम बनाने को कहें",
      "राज्य उच्च न्यायालय को राज्य का बजट तैयार करना चाहिए"
    ],
    optionsTa: [
      "மாநில அமைச்சரவையின் ஆலோசனையின் பேரில் ஆளுநர் அவசரச் சட்டத்தைப் பிறப்பிக்கலாம்",
      "முதலமைச்சர் ஆணை மூலம் நிரந்தரச் சட்டத்தை இயற்றலாம்",
      "மாநில அளவிலான விதிகளை உருவாக்க உள்ளூர் நகராட்சியைக் கேட்பது",
      "மாநில உயர்நீதிமன்றம் மாநில பட்ஜெட்டை தயாரிக்க வேண்டும்"
    ],
    correctAnswerIdx: 0,
    points: 35,
    explanationEn: "Article 213 empowers the Governor to promulgate Ordinances during the recess of the State Legislature, acting as temporary legislative measures.",
    explanationHi: "अनुच्छेद 213 राज्यपाल को राज्य विधानमंडल के अवकाश के दौरान अध्यादेश जारी करने की शक्ति देता है, जो अस्थायी विधायी उपायों के रूप में कार्य करते हैं।",
    explanationTa: "பிரிவு 213 மாநில சட்டமன்ற கூட்டத்தொடர் இல்லாத போது, தற்காலிக சட்டமன்ற நடவடிக்கையாக அவசரச் சட்டங்களைப் பிறப்பிக்க ஆளுநருக்கு அதிகாரம் அளிக்கிறது."
  },
  {
    gameType: "board",
    identifier: "space_6",
    titleEn: "High Court",
    titleHi: "उच्च न्यायालय",
    titleTa: "உயர் நீதிமன்றம்",
    descriptionEn: "State Chief Justice",
    descriptionHi: "राज्य के मुख्य न्यायाधीश",
    descriptionTa: "மாநில தலைமை நீதிபதி",
    questionEn: "Under Article 226, which writ can the High Court issue directing officers to show their legal authority to hold the property?",
    questionHi: "अनुच्छेद 226 के तहत, उच्च न्यायालय अधिकारियों को संपत्ति रखने का अपना कानूनी अधिकार दिखाने का निर्देश देने के लिए कौन सी रिट जारी कर सकता है?",
    questionTa: "விதி 226-ன் கீழ், அதிகாரிகள் எந்த அதிகாரத்தின் அடிப்படையில் சொத்தை வைத்திருக்கிறார்கள் என்பதை காட்ட உத்தரவிட உயர்நீதிமன்றம் எந்த பேராணையை வெளியிடலாம்?",
    optionsEn: [
      "Writ of Habeas Corpus",
      "Writ of Quo Warranto or Mandamus",
      "Writ of Prohibition",
      "Writ of Certiorari"
    ],
    optionsHi: [
      "बंदी प्रत्यक्षीकरण रिट",
      "अधिकार पृच्छा (Quo Warranto) या परमादेश (Mandamus)",
      "प्रतिषेध रिट",
      "उत्प्रेषण रिट"
    ],
    optionsTa: [
      "ஆட்கொணர்வு பேராணை",
      "தகுதிமுறை வினவும் பேராணை அல்லது செயலுறுத்தும் பேராணை",
      "தடை பேராணை",
      "நெறிமுறைப்படுத்தும் பேராணை"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "High Courts can issue Mandamus (commanding a public official to perform their legal duty) or Quo Warranto (inquiring by what authority they act) under Article 226.",
    explanationHi: "अनुच्छेद 226 के तहत उच्च न्यायालय परमादेश (सार्वजनिक अधिकारी को अपना कानूनी कर्तव्य निभाने का आदेश) या अधिकार पृच्छा (यह पूछना कि वे किस अधिकार से कार्य कर रहे हैं) जारी कर सकते हैं।",
    explanationTa: "உயர் நீதிமன்றங்கள் பிரிவு 226-ன் கீழ் செயலுறுத்தும் பேராணை (அதிகாரிகளை கடமையாற்ற கட்டாயப்படுத்துவது) அல்லது தகுதிமுறை வினவும் பேராணை (அதிகாரத்தைக் கேள்வி கேட்பது) ஆகியவற்றை வழங்கலாம்."
  },
  {
    gameType: "board",
    identifier: "space_7",
    titleEn: "Supreme Court",
    titleHi: "उच्चतम न्यायालय",
    titleTa: "உச்ச நீதிமன்றம்",
    descriptionEn: "Chief Justice of India",
    descriptionHi: "भारत के मुख्य न्यायाधीश",
    descriptionTa: "இந்திய தலைமை நீதிபதி",
    questionEn: "Under Article 32, which writ can the Supreme Court issue to command the state to produce the individual?",
    questionHi: "अनुच्छेद 32 के तहत, उच्चतम न्यायालय राज्य को व्यक्ति को पेश करने का आदेश देने के लिए कौन सी रिट जारी कर सकता है?",
    questionTa: "விதி 32-ன் கீழ், காவலில் உள்ள நபரை நீதிமன்றத்தில் ஆஜர்படுத்த அரசுக்கு உத்தரவிட உச்ச நீதிமன்றம் எந்த பேராணையை வெளியிடலாம்?",
    optionsEn: [
      "Writ of Certiorari",
      "Writ of Habeas Corpus",
      "Writ of Quo Warranto",
      "Writ of Mandamus"
    ],
    optionsHi: [
      "उत्प्रेषण रिट",
      "बंदी प्रत्यक्षीकरण रिट",
      "अधिकार पृच्छा रिट",
      "परमादेश रिट"
    ],
    optionsTa: [
      "நெறிமுறைப்படுத்தும் பேராணை",
      "ஆட்கொணர்வு பேராணை",
      "தகுதிமுறை வினவும் பேராணை",
      "செயலுறுத்தும் பேராணை"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "A Writ of Habeas Corpus is the constitutional mechanism to safeguard personal liberty against illegal state detentions, commanding the state to produce the person in court.",
    explanationHi: "बंदी प्रत्यक्षीकरण रिट गैर-कानूनी हिरासत के खिलाफ व्यक्तिगत स्वतंत्रता की रक्षा करने का एक संवैधानिक तंत्र है, जो राज्य को व्यक्ति को अदालत में पेश करने का आदेश देता है।",
    explanationTa: "ஆட்கொணர்வு பேராணை என்பது சட்டவிரோத காவலுக்கு எதிராக தனிமனித சுதந்திரத்தைப் பாதுகாக்கும் அரசியலமைப்பு வழிமுறையாகும், இது நபரை நீதிமன்றத்தில் ஆஜர்படுத்த அரசுக்கு உத்தரவிடுகிறது."
  },
  {
    gameType: "board",
    identifier: "space_8",
    titleEn: "Cabinet Room (State)",
    titleHi: "मंत्रिपरिषद कक्ष (राज्य)",
    titleTa: "அமைச்சரவை அறை (மாநிலம்)",
    descriptionEn: "Chief Minister",
    descriptionHi: "मुख्यमंत्री",
    descriptionTa: "மாநில முதலமைச்சர்",
    questionEn: "Under Article 163, is the Governor generally bound by the advice of the Chief Minister and Council of Ministers?",
    questionHi: "अनुच्छेद 163 के तहत, क्या राज्यपाल आम तौर पर मुख्यमंत्री और मंत्रिपरिषद की सलाह मानने के लिए बाध्य हैं?",
    questionTa: "விதி 163-ன் கீழ், ஆளுநர் பொதுவாக முதலமைச்சர் மற்றும் அமைச்சரவையின் ஆலோசனைக்கு கட்டுப்பட்டவரா?",
    optionsEn: [
      "No, the Governor has absolute veto on all executive policies",
      "Yes, except in matters where the Governor is constitutionally allowed discretion",
      "Yes, but only if approved by the local police commissioner",
      "No, the Governor makes all state policies independently"
    ],
    optionsHi: [
      "नहीं, राज्यपाल के पास सभी कार्यकारी नीतियों पर पूर्ण वीटो है",
      "हाँ, उन मामलों को छोड़कर जहाँ राज्यपाल को संवैधानिक रूप से विवेक का उपयोग करने की अनुमति है",
      "हाँ, लेकिन केवल तभी जब स्थानीय पुलिस आयुक्त द्वारा अनुमोदित हो",
      "नहीं, राज्यपाल सभी राज्य नीतियां स्वतंत्र रूप से बनाते हैं"
    ],
    optionsTa: [
      "இல்லை, ஆளுநருக்கு அனைத்து நிர்வாகக் கொள்கைகளிலும் முழுமையான வீட்டோ அதிகாரம் உள்ளது",
      "ஆம், அரசியலமைப்பின்படி ஆளுநர் விருப்ப அதிகாரம் கொண்ட சில விஷயங்களை தவிர",
      "ஆம், ஆனால் உள்ளூர் போலீஸ் கமிஷனர் ஒப்புதல் அளித்தால் மட்டுமே",
      "இல்லை, ஆளுநர் அனைத்து மாநில கொள்கைகளையும் சுதந்திரமாக உருவாக்குகிறார்"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "Article 163 states that there shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor, who must act on it except in discretionary matters.",
    explanationHi: "अनुच्छेद 163 में कहा गया है कि राज्यपाल को सहायता और सलाह देने के लिए एक मंत्रिपरिषद होगी जिसका प्रमुख मुख्यमंत्री होगा, और राज्यपाल को उनके विवेक के मामलों को छोड़कर उसी के अनुसार कार्य करना होगा।",
    explanationTa: "பிரிவு 163-ன் படி, ஆளுநருக்கு உதவவும் ஆலோசனை வழங்கவும் முதலமைச்சரின் தலைமையிலான அமைச்சரவை இருக்கும். விருப்ப அதிகாரம் கொண்டவை தவிர மற்றவற்றில் ஆளுநர் ஆலோசனைப்படியே செயல்பட வேண்டும்."
  },
  {
    gameType: "board",
    identifier: "space_9",
    titleEn: "Chief Minister's Office",
    titleHi: "मुख्यमंत्री कार्यालय (CMO)",
    titleTa: "முதலமைச்சர் அலுவலகம் (CMO)",
    descriptionEn: "State Executive Leader",
    descriptionHi: "राज्य कार्यपालिका के नेता",
    descriptionTa: "மாநில நிர்வாகத் தலைவர்",
    questionEn: "Under Article 167, what is the duty of the Chief Minister regarding sharing cabinet decisions with the Governor?",
    questionHi: "अनुच्छेद 167 के तहत, कैबिनेट के निर्णयों को राज्यपाल के साथ साझा करने के संबंध में मुख्यमंत्री का क्या कर्तव्य है?",
    questionTa: "விதி 167-ன் கீழ், அமைச்சरவை முடிவுகளை ஆளுநருடன் பகிர்ந்து கொள்வதில் முதலமைச்சரின் அரசியலமைப்பு கடமை என்ன?",
    optionsEn: [
      "CM can refuse to share info citing executive secrecy",
      "CM is constitutionally bound to communicate all decisions of the Council of Ministers to the Governor",
      "CM must refer the request to the Prime Minister",
      "CM only shares information if the Assembly votes for it"
    ],
    optionsHi: [
      "मुख्यमंत्री कार्यकारी गोपनीयता का हवाला देकर जानकारी साझा करने से इनकार कर सकते हैं",
      "मुख्यमंत्री संवैधानिक रूप से राज्यपाल को मंत्रिपरिषद के सभी निर्णयों से अवगत कराने के लिए बाध्य हैं",
      "मुख्यमंत्री को अनुरोध प्रधानमंत्री के पास भेजना चाहिए",
      "मुख्यमंत्री केवल तभी जानकारी साझा करते हैं जब विधानसभा इसके लिए मतदान करती है"
    ],
    optionsTa: [
      "நிர்வாக ரகசியத்தைக் காட்டி தகவல்களைப் பகிர முதலமைச்சர் மறுக்கலாம்",
      "முதலமைச்சர் அமைச்சரவையின் அனைத்து முடிவுகளையும் ஆளுநருக்குத் தெரிவிக்க அரசியலமைப்பின்படி கடமைப்பட்டவர் ஆவார்",
      "முதலமைச்சர் இந்த கோரிக்கையை பிரதமரிடம் அனுப்ப வேண்டும்",
      "சட்டமன்றம் வாக்கெடுப்பு நடத்தினால் மட்டுமே முதலமைச்சர் தகவல்களைப் பகிர்ந்து கொள்வார்"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "Article 167 makes it the explicit duty of the Chief Minister to communicate to the Governor of the State all decisions of the Council of Ministers relating to the administration of the state.",
    explanationHi: "अनुच्छेद 167 मुख्यमंत्री का यह स्पष्ट कर्तव्य बनाता है कि वे राज्य के प्रशासन से संबंधित मंत्रिपरिषद के सभी निर्णयों को राज्य के राज्यपाल को सूचित करें।",
    explanationTa: "பிரிவு 167-ன் படி, மாநில நிர்வாகம் தொடர்பான அமைச்சரவையின் அனைத்து முடிவுகளையும் ஆளுநருக்குத் தெரிவிப்பது முதலமைச்சரின் முக்கிய கடமையாகும்."
  },
  {
    gameType: "board",
    identifier: "space_10",
    titleEn: "Elections Commission",
    titleHi: "चुनाव आयोग",
    titleTa: "தேர்தல் ஆணையம்",
    descriptionEn: "Democracy Guard",
    descriptionHi: "लोकतंत्र के रक्षक",
    descriptionTa: "ஜனநாயகக் காவலர்",
    questionEn: "Which independent constitutional body is responsible for superintendence, direction, and control of elections?",
    questionHi: "चुनावों के अधीक्षण, निर्देशन और नियंत्रण के लिए कौन सा स्वतंत्र संवैधानिक निकाय जिम्मेदार है?",
    questionTa: "தேர்தல்களை கண்காணித்தல், இயக்குதல் மற்றும் கட்டுப்படுத்துவதற்கு எந்த சுதந்திரமான அரசியலமைப்பு அமைப்பு பொறுப்பாகும்?",
    optionsEn: [
      "The State Assembly itself",
      "The Election Commission of India (Article 324)",
      "The Ministry of Home Affairs",
      "The State High Court directly"
    ],
    optionsHi: [
      "स्वयं राज्य विधानसभा",
      "भारत निर्वाचन आयोग (अनुच्छेद 324)",
      "गृह मंत्रालय",
      "सीधे राज्य उच्च न्यायालय"
    ],
    optionsTa: [
      "மாநில சட்டமன்றம்",
      "இந்திய தேர்தல் ஆணையம் (பிரிவு 324)",
      "மத்திய உள்துறை அமைச்சகம்",
      "நேரடியாக மாநில உயர் நீதிமன்றம்"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "Under Article 324, the Election Commission of India has the independent authority for superintendence, direction, and control of elections to Parliament and to the Legislature of every State.",
    explanationHi: "अनुच्छेद 324 के तहत, भारत निर्वाचन आयोग के पास संसद और प्रत्येक राज्य के विधानमंडल के चुनावों के अधीक्षण, निर्देशन और नियंत्रण का स्वतंत्र अधिकार है।",
    explanationTa: "பிரிவு 324-ன் கீழ், நாடாளுமன்ற மற்றும் மாநில சட்டமன்ற தேர்தல்களை மேற்பார்வையிடவும், வழிநடத்தவும் இந்திய தேர்தல் ஆணையத்திற்கு சுதந்திரமான அதிகாரம் உள்ளது."
  },
  {
    gameType: "board",
    identifier: "space_11",
    titleEn: "Constitution Hall",
    titleHi: "संविधान सभा कक्ष",
    titleTa: "அரசியலமைப்பு மண்டபம்",
    descriptionEn: "Founding Architect",
    descriptionHi: "संस्थापक वास्तुकार",
    descriptionTa: "அரசியலமைப்பு உருவாக்கியவர்",
    questionEn: "Under which landmark judicial doctrine can the Supreme Court strike down amendments that alter the fundamental pillars of the constitution?",
    questionHi: "किस ऐतिहासिक न्यायिक सिद्धांत के तहत उच्चतम न्यायालय उन संशोधनों को रद्द कर सकता है जो संविधान के बुनियादी स्तंभों को बदलते हैं?",
    questionTa: "அரசியலமைப்பின் அடிப்படை தூண்களை மாற்றும் திருத்தங்களை உச்ச நீதிமன்றம் எந்த வரலாற்றுச் சிறப்புமிக்க கோட்பாட்டின் கீழ் ரத்து செய்ய முடியும்?",
    optionsEn: [
      "Doctrine of Pith and Substance",
      "Basic Structure Doctrine (Kesavananda Bharati case)",
      "Doctrine of Colorable Legislation",
      "Doctrine of Severability"
    ],
    optionsHi: [
      "सार और तत्व का सिद्धांत (Pith and Substance)",
      "मूल संरचना का सिद्धांत (केशवानंद भारती मामला)",
      "छद्म विधायन का सिद्धांत (Colorable Legislation)",
      "पृथक्करणीयता का सिद्धांत (Severability)"
    ],
    optionsTa: [
      "சாரம் மற்றும் பொருள் கோட்பாடு",
      "அடிப்படை கட்டமைப்பு கோட்பாடு (கேசவானந்த பாரதி வழக்கு)",
      "வண்ணமயமான சட்ட கோட்பாடு",
      "பிரித்தெடுக்கும் கோட்பாடு"
    ],
    correctAnswerIdx: 1,
    points: 35,
    explanationEn: "The Basic Structure Doctrine, established in 1973, dictates that Parliament cannot amend or destroy the essential features of the Constitution (such as democracy, federalism, secularism, and judicial review).",
    explanationHi: "1973 में स्थापित मूल संरचना का सिद्धांत यह निर्देश देता है कि संसद संविधान की आवश्यक विशेषताओं (जैसे लोकतंत्र, संघवाद, धर्मनिरपेक्षता और न्यायिक समीक्षा) में संशोधन या उन्हें नष्ट नहीं कर सकती।",
    explanationTa: "1973-ல் உருவாக்கப்பட்ட அடிப்படை கட்டமைப்பு கோட்பாடு, நாடாளுமன்றம் அரசியலமைப்பின் அத்தியாவசிய அம்சங்களை (ஜனநாயகம், கூட்டாட்சி, மதச்சார்பின்மை மற்றும் நீதித்துறை மறுஆய்வு போன்றவை) மாற்றவோ அழிக்கவோ முடியாது என்று கூறுகிறது."
  },

  // ==================== POWER DUEL FLASHCARDS ====================
  {
    gameType: "flashcards",
    identifier: "fc_1",
    titleEn: "President vs Governor",
    titleHi: "राष्ट्रपति बनाम राज्यपाल",
    titleTa: "ஜனாதிபதி VS ஆளுநர்",
    descriptionEn: JSON.stringify({
      unionTitle: "President (Union Executive)",
      unionDesc: "Ceremonial head of the country. Holds office for 5 years. Bound by the advice of the Prime Minister's cabinet (Article 74) on almost all matters.",
      stateTitle: "Governor (State Executive)",
      stateDesc: "Ceremonial head of the State. Appointed by the President and holds office during their pleasure. Holds explicit discretionary powers (Article 163).",
      comparisonKey: "The Governor has wider constitutional discretionary powers, whereas the President is tightly bound by their Cabinet."
    }),
    descriptionHi: JSON.stringify({
      unionTitle: "राष्ट्रपति (संघीय कार्यपालिका)",
      unionDesc: "देश के औपचारिक प्रमुख। 5 वर्ष के लिए पद धारण करते हैं। लगभग सभी मामलों में प्रधानमंत्री की कैबिनेट की सलाह (अनुच्छेद 74) मानने के लिए बाध्य हैं।",
      stateTitle: "राज्यपाल (राज्य कार्यपालिका)",
      stateDesc: "राज्य के औपचारिक प्रमुख। राष्ट्रपति द्वारा नियुक्त होते हैं और उनके प्रसादपर्यंत पद धारण करते हैं। उनके पास स्पष्ट विवेकाधीन शक्तियां (अनुच्छेद 163) हैं।",
      comparisonKey: "राज्यपाल के पास अधिक संवैधानिक विवेकाधीन शक्तियां हैं, जबकि राष्ट्रपति अपनी कैबिनेट की सलाह मानने के लिए पूरी तरह बाध्य हैं।"
    }),
    descriptionTa: JSON.stringify({
      unionTitle: "ஜனாதிபதி (மத்திய நிர்வாகம்)",
      unionDesc: "நாட்டின் பெயரளவு தலைவர். 5 ஆண்டுகள் பதவியில் இருப்பார். கிட்டத்தட்ட அனைத்து விவகாரங்களிலும் பிரதமரின் அமைச்சரவை ஆலோசனைக்கு (பிரிவு 74) கட்டுப்பட்டவர் ஆவார்.",
      stateTitle: "ஆளுநர் (மாநில நிர்வாகம்)",
      stateDesc: "மாநிலத்தின் பெயரளவு தலைவர். ஜனாதிபதியால் நியமிக்கப்பட்டு அவரது விருப்பம் உள்ளவரை பதவியில் நீடிப்பார். அவரிடம் சில விருப்ப அதிகாரங்கள் (பிரிவு 163) உள்ளன.",
      comparisonKey: "ஆளுநர் சில அரசியலமைப்பு விருப்ப அதிகாரங்களை கொண்டுள்ளார், ஆனால் ஜனாதிபதி அமைச்சரவையின் ஆலோசனைக்கு முழுமையாக கட்டுப்பட்டவர்."
    }),
    questionEn: "Which of the following officials can act on their own constitutional discretion in certain matters, without cabinet approval?",
    questionHi: "निम्नलिखित में से कौन सा अधिकारी कैबिनेट की मंजूरी के बिना, कुछ मामलों में अपने स्वयं के संवैधानिक विवेक पर कार्य कर सकता है?",
    questionTa: "பின்வரும் அதிகாரிகளில் யார் குறிப்பிட்ட விஷயங்களில் அமைச்சரவை ஒப்புதல் இன்றி தங்களது சொந்த விருப்ப அதிகாரத்தின்படி செயல்பட முடியும்?",
    optionsEn: ["The President of India", "The Governor of an Indian State", "The Prime Minister of India", "The Chief Justice of India"],
    optionsHi: ["भारत के राष्ट्रपति", "भारतीय राज्य के राज्यपाल", "भारत के प्रधानमंत्री", "भारत के मुख्य न्यायाधीश"],
    optionsTa: ["இந்திய ஜனாதிபதி", "இந்திய மாநில ஆளுநர்", "இந்தியப் பிரதமர்", "இந்திய தலைமை நீதிபதி"],
    correctAnswerIdx: 1,
    points: 10,
    explanationEn: "Article 163 explicitly grants the Governor discretionary powers in specific affairs, whereas the President has very narrow scope for discretion under Article 74.",
    explanationHi: "अनुच्छेद 163 स्पष्ट रूप से राज्यपाल को विशिष्ट मामलों में विवेकाधीन शक्तियां प्रदान करता है, जबकि अनुच्छेद 74 के तहत राष्ट्रपति के पास विवेक का बहुत ही सीमित दायरा है।",
    explanationTa: "பிரிவு 163 ஆளுநருக்கு குறிப்பிட்ட விஷயங்களில் தன்னிச்சையான விருப்ப அதிகாரத்தை வழங்குகிறது, ஆனால் பிரிவு 74-ன் கீழ் ஜனாதிபதிக்கு மிகக் குறைந்த விருப்ப அதிகாரமே உள்ளது."
  },
  {
    gameType: "flashcards",
    identifier: "fc_2",
    titleEn: "Supreme Court vs High Court Writs",
    titleHi: "सुप्रीम कोर्ट बनाम हाई कोर्ट रिट अधिकार",
    titleTa: "உச்ச நீதிமன்றம் VS உயர் நீதிமன்ற பேராணைகள்",
    descriptionEn: JSON.stringify({
      unionTitle: "Supreme Court (Article 32)",
      unionDesc: "Highest court. Can issue writs ONLY for the enforcement of Fundamental Rights. Has jurisdiction over the entire country.",
      stateTitle: "High Court (Article 226)",
      stateDesc: "Highest court in a state. Can issue writs for both Fundamental Rights and any other legal right. Jurisdiction limited to state boundaries.",
      comparisonKey: "High Court's writ power (Article 226) is broader than the Supreme Court's (Article 32) since it covers non-fundamental legal issues too."
    }),
    descriptionHi: JSON.stringify({
      unionTitle: "उच्चतम न्यायालय (अनुच्छेद 32)",
      unionDesc: "सर्वोच्च न्यायालय। केवल मौलिक अधिकारों के प्रवर्तन के लिए रिट जारी कर सकता है। पूरे देश पर अधिकार क्षेत्र है।",
      stateTitle: "उच्च न्यायालय (अनुच्छेद 226)",
      stateDesc: "राज्य का सर्वोच्च न्यायालय। मौलिक अधिकारों और किसी भी अन्य कानूनी अधिकार दोनों के लिए रिट जारी कर सकता है। अधिकार क्षेत्र राज्य की सीमाओं तक सीमित है।",
      comparisonKey: "उच्च न्यायालय की रिट शक्ति (अनुच्छेद 226) उच्चतम न्यायालय (अनुच्छेद 32) की तुलना में व्यापक है क्योंकि यह गैर-मौलिक कानूनी मुद्दों को भी कवर करती है।"
    }),
    descriptionTa: JSON.stringify({
      unionTitle: "உச்ச நீதிமன்றம் (பிரிவு 32)",
      unionDesc: "நாட்டின் மிக உயர்ந்த நீதிமன்றம். அடிப்படை உரிமைகளை நிலைநாட்ட மட்டுமே பேராணைகளை வெளியிட முடியும். நாடு முழுவதும் அதிகார வரம்பு கொண்டது.",
      stateTitle: "உயர் நீதிமன்றம் (பிரிவு 226)",
      stateDesc: "மாநிலத்தின் மிக உயர்ந்த நீதிமன்றம். அடிப்படை உரிமைகள் மற்றும் பிற சட்ட உரிமைகள் இரண்டிற்கும் பேராணைகளை வெளியிடலாம். அதிகார வரம்பு மாநில எல்லைக்குள் மட்டுமே.",
      comparisonKey: "உயர் நீதிமன்றத்தின் பேராணை அதிகாரம் (பிரிவு 226) உச்ச நீதிமன்றத்தைவிட (பிரிவு 32) பரந்தது, ஏனெனில் இது பிற சட்ட விவகாரங்களையும் உள்ளடக்குகிறது."
    }),
    questionEn: "Which Court has the power to issue writs for disputes other than the violation of Fundamental Rights?",
    questionHi: "किस न्यायालय के पास मौलिक अधिकारों के उल्लंघन के अलावा अन्य विवादों के लिए रिट जारी करने की शक्ति है?",
    questionTa: "அடிப்படை உரிமைகள் மீறல் தவிர மற்ற சட்ட விவகாரங்களுக்கும் பேராணைகளை பிறப்பிக்க எந்த நீதிமன்றத்திற்கு அதிகாரம் உள்ளது?",
    optionsEn: ["Only the Supreme Court of India", "Only the State High Courts", "Both Supreme Court and High Courts", "No court has this power"],
    optionsHi: ["केवल भारत का उच्चतम न्यायालय", "केवल राज्य उच्च न्यायालय", "उच्चतम न्यायालय और उच्च न्यायालय दोनों", "किसी भी न्यायालय के पास यह शक्ति नहीं है"],
    optionsTa: ["இந்திய உச்ச நீதிமன்றம் மட்டுமே", "மாநில உயர் நீதிமன்றங்கள் மட்டுமே", "உச்ச நீதிமன்றம் மற்றும் உயர் நீதிமன்றங்கள் இரண்டும்", "எந்த நீதிமன்றத்திற்கும் இந்த அதிகாரம் இல்லை"],
    correctAnswerIdx: 1,
    points: 10,
    explanationEn: "High Courts can issue writs for 'any other purpose' under Article 226, making their writ power broader than the Supreme Court's, which is restricted to Fundamental Rights (Article 32).",
    explanationHi: "उच्च न्यायालय अनुच्छेद 226 के तहत 'किसी अन्य उद्देश्य' के लिए रिट जारी कर सकते हैं, जिससे उनकी रिट शक्ति उच्चतम न्यायालय की तुलना में व्यापक हो जाती है, जो केवल मौलिक अधिकारों (अनुच्छेद 32) तक सीमित है।",
    explanationTa: "உயர் நீதிமன்றங்கள் பிரிவு 226-ன் கீழ் 'பிற நோக்கங்களுக்காகவும்' பேராணைகளை வழங்கலாம், இதனால் அவர்களின் அதிகாரம் அடிப்படை உரிமைகளுக்கு மட்டும் பேராணை வழங்கும் உச்ச நீதிமன்றத்தை (பிரிவு 32) விட பரந்தது."
  },
  {
    gameType: "flashcards",
    identifier: "fc_3",
    titleEn: "Parliament vs State Assembly (Legislative Lists)",
    titleHi: "संसद बनाम राज्य विधानसभा (विधायी सूचियाँ)",
    titleTa: "நாடாளுமன்றம் VS சட்டமன்றம் (சட்டமன்ற பட்டியல்கள்)",
    descriptionEn: JSON.stringify({
      unionTitle: "Union Parliament (Article 246)",
      unionDesc: "Sole authority to legislate on 'Union List' subjects (defense, banking, foreign affairs) and shares 'Concurrent List' with states.",
      stateTitle: "State Legislature (Article 246)",
      stateDesc: "Sole authority to legislate on 'State List' subjects (police, public health, sanitation) and shares 'Concurrent List' with Union.",
      comparisonKey: "In case of conflict on a Concurrent list law, the Union Parliament's law overrides the State's law (Doctrine of Repugnancy)."
    }),
    descriptionHi: JSON.stringify({
      unionTitle: "संघीय संसद (अनुच्छेद 246)",
      unionDesc: "'संघ सूची' के विषयों (रक्षा, बैंकिंग, विदेश मामले) पर कानून बनाने का एकमात्र अधिकार है और राज्यों के साथ 'समवर्ती सूची' साझा करता है।",
      stateTitle: "राज्य विधानमंडल (अनुच्छेद 246)",
      stateDesc: "'राज्य सूची' के विषयों (पुलिस, जन स्वास्थ्य, स्वच्छता) पर कानून बनाने का एकमात्र अधिकार है और संघ के साथ 'समवर्ती सूची' साझा करता है।",
      comparisonKey: "समवर्ती सूची के कानून पर टकराव के मामले में, संघीय संसद का कानून राज्य के कानून पर हावी होता है (विरोध का सिद्धांत)।"
    }),
    descriptionTa: JSON.stringify({
      unionTitle: "நாடாளுமன்றம் (பிரிவு 246)",
      unionDesc: "'மத்திய பட்டியல்' துறைகளில் (பாதுகாப்பு, வங்கி, வெளியுறவு) சட்டமியற்ற முழு அதிகாரம் கொண்டது. 'பொதுப்பட்டியலை' மாநிலங்களுடன் பகிர்ந்து கொள்கிறது.",
      stateTitle: "மாநில சட்டமன்றம் (பிரிவு 246)",
      stateDesc: "'மாநில பட்டியல்' துறைகளில் (காவல்துறை, பொது சுகாதாரம்) சட்டமியற்ற முழு அதிகாரம் கொண்டது. 'பொதுப்பட்டியலை' மத்திய அரசுடன் பகிர்ந்து கொள்கிறது.",
      comparisonKey: "பொதுப்பட்டியலில் உள்ள சட்டங்களில் முரண்பாடு ஏற்பட்டால் நாடாளுமன்றத்தின் சட்டமே மேலோங்கும் (முரண்பாட்டுக் கோட்பாடு)."
    }),
    questionEn: "If a State law and a Union law clash on a topic listed in the Concurrent List (like education), which law prevails?",
    questionHi: "यदि समवर्ती सूची (जैसे शिक्षा) में शामिल किसी विषय पर राज्य के कानून और संघ के कानून में टकराव होता है, तो कौन सा कानून लागू होगा?",
    questionTa: "பொதுப்பட்டியலில் உள்ள ஒரு விஷயத்தில் (கல்வி போல) மாநில சட்டமும் மத்திய சட்டமும் மோதினால் எந்த சட்டம் மேலோங்கும்?",
    optionsEn: ["The State law overrides the Union law", "The Union law overrides the State law", "Both laws are nullified instantly", "The local Governor decides which one stands"],
    optionsHi: ["राज्य का कानून संघ के कानून को खारिज करता है", "संघ का कानून राज्य के कानून पर हावी होता है", "दोनों कानून तुरंत रद्द हो जाते हैं", "स्थानीय राज्यपाल तय करते हैं कि कौन सा कानून रहेगा"],
    optionsTa: ["மாநில சட்டமே மத்திய சட்டத்தை விட மேலோங்கும்", "மத்திய சட்டமே மாநில சட்டத்தை விட மேலோங்கும்", "இரு சட்டங்களும் உடனடியாக ரத்து செய்யப்படும்", "உள்ளூர் ஆளுநர் எது செல்லுபடியாகும் என்று தீர்மானிப்பார்"],
    correctAnswerIdx: 1,
    points: 10,
    explanationEn: "Under Article 254 (Doctrine of Repugnancy), if a state law conflicts with a central law on a Concurrent list subject, the central law prevails unless the state law received the President's prior assent.",
    explanationHi: "अनुच्छेद 254 (विरोध का सिद्धांत) के तहत, यदि समवर्ती सूची के विषय पर राज्य का कानून केंद्रीय कानून के साथ संघर्ष करता है, तो केंद्रीय कानून प्रबल होगा जब तक कि राज्य के कानून को राष्ट्रपति की पूर्व सहमति न मिली हो।",
    explanationTa: "பிரிவு 254-n கீழ், பொதுப்பட்டியல் விஷயத்தில் மாநில சட்டம் மத்திய சட்டத்துடன் முரண்பட்டால் மத்திய சட்டமே மேலோங்கும், மாநில சட்டம் ஏற்கனவே ஜனாதிபதியின் ஒப்புதலைப் பெற்றிருந்தால் தவிர."
  },
  {
    gameType: "flashcards",
    identifier: "fc_4",
    titleEn: "Ordinance Powers",
    titleHi: "अध्यादेश जारी करने की शक्तियां",
    titleTa: "அவசரச் சட்டம் அதிகாரங்கள்",
    descriptionEn: JSON.stringify({
      unionTitle: "Presidential Ordinance (Article 123)",
      unionDesc: "Passed during recess of Parliament. Has the same force as an Act. Ceases to operate 6 weeks after Parliament reassembles.",
      stateTitle: "Gubernatorial Ordinance (Article 213)",
      stateDesc: "Passed during recess of State Assembly. Has the same force as a State Act. Ceases to operate 6 weeks after Assembly reassembles.",
      comparisonKey: "Both are temporary emergency laws, but the Governor must obtain the President's instructions for certain state subject ordinances."
    }),
    descriptionHi: JSON.stringify({
      unionTitle: "राष्ट्रपति का अध्यादेश (अनुच्छेद 123)",
      unionDesc: "संसद के अवकाश के दौरान पारित किया जाता है। इसका वही बल होता है जो संसद के अधिनियम का होता है। संसद के पुनः समवेत होने के 6 सप्ताह बाद निष्प्रभावी हो जाता है।",
      stateTitle: "राज्यपाल का अध्यादेश (अनुच्छेद 213)",
      stateDesc: "राज्य विधानसभा के अवकाश के दौरान पारित किया जाता है। इसका वही बल होता है जो राज्य के अधिनियम का होता है। विधानसभा के पुनः समवेत होने के 6 सप्ताह बाद निष्प्रभावी हो जाता है।",
      comparisonKey: "दोनों अस्थायी आपातकालीन कानून हैं, लेकिन राज्यपाल को कुछ राज्य विषयों के अध्यादेशों के लिए राष्ट्रपति के निर्देशों की आवश्यकता होती है।"
    }),
    descriptionTa: JSON.stringify({
      unionTitle: "ஜனாதிபதியின் அவசரச் சட்டம் (பிரிவு 123)",
      unionDesc: "நாடாளுமன்ற கூட்டத்தொடர் இல்லாத போது இயற்றப்படுகிறது. நாடாளுமன்ற சட்டத்திற்கு இணையான அதிகாரம் கொண்டது. நாடாளுமன்றம் கூடிய 6 வாரங்களில் காலாவதியாகும்.",
      stateTitle: "ஆளுநரின் அவசரச் சட்டம் (பிரிவு 213)",
      stateDesc: "சட்டமன்ற கூட்டத்தொடர் இல்லாத போது இயற்றப்படுகிறது. மாநில சட்டத்திற்கு இணையான அதிகாரம் கொண்டது. சட்டமன்றம் கூடிய 6 வாரங்களில் காலாவதியாகும்.",
      comparisonKey: "இரண்டும் தற்காலிக அவசரச் சட்டங்கள் ஆகும், ஆனால் ஆளுநர் சில விவகாரங்களில் அவசரச் சட்டம் பிறப்பிக்க ஜனாதிபதியின் அறிவுறுத்தல்களைப் பெற வேண்டும்."
    }),
    questionEn: "What is the maximum duration an Ordinance can remain active once the legislature has re-convened if it is not approved?",
    questionHi: "यदि अध्यादेश को मंजूरी नहीं मिलती है, तो विधायिका के पुनः समवेत होने पर वह अधिकतम कितने समय तक सक्रिय रह सकता है?",
    questionTa: "ஒப்புதல் பெறாத பட்சத்தில், சட்டமன்றம் மீண்டும் கூடிய பின் ஒரு அவசரச் சட்டம் எவ்வளவு காலம் செயல்பாட்டில் இருக்க முடியும்?",
    optionsEn: ["Six months", "Six weeks", "One year", "Three months"],
    optionsHi: ["छह महीने", "छह सप्ताह", "एक वर्ष", "तीन महीने"],
    optionsTa: ["ஆறு மாதங்கள்", "ஆறு வாரங்கள்", "ஒரு வருடம்", "மூன்று மாதங்கள்"],
    correctAnswerIdx: 1,
    points: 10,
    explanationEn: "Under both Article 123 and 213, an Ordinance will cease to operate six weeks after the reassembly of the legislature unless it is approved by a resolution before that period.",
    explanationHi: "अनुच्छेद 123 और 213 दोनों के तहत, एक अध्यादेश विधायिका के पुनः समवेत होने के छह सप्ताह बाद निष्प्रभावी हो जाएगा, जब तक कि उस अवधि से पहले एक प्रस्ताव द्वारा उसे अनुमोदित नहीं किया जाता है।",
    explanationTa: "பிரிவு 123 மற்றும் 213 இரண்டின் படியும், சட்டமன்றம் மீண்டும் கூடி 6 வாரங்களுக்குள் அவசரச் சட்டம் செயல்பாடு முடிவுக்கு வரும்."
  }
];
