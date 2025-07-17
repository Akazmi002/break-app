"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

interface TutorialStep {
  id: number
  type: "identify" | "question" | "reframe" | "complete"
  title: string
  subtitle?: string
  content: string
  illustration: string
  interactive?: {
    type: "thought-selection" | "question-answer" | "reframe-practice"
    data?: any
  }
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    type: "identify",
    title: "Step 1: Spot the Pattern",
    subtitle: "Negative thoughts often sound like absolute facts",
    content:
      "After heartbreak, our minds create harsh stories about ourselves and our future. These thoughts feel true, but they're actually patterns we can learn to recognize.",
    illustration: "🔍",
  },
  {
    id: 2,
    type: "question",
    title: "Step 2: Question Gently",
    subtitle: "Is this thought helping me heal?",
    content:
      "Instead of believing every thought, we can ask: 'Is this helping me move forward?' This simple question creates space between you and the thought.",
    illustration: "💭",
  },
  {
    id: 3,
    type: "reframe",
    title: "Step 3: Reframe with Compassion",
    subtitle: "Create a more balanced perspective",
    content:
      "We replace harsh absolutes with gentle, realistic thoughts that acknowledge your pain while leaving room for healing and growth.",
    illustration: "🌱",
  },
]

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const step = tutorialSteps[currentStep]

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      setIsCompleting(false)
      // Navigate to dashboard
      window.location.href = "/dashboard"
    }, 2000)
  }

  const handleSkip = () => {
    window.location.href = "/dashboard"
  }

  const progressPercentage = ((currentStep + 1) / tutorialSteps.length) * 100

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
        <div className="text-sm font-medium">12:53</div>
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
            onClick={currentStep === 0 ? () => window.history.back() : handlePrevious}
            className="p-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
            <span className="text-xs text-gray-300">Tutorial</span>
          </div>

          <button onClick={handleSkip} className="text-gray-400 hover:text-gray-300 text-sm">
            Skip
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700/50 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <span className="text-gray-400 text-sm">
            {currentStep + 1} of {tutorialSteps.length}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-[calc(100vh-200px)] px-6 relative z-10">
        {/* Illustration */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600/30">
              <div className="text-6xl">{step.illustration}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-bold text-white mb-4">{step.title}</h1>
              {step.subtitle && <p className="text-blue-300 text-lg font-medium mb-6">{step.subtitle}</p>}
              <p className="text-gray-300 text-lg leading-relaxed">{step.content}</p>
            </div>

            {/* Step-specific examples */}
            {step.type === "identify" && (
              <div className="bg-slate-800/30 border border-gray-700/50 rounded-2xl p-6 mt-8">
                <h3 className="text-white font-semibold mb-4">Common patterns sound like:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300 italic">"I'm not enough"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300 italic">"It's all my fault"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-gray-300 italic">"I'll never be happy again"</span>
                  </div>
                </div>
              </div>
            )}

            {step.type === "question" && (
              <div className="bg-slate-800/30 border border-gray-700/50 rounded-2xl p-6 mt-8">
                <div className="space-y-4">
                  <div className="text-left">
                    <h4 className="text-orange-300 font-medium mb-2">Example thought:</h4>
                    <p className="text-gray-200 italic pl-4 border-l-2 border-orange-400">
                      "I'll never find love again"
                    </p>
                  </div>
                  <div className="text-left">
                    <h4 className="text-blue-300 font-medium mb-2">Ask yourself:</h4>
                    <p className="text-gray-200 pl-4 border-l-2 border-blue-400">
                      "Is this thought helping me heal right now?"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step.type === "reframe" && (
              <div className="space-y-4 mt-8">
                <div className="bg-red-900/20 border border-red-600/40 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-red-300 font-medium text-sm">Before</span>
                  </div>
                  <p className="text-gray-200 italic text-sm">"I'll never find love again"</p>
                </div>

                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="bg-green-900/20 border border-green-600/40 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-green-300 font-medium text-sm">After</span>
                  </div>
                  <p className="text-gray-200 italic text-sm">
                    "I'm grieving this loss, and while I can't predict the future, I'm capable of love and healing will
                    help me be open to new possibilities."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pb-8">
          {currentStep < tutorialSteps.length - 1 ? (
            <div className="flex items-center justify-between max-w-md mx-auto">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                {currentStep === 0 ? "Back" : "Previous"}
              </button>

              <div className="flex gap-2">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep ? "bg-blue-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all duration-200"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-600/40 rounded-2xl p-6 text-center">
                <h3 className="text-white font-semibold text-lg mb-3">You're ready!</h3>
                <p className="text-gray-300 text-sm mb-4">Remember: Identify → Question → Reframe</p>
                <div className="flex justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🔍</div>
                    <span className="text-gray-300">Spot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">💭</div>
                    <span className="text-gray-300">Question</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-lg">🌱</div>
                    <span className="text-gray-300">Reframe</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleComplete}
                disabled={isCompleting}
                className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-lg shadow-green-900/30"
              >
                {isCompleting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                    Starting your journey...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Begin My Healing Journey
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
