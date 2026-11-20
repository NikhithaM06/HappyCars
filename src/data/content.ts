import type { Article, FaqItem, MessageThread, Product, TeamMember, Testimonial } from "@/lib/types";
import { images } from "./site";

export const articles: Article[] = [
  {
    slug: "how-we-inspect-a-used-car",
    title: "How we inspect a used car before it reaches the floor",
    excerpt: "A 160-point ramp check is only useful if you can see what failed. Here is the short version of what we look at, and what we walk away from.",
    category: "Buying",
    date: "12 March 2026",
    readTime: "6 min",
    author: "Asha Menon",
    image: images.blog1,
    content: [
      "Every car at Happy Cars spends a morning on the ramp before it is priced. We start with identity: chassis and engine numbers against the registration certificate, then a service-history timeline that should not have mysterious gaps.",
      "On the ramp we measure paint, look for overspray in the door shuts, and check the boot floor and spare-wheel well. Structural repairs are not a surprise we leave for the test drive.",
      "The road test is specific. Cold start, gearbox behaviour from rest, a firm stop from 80 km/h, and a listen for wheel bearings on a quiet stretch. If a diesel particulate filter is sulking, it usually shows up here.",
      "You get the same sheet we use. If a car needs pads, a tyre, or a bush, the price already assumes that work or we show you the quote before you decide.",
    ],
  },
  {
    slug: "what-service-history-tells-you",
    title: "What a service history actually tells you",
    excerpt: "Stamps are not the whole story. The intervals, the workshop, and the parts that were skipped matter more than a thick folder.",
    category: "Guides",
    date: "28 February 2026",
    readTime: "5 min",
    author: "Rahul Iyer",
    image: images.blog2,
    content: [
      "A complete service book is reassuring, but the pattern inside it is the real document. Oil changes that stretch from 10,000 km to 18,000 km tell you how the car was treated.",
      "Authorised workshops are helpful for warranty-era cars. Independent specialists are fine later, as long as the invoices name the fluids and filters. A folder of blank stamps is not a history.",
      "We pay particular attention to timing belts, DSG services, hybrid coolant, and brake fluid. Those are the jobs owners postpone, and they are the jobs that become expensive if ignored.",
    ],
  },
  {
    slug: "ev-or-hybrid-for-bengaluru",
    title: "EV or hybrid for a Bengaluru week",
    excerpt: "Range anxiety is less interesting than where you park at night. The right powertrain depends on your charger, not the brochure.",
    category: "Advice",
    date: "4 February 2026",
    readTime: "7 min",
    author: "Meera Krishnan",
    image: images.blog3,
    content: [
      "If you have a dedicated parking bay and can live with overnight charging, a compact EV is already the calmest city car we sell. The Nexon EV Max in stock is a fair example: honest range, simple running costs.",
      "If the car also does airport runs and the odd highway weekend, a strong hybrid such as the Innova Hycross removes the planning. You refuel anywhere and still see a civil number in traffic.",
      "We will not talk you into an EV if the apartment association has not approved a charger. Bring the parking reality to the showroom and we will match the car to it.",
    ],
  },
  {
    slug: "financing-a-used-car",
    title: "Financing a used car without the surprises",
    excerpt: "The interest rate is only one line. Processing fees, insurance bundling, and the foreclosure clause change the real cost.",
    category: "Finance",
    date: "19 January 2026",
    readTime: "4 min",
    author: "Rahul Iyer",
    image: images.blog4,
    content: [
      "Used-car loans in India are priced car by car. Age, kilometres, and the lender’s list matter as much as your credit score. We show you at least two offers when the file supports it.",
      "Ask for the foreclosure terms before you sign. A loan that looks cheap for three years can be expensive if you plan to close it after a bonus.",
      "Our calculator on this site uses the numbers you type. It is a planning tool, not a sanction letter. The sanction still comes from the lender after they see the car and your documents.",
    ],
  },
  {
    slug: "tyres-before-you-buy",
    title: "Tyres, brakes, and the costs that should already be in the price",
    excerpt: "A shiny car on tired tyres is a discount wearing a polish. Here is how we treat wear items before a car is advertised.",
    category: "Buying",
    date: "7 January 2026",
    readTime: "5 min",
    author: "Asha Menon",
    image: images.blog5,
    content: [
      "We measure tread on all four corners and the spare. If a tyre is under 3 mm, it is either replaced or the asking price moves. Mixing old and new tyres on the same axle is something we correct, not something we explain away.",
      "Brake discs with a lip you can catch a nail on are flagged. Pads are cheap. Discs are a conversation. Either way, you should not discover them on the first monsoon drive.",
      "Ask to see the inspection sheet. If a wear item is listed and still on the car, the price conversation is honest. If it is not listed, ask why.",
    ],
  },
  {
    slug: "monsoon-checklist",
    title: "A monsoon checklist before you take a used SUV home",
    excerpt: "Water finds the shortcuts. Sunroofs, tail-lamp seals, and cabin filters deserve ten minutes before the first heavy week.",
    category: "Care",
    date: "2 December 2025",
    readTime: "4 min",
    author: "Meera Krishnan",
    image: images.blog6,
    content: [
      "Open the sunroof, pour a bottle of water along the drain channels, and watch the cabin headliner. A blocked drain is a cheap fix and an expensive surprise.",
      "Check the boot carpet and under the spare wheel. Damp there usually means a tail-lamp seal or a rear washer hose, not a mystery flood car.",
      "Replace the cabin filter if the previous owner did not. Bengaluru’s first rain stirs up a year’s dust, and a fresh filter is the difference between a drive and a sneeze.",
    ],
  },
];

