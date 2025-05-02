"use client"

import { useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Printer, Mail } from "lucide-react"
import { Certificate } from "@/components/certificate"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export default function CertificatePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const certificateRef = useRef<HTMLDivElement>(null)

  const teamName = searchParams.get("team") || ""
  const rank = searchParams.get("rank") || ""

  const [recipientName, setRecipientName] = useState("")
  const [email, setEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return

    setIsGenerating(true)

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`GIBSCORE_Certificate_${recipientName.replace(/\s+/g, "_")}.pdf`)

      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been downloaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your certificate.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleEmailCertificate = () => {
    setIsEmailing(true)

    // Mock email functionality
    setTimeout(() => {
      setIsEmailing(false)
      toast({
        title: "Certificate Emailed",
        description: `Your certificate has been sent to ${email}`,
      })
    }, 1500)
  }

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
          <Link href="/" className="flex items-center text-white hover:text-[#d4af37] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leaderboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Certificate Generator for {teamName}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Recipient Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>

                  <Tabs defaultValue="download" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="download">Download</TabsTrigger>
                      <TabsTrigger value="print">Print</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                    </TabsList>

                    <TabsContent value="download" className="space-y-4">
                      <p className="text-sm text-muted-foreground">Download your certificate as a PDF file.</p>
                      <Button onClick={handleDownloadPDF} disabled={!recipientName || isGenerating} className="w-full">
                        {isGenerating ? "Generating..." : "Download PDF"}
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </TabsContent>

                    <TabsContent value="print" className="space-y-4">
                      <p className="text-sm text-muted-foreground">Print your certificate directly.</p>
                      <Button onClick={handlePrint} disabled={!recipientName} className="w-full">
                        Print Certificate
                        <Printer className="ml-2 h-4 w-4" />
                      </Button>
                    </TabsContent>

                    <TabsContent value="email" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <Button
                        onClick={handleEmailCertificate}
                        disabled={!recipientName || !email || isEmailing}
                        className="w-full"
                      >
                        {isEmailing ? "Sending..." : "Email Certificate"}
                        <Mail className="ml-2 h-4 w-4" />
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-2 print:w-full" ref={certificateRef}>
              <Certificate recipientName={recipientName} teamName={teamName} rank={rank} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#00458b] text-white py-4 px-4 md:px-6 mt-auto print:hidden">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          <p>ORNL Application Development &copy; {new Date().getFullYear()}</p>
          <p className="text-xs opacity-70 mt-2 md:mt-0">Built in minutes with AI assistance</p>
        </div>
      </footer>
    </div>
  )
}
