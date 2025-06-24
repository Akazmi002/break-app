"use client"

import { useState } from "react"
import { ArrowRight, X } from "lucide-react"

interface JournalEntry {
  id: number
  quote?: string
  insight: string
  question: string
  userResponse?: string
}

export default function ReframePage() {
  const [currentResponse, setCurrentResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      quote: "I bent myself into versions I didn't even recognize just trying to be what she needed.",
      insight:
        "When we shape ourselves around someone else, it feels like the break-up isn't just about losing a person — it's about losing yourself. That kind of love feels like survival. But the 'you' that existed before her is not gone — just hidden under grief.",
      question:
        "What parts of yourself did you push away or minimize in that relationship — and what might it feel like to invite them back now?",
    },
  ])

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const saveToJournal = (entries: JournalEntry[]) => {
    // Only save if there's at least one user response
    const hasUserResponse = entries.some((entry) => entry.userResponse && entry.userResponse.trim())

    if (!hasUserResponse) return

    // Get existing journal entries
    const existingEntries = JSON.parse(localStorage.getItem("reframe-journal-entries") || "[]")

    // Create a new journal entry
    const newJournalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: "Reframing Session",
      preview: entries.find((entry) => entry.userResponse)?.userResponse?.substring(0, 150) + "..." || "",
      fullContent: entries.filter((entry) => entry.userResponse),
    }

    // Add to existing entries
    const updatedEntries = [newJournalEntry, ...existingEntries]

    // Save to localStorage
    localStorage.setItem("reframe-journal-entries", JSON.stringify(updatedEntries))
  }

  const generateResponse = (userInput: string) => {
    // Generate contextual insights based on user input - no quotes for subsequent responses
    const insights = [
      "I can feel the weight of what you've shared. It takes incredible courage to look at these parts of yourself with such honesty. The fact that you're willing to explore these feelings means you're already beginning to heal.",
      "Your words reveal someone who's been carrying so much alone. There's wisdom in your reflection, even in the midst of pain. You're not just surviving this — you're learning from it.",
      "What strikes me about your response is the self-awareness you're developing. Many people go through heartbreak without ever examining their patterns. This insight is your strength.",
      "I hear both the pain and the growth in what you've written. You're not the same person who entered that relationship, and that's not a loss — that's evolution.",
      "Your honesty about your experience shows remarkable emotional intelligence. You're not just processing what happened — you're transforming it into wisdom.",
      "There's something powerful in how you're processing this. You're not just feeling the pain — you're learning from it, growing through it.",
      "I notice how you're beginning to separate your worth from what happened. That's profound work, and it's exactly what healing looks like.",
      "The way you're reflecting on this shows such emotional maturity. You're turning your pain into understanding, and that's how we truly heal.",
    ]

    const questions = [
      "As you think about moving forward, what would it look like to honor both your capacity for love and your need to remain whole?",
      "If you could speak to yourself with the same compassion you'd show a dear friend, what would you say about this experience?",
      "What boundaries might you set in future relationships to protect the parts of yourself you've rediscovered?",
      "How might this experience, as painful as it's been, be preparing you for a healthier kind of love?",
      "What would it feel like to trust that the right person will celebrate who you are, not who you think you should be?",
      "What does it mean to you now to love someone without losing yourself in the process?",
      "How are you learning to distinguish between healthy compromise and losing yourself?",
      "What would it look like to enter your next relationship from a place of wholeness rather than need?",
    ]

    return {
      insight: insights[Math.floor(Math.random() * insights.length)],
      question: questions[Math.floor(Math.random() * questions.length)],
    }
  }

  const handleSubmit = () => {
    if (!currentResponse.trim()) return

    setIsProcessing(true)

    setTimeout(() => {
      // Update current entry with user response
      const updatedEntries = journalEntries.map((entry, index) =>
        index === journalEntries.length - 1 ? { ...entry, userResponse: currentResponse } : entry,
      )

      // Generate new AI response (no quote for subsequent responses)
      const newResponse = generateResponse(currentResponse)
      const newEntry: JournalEntry = {
        id: journalEntries.length + 1,
        insight: newResponse.insight,
        question: newResponse.question,
        // No quote for subsequent entries
      }

      const finalEntries = [...updatedEntries, newEntry]
      setJournalEntries(finalEntries)
      setCurrentResponse("")
      setIsProcessing(false)

      // Save to journal after first response
      saveToJournal(updatedEntries)

      // Smooth scroll to new content
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  const currentEntry = journalEntries[journalEntries.length - 1]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-orange-50 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,69,19,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Status bar simulation */}
      <div className="flex justify-between items-center p-4 text-stone-700 relative z-10">
        <div className="text-sm font-light tracking-wide">8:00</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-stone-600 rounded-full"></div>
            <div className="w-1 h-3 bg-stone-600 rounded-full"></div>
            <div className="w-1 h-3 bg-stone-400 rounded-full"></div>
          </div>
          <div className="ml-2 w-6 h-3 border border-stone-600 rounded-sm">
            <div className="w-4 h-full bg-stone-600 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center hover:bg-stone-700 transition-all duration-300 shadow-lg"
          >
            <X className="w-5 h-5 text-amber-50" />
          </button>
          <div className="text-center">
            <p className="text-stone-600 font-light tracking-wide text-sm">Today, 8:00 pm</p>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 relative z-10 pb-8">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-3xl font-light text-stone-800 leading-tight tracking-wide">
              Let's reframe one thought
            </h1>
            <div className="mt-3 flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Continuous Journal */}
        <div className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-3xl shadow-2xl border border-stone-200/50 p-10 min-h-[600px] relative backdrop-blur-sm">
          {/* Decorative corner flourishes */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-stone-300/40 rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-stone-300/40 rounded-tr-lg"></div>

          <div className="space-y-8">
            {journalEntries.map((entry, index) => (
              <div key={entry.id}>
                {/* Quote (only for first entry) */}
                {entry.quote && (
                  <div className="relative mb-8">
                    <div className="absolute -left-4 top-0 text-6xl text-stone-300/40 font-serif leading-none">"</div>
                    <p className="text-stone-700 text-lg font-light italic leading-relaxed pl-8 tracking-wide">
                      {entry.quote}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
                    </div>
                  </div>
                )}

                {/* AI Insight */}
                <div className="mb-8">
                  <p className="text-stone-700 leading-relaxed font-light tracking-wide text-base">{entry.insight}</p>
                </div>

                {/* Reframe Question */}
                <div className="mb-8">
                  <div className="relative">
                    <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-amber-400/30 to-transparent rounded-full"></div>
                    <p className="text-stone-800 font-normal leading-relaxed tracking-wide pl-4">{entry.question}</p>
                  </div>
                </div>

                {/* User Response (if exists) */}
                {entry.userResponse && (
                  <div className="mb-10">
                    <div className="bg-stone-50/50 rounded-2xl p-6 border-l-4 border-amber-300/40">
                      <p className="text-stone-600 leading-relaxed font-light italic tracking-wide">
                        {entry.userResponse}
                      </p>
                    </div>
                    {index < journalEntries.length - 1 && (
                      <div className="mt-8 flex justify-center">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                          <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Current Input Area */}
            {!currentEntry.userResponse && (
              <div className="relative">
                {currentResponse === "" && (
                  <div className="absolute text-stone-400 pointer-events-none font-light italic tracking-wide">
                    Start typing...
                  </div>
                )}
                <textarea
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  className="w-full min-h-[200px] p-0 bg-transparent border-0 text-stone-700 focus:outline-none resize-none leading-relaxed font-light tracking-wide"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          {!currentEntry.userResponse && (
            <button
              onClick={handleSubmit}
              disabled={!currentResponse.trim() || isProcessing}
              className="absolute bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-stone-700 to-stone-800 hover:from-stone-600 hover:to-stone-700 disabled:from-stone-400 disabled:to-stone-500 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-xl border border-stone-600/20"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-amber-100/40 border-t-amber-100 rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-6 h-6 text-amber-50" />
              )}
            </button>
          )}

          {/* Decorative bottom flourishes */}
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-stone-300/40 rounded-bl-lg"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-stone-300/40 rounded-br-lg"></div>
        </div>
      </div>
    </div>
  )
}
