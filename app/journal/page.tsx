"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, BrainCircuit, ChevronRight, Heart, Zap, RefreshCw } from "lucide-react"

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

export default function JournalPage() {
  const router = useRouter()
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])

  // Mock data for demonstration
  const mockJournalEntries: JournalEntry[] = [
    {
      id: 1,
      date: "2025-01-15T10:00:00Z",
      title: "Feeling Overwhelmed at Work",
      preview:
        "Today's meeting was intense. I felt like I couldn't keep up and that everyone else knew more than I did. It's a familiar feeling...",
      negativeThoughtPattern: "Catastrophizing",
      sessionType: "Reframing",
      fullContent: [
        {
          insight:
            "It seems you're jumping to the worst-case scenario, a pattern known as Catastrophizing. When we catastrophize, we imagine the most extreme negative outcome without considering more realistic possibilities.",
          question: "What is a more realistic, less catastrophic outcome of this situation at work?",
          userResponse:
            "I guess a more realistic outcome is that I'll get some feedback on my presentation, and I can use it to improve for next time. It's unlikely I'll be fired over one meeting where I felt unprepared.",
        },
        {
          insight:
            "That's a much more balanced perspective. By separating the event from the catastrophic fear, you regain control over your emotional response.",
          question: "What's one small, concrete step you can take based on this new perspective?",
          userResponse:
            "I can schedule a brief chat with my manager to ask for specific feedback. That feels proactive instead of just worrying about what might happen.",
        },
      ],
    },
    {
      id: 2,
      date: "2025-01-12T18:30:00Z",
      title: "A Misunderstanding with a Friend",
      preview:
        "I had a small disagreement with Sarah. My mind immediately jumped to the worst conclusion: our friendship is over. I need to reframe this.",
      negativeThoughtPattern: "Mind Reading",
      sessionType: "Emergency",
      fullContent: [
        {
          insight:
            "You're assuming you know what Sarah is thinking without any real evidence. This is called Mind Reading, and it often leads us to negative conclusions that aren't based in reality.",
          question: "What evidence do you actually have about what Sarah is thinking or feeling?",
          userResponse:
            "Honestly, I don't have much evidence. She seemed a bit quiet after our conversation, but that could be because she was tired or thinking about something else entirely. I'm just assuming the worst.",
        },
        {
          insight:
            "Exactly. You're filling in the gaps with negative assumptions. True friends can disagree and still maintain their friendship.",
          question: "How might you approach Sarah to clarify the situation instead of assuming?",
          userResponse:
            "I could send her a simple text asking if we're okay, or maybe suggest we grab coffee this weekend. A direct, caring approach is probably better than letting my mind spiral.",
        },
      ],
    },
    {
      id: 3,
      date: "2025-01-10T14:15:00Z",
      title: "Doubting My Career Choice",
      preview:
        "Seeing my college friends' success on social media made me question everything. Am I on the right path? Should I have chosen differently?",
      negativeThoughtPattern: "All-or-Nothing Thinking",
      sessionType: "Reframing",
      fullContent: [
        {
          insight:
            "You're viewing your career in black and white terms - either you're successful or you're not, either you made the right choice or the wrong one. Life and careers are much more nuanced than that.",
          question: "What are some positive aspects of your current career path that you might be overlooking?",
          userResponse:
            "Well, I do enjoy the creative aspects of my work, and I've learned a lot in the past year. I also have good work-life balance, which some of my friends don't have despite their higher salaries.",
        },
      ],
    },
  ]

  useEffect(() => {
    const savedEntries = localStorage.getItem("reframe-journal-entries")
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
          ...entry,
          sessionType: entry.sessionType || "Reframing",
          negativeThoughtPattern: entry.negativeThoughtPattern || "General Pattern",
        }))
        setJournalEntries(parsedEntries)
      } catch (error) {
        console.error("Error parsing journal entries:", error)
        setJournalEntries(mockJournalEntries)
      }
    } else {
      setJournalEntries(mockJournalEntries)
    }
  }, [])

  const timeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  const handleEntryClick = (entryId: number) => {
    router.push(`/journal/${entryId}`)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <AnimatedStars />

      <header className="sticky top-0 z-20 bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Link
            href="/dashboard"
            className="p-2 rounded-full hover:bg-slate-800/60 transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-semibold tracking-wider">Journal</h1>
          <Link
            href="/reframe"
            className="p-2 rounded-full hover:bg-slate-800/60 transition-colors"
            aria-label="New entry"
          >
            <Plus className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-8 max-w-3xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Your Healing Journey</h2>
          <p className="text-gray-400 mt-2 max-w-md mx-auto">A collection of your reflections and breakthroughs.</p>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto" />
        </div>

        {journalEntries.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-12">
              <Heart className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Your Journey Begins Here</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start your first reframing session to begin building your personal collection of insights and
                breakthroughs.
              </p>
              <Link
                href="/reframe"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              >
                <Plus className="w-5 h-5" />
                Start Your First Entry
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {journalEntries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => handleEntryClick(entry.id)}
                className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 text-left group"
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm rounded-full px-3 py-1 bg-blue-900/50 border border-blue-500/30">
                      <BrainCircuit className="w-4 h-4 text-blue-400" />
                      <span className="font-semibold text-blue-300">{entry.negativeThoughtPattern}</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm rounded-full px-3 py-1 ${
                        entry.sessionType === "Emergency"
                          ? "bg-amber-900/50 border-amber-500/30"
                          : "bg-teal-900/50 border-teal-500/30"
                      }`}
                    >
                      {entry.sessionType === "Emergency" ? (
                        <Zap className="w-4 h-4 text-amber-400" />
                      ) : (
                        <RefreshCw className="w-4 h-4 text-teal-400" />
                      )}
                      <span
                        className={`font-semibold ${
                          entry.sessionType === "Emergency" ? "text-amber-300" : "text-teal-300"
                        }`}
                      >
                        {entry.sessionType} Session
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{timeAgo(entry.date)}</p>
                  <h3 className="text-white font-semibold text-xl tracking-wide mb-3">{entry.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed tracking-wide line-clamp-2">{entry.preview}</p>
                  <div className="flex justify-end items-center mt-4">
                    <span className="text-blue-400 font-medium text-sm">View History</span>
                    <ChevronRight className="w-5 h-5 text-blue-400 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
