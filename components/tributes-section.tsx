"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, ChevronDown, ChevronUp, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const tributes = [
  {
    id: 1,
    author: "Pastor Shola Ayinde",
    relationship: "Husband",
    featured: true,
    excerpt:
      "To God be the Glory. Great things He has done. Congratulations on your 60th birthday and successful retirement...",
    full: "To God be the Glory. Great things He has done. Congratulations on your 60th birthday and successful retirement from the Ogun State Teaching Service Commission, reaching the peak of your career. This is the Lord's doing, and it is marvelous in our eyes. I welcome you to the beginning of beginnings for you. Surely your latter years shall be more glorious than the former. I am deeply appreciative to God Almighty, who made you my helpmeet. It has been years of pleasures, peace, progress, and advancement together. I am proud of you as a wife, mother to great fruits, hardworking, and a virtuous woman. Congratulations once again Omo Genty. Aya Ayinde.",
    image: "/professional-nigerian-man-pastor-portrait.jpg",
  },
  {
    id: 2,
    author: "Oluwafemi & Opeyemi",
    relationship: "Children",
    featured: true,
    excerpt: "My own personal superwoman. Thank you for always going above and beyond for each and every one of us...",
    full: "My own personal superwoman. Thank you for always going above and beyond for each and every one of us. Through your life, you have instilled in me a possibility mindset, a strong conviction that once I set my mind to something, it is achievable with faith in God, diligence, and consistency. You have shown us, not just in words but in actions, what strength, sacrifice, and quiet excellence look like. Your unwavering commitment to family, work, and purpose has shaped who we are today, and for that, I am eternally grateful. With all my love ❤️",
    image: "/young-nigerian-professionals-siblings-portrait.jpg",
  },
  {
    id: 3,
    author: "Dr. Adebayo Ogunlesi",
    relationship: "Colleague",
    excerpt: "Working alongside Dr. Ayinde has been one of the greatest privileges of my career...",
    full: "Working alongside Dr. Ayinde has been one of the greatest privileges of my career. Her dedication to educational excellence, her compassionate approach to mentoring both students and fellow educators, and her unwavering commitment to integrity have set a standard that will be remembered for generations. She transformed every school she served, leaving behind a legacy of excellence.",
    image: "/nigerian-male-educator-professional-portrait.jpg",
  },
  {
    id: 4,
    author: "Mrs. Folake Adeyemi",
    relationship: "Church Member",
    excerpt: "Sister Yemisi is a beacon of light in our fellowship. Her service to God through education...",
    full: "Sister Yemisi is a beacon of light in our fellowship. Her service to God through education has touched countless lives. As Chairperson of our Zonal Fellowship Council, she has demonstrated servant leadership at its finest. We celebrate this woman of faith whose life exemplifies Proverbs 31 - truly a virtuous woman.",
    image: "/nigerian-woman-church-member-portrait.jpg",
  },
  {
    id: 5,
    author: "Mr. Tunde Bakare",
    relationship: "Former Student",
    excerpt: "Dr. Ayinde believed in me when I didn't believe in myself. Her encouragement changed the trajectory...",
    full: "Dr. Ayinde believed in me when I didn't believe in myself. Her encouragement changed the trajectory of my life. She saw potential in every student and worked tirelessly to bring out the best in us. Today, I am who I am because of teachers like her. Thank you, Ma, for everything.",
    image: "/young-nigerian-professional-man-portrait.jpg",
  },
  {
    id: 6,
    author: "Chief (Mrs.) Adunni Boyejo",
    relationship: "Sibling",
    excerpt: "Our dear sister Yemisi has always been the pillar of our family. From childhood, she exhibited...",
    full: "Our dear sister Yemisi has always been the pillar of our family. From childhood, she exhibited remarkable qualities of leadership, determination, and compassion. Watching her grow from that brilliant girl at Timi Agbale Grammar School to a distinguished Principal fills our hearts with immense pride. Happy 60th birthday, our golden girl!",
    image: "/nigerian-woman-traditional-attire-portrait.jpg",
  },
  {
    id: 7,
    author: "Bolaji Douglas",
    relationship: "Veteran Journalist",
    featured: true,
    excerpt: "There are professions that shape systems, and there are callings that shape lives. Teaching belongs firmly to the latter...",
    full: "There are professions that shape systems, and there are callings that shape lives. Teaching belongs firmly to the latter. Across generations and societies, teachers have remained the quiet architects of progress, moulding minds and nurturing futures.\n\nToday, we celebrate one of such exceptional educators — Dr. Bosede Aduke Ayinde, a distinguished mother, mentor, and administrator, as she formally retires from active service upon the attainment of the statutory age of 60 years.\n\nDr. Ayinde's journey in education is marked by unwavering dedication, passion, and an enduring commitment to excellence. Over the years, she served within the Ogun State Teaching Service Commission, leaving behind a legacy defined not merely by years of service, but by lives touched, minds shaped, and values instilled.\n\nFondly described as a teacher of teachers and a mentor of mentors, Dr. Ayinde's influence transcended the classroom. She was known not only for academic rigour, but also for her motherly guidance, moral leadership, and uncommon ability to inspire confidence and purpose in students and colleagues alike.\n\nAs a highly respected school principal and educationist, her leadership was characterised by integrity, discipline, and a deep love for learning. These qualities earned her the admiration of peers and the gratitude of countless students who have gone on to excel in diverse fields across the world.\n\nHer excellence did not go unnoticed. Among several recognitions, she received the Distinguished Alumni Award from Timi Agbale Grammar School, Ede, alongside other honours that attest to her impact and professional standing.\n\nBeyond her professional accomplishments, Dr. Ayinde balanced her calling with grace — as a devoted mother and grandmother whose influence extended seamlessly from school corridors to the home. Her life remains a powerful testimony that service, compassion, and leadership can coexist beautifully.\n\nAs she takes a well-deserved bow from active classroom service, we are confident that her wealth of experience, wisdom, and mentorship will continue to enrich lives beyond the four walls of the school.\n\nWe celebrate Dr. Bosede Aduke Ayinde for starting well, serving with distinction, and retiring honourably. May this new chapter be filled with peace, fulfilment, joy, and precious moments with family.\n\nIndeed, though retired, her legacy in education endures.",
    image: "/nigerian-male-educator-professional-portrait.jpg",
  },
  {
    id: 8,
    author: "Pastor Olusoji Abiodun & Dcns. Olubunmi 'Soji-Abiodun",
    relationship: "Church Leaders",
    excerpt: "Congratulations to you dear Dr. Oluwayemisi Ayinde on your retirement today. We are sure you are not tired...",
    full: "Congratulations to you dear Dr. Oluwayemisi Ayinde on your retirement today. We are sure you are not tired because God has just opened new doors for you. Your strength and health shall not fail. You are welcome to a new chapter of greatness!",
    image: "/nigerian-woman-church-member-portrait.jpg",
  },
  {
    id: 9,
    author: "Adebayo Oluwaseun Bukola",
    relationship: "Friend",
    excerpt: "A pillar of strength, a guiding light, Led with grace, shaped futures bright...",
    full: "A pillar of strength, a guiding light,\nLed with grace, shaped futures bright.\nDedicated years, hearts inspired,\nA legacy lives on, love and fire.\n\nA trailblazer, a pathfinder true,\nLeading with heart, shaping futures anew.\nWith wisdom, kindness, and a gentle hand,\nYou guided dreams, and helped them stand.\n\nIn halls of learning, your spirit shone bright,\nInspiring minds, igniting the light.\nYears of dedication, love, and care,\nA legacy of excellence, beyond compare.\n\nMay your retirement be filled with peace and delight,\nYour impact lives on, a beacon in the night.\nOluwayemisi Bosede Ayinde, a true gem,\nA principal, a leader, a heart of them.",
    image: "/nigerian-woman-teacher-classroom-students-interact.jpg",
  },
]

