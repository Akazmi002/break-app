"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"

interface Insight {
  id: number
  label: string
  quotes: string[]
  progress: number
  color: string
  detailedExplanation: {
    title: string
    description: string
    howItWorks: string
    examples: string[]
    impact: string
    reframingApproach: string
  }
}

const insights: Insight[] = [
  {
    id: 1,
    label: "Feeling like you're not enough",
    quotes: ["I tried everything and it still wasn't enough.", "Maybe I'm just too much for people to love."],
    progress: 12,
    color: "from-blue-500 to-indigo-600",
    detailedExplanation: {
      title: "The 'Not Enough' Pattern",
      description:
        "This thought pattern involves a persistent belief that you are fundamentally inadequate, flawed, or lacking in some essential way. It's one of the most common and painful patterns that emerge after relationship difficulties.",
      howItWorks:
        "Your mind interprets relationship challenges as evidence of your inherent unworthiness. Every conflict, every moment of distance, every sign of your partner's unhappiness becomes 'proof' that you're not enough - not attractive enough, not interesting enough, not loveable enough.",
      examples: [
        "Believing that if you were 'better,' the relationship wouldn't have ended",
        "Constantly comparing yourself to others and finding yourself lacking",
        "Feeling like you need to change everything about yourself to be loveable",
        "Interpreting normal relationship challenges as personal failures",
      ],
      impact:
        "This pattern keeps you stuck in a cycle of self-criticism and prevents you from seeing your inherent worth. It can lead to people-pleasing, losing yourself in relationships, and accepting treatment that doesn't honor your value.",
      reframingApproach:
        "We'll work on recognizing that relationship difficulties are complex and rarely about one person being 'not enough.' You'll learn to separate your worth from relationship outcomes and develop a more compassionate, realistic view of yourself.",
    },
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
    detailedExplanation: {
      title: "The Self-Blame Pattern",
      description:
        "This pattern involves taking excessive responsibility for relationship problems and outcomes, often ignoring the complex, two-person nature of relationships. You become the sole villain in your own story.",
      howItWorks:
        "Your mind searches for everything you did 'wrong' and magnifies these moments while minimizing or ignoring your partner's contributions to problems. You replay scenarios endlessly, convinced that if you had just acted differently, everything would be fine.",
      examples: [
        "Obsessing over specific things you said or did during conflicts",
        "Believing the relationship ended solely because of your mistakes",
        "Ignoring your partner's role in relationship difficulties",
        "Feeling responsible for your partner's emotions and reactions",
      ],
      impact:
        "This pattern creates intense guilt and shame that can be paralyzing. It prevents you from learning healthy lessons from the relationship and keeps you stuck in rumination rather than moving toward healing.",
      reframingApproach:
        "We'll explore the reality that relationships involve two people, each contributing to both problems and solutions. You'll learn to take appropriate responsibility while releasing the burden of blame that isn't yours to carry.",
    },
  },
  {
    id: 3,
    label: "Thinking it'll always hurt this much",
    quotes: ["I don't think I'll ever get over this.", "What if no one ever loves me like that again?"],
    progress: 5,
    color: "from-emerald-500 to-teal-600",
    detailedExplanation: {
      title: "The 'Forever Pain' Pattern",
      description:
        "This pattern involves the belief that your current emotional pain is permanent and that you'll never recover or find love again. It's your mind's attempt to protect you from future hurt by assuming the worst.",
      howItWorks:
        "When you're in intense emotional pain, your brain struggles to imagine feeling differently. The current moment feels eternal, and your mind projects this pain indefinitely into the future, creating a sense of hopelessness.",
      examples: [
        "Believing you'll never feel happy or whole again",
        "Assuming no one will ever love you the way your ex did",
        "Feeling like the pain you're experiencing now will never lessen",
        "Catastrophizing about your romantic future",
      ],
      impact:
        "This pattern can lead to depression, hopelessness, and giving up on future relationships or personal growth. It keeps you trapped in current pain rather than allowing natural healing to occur.",
      reframingApproach:
        "We'll work on understanding that intense emotions are temporary and that healing is a natural process. You'll learn to hold space for current pain while maintaining hope for future growth and connection.",
    },
  },
]

export default function ThoughtPatternDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [insight, setInsight] = useState<Insight | null>(null)
  const [fromPage, setFromPage] = useState<string>("insights")

  useEffect(() => {
    const id = params.id as string
    const foundInsight = insights.find((i) => i.id === Number.parseInt(id))
    setInsight(foundInsight || null)

    // Get the source page from URL params
    const from = searchParams.get("from")
    setFromPage(from || "insights")
  }, [params.id, searchParams])

  const handleBack = () => {
    if (fromPage === "dashboard") {
      window.location.href = "/dashboard"
    } else {
      window.location.href = "/insights"
    }
  }

  if (!insight) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Thought pattern not found</div>
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
            <span className="text-xs text-gray-300">Understanding Patterns</span>
          </div>
        </div>
      </div>

      {/* Detailed content */}
      <div className="px-6 relative z-10 pb-8">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{insight.detailedExplanation.title}</h1>
            <div className={`w-16 h-1 bg-gradient-to-r ${insight.color} rounded-full mx-auto`}></div>
          </div>

          {/* Content sections */}
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-slate-800/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">What is this pattern?</h3>
              <p className="text-gray-300 leading-relaxed">{insight.detailedExplanation.description}</p>
            </div>

            {/* How it works */}
            <div className="bg-slate-800/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">How it works</h3>
              <p className="text-gray-300 leading-relaxed">{insight.detailedExplanation.howItWorks}</p>
            </div>

            {/* Examples */}
            <div className="bg-slate-800/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">Common examples</h3>
              <ul className="space-y-3">
                {insight.detailedExplanation.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{example}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="bg-slate-800/30 border border-gray-700/50 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">Impact on your healing</h3>
              <p className="text-gray-300 leading-relaxed">{insight.detailedExplanation.impact}</p>
            </div>

            {/* Reframing approach */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-600/40 rounded-3xl p-6 backdrop-blur-sm">
              <h3 className="text-white font-semibold text-lg mb-4">Our reframing approach</h3>
              <p className="text-gray-300 leading-relaxed">{insight.detailedExplanation.reframingApproach}</p>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-12 text-center">
            <Button
              onClick={handleBack}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:shadow-lg shadow-blue-900/30"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {fromPage === "dashboard" ? "Back to Dashboard" : "Back to Healing Insights"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
