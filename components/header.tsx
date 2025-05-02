"use client"
import { ThemeToggle } from "@/components/theme-toggle"

interface HeaderProps {
  currentPage: "home" | "certificate"
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="sc-header">
      <div className="sc-container">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold text-white">AppDev Gibberish Challenge Results</h1>
              <span className="bg-yellow-500 text-xs font-medium px-2 py-0.5 rounded-full text-black uppercase tracking-wide">
                Prototype
              </span>
            </div>
            <p className="text-xs md:text-sm text-white/80 italic">
              Where Enterprise IT Gibberish Becomes Crystal Clear
            </p>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