function TributeCard({ tribute }: { tribute: (typeof tributes)[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg",
        tribute.featured && "border-primary/30 bg-primary/5",
      )}
    >
      <CardContent className="p-6">
        {tribute.featured && (
          <div className="flex items-center gap-1 text-primary text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Featured Tribute
          </div>
        )}

        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
            <Image src={tribute.image || "/placeholder.svg"} alt={tribute.author} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">{tribute.author}</h3>
            <span className="inline-block bg-secondary/10 text-secondary text-xs font-medium px-3 py-1 rounded-full">
              {tribute.relationship}
            </span>
          </div>
        </div>

        <div className="relative">
          <Quote className="absolute -top-2 -left-1 w-8 h-8 text-primary/20" />
          <p className="text-muted-foreground leading-relaxed pl-6 italic">
            {isExpanded ? tribute.full : tribute.excerpt}
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="mt-4 text-primary hover:text-primary/80"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Read Full Tribute
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export function TributesSection() {
  return (
    <section id="tributes" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-widest uppercase">Words of Love</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground font-bold mt-2 mb-4">
            Congratulatory Messages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Messages of love, gratitude, and appreciation from family, colleagues, and friends.
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        {/* Featured Tributes */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {tributes
            .filter((t) => t.featured)
            .map((tribute) => (
              <TributeCard key={tribute.id} tribute={tribute} />
            ))}
        </div>

        {/* Other Tributes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tributes
            .filter((t) => !t.featured)
            .map((tribute) => (
              <TributeCard key={tribute.id} tribute={tribute} />
            ))}
        </div>

        {/* Scripture */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-background border border-border rounded-xl px-8 py-6 shadow-sm">
            <Quote className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="font-serif text-xl italic text-foreground max-w-xl">
              &ldquo;The path of the righteous is like the morning sun, shining ever brighter till the full light of
              day.&rdquo;
            </p>
            <span className="text-muted-foreground text-sm mt-2 block">— Proverbs 4:18</span>
          </div>
        </div>
      </div>
    </section>
  )
}
