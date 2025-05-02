import { Leaderboard } from "@/components/leaderboard"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#00458b] text-white py-6 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center">
              <span className="text-[#d4af37]">GIB</span>SCORE
            </h1>
            <p className="text-sm md:text-base italic mt-1">Where Enterprise Gibberish Becomes Crystal Clear</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <Leaderboard />
      </main>

      <footer className="bg-[#00458b] text-white py-4 px-4 md:px-6 mt-auto">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p>ORNL Application Development &copy; {new Date().getFullYear()}</p>
          <p className="text-xs opacity-70 mt-2 md:mt-0">Built in minutes with AI assistance</p>
        </div>
      </footer>
    </div>
  )
}
