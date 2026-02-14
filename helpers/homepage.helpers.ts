import { GiddaaImages } from "@/constant/image";

// HERO DATA
export const CARDATA = [
  {
    q: "did you know?",
    a: "You don’t need to pay tax if you earn more than N50 Million Naira",
  },
  {
    q: "I am Tunder?",
    a: "Ask me anything about taxes in Nigeria.",
  },
];

export const SUBHERODATA = [
  {
    amount: "N150M",
    description: "Tax Value Filed",
    color: "#00C7BE",
  },
  {
    amount: "250",
    description: "Active Audience",
    color: "#FF9500",
  },
  {
    amount: "145K",
    description: "Returns Filed",
    color: "#32ADE6",
  },
];

// WHY TRUST US DATA
export const WHYCARDDATA = [
  {
    cardheader: "Save as Much as Possible.",
    heading: "Legally Maximize Your Returns",
    subdescrition:
      "Our goal isn’t just to file your taxes — it’s to keep more money in your pocket.",
    description:
      "We claim every legal relief and deduction you qualify for, from pensions, to rent — so you keep more of your money, legally.",
    cardcta: "Over N100M Saved",
    cardImage: GiddaaImages?.Legally,
    color: "#32ADE6",
  },
  {
    cardheader: "Trust & Experience",
    heading: "Experience You Can Count On",
    subdescrition:
      "We speak the language of FIRS — and translate it into results for you.",
    description:
      "We’ve helped individuals, freelancers, and businesses navigate Nigeria’s complex tax system. You get local insight and proven results — not guesswork.",
    cardcta: "200+ Returns Filed",
    cardImage: GiddaaImages?.Experiences,
    color: "#FF9500",
  },
  {
    cardheader: "Razor Sharp Accuracy",
    heading: "Accuracy That Protects You",
    subdescrition:
      "Because one wrong entry can cost you — we make sure it never does.",
    description:
      "We’ve helped individuals, freelancers, and businesses navigate Nigeria’s complex tax system. You get local insight and proven results — not guesswork.",
    cardcta: "0% Tax Errors",
    cardImage: GiddaaImages?.Accuracy,
    color: "#34C759",
  },
  {
    cardheader: "Transparent Fees and Process",
    heading: "Transparent From Start to Finish",
    subdescrition:
      "Trust starts with transparency — and we build it into every filing.",
    description:
      "You always know what’s filed, what’s due, and what you’re paying for. No hidden charges, no inflated numbers.",
    cardcta: "You’re In Control",
    cardImage: GiddaaImages?.Support,
    color: "#00C7BE",
  },
  {
    cardheader: "Save as Much as Possible.",
    heading: "Legally Maximize Your Returns",
    subdescrition:
      "Our goal isn’t just to file your taxes — it’s to keep more money in your pocket.",
    description:
      "We claim every legal relief and deduction you qualify for, from pensions, to rent — so you keep more of your money, legally.",
    cardcta: "Over N100M Saved",
    cardImage: GiddaaImages?.Transparent,
    color: "#AF52DE",
  },
];

// HOW IT WORKS DATA

export const STEPSDATA = [
  {
    id: 1,
    image: GiddaaImages?.one,
    title: "Identify the Taxes You Need to File",
    description:
      "Use our self-assessment tool or speak directly with a tax expert to confirm your obligations. We handle VAT, PAYE, Withholding Tax, Company Income Tax (CIT), and Personal Income Tax (PIT).",
  },
  {
    id: 2,
    image: GiddaaImages?.two,
    title: "Pay Filing fee and Submit Documents",
    description:
      "Once payment is made, share the required documents with our tax experts. We prepare and file your taxes on your behalf, while optimizing for legitimate tax savings.",
  },
  {
    id: 3,
    image: GiddaaImages?.three,
    title: "Get Confirmation and Proof of Filing",
    description:
      "You'll receive an alert once your taxes have been successfully filed, along with proof of filing and a tax clearance certificate where applicable.",
  },
];

// WHO WE SERVE
export const CARDSTEPSDATA = [
  {
    id: 1,
    image: GiddaaImages?.smallBusiness,
    title: "Small Business Owners",
    subDescription:
      "We help you stay compliant, save money, and do the most important thing — focus on your business.",
    description:
      "Running a small business is already tough — tax shouldn’t make it harder. The new law requires most registered businesses to file annual returns, even if they made no profit. We help you understand what’s required, file quickly, and get your Tax Clearance Certificate (TCC) without stress.",
    color: "#FF9500",
    textColor: "#ffffff",
  },
  {
    id: 2,
    image: GiddaaImages?.salaryEarners,
    title: "Salary Earners (Public and Private)",
    subDescription:
      "We help you make sense of your payslip — and make sure your hard-earned money works for you.",
    description:
      "Even if your employer remits your PAYE, the Tax Act still gives you rights — to reliefs, refunds, and accurate filing. We help you verify what’s been paid, claim what’s yours, and stay compliant if you have side income or multiple jobs.",
    color: "#34C759",
    textColor: "#000000",
  },
  {
    id: 3,
    image: GiddaaImages?.largeBusiness,
    title: "Large Businesses",
    subDescription:
      "We keep your business ahead of FIRS changes — not chasing them.",
    description:
      "The new Tax Act holds large corporations to higher standards of transparency and reporting — from company income tax to withholding and VAT filings. We help your finance and audit teams stay fully compliant, avoid penalties, and file accurately. No more late filings, confusing updates, or system errors. You get structure, accountability, and peace of mind.",
    color: "#001F3F",
    textColor: "#ffffff",
  },
  {
    id: 4,
    image: GiddaaImages?.remoteWorkers,
    title: "Remote Workers and Freelancers",
    subDescription:
      "You shouldn’t need to be a tax expert to earn from anywhere — we’ll handle that part.",
    description:
      "Whether you’re a designer, writer, developer, or influencer — your income still falls under the new digital and foreign income tax rules. We help you file correctly, track what’s taxable, and avoid penalties for unreported earnings. No jargon. No fear. Just clarity.",
    color: "#00C7BE",
    textColor: "#ffffff",
  },
  {
    id: 5,
    image: GiddaaImages?.propertyOwners,
    title: "Property Owners and Landlords",
    subDescription:
      "You worked hard to own it — we’ll make sure you keep more of what you earn from it.",
    description:
      "The 2025 Tax Act now makes rental income taxable, and property sales may attract capital gains tax. We make it easy to calculate what’s due, file on time, and avoid overpaying. Whether you own a single flat or multiple estates, we help you stay compliant while protecting your income",
    color: "#5856D6",
    textColor: "#ffffff",
  },
];

