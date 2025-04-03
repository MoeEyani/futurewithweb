export interface Quote {
  id: number;
  text: string;
  textAr: string;
  author: string;
  authorAr: string;
  category: 'leadership' | 'innovation' | 'change' | 'business' | 'success';
}

export const quotes: Quote[] = [
  {
    id: 1,
    text: "Innovation distinguishes between a leader and a follower.",
    textAr: "الابتكار هو ما يميز بين القائد والتابع.",
    author: "Steve Jobs",
    authorAr: "ستيف جوبز",
    category: 'leadership'
  },
  {
    id: 2,
    text: "Your most unhappy customers are your greatest source of learning.",
    textAr: "عملاؤك الأكثر استياءً هم أعظم مصدر للتعلم.",
    author: "Bill Gates",
    authorAr: "بيل غيتس",
    category: 'business'
  },
  {
    id: 3,
    text: "It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.",
    textAr: "ليس الأقوى من الأنواع هو من يبقى، ولا الأكثر ذكاءً، بل الأكثر استجابة للتغيير.",
    author: "Charles Darwin",
    authorAr: "تشارلز داروين",
    category: 'change'
  },
  {
    id: 4,
    text: "The best way to predict the future is to create it.",
    textAr: "أفضل طريقة للتنبؤ بالمستقبل هي أن تصنعه.",
    author: "Peter Drucker",
    authorAr: "بيتر دراكر",
    category: 'innovation'
  },
  {
    id: 5,
    text: "If you're not failing every now and again, it's a sign you're not doing anything very innovative.",
    textAr: "إذا كنت لا تفشل بين الحين والآخر، فهذه علامة على أنك لا تفعل أي شيء مبتكر حقًا.",
    author: "Woody Allen",
    authorAr: "وودي ألين",
    category: 'innovation'
  },
  {
    id: 6,
    text: "The greatest danger in times of turbulence is not the turbulence – it is to act with yesterday's logic.",
    textAr: "أكبر خطر في أوقات الاضطراب ليس الاضطراب نفسه - بل هو التصرف بمنطق الأمس.",
    author: "Peter Drucker",
    authorAr: "بيتر دراكر",
    category: 'change'
  },
  {
    id: 7,
    text: "Leadership is the capacity to translate vision into reality.",
    textAr: "القيادة هي القدرة على تحويل الرؤية إلى واقع.",
    author: "Warren Bennis",
    authorAr: "وارن بينيس",
    category: 'leadership'
  },
  {
    id: 8,
    text: "The true measure of leadership is influence – nothing more, nothing less.",
    textAr: "المقياس الحقيقي للقيادة هو التأثير - لا أكثر ولا أقل.",
    author: "John C. Maxwell",
    authorAr: "جون سي. ماكسويل",
    category: 'leadership'
  },
  {
    id: 9,
    text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
    textAr: "النجاح ليس مفتاح السعادة. بل السعادة هي مفتاح النجاح. إذا أحببت ما تفعله، ستكون ناجحًا.",
    author: "Albert Schweitzer",
    authorAr: "ألبرت شفايتزر",
    category: 'success'
  },
  {
    id: 10,
    text: "Effort only fully releases its reward after a person refuses to quit.",
    textAr: "الجهد لا يطلق مكافأته الكاملة إلا بعد أن يرفض الشخص الاستسلام.",
    author: "Napoleon Hill",
    authorAr: "نابليون هيل",
    category: 'success'
  },
  {
    id: 11,
    text: "The entrepreneur always searches for change, responds to it, and exploits it as an opportunity.",
    textAr: "رائد الأعمال يبحث دائمًا عن التغيير، ويستجيب له، ويستغله كفرصة.",
    author: "Peter Drucker",
    authorAr: "بيتر دراكر",
    category: 'business'
  },
  {
    id: 12,
    text: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    textAr: "أكبر مخاطرة هي عدم المخاطرة على الإطلاق. في عالم سريع التغير، الاستراتيجية الوحيدة المضمون فشلها هي عدم المخاطرة.",
    author: "Mark Zuckerberg",
    authorAr: "مارك زوكربيرج",
    category: 'change'
  },
  {
    id: 13,
    text: "What is now proved was once only imagined.",
    textAr: "ما هو مثبت الآن كان يومًا ما مجرد خيال.",
    author: "William Blake",
    authorAr: "ويليام بليك",
    category: 'innovation'
  },
  {
    id: 14,
    text: "Don't measure yourself by what you have accomplished, but by what you should have accomplished with your ability.",
    textAr: "لا تقس نفسك بما أنجزته، بل بما كان يجب أن تنجزه بقدراتك.",
    author: "John Wooden",
    authorAr: "جون وودن",
    category: 'success'
  },
  {
    id: 15,
    text: "In a world that's changing so quickly, the biggest risk you can take is not taking any risks.",
    textAr: "في عالم يتغير بسرعة كبيرة، أكبر مخاطرة يمكنك القيام بها هي عدم المخاطرة على الإطلاق.",
    author: "Mark Zuckerberg",
    authorAr: "مارك زوكربيرج",
    category: 'business'
  }
];

export const getRandomQuote = (category?: 'leadership' | 'innovation' | 'change' | 'business' | 'success'): Quote => {
  let filteredQuotes = quotes;
  
  // Filter by category if provided
  if (category) {
    filteredQuotes = quotes.filter(quote => quote.category === category);
    // If no quotes in that category, use all quotes
    if (filteredQuotes.length === 0) {
      filteredQuotes = quotes;
    }
  }
  
  // Get a random quote from the filtered list
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  return filteredQuotes[randomIndex];
};

export const getQuoteByUserType = (userType: 'leader' | 'follower' | 'guest' | null): Quote => {
  if (userType === 'leader') {
    return getRandomQuote('leadership');
  } else if (userType === 'follower') {
    return getRandomQuote('change');
  } else {
    return getRandomQuote();
  }
};