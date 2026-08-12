export interface ScenarioQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Article {
  article_number: string;
  title: string;
  organ: 'Legislature' | 'Executive' | 'Judiciary';
  level: 'Union' | 'State';
  raw_text: string;
  simplified_summary: string;
  child_friendly_summary: string;
  key_takeaways: string[];
  scenario_questions: ScenarioQuestion[];
}

export const seedArticles: Article[] = [
  {
    article_number: "Article 52",
    title: "The President of India",
    organ: "Executive",
    level: "Union",
    raw_text: "There shall be a President of India.",
    simplified_summary: "The President is the official head of the Indian State, representing unity, integrity, and solidarity of the nation. All executive actions of the Union are taken in the President's name.",
    child_friendly_summary: "Think of the President as the country's Grand President! They are the ceremonial head of India, like the captain of a national ship, who represents the entire country and signs important documents to turn bills into laws.",
    key_takeaways: [
      "The President is the first citizen of India.",
      "Acts as the ceremonial head of the nation.",
      "All major international treaties and executive orders are made in the name of the President."
    ],
    scenario_questions: [
      {
        id: "a52_q1",
        question: "A new law passed by both houses of Parliament is ready to be implemented. Whose signature is formally required to make it an official Act?",
        options: [
          "The Prime Minister of India",
          "The President of India",
          "The Chief Justice of India",
          "The Speaker of the Lok Sabha"
        ],
        answerIndex: 1,
        explanation: "Under the Constitution, all bills passed by Parliament must receive the assent of the President of India (Article 111) to become official laws, reflecting the President's role as the head of the State."
      }
    ]
  },
  {
    article_number: "Article 74",
    title: "Council of Ministers to aid and advise President",
    organ: "Executive",
    level: "Union",
    raw_text: "There shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President who shall, in the exercise of his functions, act in accordance with such advise.",
    simplified_summary: "Although the President is the head of the State, the real power lies with the Prime Minister and the Council of Ministers. The President must generally act on their advice, though they can ask them to reconsider once.",
    child_friendly_summary: "Even though the President is the head, they listen to a team of advisers! This team is called the Council of Ministers, led by the Prime Minister. Together, they decide how to run the government.",
    key_takeaways: [
      "The Prime Minister leads the executive branch of the government.",
      "The President must act in accordance with the advice of the Prime Minister's cabinet.",
      "This system establishes a parliamentary form of democracy, where elected representatives hold real power."
    ],
    scenario_questions: [
      {
        id: "a74_q1",
        question: "The President disagrees with a policy draft sent by the Prime Minister's cabinet. Under Article 74, what action can the President take?",
        options: [
          "Veto the policy permanently and draft a new one",
          "Ask the Council of Ministers to reconsider the policy once, but must accept it if sent back unchanged",
          "Dismiss the Prime Minister immediately",
          "Refer the policy to the Supreme Court for voting"
        ],
        answerIndex: 1,
        explanation: "Under the 44th Amendment to Article 74(1), the President may require the Council of Ministers to reconsider their advice. However, if the Council sends the same advice back, the President is bound to act in accordance with it."
      }
    ]
  },
  {
    article_number: "Article 79",
    title: "Constitution of Parliament",
    organ: "Legislature",
    level: "Union",
    raw_text: "There shall be a Parliament for the Union which shall consist of the President and two Houses to be known respectively as the Council of States and the House of the People.",
    simplified_summary: "The Parliament of India is the supreme lawmaking body. It is not just one chamber, but consists of three components: the President, the Rajya Sabha (Council of States), and the Lok Sabha (House of the People).",
    child_friendly_summary: "Parliament is like a giant national meeting room! It has three main parts: the President, the Rajya Sabha (where state representatives sit), and the Lok Sabha (where leaders elected directly by you and me make rules for the country).",
    key_takeaways: [
      "Parliament is composed of the President, Rajya Sabha, and Lok Sabha.",
      "Lok Sabha represents the people of India (direct elections).",
      "Rajya Sabha represents the States and Union Territories (indirect elections)."
    ],
    scenario_questions: [
      {
        id: "a79_q1",
        question: "Which of the following bodies is NOT formally considered a part of the Parliament of India under Article 79?",
        options: [
          "The President",
          "The Council of States (Rajya Sabha)",
          "The House of the People (Lok Sabha)",
          "The Supreme Court of India"
        ],
        answerIndex: 3,
        explanation: "Article 79 defines Parliament as consisting of the President and the two Houses (Rajya Sabha and Lok Sabha). The Supreme Court is part of the Judiciary, which is a separate organ of governance."
      }
    ]
  },
  {
    article_number: "Article 110",
    title: "Definition of 'Money Bills'",
    organ: "Legislature",
    level: "Union",
    raw_text: "A Bill shall be deemed to be a Money Bill if it contains only provisions dealing with all or any of the matters, namely: the imposition, abolition, remission, alteration or regulation of any tax; the borrowing of money by the Government of India...",
    simplified_summary: "A Money Bill is a bill that deals strictly with government finances, taxation, or borrowing. The Speaker of Lok Sabha decides if a bill is a Money Bill. It has special fast-track rules and Rajya Sabha cannot reject it.",
    child_friendly_summary: "A Money Bill is like a special shopping list for the country's pocket money! It deals only with taxes and government spending. Because it uses public money, only the people's direct representatives (Lok Sabha) have the ultimate say over it.",
    key_takeaways: [
      "Deals exclusively with financial matters like taxes and expenditure.",
      "Can only be introduced in the Lok Sabha with the President's prior recommendation.",
      "The Speaker of the Lok Sabha has the final authority to certify a bill as a Money Bill."
    ],
    scenario_questions: [
      {
        id: "a110_q1",
        question: "If there is a dispute about whether a newly introduced taxation bill is a Money Bill or an Ordinary Bill, who has the final authority to decide?",
        options: [
          "The President of India",
          "The Finance Minister",
          "The Speaker of the Lok Sabha",
          "The Chairman of the Rajya Sabha"
        ],
        answerIndex: 2,
        explanation: "Under Article 110(3), if any question arises whether a Bill is a Money Bill or not, the decision of the Speaker of the House of the People (Lok Sabha) shall be final."
      }
    ]
  },
  {
    article_number: "Article 124",
    title: "Establishment and constitution of Supreme Court",
    organ: "Judiciary",
    level: "Union",
    raw_text: "There shall be a Supreme Court of India consisting of a Chief Justice of India and, until Parliament by law prescribes a larger number, of not more than seven other Judges.",
    simplified_summary: "This article establishes the Supreme Court of India as the highest court of the land, detailing how judges (including the Chief Justice of India) are appointed, qualified, and removed.",
    child_friendly_summary: "The Supreme Court is like the referee of the ultimate level in a game! They sit in New Delhi and make sure everyone—including the government—follows the rulebook of the Constitution.",
    key_takeaways: [
      "The Supreme Court is the apex judicial body of India.",
      "Judges are appointed by the President.",
      "It acts as the guardian of the Constitution and protects citizen rights."
    ],
    scenario_questions: [
      {
        id: "a124_q1",
        question: "How can a Judge of the Supreme Court be removed from office before their retirement age?",
        options: [
          "By an executive order issued solely by the Prime Minister",
          "By the Chief Justice of India writing a resignation notice",
          "By an order of the President passed after an address by each House of Parliament supported by a special majority (Impeachment)",
          "By a public petition signed by at least one million citizens"
        ],
        answerIndex: 2,
        explanation: "Under Article 124(4), a Supreme Court Judge can only be removed by an order of the President passed after an address by each House of Parliament supported by a majority of the total membership of that House and a majority of not less than two-thirds of the members present and voting (impeachment on proved misbehavior or incapacity)."
      }
    ]
  },
  {
    article_number: "Article 153",
    title: "Governors of States",
    organ: "Executive",
    level: "State",
    raw_text: "There shall be a Governor for each State: Provided that nothing in this article shall prevent the appointment of the same person as Governor for two or more States.",
    simplified_summary: "Just as the President is the ceremonial head of the Union, the Governor is the ceremonial head of each State. The Governor is appointed by the President of India.",
    child_friendly_summary: "A Governor is like a President's special representative for a State! They make sure the State government runs properly and follows the national rules.",
    key_takeaways: [
      "The Governor represents the Union center in the State administration.",
      "Appointed directly by the President and holds office during the President's pleasure.",
      "One person can act as Governor for multiple states simultaneously."
    ],
    scenario_questions: [
      {
        id: "a153_q1",
        question: "Who appoints the Governor of an Indian State like Maharashtra or Uttar Pradesh?",
        options: [
          "The Chief Minister of that state",
          "The citizens of the state through direct state-wide voting",
          "The President of India",
          "The Chief Justice of the High Court of that state"
        ],
        answerIndex: 2,
        explanation: "Under Article 155, the Governor of a State is appointed by the President of India by warrant under his hand and seal."
      }
    ]
  },
  {
    article_number: "Article 163",
    title: "Council of Ministers to aid and advise Governor",
    organ: "Executive",
    level: "State",
    raw_text: "There shall be a Council of Ministers with the Chief Minister at the head to aid and advise the Governor in the exercise of his functions, except in so far as he is by or under this Constitution required to exercise his functions or any of them in his discretion.",
    simplified_summary: "The Chief Minister and their cabinet aid and advise the Governor of the State. However, unlike the President, the Governor has some constitutional discretionary powers where they do not need cabinet approval.",
    child_friendly_summary: "The Governor has a team of advisers too! This team is led by the Chief Minister of the State. The Governor works on their advice, but sometimes the Governor can make decisions on their own choice.",
    key_takeaways: [
      "The Chief Minister leads the state government executive.",
      "The Governor generally acts on the advice of the State Cabinet.",
      "The Governor holds wider discretionary powers compared to the President."
    ],
    scenario_questions: [
      {
        id: "a163_q1",
        question: "In what way is the Governor's advisory relationship with the State Council of Ministers different from the President's relationship with the Union Cabinet?",
        options: [
          "The Governor has no power to send bills back",
          "The Governor has constitutional discretionary powers where cabinet advice is not binding",
          "The Governor must ask the Prime Minister before taking advice from the Chief Minister",
          "There is no difference; they are exactly identical"
        ],
        answerIndex: 1,
        explanation: "Article 163 explicitly specifies that the Governor must follow cabinet advice *except* in matters where the Constitution requires them to act in their discretion. The President has very limited discretionary powers under Article 74."
      }
    ]
  },
  {
    article_number: "Article 168",
    title: "Constitution of Legislatures in States",
    organ: "Legislature",
    level: "State",
    raw_text: "For every State there shall be a Legislature which shall consist of the Governor, and— (a) in the States of Bihar, Maharashtra, Karnataka, Andhra Pradesh, Telangana, Uttar Pradesh, two Houses; (b) in other States, one House.",
    simplified_summary: "Every state has a lawmaking body. It consists of the Governor and either one house (Legislative Assembly - Vidhan Sabha) or two houses (Legislative Assembly and Legislative Council - Vidhan Parishad). Only six states currently have two houses.",
    child_friendly_summary: "State Assemblies are like local school parleys! They make laws just for your State (like setting state school rules or local bus systems). Some states have one big hall (Vidhan Sabha), and some states have two separate halls (Vidhan Sabha & Vidhan Parishad).",
    key_takeaways: [
      "State Legislature consists of the Governor, Legislative Assembly (Vidhan Sabha), and Legislative Council (Vidhan Parishad) if applicable.",
      "Most Indian states are unicameral (have only one house, the Vidhan Sabha).",
      "Vidhan Sabha members are elected directly by citizens (MLAs)."
    ],
    scenario_questions: [
      {
        id: "a168_q1",
        question: "Which of the following is the term used for the directly elected house of a State Legislature?",
        options: [
          "Vidhan Parishad (Legislative Council)",
          "Lok Sabha",
          "Vidhan Sabha (Legislative Assembly)",
          "Rajya Sabha"
        ],
        answerIndex: 2,
        explanation: "The Legislative Assembly (Vidhan Sabha) is the lower house of a State Legislature whose members (MLAs) are elected directly by citizens during state assembly elections."
      }
    ]
  },
  {
    article_number: "Article 213",
    title: "Governor's power to promulgate Ordinances",
    organ: "Legislature",
    level: "State",
    raw_text: "If at any time, except when the Legislative Assembly of a State is in session... the Governor is satisfied that circumstances exist which render it necessary for him to take immediate action, he may promulgate such Ordinances as the circumstances appear to him to require...",
    simplified_summary: "When the state legislature is not meeting, the Governor can pass temporary laws called 'Ordinances' to handle emergencies. These must be approved by the legislature soon after it restarts, or they lapse.",
    child_friendly_summary: "If there is an emergency and the State Assembly is on holidays, the Governor can sign a temporary law called an 'Ordinance'. But when the Assembly comes back, they must vote on it to make it permanent, otherwise it vanishes!",
    key_takeaways: [
      "An Ordinance is a temporary law issued when the legislature is not in session.",
      "It has the same force as an Act of the State Legislature.",
      "It must be laid before the Legislative Assembly and will cease to operate after six weeks of its reassembly unless approved."
    ],
    scenario_questions: [
      {
        id: "a213_q1",
        question: "The State Assembly is currently recessing (not in session), and an urgent disaster requires immediate legal regulations. What can the State Government do?",
        options: [
          "Ask the Supreme Court to pass a law",
          "The Governor can issue an Ordinance, which acts as a temporary law",
          "Wait for the next session which might be months away",
          "The Chief Minister can sign a permanent law directly"
        ],
        answerIndex: 1,
        explanation: "Under Article 213, if the legislature is recessing, the Governor can promulgate Ordinances for immediate legislative relief. They hold the force of law but must be approved once the legislature reconvenes."
      }
    ]
  },
  {
    article_number: "Article 226",
    title: "Power of High Courts to issue certain writs",
    organ: "Judiciary",
    level: "State",
    raw_text: "Every High Court shall have power, throughout the territories in relation to which it exercises jurisdiction, to issue to any person or authority... directions, orders or writs, including writs in the nature of habeas corpus, mandamus, prohibition, quo warranto and certiorari...",
    simplified_summary: "High Courts have the power to protect your rights by issuing five kinds of emergency orders, called 'Writs'. High Courts have a wider writ power than the Supreme Court because they can issue writs for both Fundamental Rights and other legal disputes.",
    child_friendly_summary: "A Writ is like a super-command! If someone, even a police officer or officer of government, treats you unfairly or violates your basic rights, you can ask the State High Court to issue a Writ to stop them instantly.",
    key_takeaways: [
      "Enables High Courts to protect fundamental rights of citizens.",
      "Writs include: Habeas Corpus (release unlawful detentions), Mandamus (force duty execution), Certiorari (quash lower court orders), etc.",
      "Article 226 gives High Courts wider power than Article 32 gives the Supreme Court, as it applies to non-fundamental rights too."
    ],
    scenario_questions: [
      {
        id: "a226_q1",
        question: "A citizen is detained by the local police without being produced before a magistrate within 24 hours. Under Article 226, which writ can their family file in the State High Court?",
        options: [
          "Writ of Quo Warranto",
          "Writ of Habeas Corpus",
          "Writ of Mandamus",
          "Writ of Prohibition"
        ],
        answerIndex: 1,
        explanation: "A writ of Habeas Corpus (meaning 'to have the body') is filed to protect personal liberty and directs the detaining authority to produce the detainee before the court to check if the detention is lawful."
      }
    ]
  }
];
