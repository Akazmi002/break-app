"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart } from "lucide-react"

export default function WelcomePage() {
  const [isStarting, setIsStarting] = useState(false)

  const handleStartQuiz = () => {
    setIsStarting(true)
    // Navigate to quiz page (placeholder for now)
    setTimeout(() => {
      setIsStarting(false)
      alert("Quiz would start here - this is just a demo!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-800/15 to-indigo-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-900/15 to-slate-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-800/10 to-indigo-900/10 rounded-full blur-2xl"></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-800/5 to-indigo-900/5 rounded-full blur-xl"></div>
      </div>

      {/* Status bar simulation */}
      <div className="flex justify-between items-center p-4 text-gray-300 relative z-10">
        <div className="text-sm font-medium">12:48</div>
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

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 relative z-10">
        {/* App logo/icon */}
        <div className="mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-950/30">
            <Heart className="w-10 h-10 text-white" fill="currentColor" />
          </div>
        </div>

        {/* Main content area */}
        <div className="text-center mb-auto">
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">Welcome!</h1>
          <p className="text-xl text-gray-200 leading-relaxed max-w-sm mx-auto">
            Let's start by understanding your pain
          </p>
        </div>

        {/* Decorative element */}
        <div className="flex items-center gap-2 mb-16">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Start button */}
        <div className="w-full max-w-sm">
          <Button
            onClick={handleStartQuiz}
            disabled={isStarting}
            className="w-full h-14 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-lg rounded-full shadow-lg border border-gray-200 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            {isStarting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin"></div>
                Starting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Start Quiz
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
        </div>

        {/* Bottom indicator */}
        <div className="mt-8">
          <div className="w-32 h-1 bg-white/80 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
