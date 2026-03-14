export interface Tribute {
  id: number;
  author: string;
  relationship: string;
  featured?: boolean;
  excerpt: string;
  full: string;
}

export const allTributes: Tribute[] = [
  {
    id: 1,
    author: "Family",
    relationship: "Family",
    featured: true,
    excerpt:
      "With grateful hearts we celebrate your 35 years of meritorious service. You have been a pillar of strength, a mentor, and an icon of educational excellence...",
    full: "With grateful hearts we celebrate your 35 years of meritorious service. You have been a pillar of strength, a mentor, and an icon of educational excellence. Your legacy at Agbado District Comprehensive High School and every school you served will continue to inspire generations. We honour you today and always.\n\n— With love, your family",
  },
  {
    id: 2,
    author: "ADCHS Community",
    relationship: "Agbado District Comprehensive High School",
    featured: true,
    excerpt:
      "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE — a woman of great and large heart. Thank you for your visionary leadership, infrastructure improvements, and the lasting impact you have made on our school...",
    full: "Chief (Mrs) Temitope Oluwakemi Ogundare, FIWAGBOYE — a woman of great and large heart. Thank you for your visionary leadership, infrastructure improvements, and the lasting impact you have made on our school. From the first Valedictory and Prize-Giving Ceremony to the Literary Festival and the Learners' Representative Council, your legacy will endure. We wish you joy, good health, and fulfilment in this new chapter.\n\n— Staff, students, and community of ADCHS",
  },
  {
    id: 3,
    author: "ANCOPSS / Colleagues",
    relationship: "Education Sector",
    excerpt:
      "Congratulations on your retirement. Your years of exemplary leadership and dedication to academic excellence have left an indelible mark on the teaching profession in Ogun State...",
    full: "Congratulations on your well-deserved retirement. Your years of exemplary leadership and dedication to academic excellence have left an indelible mark on the teaching profession in Ogun State. You led with wisdom, integrity, and compassion. May this new chapter bring you peace, good health, and the joy that comes with a life of meaningful impact.\n\n— Colleagues and well-wishers",
  },
];