export const products: Product[] = [
  {
    slug: "ceramic-coating-kit",
    name: "Showroom ceramic coating kit",
    price: 3490,
    category: "Care",
    rating: 4.7,
    reviews: 38,
    image: images.coating,
    description: "A consumer ceramic kit we use for handover top-ups. Two years of easier washing if it is applied on clean paint.",
    details: ["50 ml coating", "Applicator and cloths", "Panel wipe included", "Suitable for gloss paint"],
  },
  {
    slug: "all-weather-floor-mats",
    name: "All-weather floor mats",
    price: 4290,
    category: "Interior",
    rating: 4.8,
    reviews: 64,
    image: images.mats,
    description: "Raised-edge mats cut for the cars we usually have in stock. They catch monsoon water instead of soaking the carpet.",
    details: ["Custom-trim edges", "Anti-slip backing", "Hose-clean surface", "Set of four"],
  },
  {
    slug: "front-and-rear-dash-cam",
    name: "Front and rear dash camera",
    price: 8990,
    category: "Electronics",
    rating: 4.6,
    reviews: 51,
    image: images.dashcam,
    description: "A dual-channel camera we can fit before delivery. Useful for the ORR, and for the insurance conversation you hope you never need.",
    details: ["2K front", "1080p rear", "Parking mode ready", "64 GB card included"],
  },
  {
    slug: "breathable-seat-covers",
    name: "Breathable seat covers",
    price: 5490,
    category: "Interior",
    rating: 4.5,
    reviews: 29,
    image: images.seats,
    description: "Tailored covers that do not disable side airbags. The fabric is meant for Bengaluru afternoons, not for a showroom shine.",
    details: ["Airbag compatible", "Rear bench included", "Machine washable", "Charcoal colour"],
  },
  {
    slug: "portable-tyre-inflator",
    name: "Portable tyre inflator",
    price: 2790,
    category: "Care",
    rating: 4.4,
    reviews: 44,
    image: images.inflator,
    description: "A compact inflator that lives in the boot. Preset pressures so you are not guessing at a petrol pump.",
    details: ["Digital preset", "12V and USB-C", "Auto shutoff", "Storage pouch"],
  },
  {
    slug: "magnetic-phone-mount",
    name: "Magnetic phone mount",
    price: 1290,
    category: "Electronics",
    rating: 4.3,
    reviews: 80,
    image: images.mount,
    description: "A vent or dash mount that does not block the driver’s view of the instrument cluster. MagSafe-friendly plate included.",
    details: ["Strong magnet", "360° joint", "Cable channel", "Fits most phones"],
  },
  {
    slug: "outdoor-car-cover",
    name: "Outdoor car cover",
    price: 3190,
    category: "Care",
    rating: 4.2,
    reviews: 22,
    image: images.cover,
    description: "A breathable cover for cars that sleep outside. It sheds a shower and still lets paint dry, which a plastic tarp will not.",
    details: ["SUV and sedan sizes", "Soft inner lining", "Lock grommet", "Storage bag"],
  },
  {
    slug: "cabin-fragrance-set",
    name: "Cabin fragrance set",
    price: 890,
    category: "Interior",
    rating: 4.1,
    reviews: 17,
    image: images.perfume,
    description: "A light citrus and linen set. We use it after a detail so the car smells clean rather than like a perfume counter.",
    details: ["Two refills", "Clip diffuser", "Subtle scent", "No oily residue"],
  },
];

