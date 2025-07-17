"use client"

import { useState, useEffect } from "react"
import { ArrowRight, X, Shield, Clock } from "lucide-react"

interface EmergencyEntry {
  id: number
  userVent?: string
  aiInsight?: string
  reframingQuestion?: string
  userResponse?: string
  timestamp: string
}

export default function EmergencyJournalPage() {
  const [currentInput, setCurrentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [journalEntries, setJournalEntries] = useState<EmergencyEntry[]>([
    {
      id: 1,
      timestamp: new Date().toISOString(),
    },
  ])
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved")

  // Auto-save functionality
  useEffect(() => {
    if (currentInput.trim()) {
      setAutoSaveStatus("saving")
      const timer = setTimeout(() => {
        // Auto-save logic here
        setAutoSaveStatus("saved")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentInput])

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const saveToJournal = (entries: EmergencyEntry[]) => {
    const hasUserVent = entries.some((entry) => entry.userVent && entry.userVent.trim())
    if (!hasUserVent) return

    const existingEntries = JSON.parse(localStorage.getItem("emergency-journal-entries") || "[]")
    const newJournalEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      title: "Emergency Journal Session",
      preview: entries.find((entry) => entry.userVent)?.userVent?.substring(0, 150) + "..." || "",
      fullContent: entries.filter((entry) => entry.userVent),
      type: "emergency",
    }

    const updatedEntries = [newJournalEntry, ...existingEntries]
    localStorage.setItem("emergency-journal-entries", JSON.stringify(updatedEntries))
  }

  const generateEmergencyResponse = (userInput: string) => {
    const insights = [
      "I can feel the intensity of what you're going through right now. It takes courage to reach out when everything feels overwhelming. Your feelings are completely valid, and you're not alone in this moment.",
      "What you're experiencing sounds incredibly difficult. I hear the pain in your words, and I want you to know that feeling this way doesn't make you weak—it makes you human. You're doing the right thing by expressing these feelings.",
      "The storm you're in right now feels endless, but storms do pass. Your emotions are telling you something important, and by sharing them, you're already taking a step toward healing. You're stronger than you know.",
      "I can sense how much you're hurting right now. These overwhelming feelings can feel like they'll never end, but they will shift and change. You've survived difficult moments before, and you have the strength to get through this one too.",
      "What you're going through sounds exhausting and painful. It's okay to feel everything you're feeling right now. Sometimes we need to let the emotions flow before we can find our way to calmer waters.",
    ]

    const reframingQuestions = [
      "In this moment of intensity, what would it feel like to speak to yourself with the same compassion you'd show a dear friend going through this?",
      "If you could step back and observe this situation as if you were watching it happen to someone you care about, what would you tell them?",
      "What's one small thing you could do right now to show yourself kindness, even in the middle of this storm?",
      "When you've felt overwhelmed like this before, what helped you find your way back to steadier ground?",
      "If this feeling could speak, what do you think it's trying to tell you that you need right now?",
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
        const updatedEntries = journalEntries.map((entry, index) =>
          index === journalEntries.length - 1 ? { ...entry, userResponse: currentInput } : entry,
        )

        const newEntry: EmergencyEntry = {
          id: journalEntries.length + 1,
          timestamp: new Date().toISOString(),
        }

        setJournalEntries([...updatedEntries, newEntry])
      }

      setCurrentInput("")
      setIsProcessing(false)
      setAutoSaveStatus("saved")

      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  const currentEntry = journalEntries[journalEntries.length - 1]
  const isFirstInput = !currentEntry.userVent

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Calming animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-center p-4 text-gray-300 relative z-10">
        <div className="text-sm font-light tracking-wide">
          <Clock className="w-4 h-4 inline mr-1" />
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400 font-medium">Secure & Private</span>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="w-12 h-12 bg-slate-800/60 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-slate-700/60 transition-all duration-300 shadow-lg border border-gray-600/30"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
          <div className="text-center">
            <div className="flex items-center gap-2 bg-red-900/30 border border-red-600/40 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300 text-sm font-medium">Emergency Support</span>
            </div>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            {autoSaveStatus === "saving" && (
              <div className="w-5 h-5 border-2 border-blue-400/40 border-t-blue-400 rounded-full animate-spin"></div>
            )}
            {autoSaveStatus === "saved" && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 relative z-10 pb-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="relative">
            <h1 className="text-2xl font-bold text-white leading-tight tracking-wide">You're safe here</h1>
            <div className="mt-2 flex justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent"></div>
            </div>
            <p className="text-gray-300 text-base mt-3 font-light">Let everything out. I'm here to listen.</p>
          </div>
        </div>

        {/* Emergency Journal */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 min-h-[500px] relative shadow-2xl">
          {/* Decorative corner flourishes */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-pink-400/40 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-pink-400/40 rounded-tr-lg"></div>

          <div className="space-y-6">
            {journalEntries.map((entry, index) => (
              <div key={entry.id}>
                {/* User's Vent */}
                {entry.userVent && (
                  <div className="mb-6">
                    <div className="bg-slate-700/40 rounded-2xl p-6 border-l-4 border-pink-400/40">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                        <span className="text-pink-300 text-xs font-medium uppercase tracking-wider">Your Words</span>
                        <span className="text-gray-500 text-xs">
                          {new Date(entry.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-200 leading-relaxed font-light tracking-wide">{entry.userVent}</p>
                    </div>
                  </div>
                )}

                {/* AI Insight */}
                {entry.aiInsight && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-300 text-xs font-medium uppercase tracking-wider">
                        Gentle Response
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-blue-400/30 to-transparent rounded-full"></div>
                      <p className="text-gray-300 leading-relaxed font-light tracking-wide text-base pl-4">
                        {entry.aiInsight}
                      </p>
                    </div>
                  </div>
                )}

                {/* Reframing Question */}
                {entry.reframingQuestion && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                      <span className="text-purple-300 text-xs font-medium uppercase tracking-wider">
                        Gentle Question
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-400/30 to-pink-400/30 rounded-full"></div>
                      <p className="text-white font-normal leading-relaxed tracking-wide pl-4">
                        {entry.reframingQuestion}
                      </p>
                    </div>
                  </div>
                )}

                {/* User Response */}
                {entry.userResponse && (
                  <div className="mb-8">
                    <div className="bg-slate-700/40 rounded-2xl p-6 border-l-4 border-purple-400/40">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-purple-300 text-xs font-medium uppercase tracking-wider">
                          Your Reflection
                        </span>
                      </div>
                      <p className="text-gray-200 leading-relaxed font-light tracking-wide">{entry.userResponse}</p>
                    </div>
                    {index < journalEntries.length - 1 && (
                      <div className="mt-6 flex justify-center">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                          <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
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
                  <div className="absolute text-gray-500 pointer-events-none font-light tracking-wide text-lg leading-relaxed">
                    {isFirstInput
                      ? "What's happening right now? You're safe to share anything..."
                      : "Take all the time you need to reflect..."}
                  </div>
                )}
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="w-full min-h-[200px] p-0 bg-transparent border-0 text-gray-200 focus:outline-none resize-none leading-relaxed font-light tracking-wide text-lg placeholder-transparent"
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
              className="absolute bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-xl border border-pink-500/20"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-7 h-7 text-white" />
              )}
            </button>
          )}

          {/* Decorative bottom flourishes */}
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-pink-400/40 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-pink-400/40 rounded-br-lg"></div>
        </div>

        {/* Crisis Resources Footer */}
        <div className="mt-6 p-4 bg-red-900/20 border border-red-600/30 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-xl">🆘</div>
            <span className="text-red-300 font-semibold text-sm">Need immediate help?</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
            If you're having thoughts of self-harm, please reach out to a crisis helpline immediately. You matter, and
            help is available 24/7.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-full transition-all duration-200">
              Crisis Text Line
            </button>
            <button className="px-4 py-2 bg-red-600/20 border border-red-500/40 hover:bg-red-600/30 text-red-300 text-sm font-medium rounded-full transition-all duration-200">
              988 Lifeline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
