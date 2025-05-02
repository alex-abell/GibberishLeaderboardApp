"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowUpDown, Award } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import confetti from "canvas-confetti"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Update the Team type to remove name and add cards
type Team = {
  rank: number
  table: number
  score: number
}

// Replace the initialTeams array with the card count data
const initialTeams: Team[] = [
  { rank: 1, table: 16, score: 117 },
  { rank: 2, table: 19, score: 83 },
  { rank: 3, table: 1, score: 82 },
  { rank: 4, table: 6, score: 80 },
  { rank: 5, table: 2, score: 75 }, // Table 2/11
  { rank: 6, table: 17, score: 73 },
  { rank: 7, table: 4, score: 68 },
  { rank: 8, table: 10, score: 68 },
  { rank: 9, table: 9, score: 64 },
  { rank: 10, table: 20, score: 62 },
  { rank: 11, table: 18, score: 60 },
  { rank: 12, table: 5, score: 57 },
  { rank: 13, table: 13, score: 48 },
  { rank: 14, table: 3, score: 40 },
  { rank: 15, table: 14, score: 40 },
  { rank: 16, table: 8, score: 37 },
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

  // Update the handleClaimAward function to not use team name
  const handleClaimAward = (team: Team) => {
    // Trigger confetti animation
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00481F", "#008037", "#E6F4EA"],
    })

    toast({
      title: "Congratulations!",
      description: `Table ${team.table} is claiming their award!`,
    })

    // Navigate to certificate page
    router.push(`/certificate?table=${team.table}&rank=${team.rank}`)
  }

  const getTrophyColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "sc-trophy-gold"
      case 2:
        return "sc-trophy-silver"
      case 3:
        return "sc-trophy-bronze"
      default:
        return ""
    }
  }

  return (
    <Card className="sc-card">
      <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
        <CardTitle className="text-2xl md:text-3xl text-sc-primary dark:text-sc-light">
          IncoHEARent Challenge Leaderboard
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Ranking the best Gibberish Interpreters at ORNL
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="rounded-md border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-sc-primary hover:bg-sc-primary/90">
                <TableHead className="w-[80px] text-white font-medium">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("rank")}
                    className="font-medium flex items-center p-0 h-auto text-white hover:text-sc-light hover:bg-transparent"
                  >
                    Rank
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-white font-medium">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("table")}
                    className="font-medium flex items-center p-0 h-auto text-white hover:text-sc-light hover:bg-transparent"
                  >
                    Table
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right text-white font-medium">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("score")}
                    className="font-medium flex items-center justify-end p-0 h-auto ml-auto text-white hover:text-sc-light hover:bg-transparent"
                  >
                    Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-right text-white font-medium">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team, index) => (
                <TableRow
                  key={`table-${team.table}`}
                  className={
                    team.rank <= 3
                      ? "bg-sc-light/50 dark:bg-sc-primary/20 hover:bg-sc-light dark:hover:bg-sc-primary/30"
                      : index % 2 === 1
                        ? "bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/30"
                  }
                >
                  <TableCell className="font-medium flex items-center">
                    {team.rank <= 3 && <Trophy className={`mr-2 h-5 w-5 ${getTrophyColor(team.rank)}`} />}
                    {team.rank}
                  </TableCell>
                  <TableCell className="font-medium">Table {team.table}</TableCell>
                  <TableCell className="text-right">{team.score} cards</TableCell>
                  <TableCell className="text-right">
                    {team.rank <= 3 && (
                      <Button
                        variant="default"
                        size="sm"
                        className="sc-button-primary"
                        onClick={() => handleClaimAward(team)}
                      >
                        <Award className="mr-1 h-4 w-4" />
                        Claim Award
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