export const team: TeamMember[] = [
  {
    name: "Asha Menon",
    role: "Senior vehicle advisor",
    image: images.advisor2,
    bio: "Asha has spent twelve years matching families to cars they still like after the first service.",
  },
  {
    name: "Rahul Iyer",
    role: "Finance lead",
    image: images.advisor1,
    bio: "Rahul reads the sanction letter so you do not have to discover the fee on the last page.",
  },
  {
    name: "Meera Krishnan",
    role: "Inspection lead",
    image: images.advisor4,
    bio: "Meera runs the ramp. If a car is on the floor, her sheet is in the folder.",
  },
  {
    name: "Arjun Rao",
    role: "Delivery specialist",
    image: images.advisor3,
    bio: "Arjun handles exchange paperwork, RTO slots, and the unglamorous last kilometre.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Mayyaddhi",
    role: "Verified Customer",
    quote:
      "Happy Cars provided an excellent hassle-free experience. The vehicle selection was top-notch, and the customer service was exceptional. The entire process from booking to purchase was smooth and stress-free. I highly recommend Happy Cars for a seamless experience.",
    rating: 5,
    date: "2024",
    source: "Justdial",
    featured: true,
  },
  {
    name: "Suresh Kumar",
    role: "Purchased a Pre-owned SUV",
    quote:
      "Very good experience at Happy Cars. The staff were cooperative and helped me with all the documentation including RC transfer and insurance. The car was in great condition and the pricing was transparent. Happy with my purchase.",
    rating: 5,
    date: "2024",
    source: "Google",
    featured: true,
  },
  {
    name: "Prashanth Shetty",
    role: "Purchased a Pre-owned Sedan",
    quote:
      "Trustworthy dealership near Kundapura. I visited their Kumbhashi showroom and found a great selection of multi-brand cars. The team was transparent about the vehicle condition and history. Smooth buying process and good after-sale support.",
    rating: 5,
    date: "2024",
    source: "Google",
    featured: true,
  },
  {
    name: "Raghavendra Pai",
    role: "Purchased a Pre-owned Hatchback",
    quote:
      "Best place to buy second-hand cars in the Kundapura-Udupi region. They have a wide variety of cars for different budgets. The staff guided me through every step of the purchase. Very satisfied with the service.",
    rating: 5,
    date: "2023",
    source: "Google",
  },
  {
    name: "Naveen Poojary",
    role: "Purchased a Pre-owned MPV",
    quote:
      "Bought a used car from Happy Cars and the experience was wonderful. They arranged the finance quickly, helped with all paperwork and the car was delivered in excellent condition. Very professional and reliable team.",
    rating: 4,
    date: "2024",
    source: "Google",
  },
  {
    name: "Deepak Hegde",
    role: "Purchased a Pre-owned SUV",
    quote:
      "Great collection of used cars on NH-66. The showroom is well maintained and the cars are displayed neatly. Staff are very helpful and answered all my queries patiently. Good service, would definitely recommend.",
    rating: 5,
    date: "2023",
    source: "Justdial",
  },
  {
    name: "Ashwin Kotian",
    role: "Exchanged and Purchased",
    quote:
      "I exchanged my old car and bought a new one from Happy Cars. The exchange valuation was fair and the process was straightforward. No hidden charges or last-minute surprises. Very happy with the deal.",
    rating: 5,
    date: "2024",
    source: "Google",
  },
  {
    name: "Mohammed Riyaz",
    role: "Purchased a Pre-owned Sedan",
    quote:
      "Very transparent and honest dealing. They showed me the complete vehicle history and service records. The car was exactly as described. Good quality pre-owned cars at reasonable prices. Recommended for anyone looking in Kundapura area.",
    rating: 4,
    date: "2023",
    source: "Google",
  },
  {
    name: "Vinayak Bhat",
    role: "Purchased a Pre-owned Hatchback",
    quote:
      "Excellent showroom with a nice variety of cars. The team at Happy Cars made the whole process easy and hassle-free. Good documentation support and they helped me with the loan process too. Five stars from me.",
    rating: 5,
    date: "2024",
    source: "Justdial",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Are the cars on the floor inspected?",
    answer:
      "Yes. Every advertised car has a multipoint inspection. Certified cars also include a fresh service and a longer Happy Cars assurance. The sheet is in the folder and on the car’s page as a summary.",
  },
  {
    question: "Can I exchange my current car?",
    answer:
      "Yes. Bring the registration certificate, insurance, and service file. We value the car on the ramp the same day in most cases, and the value can go toward the one you are buying.",
  },
  {
    question: "Do you arrange finance?",
    answer:
      "We introduce the file to lending partners and show you the offers. Approval, rate, and terms come from the lender. The calculator on this site is only a planning estimate.",
  },
  {
    question: "Can I reserve a car online?",
    answer:
      "You can send an enquiry from the car page or from your dashboard. A refundable holding amount is taken only after an advisor confirms the car is still available. This website does not take payment.",
  },
  {
    question: "Do you deliver outside Bengaluru?",
    answer:
      "Yes, across Karnataka and to most major cities. Delivery cost depends on the distance and whether the car moves by driver or carrier. We confirm it before you commit.",
  },
  {
    question: "What paperwork should I bring?",
    answer:
      "A photo identity proof, address proof, PAN, and, if you are financing, the income documents your lender asks for. If you are exchanging a car, bring its registration certificate, insurance, and PUC.",
  },
];

