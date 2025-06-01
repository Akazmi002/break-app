"use client"

import { useState } from "react"
import {
  Home,
  BarChart3,
  BookOpen,
  MessageCircle,
  Menu,
  Heart,
  AlertCircle,
  Check,
  Minus,
  ChevronRight,
} from "lucide-react"

const weekDays = ["S", "S", "M", "T", "W", "T", "F"]

const thoughtPatterns = [
  {
    id: 1,
    label: "Feeling like you're not enough",
    progress: 12,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    label: "Blaming yourself for everything",
    progress: 15,
    color: "from-purple-500 to-violet-600",
  },
]

export default function DashboardPage() {
  const [healingProgress] = useState(20) // This would be dynamic
  const [weeklyHabits] = useState([true, true, true, true, true, true, false]) // true = completed, false = skipped
  const [showPanicModal, setShowPanicModal] = useState(false)

  const handleReframing = () => {
    alert("Opening reframing exercise - this would navigate to reframing page")
  }

  const handleEmergencyJournal = () => {
    alert("Opening emergency journal - this would navigate to emergency journaling page")
  }

  const handleThoughtPattern = (patternId: number) => {
    alert(`Opening full CBT report for pattern ${patternId} - this would navigate to insights page`)
  }

  const handlePanicButton = () => {
    setShowPanicModal(true)
  }

  const handlePanicOption = (option: string) => {
    setShowPanicModal(false)
    alert(`Starting ${option} - this would open the specific exercise`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
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
        <div className="text-sm font-medium">12:51</div>
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
      <div className="flex flex-col min-h-[calc(100vh-140px)] px-6 relative z-10 pb-20">
        {/* Header with app logo */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="text-white font-bold text-lg">REFRAME</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-orange-400 text-sm font-medium">🔥 3</div>
            <div className="text-green-400 text-sm">💚</div>
            <div className="text-blue-400 text-sm">🎯</div>
          </div>
        </div>

        {/* Healing Journey Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium">Healing Journey</span>
            <span className="text-blue-400 font-medium">{healingProgress}%</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${healingProgress}%` }}
            />
          </div>
        </div>

        {/* Weekly Habit Tracker */}
        <div className="mb-8">
          <div className="flex justify-center gap-4">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    weeklyHabits[index]
                      ? "bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-900/30"
                      : "bg-gray-700/50 border border-gray-600"
                  }`}
                >
                  {weeklyHabits[index] ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <Minus className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <span className="text-gray-400 text-xs font-medium">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Central Healing Element */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-2xl border border-gray-600/30">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-center mb-2">You've been healing for:</p>
          <div className="text-white text-4xl font-bold">12d</div>
        </div>

        {/* Reframing Section */}
        <div className="mb-8 space-y-4">
          {/* Let's Start Reframing Button */}
          <button
            onClick={handleReframing}
            className="w-full p-5 bg-gradient-to-r from-blue-800/40 to-teal-800/40 border border-blue-700/50 rounded-2xl text-left transition-all duration-200 hover:from-blue-700/50 hover:to-teal-700/50 hover:border-blue-600/60"
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">🧠</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">Let's Start Reframing</h3>
                <p className="text-gray-300 text-sm italic mb-1">"I don't think I'll ever feel okay again."</p>
                <p className="text-gray-400 text-sm">That thought has been heavy... Let's reflect on that.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
            </div>
          </button>

          {/* Emergency Journal Button */}
          <button
            onClick={handleEmergencyJournal}
            className="w-full p-5 bg-gradient-to-r from-orange-800/40 to-red-800/40 border border-orange-700/50 rounded-2xl text-left transition-all duration-200 hover:from-orange-700/50 hover:to-red-700/50 hover:border-orange-600/60"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">🆘</div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">Emergency Journal</h3>
                <p className="text-gray-400 text-sm">I need someone to talk to</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </button>
        </div>

        {/* CBT Report Snapshot */}
        <div className="mb-8">
          <h4 className="text-gray-300 text-sm font-medium mb-4">Your Current Thought Patterns</h4>
          <div className="space-y-3">
            {thoughtPatterns.map((pattern) => (
              <button
                key={pattern.id}
                onClick={() => handleThoughtPattern(pattern.id)}
                className="w-full p-4 bg-slate-800/40 border border-gray-700/50 rounded-xl text-left transition-all duration-200 hover:bg-slate-700/50 hover:border-gray-600/60"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium text-sm">{pattern.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-700/50 rounded-full h-1.5">
                    <div
                      className={`bg-gradient-to-r ${pattern.color} h-1.5 rounded-full transition-all duration-1000`}
                      style={{ width: `${pattern.progress}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs">{pattern.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Panic Button */}
        <div className="mb-8">
          <button
            onClick={handlePanicButton}
            className="w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-lg shadow-red-900/30 border-2 border-red-500/30"
          >
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Panic Button
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-gray-700/50">
        <div className="flex items-center justify-around py-3 px-6">
          <button className="flex flex-col items-center gap-1 p-2">
            <Home className="w-6 h-6 text-blue-400" />
            <span className="text-xs text-blue-400">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <BarChart3 className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Stats</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <BookOpen className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Journal</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <MessageCircle className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Community</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2">
            <Menu className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Menu</span>
          </button>
        </div>
        <div className="w-32 h-1 bg-white/60 rounded-full mx-auto mb-2"></div>
      </div>

      {/* Panic Modal */}
      {showPanicModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-slate-800 rounded-3xl p-6 w-full max-w-sm border border-gray-700/50">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Take a Deep Breath</h3>
              <p className="text-gray-300 text-sm">Choose what feels right for you right now</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handlePanicOption("Breathing Exercise")}
                className="w-full p-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-white font-medium hover:bg-blue-600/30 transition-colors"
              >
                🫁 Breathing Exercise
              </button>
              <button
                onClick={() => handlePanicOption("Grounding Exercise")}
                className="w-full p-4 bg-green-600/20 border border-green-500/30 rounded-2xl text-white font-medium hover:bg-green-600/30 transition-colors"
              >
                🌱 Grounding Exercise
              </button>
              <button
                onClick={() => handlePanicOption("Emergency Journal")}
                className="w-full p-4 bg-purple-600/20 border border-purple-500/30 rounded-2xl text-white font-medium hover:bg-purple-600/30 transition-colors"
              >
                ✍️ Emergency Journal
              </button>
            </div>

            <button
              onClick={() => setShowPanicModal(false)}
              className="w-full mt-4 p-3 text-gray-400 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
