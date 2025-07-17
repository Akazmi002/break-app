"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface JournalEntry {
  id: number
  quote?: string
  insight: string
  question: string
  userResponse?: string
}

const thoughtPatterns = [
  { id: 1, name: "Feeling like you're not enough", color: "from-blue-500 to-indigo-600" },
  { id: 2, name: "Blaming yourself for everything", color: "from-purple-500 to-violet-600" },
  { id: 3, name: "Thinking it'll always hurt this much", color: "from-emerald-500 to-teal-600" },
]

export default function ReframePage() {
  const searchParams = useSearchParams()
  const [currentResponse, setCurrentResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPattern, setCurrentPattern] = useState(thoughtPatterns[0])
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      quote:
        "There were moments I lost track of who I was. I adjusted my voice, my pace, my needs—hoping it would bring peace, connection, or maybe just a sense of being wanted. I bent myself into versions I didn't even recognize, just trying to be what she needed. But in doing so, I slowly disappeared from my own story. This thought keeps surfacing, and it's time to gently reframe it.",
      insight:
        "When we shape ourselves around someone else, it feels like the break-up isn't just about losing a person — it's about losing yourself. That kind of love feels like survival. But the 'you' that existed before her is not gone — just hidden under grief.",
      question:
        "What parts of yourself did you push away or minimize in that relationship — and what might it feel like to invite them back now?",
    },
  ])

  useEffect(() => {
    // Get pattern from URL params if available
    const patternId = searchParams.get("pattern")
    if (patternId) {
      const pattern = thoughtPatterns.find((p) => p.id === Number.parseInt(patternId))
      if (pattern) {
        setCurrentPattern(pattern)
      }
    }
  }, [searchParams])

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

  // Calculate word count and progress
  const wordCount = currentResponse
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const targetWords = 50 // Target word count for meaningful response
  const progressPercentage = Math.min((wordCount / targetWords) * 100, 100)

  // Progress bar color based on completion
  const getProgressColor = () => {
    if (progressPercentage < 25) return "from-red-500 to-orange-500"
    if (progressPercentage < 50) return "from-orange-500 to-yellow-500"
    if (progressPercentage < 75) return "from-yellow-500 to-blue-500"
    return "from-blue-500 to-green-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.4 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Status bar simulation */}
      <div className="flex justify-between items-center p-4 text-gray-300 relative z-10">
        <div className="text-sm font-medium">12:54</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
          </div>
          <div className="ml-2 w-6 h-3 border border-gray-300 rounded-sm">
            <div className="w-4 h-full bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-slate-800/60 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-slate-700/60 transition-all duration-300 shadow-lg border border-gray-600/30"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
          <div className="text-center">
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-xs text-gray-300">Reframing Session</span>
            </div>
          </div>
          <div className="w-10 h-10"></div>
        </div>

        {/* Current Thought Pattern with Progress */}
        <div className="text-center mb-6">
          <div className="bg-slate-800/30 border border-gray-700/50 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className={`w-3 h-3 bg-gradient-to-r ${currentPattern.color} rounded-full`}></div>
              <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Working On</span>
              <div className={`w-3 h-3 bg-gradient-to-r ${currentPattern.color} rounded-full`}></div>
            </div>
            <h2 className="text-white font-semibold text-lg mb-4">{currentPattern.name}</h2>

            {/* Progress Bar directly beneath the pattern name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <div className="text-xs">🧠</div>
                  </div>
                  <span className="text-gray-300 font-medium text-sm">CBT Progress</span>
                </div>
                <span className="text-blue-400 font-medium text-sm">Step 2 of 4</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: "50%" }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-xs">Identifying & Questioning</span>
                <span className="text-blue-400 text-xs font-medium">50% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar for word count */}
        {!currentEntry.userResponse && currentResponse && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-medium">Response Progress</span>
              <span className="text-gray-300 text-sm font-medium">
                {wordCount} / {targetWords} words
              </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${getProgressColor()} h-2 rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {wordCount >= targetWords && (
              <div className="flex items-center justify-center mt-2">
                <div className="flex items-center gap-2 bg-green-900/30 border border-green-600/40 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-medium">Great depth! Ready to continue</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="px-6 relative z-10 pb-8">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-3xl font-bold text-white leading-tight tracking-wide">Let's reframe one thought</h1>
            <div className="mt-3 flex justify-center">
              <div className={`w-24 h-px bg-gradient-to-r ${currentPattern.color} rounded-full`}></div>
            </div>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Continuous Journal */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-10 min-h-[600px] relative shadow-2xl">
          {/* Decorative corner flourishes */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-gray-600/40 rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-gray-600/40 rounded-tr-lg"></div>

          <div className="space-y-8">
            {journalEntries.map((entry, index) => (
              <div key={entry.id}>
                {/* Quote Paragraph (only for first entry) */}
                {entry.quote && (
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute -left-4 top-0 text-6xl text-gray-500/40 font-serif leading-none">"</div>
                      <p className="text-gray-300 text-base font-light leading-relaxed tracking-wide pl-8 pr-4">
                        {entry.quote}
                      </p>
                      <div className="absolute -right-4 bottom-0 text-6xl text-gray-500/40 font-serif leading-none">
                        "
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                    </div>
                  </div>
                )}

                {/* AI Insight */}
                <div className="mb-8">
                  <p className="text-gray-300 leading-relaxed font-light tracking-wide text-base">{entry.insight}</p>
                </div>

                {/* Reframe Question */}
                <div className="mb-8">
                  <div className="relative">
                    <div
                      className={`absolute -left-2 top-0 w-1 h-full bg-gradient-to-b ${currentPattern.color} opacity-60 rounded-full`}
                    ></div>
                    <p className="text-white font-normal leading-relaxed tracking-wide pl-4">{entry.question}</p>
                  </div>
                </div>

                {/* User Response (if exists) */}
                {entry.userResponse && (
                  <div className="mb-10">
                    <div className="bg-slate-700/30 rounded-2xl p-6 border-l-4 border-blue-400/40 backdrop-blur-sm">
                      <p className="text-gray-300 leading-relaxed font-light italic tracking-wide">
                        {entry.userResponse}
                      </p>
                    </div>
                    {index < journalEntries.length - 1 && (
                      <div className="mt-8 flex justify-center">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
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
                  <div className="absolute text-gray-500 pointer-events-none font-light italic tracking-wide">
                    Take your time to reflect deeply on this question...
                  </div>
                )}
                <textarea
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  className="w-full min-h-[200px] p-0 bg-transparent border-0 text-gray-300 focus:outline-none resize-none leading-relaxed font-light tracking-wide placeholder-transparent"
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
              className={`absolute bottom-8 right-8 w-14 h-14 bg-gradient-to-br ${
                wordCount >= targetWords
                  ? "from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800"
                  : "from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800"
              } disabled:from-gray-600 disabled:to-gray-700 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-xl border border-gray-600/20`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-6 h-6 text-white" />
              )}
            </button>
          )}

          {/* Decorative bottom flourishes */}
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-gray-600/40 rounded-bl-lg"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-gray-600/40 rounded-br-lg"></div>
        </div>
      </div>
    </div>
  )
}
