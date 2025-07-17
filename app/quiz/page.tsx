"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How long were you in the relationship?",
    options: ["Less than 6 months", "6 months - 2 years", "2 - 5 years", "More than 5 years"],
  },
  {
    id: 2,
    question: "Who ended things?",
    options: ["I ended it", "They ended it", "It was mutual"],
  },
  {
    id: 3,
    question: "Do you still communicate with them?",
    options: ["Yes, regularly", "Occasionally", "Rarely", "No contact at all"],
  },
  {
    id: 4,
    question: "Have you experienced something like this before?",
    options: [
      "This is my first serious breakup",
      "I've had one similar experience",
      "I've been through this multiple times",
    ],
  },
  {
    id: 5,
    question: "What emotions are you feeling most these days?",
    options: ["Sadness and grief", "Anger and frustration", "Confusion and uncertainty", "Relief and hope"],
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [finalFormData, setFinalFormData] = useState({
    story: "",
  })

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Skipping quiz - this would navigate to the main app.")
    }, 1000)
  }

  const currentQ = quizQuestions[currentQuestion]
  const selectedAnswer = selectedAnswers[currentQuestion]
  const totalQuestions = quizQuestions.length + 1 // 6 total
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100

  if (currentQuestion === quizQuestions.length) {
    // Show final form page
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
        {/* Same background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/70 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        {/* Status bar */}
        <div className="flex justify-between items-center p-4 text-gray-300 relative z-10">
          <div className="text-sm font-medium">12:49</div>
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

        {/* Header with progress */}
        <div className="relative z-10 px-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleBack} className="p-2 text-gray-300 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <span className="text-xs text-gray-300">EN</span>
            </div>
          </div>

          {/* Progress bar - fully completed */}
          <div className="w-full bg-gray-700/50 rounded-full h-2 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full w-full" />
          </div>
        </div>

        {/* Final form content */}
        <div className="flex flex-col min-h-[calc(100vh-200px)] px-6 relative z-10">
          {/* Header section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">Tell us what happened.</h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-green-400 text-sm font-medium">Don't worry, we will not share.</p>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            </div>
          </div>

          {/* Story input section */}
          <div className="flex-1 mb-8">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-slate-600/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>

              {/* Input area */}
              <div className="relative">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                    <span className="text-gray-300 text-sm font-medium">Your Story</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Take your time. Share as much or as little as you'd like. This is your safe space to express what
                    you're going through.
                  </p>
                </div>

                <div className="relative">
                  {finalFormData.story === "" && (
                    <div className="absolute top-6 left-6 text-gray-500 pointer-events-none font-light italic leading-relaxed z-10">
                      Start typing here... You might want to share:
                      <br />
                      <span className="text-gray-600 text-sm">
                        • What led to the breakup
                        <br />• How you're feeling right now
                        <br />• What's been the hardest part
                        <br />• Any thoughts that keep coming up
                      </span>
                    </div>
                  )}
                  <textarea
                    value={finalFormData.story}
                    onChange={(e) => setFinalFormData((prev) => ({ ...prev, story: e.target.value }))}
                    className="w-full min-h-[300px] p-6 bg-transparent border-0 text-white focus:outline-none resize-none leading-relaxed font-light text-base placeholder-transparent"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  />
                </div>

                {/* Character count and encouragement */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-400 text-xs">
                      {finalFormData.story.length > 0 ? "You're doing great" : "Take your time"}
                    </span>
                  </div>
                  <span className="text-gray-500 text-xs">{finalFormData.story.length} characters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Complete button */}
          <div className="w-full max-w-sm mx-auto space-y-4 pb-8">
            <Button
              onClick={() => {
                setIsLoading(true)
                setTimeout(() => {
                  setIsLoading(false)
                  // Navigate to insights page
                  window.location.href = "/insights"
                }, 2000)
              }}
              disabled={!finalFormData.story.trim() || isLoading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/30"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Creating your healing journey...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Begin My Healing Journey
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </Button>

            <div className="flex justify-center pt-4">
              <div className="w-32 h-1 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/70 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Status bar simulation */}
      <div className="flex justify-between items-center p-4 text-gray-300 relative z-10">
        <div className="text-sm font-medium">12:49</div>
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

      {/* Header with progress */}
      <div className="relative z-10 px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className="p-2 text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
            <span className="text-xs text-gray-300">EN</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700/50 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-[calc(100vh-200px)] px-6 relative z-10">
        {/* Question section */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto text-center space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-6">Question #{currentQ.id}</h1>
              <p className="text-xl text-gray-200 leading-relaxed">{currentQ.question}</p>
            </div>

            {/* Answer options */}
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 text-left flex items-center gap-4 ${
                    selectedAnswer === index
                      ? "border-blue-600 bg-blue-900/30 shadow-lg shadow-blue-900/25"
                      : "border-gray-700/50 bg-slate-900/30 hover:border-gray-600 hover:bg-slate-800/30"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      selectedAnswer === index ? "bg-blue-400 text-white" : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spacer for better visual separation */}
        <div className="h-16"></div>

        {/* Bottom buttons */}
        <div className="w-full max-w-sm mx-auto space-y-4 pb-8">
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === undefined || isLoading}
            className="w-full h-14 bg-blue-800 hover:bg-blue-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                {currentQuestion === quizQuestions.length - 1 ? "Completing..." : "Loading..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {currentQuestion === quizQuestions.length - 1 ? "Next" : "Next"}
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>

          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="w-full text-gray-400 hover:text-gray-300 text-sm py-2 disabled:opacity-50"
          >
            Skip quiz
          </button>

          {/* Bottom indicator */}
          <div className="flex justify-center pt-4">
            <div className="w-32 h-1 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
