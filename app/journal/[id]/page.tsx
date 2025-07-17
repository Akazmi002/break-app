"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BrainCircuit, Sparkles, User, Zap, RefreshCw } from "lucide-react"

// Types
interface Conversation {
  insight: string
  question: string
  userResponse: string
}

interface JournalEntry {
  id: number
  date: string
  title: string
  preview: string
  negativeThoughtPattern: string
  sessionType: "Reframing" | "Emergency"
  fullContent: Conversation[]
}

export default function JournalEntryPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params

  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const savedEntries = localStorage.getItem("reframe-journal-entries")
      if (savedEntries) {
        const entries: JournalEntry[] = JSON.parse(savedEntries)
        const currentEntry = entries.find((e) => e.id.toString() === id)
        setEntry(currentEntry || null)
      }
    }
    setLoading(false)
  }, [id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const AnimatedStars = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 100 }).map((_, i) => (
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
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading your journal entry...</p>
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Entry Not Found</h2>
        <p className="text-gray-400 mb-8">We couldn't find the journal entry you were looking for.</p>
        <Link
          href="/journal"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Back to Journal
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <AnimatedStars />
      <header className="sticky top-0 z-20 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Link
            href="/journal"
            className="p-2 rounded-full hover:bg-slate-800/60 transition-colors"
            aria-label="Back to journal"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-wider truncate">{entry.title}</h1>
            <p className="text-sm text-gray-400">{formatDate(entry.date)}</p>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-8 max-w-3xl mx-auto relative z-10">
        <div className="bg-slate-800/40 border border-gray-700/50 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-sm rounded-full px-3 py-1 bg-blue-900/50 border border-blue-500/30">
              <BrainCircuit className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-blue-300">{entry.negativeThoughtPattern}</span>
            </div>
            <div
              className={`flex items-center gap-2 text-sm rounded-full px-3 py-1 ${entry.sessionType === "Emergency" ? "bg-amber-900/50 border-amber-500/30" : "bg-teal-900/50 border-teal-500/30"}`}
            >
              {entry.sessionType === "Emergency" ? (
                <Zap className="w-4 h-4 text-amber-400" />
              ) : (
                <RefreshCw className="w-4 h-4 text-teal-400" />
              )}
              <span
                className={`font-semibold ${entry.sessionType === "Emergency" ? "text-amber-300" : "text-teal-300"}`}
              >
                {entry.sessionType} Session
              </span>
            </div>
          </div>

          <div className="space-y-8">
            {entry.fullContent.map((convo, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-slate-700">
                {/* AI Insight */}
                <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center ring-4 ring-slate-800">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="mb-6">
                  <p className="text-gray-300 leading-relaxed">{convo.insight}</p>
                </div>
                <div>
                  <p className="text-white font-medium leading-relaxed">{convo.question}</p>
                </div>

                {/* User Response */}
                <div className="absolute -left-4 top-1/2 mt-8 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ring-4 ring-slate-800">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
                <div className="mt-8 pt-8 border-t border-dashed border-slate-700">
                  <blockquote className="text-gray-300 italic leading-relaxed border-l-4 border-blue-400/50 pl-4">
                    {convo.userResponse}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
