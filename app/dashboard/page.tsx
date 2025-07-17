"use client"

import { useState } from "react"
import { Home, BookOpen, MessageCircle, Menu, Heart, Check, Minus, ChevronRight, ArrowRight } from "lucide-react"

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
  {
    id: 3,
    label: "Thinking it'll always hurt this much",
    progress: 8,
    color: "from-emerald-500 to-teal-600",
  },
]

export default function DashboardPage() {
  const [healingProgress] = useState(20) // This would be dynamic
  const [weeklyHabits] = useState([true, true, true, true, true, true, false]) // true = completed, false = skipped

  const handleJournalNavigation = () => {
    window.location.href = "/journal"
  }

  const handleReframing = () => {
    window.location.href = "/reframe"
  }

  const handleEmergencyJournal = () => {
    window.location.href = "/emergency-journal"
  }

  const handleThoughtPattern = (patternId: number) => {
    // Navigate to dedicated thought pattern page with source tracking
    window.location.href = `/insights/${patternId}?from=dashboard`
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
      <div className="flex flex-col min-h-[calc(100vh-140px)] px-6 relative z-10 pb-24">
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
                <div className="relative">
                  {/* Glowing ring */}
                  <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400/30 to-indigo-500/30 blur-sm animate-pulse"></div>
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
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

        {/* Enhanced CBT Continuation Section */}
        <div className="mb-8 space-y-6">
          {/* CBT Progress Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-600/30 px-6 py-3 rounded-full backdrop-blur-sm mb-4">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"></div>
              <span className="text-blue-300 font-semibold text-sm uppercase tracking-wider">CBT Session Active</span>
              <div
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Your Healing Journey Continues</h3>
            <p className="text-gray-300 text-sm">
              You're making real progress. Let's keep transforming your thoughts together.
            </p>
          </div>

          {/* Current CBT Pattern Card */}
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>

            {/* Pattern Information */}
            <div className="relative z-10 space-y-6">
              {/* Current Pattern Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-orange-900/30 border border-orange-600/40 px-4 py-2 rounded-full mb-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-orange-300 font-bold text-sm">PATTERN 4 OF 8</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Catastrophizing Thoughts</h2>
                <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                  When we imagine the worst possible outcomes and believe they're inevitable
                </p>
              </div>

              {/* Progress Visualization */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <div className="text-lg">🧠</div>
                    </div>
                    <div>
                      <span className="text-white font-semibold text-lg">Pattern Progress</span>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-400 font-bold text-sm">67% Complete</span>
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        <span className="text-gray-400 text-xs">Almost there!</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-blue-400 font-bold text-2xl">67%</div>
                    <div className="text-gray-400 text-xs">of this pattern</div>
                  </div>
                </div>

                {/* Enhanced Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-700/50 rounded-full h-4 overflow-hidden">
                    <div className="relative h-full">
                      <div
                        className="bg-gradient-to-r from-green-500 via-blue-500 to-indigo-600 h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                        style={{ width: "67%" }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  {/* Progress markers */}
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-xs text-gray-500">Start</span>
                    <span className="text-xs text-blue-400 font-medium">Current</span>
                    <span className="text-xs text-gray-500">Complete</span>
                  </div>
                </div>
              </div>

              {/* Compact CTA Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReframing}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/30 hover:scale-105 active:scale-95"
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <div className="text-lg">🌟</div>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-base">Continue Healing</div>
                      <div className="text-blue-200 text-xs font-medium">Transform with CBT</div>
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                </button>
              </div>

              {/* Encouragement Footer */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 bg-green-900/20 border border-green-600/30 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold text-sm">You're doing amazing work</span>
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Journal Button - Simplified */}
          <button
            onClick={handleEmergencyJournal}
            className="w-full p-4 bg-gradient-to-br from-orange-900/40 to-red-900/40 border border-orange-600/30 rounded-2xl text-left transition-all duration-300 hover:from-orange-800/50 hover:to-red-800/50 hover:border-orange-500/50 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="text-lg">🆘</div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Need Immediate Support?</h3>
                  <p className="text-gray-400 text-sm">Emergency journal for overwhelming moments</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-orange-400" />
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

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={handleJournalNavigation}
            className="p-6 bg-gradient-to-br from-amber-800/30 to-orange-800/30 border border-amber-700/50 rounded-2xl text-center transition-all duration-200 hover:from-amber-700/40 hover:to-orange-700/40 hover:border-amber-600/60 hover:scale-105"
          >
            <BookOpen className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">Journal</h3>
            <p className="text-gray-400 text-sm">View your entries</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-purple-800/30 to-violet-800/30 border border-purple-700/50 rounded-2xl text-center transition-all duration-200 hover:from-purple-700/40 hover:to-violet-700/40 hover:border-purple-600/60 hover:scale-105">
            <MessageCircle className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">Community</h3>
            <p className="text-gray-400 text-sm">Connect with others</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-green-800/30 to-emerald-800/30 border border-green-700/50 rounded-2xl text-center transition-all duration-200 hover:from-green-700/40 hover:to-emerald-700/40 hover:border-green-600/60 hover:scale-105">
            <Menu className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold text-lg mb-1">Settings</h3>
            <p className="text-gray-400 text-sm">Customize your app</p>
          </button>

          <button className="p-6 bg-gradient-to-br from-slate-800/30 to-gray-800/30 border border-slate-700/50 rounded-2xl text-center transition-all duration-200 hover:from-slate-700/40 hover:to-gray-700/40 hover:border-slate-600/60 hover:scale-105">
            <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
              <div className="w-6 h-6 bg-slate-400 rounded-full"></div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">More</h3>
            <p className="text-gray-400 text-sm">Additional features</p>
          </button>
        </div>
      </div>

      {/* Bottom Navigation Menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-gray-700/50 z-50">
        <div className="flex items-center justify-around py-2 px-4">
          <button className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50">
            <Home className="w-6 h-6 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">Home</span>
          </button>

          <button
            onClick={handleJournalNavigation}
            className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50 active:scale-95"
          >
            <BookOpen className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Journal</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50">
            <MessageCircle className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Community</span>
          </button>

          <button className="flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-200 hover:bg-slate-800/50">
            <Menu className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Menu</span>
          </button>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
