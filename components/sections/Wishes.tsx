"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Heart, Loader2, ArrowRight } from "lucide-react"
import Link from "next/link"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

interface Wish {
  id: string
  name: string
  relationship: string
  message: string
  location?: string
  timestamp: string
  hearts: number
}

interface WishesProps {
  preview?: boolean
}

const RELATIONSHIP_OPTIONS = [
  "Family",
  "Colleague",
  "Friend",
  "Former Student",
  "Church Member",
  "Community Member",
  "Other",
]

const MAX_MESSAGE_LENGTH = 999
const PREVIEW_LIMIT = 10

export default function Wishes({ preview = false }: WishesProps) {
  const { toast } = useToast()
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState("")
  const [relationship, setRelationship] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes")
      if (res.ok) {
        const data: Wish[] = await res.json()
        setWishes(data)
      }
    } catch {
      /* silently fail on initial load */
    }
  }, [])

  useEffect(() => {
    fetchWishes()
  }, [fetchWishes])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !relationship || !message.trim()) {
      toast({ title: "Please fill in all fields", variant: "destructive" })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          relationship,
          message: message.trim(),
          location: undefined,
        }),
      })

      if (!res.ok) throw new Error("Failed to submit")

      const newWish: Wish = await res.json()
      setWishes((prev) => [newWish, ...prev])
      setName("")
      setRelationship("")
      setMessage("")
      toast({ title: "Your wish has been recorded!" })
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleHeart(wishId: string) {
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, hearts: w.hearts + 1 } : w))
    )

    try {
      const res = await fetch(`/api/wishes/${wishId}/heart`, { method: "POST" })
      if (!res.ok) {
        setWishes((prev) =>
          prev.map((w) => (w.id === wishId ? { ...w, hearts: w.hearts - 1 } : w))
        )
      }
    } catch {
      setWishes((prev) =>
        prev.map((w) => (w.id === wishId ? { ...w, hearts: w.hearts - 1 } : w))
      )
    }
  }

  function formatDate(timestamp: string) {
    return new Date(timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  return (
    <section id="wishes" className="py-20 px-4" style={{ backgroundColor: "#FAF6EF" }}>
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2
          className="text-display mb-2"
          style={{ fontFamily: "var(--font-accent)", color: "#D4A017" }}
        >
          Fi Ìfẹ́ Rẹ Sílẹ̀
        </h2>
        <p
          className="text-lg"
          style={{ fontFamily: "var(--font-accent)", color: "#D4A017" }}
        >
          Ẹ Fọwọ́ sí Ìwé Àkọsílẹ̀ — Sign the Register
        </p>
      </div>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[640px] p-10 rounded-[4px]"
        style={{
          backgroundColor: "#3B1C08",
          border: "3px solid #D4A017",
        }}
      >
        {/* Form header */}
        <h3
          className="text-center mb-1"
          style={{
            fontFamily: "var(--font-display)",
            color: "#D4A017",
            fontSize: "1.25rem",
          }}
        >
          Ìwé Àkọsílẹ̀ Alábàápàdé
        </h3>
        <p
          className="text-center mb-8"
          style={{ fontFamily: "var(--font-accent)", color: "#C19A6B" }}
        >
          Your name will be written in her story.
        </p>

        {/* Name field */}
        <div className="mb-6">
          <label
            htmlFor="wish-name"
            className="block mb-1 text-sm"
            style={{ fontFamily: "var(--font-accent)", color: "#D4A017" }}
          >
            Orúkọ Rẹ <span className="text-xs" style={{ color: "#C19A6B" }}>(Your Name)</span>
          </label>
          <input
            id="wish-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-transparent border-0 border-b px-0 py-2 outline-none focus:ring-0"
            style={{
              borderBottomColor: "#D4A017",
              borderBottomWidth: "1px",
              color: "#EDD9BE",
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
            }}
          />
          <style>{`
            #wish-name::placeholder { color: rgba(193, 154, 107, 0.5); }
          `}</style>
        </div>

        {/* Relationship field */}
        <div className="mb-6">
          <label
            className="block mb-1 text-sm"
            style={{ fontFamily: "var(--font-accent)", color: "#D4A017" }}
          >
            Bí O Ṣe Mọ Rẹ̀ <span className="text-xs" style={{ color: "#C19A6B" }}>(How You Know Her)</span>
          </label>
          <Select value={relationship} onValueChange={setRelationship}>
            <SelectTrigger
              className="w-full rounded-none border-0 border-b shadow-none bg-transparent px-0"
              style={{
                borderBottomColor: "#D4A017",
                borderBottomWidth: "1px",
                color: relationship ? "#EDD9BE" : "rgba(193, 154, 107, 0.5)",
                fontFamily: "var(--font-body)",
              }}
            >
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: "#3B1C08",
                borderColor: "#D4A017",
              }}
            >
              {RELATIONSHIP_OPTIONS.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  style={{ color: "#EDD9BE", fontFamily: "var(--font-body)" }}
                  className="focus:bg-[#5C5040] focus:text-[#EDD9BE]"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Message field */}
        <div className="mb-6">
          <label
            htmlFor="wish-message"
            className="block mb-1 text-sm"
            style={{ fontFamily: "var(--font-accent)", color: "#D4A017" }}
          >
            Ọ̀rọ̀ Rẹ <span className="text-xs" style={{ color: "#C19A6B" }}>(Your Message)</span>
          </label>
          <textarea
            id="wish-message"
            rows={5}
            maxLength={MAX_MESSAGE_LENGTH}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="lined-paper w-full bg-transparent rounded-[4px] px-3 py-2 outline-none focus:ring-0 resize-none"
            style={{
              border: "1px solid #D4A017",
              color: "#EDD9BE",
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
            }}
          />
          <p
            className="text-right text-xs mt-1"
            style={{ fontFamily: "var(--font-accent)", color: "#C19A6B" }}
          >
            {message.length}/{MAX_MESSAGE_LENGTH}
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-md transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
          style={{
            backgroundColor: submitting ? "#C0392B" : "#C0392B",
            color: "#EDD9BE",
            fontFamily: "var(--font-display)",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            if (!submitting) {
              e.currentTarget.style.backgroundColor = "#D4A017"
              e.currentTarget.style.color = "#3B1C08"
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#C0392B"
            e.currentTarget.style.color = "#EDD9BE"
          }}
        >
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Fi Orúkọ Mi Sílẹ̀"
          )}
        </button>
      </form>

      {/* Existing wishes */}
      {wishes.length > 0 && (
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {(preview ? wishes.slice(0, PREVIEW_LIMIT) : wishes).map((wish, i) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i % 4 * 0.1 }}
                className="break-inside-avoid rounded-md p-4"
                style={{
                  backgroundColor: "#EDD9BE",
                  boxShadow: "0 2px 8px rgba(160, 82, 45, 0.2)",
                }}
              >
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#3B1C08",
                    fontSize: "1rem",
                  }}
                >
                  {wish.name}
                </p>
                <p
                  className="text-xs mb-2"
                  style={{ fontFamily: "var(--font-accent)", color: "#5C5040" }}
                >
                  {wish.relationship}
                </p>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontStyle: "italic",
                    color: "#5C5040",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                  }}
                >
                  {wish.message}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleHeart(wish.id)}
                    className="flex items-center gap-1 transition-colors hover:opacity-80"
                    aria-label={`Heart this wish (${wish.hearts})`}
                  >
                    <Heart
                      className="size-4"
                      style={{ color: "#C0392B" }}
                      fill="#C0392B"
                    />
                    <span
                      className="text-xs"
                      style={{ fontFamily: "var(--font-accent)", color: "#C0392B" }}
                    >
                      {wish.hearts}
                    </span>
                  </button>
                  <span
                    className="text-xs"
                    style={{ fontFamily: "var(--font-accent)", color: "#D4A017" }}
                  >
                    {formatDate(wish.timestamp)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {preview && wishes.length > PREVIEW_LIMIT && (
            <div className="mt-10 text-center">
              <Link
                href="/wishes"
                className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-sm font-medium transition-colors no-underline hover:bg-[rgba(192,57,43,0.06)]"
                style={{
                  borderColor: "#C0392B",
                  color: "#C0392B",
                  fontFamily: "var(--font-display), Georgia, serif",
                }}
              >
                View All Messages
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      )}

      <Toaster />
    </section>
  )
}
