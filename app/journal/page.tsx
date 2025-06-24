"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Heart, Plus } from "lucide-react"

interface JournalEntry {
  id: number
  date: string
  title: string
  preview: string
  fullContent: {
    quote?: string
    insight: string
    question: string
    userResponse: string
  }[]
}

export default function JournalPage() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])

  useEffect(() => {
    // Load saved journal entries from localStorage
    const savedEntries = localStorage.getItem("reframe-journal-entries")
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries))
    }
  }, [])

  const handleBack = () => {
    window.location.href = "/dashboard"
  }

  const handleNewEntry = () => {
    window.location.href = "/reframe"
  }

  const handleViewEntry = (entryId: number) => {
    // Navigate to a detailed view of the journal entry
    window.location.href = `/journal/${entryId}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks}w ago`
  }

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
            <ArrowLeft className="w-5 h-5 text-amber-50" />
          </button>
          <div className="text-center">
            <p className="text-stone-600 font-light tracking-wide text-sm">Your Journal</p>
          </div>
          <button
            onClick={handleNewEntry}
            className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center hover:bg-amber-700 transition-all duration-300 shadow-lg"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 relative z-10 pb-8">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-3xl font-light text-stone-800 leading-tight tracking-wide">Your Healing Journal</h1>
            <div className="mt-3 flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-300 rounded-full"></div>
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        {journalEntries.length === 0 ? (
          // Empty state
          <div className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-3xl shadow-2xl border border-stone-200/50 p-12 text-center relative backdrop-blur-sm">
            {/* Decorative corner flourishes */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-stone-300/40 rounded-tl-lg"></div>
            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-stone-300/40 rounded-tr-lg"></div>

            <div className="mb-8">
              <Heart className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <h3 className="text-stone-700 text-xl font-light tracking-wide mb-3">Your journal is waiting</h3>
              <p className="text-stone-500 font-light tracking-wide leading-relaxed max-w-md mx-auto">
                Start your first reframing session to begin capturing your healing journey. Each entry becomes a step
                toward understanding yourself better.
              </p>
            </div>

            <button
              onClick={handleNewEntry}
              className="bg-gradient-to-br from-stone-700 to-stone-800 hover:from-stone-600 hover:to-stone-700 text-white px-8 py-4 rounded-2xl font-medium tracking-wide transition-all duration-300 shadow-lg"
            >
              Start Your First Entry
            </button>

            {/* Decorative bottom flourishes */}
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-stone-300/40 rounded-bl-lg"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-stone-300/40 rounded-br-lg"></div>
          </div>
        ) : (
          // Journal entries list
          <div className="space-y-6">
            {journalEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleViewEntry(entry.id)}
                className="w-full bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-3xl shadow-2xl border border-stone-200/50 p-8 text-left transition-all duration-300 hover:shadow-3xl hover:border-amber-300/50 backdrop-blur-sm relative"
              >
                {/* Decorative corner flourishes */}
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-stone-300/40 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-stone-300/40 rounded-tr-lg"></div>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-stone-500" />
                    <span className="text-stone-600 font-light tracking-wide text-sm">{formatDate(entry.date)}</span>
                  </div>
                  <span className="text-stone-400 font-light text-xs tracking-wide">{getTimeAgo(entry.date)}</span>
                </div>

                <h3 className="text-stone-800 font-medium text-lg tracking-wide mb-3">{entry.title}</h3>

                <div className="relative mb-4">
                  <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-amber-400/30 to-transparent rounded-full"></div>
                  <p className="text-stone-600 font-light leading-relaxed tracking-wide pl-4 line-clamp-3">
                    {entry.preview}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-stone-500 font-light text-sm tracking-wide">
                    {entry.fullContent.length} reflection{entry.fullContent.length !== 1 ? "s" : ""}
                  </span>
                  <div className="text-amber-600 font-medium text-sm tracking-wide">Read more →</div>
                </div>

                {/* Decorative bottom flourishes */}
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-stone-300/40 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-stone-300/40 rounded-br-lg"></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
