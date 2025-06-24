"use client"

import { useState } from "react"
import { ArrowRight, X } from "lucide-react"

interface EmergencyEntry {
  id: number
  userVent?: string
  aiInsight?: string
  reframingQuestion?: string
  userResponse?: string
}

export default function EmergencyJournalPage() {
  const [currentInput, setCurrentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [journalEntries, setJournalEntries] = useState<EmergencyEntry[]>([
    {
      id: 1,
    },
  ])

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const saveToJournal = (entries: EmergencyEntry[]) => {
    // Only save if there's at least one user vent
    const hasUserVent = entries.some((entry) => entry.userVent && entry.userVent.trim())

    if (!hasUserVent) return

    // Get existing emergency journal entries
    const existingEntries = JSON.parse(localStorage.getItem("emergency-journal-entries") || "[]")

    // Create a new emergency journal entry
    const newJournalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: "Emergency Journal Session",
      preview: entries.find((entry) => entry.userVent)?.userVent?.substring(0, 150) + "..." || "",
      fullContent: entries.filter((entry) => entry.userVent),
      type: "emergency",
    }

    // Add to existing entries
    const updatedEntries = [newJournalEntry, ...existingEntries]

    // Save to localStorage
    localStorage.setItem("emergency-journal-entries", JSON.stringify(updatedEntries))
  }

  const generateEmergencyResponse = (userInput: string) => {
    const insights = [
      "I can feel the intensity of what you're going through right now. It takes courage to reach out when everything feels overwhelming. Your feelings are completely valid, and you're not alone in this moment.",
      "What you're experiencing sounds incredibly difficult. I hear the pain in your words, and I want you to know that feeling this way doesn't make you weak—it makes you human. You're doing the right thing by expressing these feelings.",
      "The storm you're in right now feels endless, but storms do pass. Your emotions are telling you something important, and by sharing them, you're already taking a step toward healing. You're stronger than you know.",
      "I can sense how much you're hurting right now. These overwhelming feelings can feel like they'll never end, but they will shift and change. You've survived difficult moments before, and you have the strength to get through this one too.",
      "What you're going through sounds exhausting and painful. It's okay to feel everything you're feeling right now. Sometimes we need to let the emotions flow before we can find our way to calmer waters.",
      "I hear you, and I see your pain. Right now everything might feel chaotic, but you're not broken—you're processing something really difficult. Give yourself permission to feel without judgment.",
      "The weight you're carrying sounds so heavy right now. It's completely understandable that you're feeling overwhelmed. You don't have to carry this alone, and you don't have to have all the answers right now.",
      "Your feelings are so valid, and I'm grateful you trusted this space with them. When everything feels like it's falling apart, sometimes the bravest thing we can do is just keep breathing and take it one moment at a time.",
    ]

    const reframingQuestions = [
      "In this moment of intensity, what would it feel like to speak to yourself with the same compassion you'd show a dear friend going through this?",
      "If you could step back and observe this situation as if you were watching it happen to someone you care about, what would you tell them?",
      "What's one small thing you could do right now to show yourself kindness, even in the middle of this storm?",
      "When you've felt overwhelmed like this before, what helped you find your way back to steadier ground?",
      "If this feeling could speak, what do you think it's trying to tell you that you need right now?",
      "What would it look like to hold space for these difficult emotions without letting them define your entire reality?",
      "If you knew this intense feeling would pass (and it will), how might you treat yourself differently in this moment?",
      "What's one truth about yourself that remains constant, even when everything else feels chaotic?",
    ]

    return {
      insight: insights[Math.floor(Math.random() * insights.length)],
      question: reframingQuestions[Math.floor(Math.random() * reframingQuestions.length)],
    }
  }

  const handleSubmit = () => {
    if (!currentInput.trim()) return

    setIsProcessing(true)

    setTimeout(() => {
      const currentEntry = journalEntries[journalEntries.length - 1]

      if (!currentEntry.userVent) {
        // First submission - user's vent
        const response = generateEmergencyResponse(currentInput)
        const updatedEntries = journalEntries.map((entry, index) =>
          index === journalEntries.length - 1
            ? {
                ...entry,
                userVent: currentInput,
                aiInsight: response.insight,
                reframingQuestion: response.question,
              }
            : entry,
        )

        setJournalEntries(updatedEntries)
        saveToJournal(updatedEntries)
      } else {
        // Second submission - user's response to reframing question
        const updatedEntries = journalEntries.map((entry, index) =>
          index === journalEntries.length - 1 ? { ...entry, userResponse: currentInput } : entry,
        )

        // Add a new entry for potential continuation
        const newEntry: EmergencyEntry = {
          id: journalEntries.length + 1,
        }

        setJournalEntries([...updatedEntries, newEntry])
      }

      setCurrentInput("")
      setIsProcessing(false)

      // Smooth scroll to new content
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  const currentEntry = journalEntries[journalEntries.length - 1]
  const isFirstInput = !currentEntry.userVent

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
            <p className="text-stone-600 font-light tracking-wide text-sm">Safe Space</p>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 relative z-10 pb-8">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-3xl font-light text-stone-800 leading-tight tracking-wide">I'm here to listen</h1>
            <div className="mt-3 flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            </div>
            <p className="text-stone-600 text-lg mt-4 font-light">Let it all out. You're safe here.</p>
          </div>
        </div>

        {/* Emergency Journal */}
        <div className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-3xl shadow-2xl border border-stone-200/50 p-10 min-h-[600px] relative backdrop-blur-sm">
          {/* Decorative corner flourishes */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-stone-300/40 rounded-tl-lg"></div>
          <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-stone-300/40 rounded-tr-lg"></div>

          <div className="space-y-8">
            {journalEntries.map((entry, index) => (
              <div key={entry.id}>
                {/* User's Vent */}
                {entry.userVent && (
                  <div className="mb-8">
                    <div className="bg-stone-50/50 rounded-2xl p-6 border-l-4 border-amber-300/40">
                      <p className="text-stone-600 leading-relaxed font-light italic tracking-wide">{entry.userVent}</p>
                    </div>
                  </div>
                )}

                {/* AI Insight */}
                {entry.aiInsight && (
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-amber-400/30 to-transparent rounded-full"></div>
                      <p className="text-stone-700 leading-relaxed font-light tracking-wide text-base pl-4">
                        {entry.aiInsight}
                      </p>
                    </div>
                  </div>
                )}

                {/* Reframing Question */}
                {entry.reframingQuestion && (
                  <div className="mb-8">
                    <div className="relative">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-amber-400/30 to-transparent rounded-full"></div>
                      <p className="text-stone-800 font-normal leading-relaxed tracking-wide pl-4">
                        {entry.reframingQuestion}
                      </p>
                    </div>
                  </div>
                )}

                {/* User Response */}
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
            {(isFirstInput || (!currentEntry.userResponse && currentEntry.reframingQuestion)) && (
              <div className="relative">
                {currentInput === "" && (
                  <div className="absolute text-stone-400 pointer-events-none font-light italic tracking-wide">
                    {isFirstInput ? "What's happening? Let it all out..." : "Take your time to reflect..."}
                  </div>
                )}
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="w-full min-h-[200px] p-0 bg-transparent border-0 text-stone-700 focus:outline-none resize-none leading-relaxed font-light tracking-wide"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          {(isFirstInput || (!currentEntry.userResponse && currentEntry.reframingQuestion)) && (
            <button
              onClick={handleSubmit}
              disabled={!currentInput.trim() || isProcessing}
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