export const messages: MessageThread[] = [
  {
    id: "m1",
    name: "Happy Cars desk",
    preview: "The Creta you saved is still on the floor this week.",
    time: "Today, 10:24",
    unread: true,
    messages: [
      {
        from: "them",
        text: "The Hyundai Creta SX (O) you saved is still available. Would you like a Saturday slot for a drive?",
        time: "10:24",
      },
    ],
  },
  {
    id: "m2",
    name: "Finance desk",
    preview: "Two lender options are ready for the XUV700.",
    time: "Yesterday",
    unread: false,
    messages: [
      {
        from: "them",
        text: "We have two indicative offers for the XUV700. Neither is a sanction until the documents are in.",
        time: "Yesterday",
      },
      {
        from: "me",
        text: "Please hold both. I will bring the salary slips on Thursday.",
        time: "Yesterday",
      },
    ],
  },
];

export const services = [
  {
    title: "160-point inspection",
    text: "Identity, structure, mechanicals, and a road test. You leave with the same sheet the advisor used.",
  },
  {
    title: "Certified assurance",
    text: "Selected cars are serviced, wear items are addressed, and a Happy Cars assurance rides with the sale.",
  },
  {
    title: "Finance, plainly",
    text: "We compare lender offers and explain fees, tenure, and foreclosure before you sign anything.",
  },
  {
    title: "Exchange",
    text: "Your current car is valued on the ramp. The number is written down, not waved at in the car park.",
  },
  {
    title: "Documentation",
    text: "RC transfer, insurance, and hypothecation are scheduled with you, not left as a homework assignment.",
  },
  {
    title: "Delivery",
    text: "Collect from Indiranagar or have the car driven or carried to your city. The cost is quoted first.",
  },
];

export const plans = [
  {
    name: "Browse",
    price: "Free",
    note: "Walk in or enquire online",
    points: ["Floor access", "Inspection summary", "Test drive", "Exchange estimate"],
  },
  {
    name: "Certified",
    price: "Included",
    note: "On selected cars",
    points: ["Fresh service", "Wear items addressed", "12-month assurance", "Priority delivery slot"],
    featured: true,
  },
  {
    name: "Concierge",
    price: "On request",
    note: "When you want it found",
    points: ["Search beyond the floor", "Home or office test drive", "Paperwork handled", "Delivery scheduling"],
  },
];

export const areas = [
  { name: "Indiranagar", x: 58, y: 48 },
  { name: "Koramangala", x: 52, y: 62 },
  { name: "HSR Layout", x: 64, y: 70 },
  { name: "Jayanagar", x: 40, y: 64 },
  { name: "MG Road", x: 46, y: 42 },
  { name: "Hebbal", x: 48, y: 22 },
  { name: "Whitefield", x: 78, y: 36 },
  { name: "Electronic City", x: 58, y: 86 },
];