// TAXCOMMUNITY DATA
interface TaxProps {
  taxTitle: string;
  taxDescription: string;
  taxId: string;
  duration: string;
  answers: number;
}

export const TAXCOMMUNITYDATA: TaxProps[] = [
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 1,
  },
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 1,
  },
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 1,
  },
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 5,
  },
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 4,
  },
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 2,
  },
  {
    taxTitle: "How can I avoid Tax?",
    taxDescription:
      "I work as a civil servant in Lagos and I'm trying to understand how to calculate my taxable income. Do I include all allowances? What about housing ...",
    taxId: "Asked by Adebayo M.",
    duration: "2 hours ago",
    answers: 6,
  },
];

// TESTIMONIALS DATA
export const TESTIMONIALS = [
  {
    id: 1,
    type: "video",
    quote:
      "Choosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee",
    name: "Juicy Fruit Ltd.",
    role: null,
    category: "Company Tax",
    image: GiddaaImages?.Testimonial3,
    videoUrl: "#",
    rating: null,
  },
  {
    id: 2,
    type: "text",
    quote:
      "The tax assessment tool is incredibly useful! It simplifies the process of evaluating my tax situation, making it",
    name: "Maryam Musa, CEO Meck Doramen",
    role: "CEO Meck Doramen",
    category: "Personal Tax",
    image: GiddaaImages?.Testimonial1,
    videoUrl: null,
    rating: 5,
  },
  {
    id: 3,
    type: "video",
    quote:
      "Choosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee",
    name: "Nancy Ogunlise",
    role: null,
    category: "Personal Tax",
    image: GiddaaImages?.Testimonial2,
    videoUrl: "#",
    rating: null,
  },
  // Duplicate items for better infinite scroll effect
  {
    id: 4,
    type: "video",
    quote:
      "Choosing the right tax plan is crucial for success. Whether a freelancer, business owner, or employee",
    name: "Juicy Fruit Ltd.",
    role: null,
    category: "Company Tax",
    image: GiddaaImages?.Testimonial3,
    videoUrl: "#",
    rating: null,
  },
  {
    id: 5,
    type: "text",
    quote:
      "The tax assessment tool is incredibly useful! It simplifies the process of evaluating my tax situation, making it",
    name: "Maryam Musa, CEO Meck Doramen",
    role: "CEO Meck Doramen",
    category: "Personal Tax",
    image: GiddaaImages?.Testimonial1,
    videoUrl: null,
    rating: 5,
  },
];

// FAQ DATA
export const FAQDATA = [
  {
    id: "1",
    title: "What is included in audit protection?",
    description:
      "Tax audit protection typically includes services that help you navigate the complexities of an audit. This can involve professional representation, assistance with documentation, and guidance on how to respond to inquiries from tax authorities. Additionally, it may cover the costs associated with legal fees and any potential penalties, ensuring you have support throughout the audit process.",
  },
  {
    id: "2",
    title: "What is included in audit protection?",
    description:
      "Tax audit protection typically includes services that help you navigate the complexities of an audit. This can involve professional representation, assistance with documentation, and guidance on how to respond to inquiries from tax authorities. Additionally, it may cover the costs associated with legal fees and any potential penalties, ensuring you have support throughout the audit process.",
  },
  {
    id: "3",
    title: "What is included in audit protection?",
    description:
      "Tax audit protection typically includes services that help you navigate the complexities of an audit. This can involve professional representation, assistance with documentation, and guidance on how to respond to inquiries from tax authorities. Additionally, it may cover the costs associated with legal fees and any potential penalties, ensuring you have support throughout the audit process.",
  },
];

// FOOTER DATA

export const FOOTERLISTDATA = [
  {
    title: "File your personal taxes",
    list: [
      "Diaspor & Interntional Taxes",
      "Self Employed and Business Owners",
      "Freelancers & Remote Workers",
      "salary Earners",
    ],
  },
  {
    title: "File your company taxes",
    list: ["Small & Mid Sized Businesses", "Large Business"],
  },
  {
    title: "Tax Guides",
    list: [
      "How to file my personal taxes",
      "How to file my business taxes",
      "How to file diaspora taxes",
      "How to fike taxes for my staff",
      "view all Guides",
    ],
  },
  {
    title: "Resources",
    list: [
      "Self Tax Assessment",
      "Tax Calculator",
      "Tax Chatbot",
      "Tax Community",
      "Blog",
    ],
  },
  {
    title: "Quick Links",
    list: ["About Us", "How It Works", "Privacy Policy", "Terms of Service"],
  },
];
