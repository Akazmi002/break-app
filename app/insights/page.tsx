"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface Insight {
  id: number
  label: string
  quotes: string[]
  progress: number
  color: string
}

const insights: Insight[] = [
  {
    id: 1,
    label: "Feeling like you're not enough",
    quotes: ["I tried everything and it still wasn't enough.", "Maybe I'm just too much for people to love."],
    progress: 12,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    label: "Blaming yourself for everything",
    quotes: [
      "If I hadn't messed up that one time, maybe things would've been different.",
      "I keep replaying what I said, and I just hate myself for it.",
    ],
    progress: 15,
    color: "from-purple-500 to-violet-600",
  },
  {
    id: 3,
    label: "Thinking it'll always hurt this much",
    quotes: ["I don't think I'll ever get over this.", "What if no one ever loves me like that again?"],
    progress: 5,
    color: "from-emerald-500 to-teal-600",
  },
]

export default function InsightsPage() {
  const [animatedProgress, setAnimatedProgress] = useState<{ [key: number]: number }>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Animate progress bars on mount
    const timer = setTimeout(() => {
      const newProgress: { [key: number]: number } = {}
      insights.forEach((insight) => {
        newProgress[insight.id] = insight.progress
      })
      setAnimatedProgress(newProgress)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleStartShifting = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Navigate to dashboard
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleBack = () => {
    window.history.back()
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
        <div className="text-sm font-medium">12:52</div>
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
          <button onClick={handleBack} className="p-2 text-gray-300 hover:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
            <span className="text-xs text-gray-300">EN</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-[calc(100vh-140px)] px-6 relative z-10 pb-8">
        {/* Title and subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">Your Healing Insights</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto">
            Here are a few thoughts that might be shaping your pain right now. Let's gently begin to shift them.
          </p>
        </div>

        {/* Insights */}
        <div className="space-y-8 mb-12">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className="bg-slate-800/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm"
              style={{
                animationDelay: `${index * 0.2}s`,
                animation: "fadeInUp 0.6s ease-out forwards",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              {/* Insight label */}
              <h3 className="text-white font-semibold text-xl mb-4">{insight.label}</h3>

              {/* Supporting quotes */}
              <div className="space-y-3 mb-6">
                {insight.quotes.map((quote, quoteIndex) => (
                  <div key={quoteIndex} className="relative">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400/50 to-transparent rounded-full"></div>
                    <p className="text-gray-300 italic pl-6 leading-relaxed">"{quote}"</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-medium">Reframing Progress</span>
                  <span className="text-gray-300 text-sm font-medium">{animatedProgress[insight.id] || 0}%</span>
                </div>
                <div className="w-full bg-gray-700/50 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${insight.color} h-2 rounded-full transition-all duration-2000 ease-out`}
                    style={{ width: `${animatedProgress[insight.id] || 0}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action button */}
        <div className="mt-auto">
          <Button
            onClick={handleStartShifting}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-lg shadow-blue-900/30"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                Preparing your journey...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Let's start shifting these thoughts
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>

        {/* Bottom indicator */}
        <div className="flex justify-center pt-6">
          <div className="w-32 h-1 bg-white/60 rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
