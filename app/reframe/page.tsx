"use client"

import { useState } from "react"
import { ArrowRight, X } from "lucide-react"

export default function ReframePage() {
  const [journalText, setJournalText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)
  const [aiContent, setAiContent] = useState({
    quote: "I bent myself into versions I didn't even recognize just trying to be what she needed.",
    insight:
      "When we shape ourselves around someone else, it feels like the break-up isn't just about losing a person — it's about losing yourself. That kind of love feels like survival. But the 'you' that existed before her is not gone — just hidden under grief.",
    question:
      "What parts of yourself did you push away or minimize in that relationship — and what might it feel like to invite them back now?",
  })

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const generateResponse = (userInput: string) => {
    // Simulate AI generating personalized response based on user input
    const responses = [
      {
        insight:
          "I hear you reflecting on the parts of yourself that felt lost. It takes courage to even acknowledge what we've given up. The fact that you can name these pieces of yourself means they're still there, waiting to be reclaimed.",
        question:
          "If you could give yourself permission to be fully authentic in your next relationship, what would that look like? What boundaries would you set to protect the parts of yourself you value most?",
      },
      {
        insight:
          "Your awareness of how you adapted yourself shows incredible self-reflection. Many people go through relationships without ever recognizing these patterns. This insight is actually the first step toward healthier connections.",
        question:
          "What would it feel like to trust that the right person will love you for exactly who you are, without you having to change or minimize yourself?",
      },
      {
        insight:
          "It sounds like you're beginning to separate your worth from your ability to please others. That's profound growth. The love you gave wasn't wrong — but it shouldn't have required you to disappear.",
        question: "How might you honor both your caring nature and your need to remain whole in future relationships?",
      },
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleNext = () => {
    if (!journalText.trim()) return

    setIsProcessing(true)

    setTimeout(() => {
      const newResponse = generateResponse(journalText)
      setAiContent({
        quote: "", // No quote for follow-up responses
        insight: newResponse.insight,
        question: newResponse.question,
      })
      // Don't clear the journal text - keep user's writing
      setHasResponded(true)
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center p-4 text-gray-800 relative z-10">
        <div className="text-sm font-medium">8:00</div>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
          </div>
          <div className="ml-2 w-6 h-3 border border-gray-800 rounded-sm">
            <div className="w-4 h-full bg-gray-800 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <p className="text-gray-600 font-medium">Today, 8:00 pm</p>
          </div>
          <div className="w-10 h-10"></div> {/* Spacer */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-[calc(100vh-140px)] px-6 relative z-10 pb-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 leading-tight">Let's reframe one thought</h1>
        </div>

        {/* White box containing all content */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow-sm relative flex flex-col">
          {/* AI Content - Sticky at top */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm rounded-t-2xl p-6 border-b border-gray-100 z-10">
            {/* Quote (only show on first interaction) */}
            {aiContent.quote && (
              <div className="mb-4">
                <p className="text-gray-800 text-lg leading-relaxed">{aiContent.quote}</p>
              </div>
            )}

            {/* AI Insight */}
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">{aiContent.insight}</p>
            </div>

            {/* Reframe Question */}
            <div>
              <p className="text-gray-800 font-medium leading-relaxed">{aiContent.question}</p>
            </div>
          </div>

          {/* Journal Input Area */}
          <div className="flex-1 p-6 relative">
            {journalText === "" && <div className="absolute text-gray-400 pointer-events-none">Start typing...</div>}
            <textarea
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className="w-full min-h-[300px] p-0 bg-transparent border-0 text-gray-800 focus:outline-none resize-none leading-relaxed"
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
              }}
            />

            {/* Circular Arrow Button */}
            <button
              onClick={handleNext}
              disabled={!journalText.trim() || isProcessing}
              className="absolute bottom-6 right-6 w-12 h-12 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed shadow-lg"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
