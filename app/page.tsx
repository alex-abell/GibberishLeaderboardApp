"use client"

import { useState } from "react"
import { Leaderboard } from "@/components/leaderboard"
import { Header } from "@/components/header"
import { X } from "lucide-react"

export default function Home() {
  const [showThanks, setShowThanks] = useState(true)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header currentPage="home" />

      <main className="sc-container py-8 flex-grow">
        {/* Special thanks banner with close button */}
        {showThanks && (
          <div className="sc-alert mb-8 border-l-4 border-sc-secondary bg-sc-light dark:bg-sc-primary/20 p-4 rounded-r-md relative">
            <button
              onClick={() => setShowThanks(false)}
              className="absolute top-2 right-2 text-sc-primary hover:text-sc-secondary transition-colors"
              aria-label="Close banner"
            >
              <X size={18} />
            </button>
            <div className="flex items-start pr-6">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-sc-secondary">Special Thanks</h3>
                <div className="mt-1 text-sm text-sc-text dark:text-gray-300">
                  <p>
                    Huge shoutout to the coolest boss in the lab, Jay Eckles, for recognizing the value of{" "}
                    <a
                      href="https://www.linkedin.com/pulse/you-plorking-hard-hardly-alexander-abell"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sc-secondary hover:underline font-medium"
                    >
                      plorking (playing and working)
                    </a>
                    !
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Leaderboard />
      </main>

      <footer className="bg-sc-primary text-white py-4 border-t border-white/10">
        <div className="sc-container flex flex-col space-y-2">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>ORNL Application Development &copy; {new Date().getFullYear()}</p>
            <p className="text-xs opacity-70 mt-2 md:mt-0">Built in 37 minutes and 47 seconds with AI assistance</p>
          </div>

          {/* Badge section with updated badges */}
          <div className="footer-badges">
            <a
              href="https://openai.com"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:opacity-80 transition-opacity"
              title="Made with AI"
            >
              <img src="/badges/Made_with_badge.svg" alt="Made with AI" height="20" />
            </a>
            <a
              href="https://chat.openai.com"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:opacity-80 transition-opacity"
              title="Prompted by ChatGPT"
            >
              <img src="/badges/Prompted_by_badge.svg" alt="Prompted by ChatGPT" height="20" />
            </a>
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:opacity-80 transition-opacity"
              title="Prototyped in v0"
            >
              <img src="/badges/Prototyped_in_badge.svg" alt="Prototyped in v0" height="20" />
            </a>
            <a
              href="https://www.anthropic.com/index/claude"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:opacity-80 transition-opacity"
              title="Refined by Claude"
            >
              <img src="/badges/Refined_by_badge.svg" alt="Refined by Claude" height="20" />
            </a>
            <a
              href="https://linkedin.com/in/AlexAbell"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:opacity-80 transition-opacity"
              title="Produced by Alex Abell"
            >
              <img src="/badges/Produced_by_badge.svg" alt="Produced by Alex Abell" height="20" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
