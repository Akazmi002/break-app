"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Apple } from "lucide-react"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSignIn = (provider: string) => {
    setIsLoading(provider)
    // Simulate sign-in process
    setTimeout(() => {
      setIsLoading(null)
      alert(`${provider} sign-in would happen here - this is just a demo!`)
    }, 1500)
  }

  const handleSkip = () => {
    setIsLoading("skip")
    setTimeout(() => {
      setIsLoading(null)
      // Navigate to quiz page
      window.location.href = "/quiz"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-800/15 to-indigo-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-900/15 to-slate-900/10 rounded-full blur-3xl"></div>
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
      <div className="flex flex-col items-center justify-between min-h-[calc(100vh-80px)] px-6 relative z-10">
        {/* Illustration area */}
        <div className="flex-1 flex items-center justify-center w-full max-w-sm mx-auto">
          <div className="relative w-80 h-80">
            {/* Glowing heart illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Glow effect */}
              <div className="absolute w-32 h-32 bg-gradient-to-r from-pink-400/30 to-red-400/30 rounded-full blur-xl animate-pulse"></div>

              {/* Heart shape */}
              <div className="relative z-10">
                <svg width="120" height="120" viewBox="0 0 24 24" className="text-pink-400 drop-shadow-lg">
                  <path
                    fill="currentColor"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-pink-300 to-blue-300 rounded-full animate-bounce"
                  style={{
                    left: `${30 + Math.cos((i * 45 * Math.PI) / 180) * 60}px`,
                    top: `${30 + Math.sin((i * 45 * Math.PI) / 180) * 60}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random()}s`,
                  }}
                />
              ))}
            </div>

            {/* Sunrise/healing rays */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 bg-gradient-to-t from-yellow-400/60 to-transparent"
                  style={{
                    height: `${60 + i * 10}px`,
                    left: `${-20 + i * 10}px`,
                    bottom: 0,
                    transform: `rotate(${-20 + i * 10}deg)`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="w-full max-w-sm mx-auto space-y-8">
          {/* Title and subtitle */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">Let's Start the Healing</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Join thousands on a journey to emotional healing. Reclaim your story.
            </p>
          </div>

          {/* Sign-in buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => handleSignIn("Apple")}
              disabled={isLoading !== null}
              className="w-full h-14 bg-transparent hover:bg-white/5 text-white font-medium text-lg rounded-full border-2 border-white/20 transition-all duration-200"
            >
              {isLoading === "Apple" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Apple className="w-5 h-5" fill="currentColor" />
                  Continue with Apple
                </div>
              )}
            </Button>

            <Button
              onClick={() => handleSignIn("Google")}
              disabled={isLoading !== null}
              className="w-full h-14 bg-transparent hover:bg-white/10 text-white font-medium text-lg rounded-full border-2 border-white/30 transition-all duration-200"
            >
              {isLoading === "Google" ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              )}
            </Button>

            <Button
              onClick={handleSkip}
              disabled={isLoading !== null}
              className="w-full h-14 bg-blue-800 hover:bg-blue-700 text-white font-semibold text-lg rounded-full transition-all duration-200 hover:shadow-lg"
            >
              {isLoading === "skip" ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Skip for now
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </div>

          {/* Skip text */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Want to skip this step?{" "}
              <button onClick={handleSkip} className="text-blue-400 hover:text-blue-300 underline">
                Skip
              </button>
            </p>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="mt-8">
          <div className="w-32 h-1 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
