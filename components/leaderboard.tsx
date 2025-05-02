"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowUpDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"

type Team = {
  rank: number
  table: number
  name: string
  score: number
}

const initialTeams: Team[] = [
  { rank: 1, table: 16, name: "Acronym Avengers", score: 95 },
  { rank: 2, table: 7, name: "Techno Babblers", score: 87 },
  { rank: 3, table: 12, name: "Jargon Jugglers", score: 84 },
  { rank: 4, table: 3, name: "Phrase Decoders", score: 79 },
  { rank: 5, table: 9, name: "Word Wizards", score: 72 },
  { rank: 6, table: 5, name: "Syntax Sleuths", score: 68 },
  { rank: 7, table: 14, name: "Lingo Legends", score: 65 },
  { rank: 8, table: 2, name: "Mumble Miners", score: 58 },
  { rank: 9, table: 10, name: "Dialect Detectives", score: 52 },
  { rank: 10, table: 8, name: "Vocab Voyagers", score: 45 },
]

export function Leaderboard() {
  const [teams, setTeams] = useState<Team[]>([])
  const [sortColumn, setSortColumn] = useState<keyof Team>("rank")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load teams from localStorage or use initial data
    const storedTeams = localStorage.getItem("gibscore-teams")
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams))
    } else {
      setTeams(initialTeams)
      localStorage.setItem("gibscore-teams", JSON.stringify(initialTeams))
    }
  }, [])

  const handleSort = (column: keyof Team) => {
    const newDirection = sortColumn === column && sortDirection === "asc" ? "desc" : "asc"
    setSortColumn(column)
    setSortDirection(newDirection)

    const sortedTeams = [...teams].sort((a, b) => {
      if (a[column] < b[column]) return newDirection === "asc" ? -1 : 1
      if (a[column] > b[column]) return newDirection === "asc" ? 1 : -1
      return 0
    })

    setTeams(sortedTeams)
    localStorage.setItem("gibscore-teams", JSON.stringify(sortedTeams))
  }

  const handleClaimAward = (team: Team) => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })

    toast({
      title: "Congratulations!",
      description: `${team.name} is claiming their award!`,
    })

    // Navigate to certificate page
    router.push(`/certificate?team=${encodeURIComponent(team.name)}&rank=${team.rank}`)
  }

  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-[#d4af37]" // Gold
      case 2:
        return "text-[#C0C0C0]" // Silver
      case 3:
        return "text-[#CD7F32]" // Bronze
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center">IncoHEARent Challenge Leaderboard</h2>
        <p className="text-muted-foreground text-center mt-2">Ranking the best Gibberish Interpreters at ORNL</p>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[80px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("rank")}
                  className="font-medium flex items-center p-0 h-auto"
                >
                  Rank
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("table")}
                  className="font-medium flex items-center p-0 h-auto"
                >
                  Table
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="min-w-[150px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="font-medium flex items-center p-0 h-auto"
                >
                  Team Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("score")}
                  className="font-medium flex items-center justify-end p-0 h-auto ml-auto"
                >
                  Score
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.name} className={team.rank <= 3 ? "bg-muted/20" : ""}>
                <TableCell className="font-medium flex items-center">
                  {team.rank <= 3 && <Trophy className={`mr-2 h-5 w-5 ${getTrophyColor(team.rank)}`} />}
                  {team.rank}
                </TableCell>
                <TableCell>{team.table}</TableCell>
                <TableCell>{team.name}</TableCell>
                <TableCell className="text-right">{team.score}</TableCell>
                <TableCell className="text-right">
                  {team.rank <= 3 && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-[#00458b] hover:bg-[#003366]"
                      onClick={() => handleClaimAward(team)}
                    >
                      Claim Award
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
