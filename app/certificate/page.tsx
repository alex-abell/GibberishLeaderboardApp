"use client"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Printer, ArrowLeft } from "lucide-react"
import { Certificate } from "@/components/certificate"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { Header } from "@/components/header"

export default function CertificatePage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const certificateRef = useRef<HTMLDivElement>(null)

  const tableNumber = searchParams.get("table") || ""
  const rank = searchParams.get("rank") || ""

  const [recipientName, setRecipientName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("download")

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header currentPage="certificate" />

      <main className="sc-container py-8 flex-grow">
        {/* Return to Leaderboard button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-sc-primary hover:text-sc-secondary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Leaderboard
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="sc-card">
            <CardHeader className="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
              <CardTitle className="text-2xl md:text-3xl text-sc-primary dark:text-sc-light">
                Certificate Generator for Table {tableNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sc-primary dark:text-sc-light">
                          Recipient Full Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={recipientName}
                          onChange={(e) => {
                            const newName = e.target.value
                            setRecipientName(newName)
                            console.log("Name updated to:", newName)
                          }}
                          className="border-gray-300 focus:border-sc-secondary focus:ring-sc-secondary"
                          autoComplete="off"
                        />
                      </div>

                      {/* Custom tabs implementation with only Download and Print options */}
                      <div className="w-full">
                        <div className="flex w-full bg-gray-100 dark:bg-gray-800">
                          <button
                            onClick={() => setActiveTab("download")}
                            className={`flex-1 py-2 text-center transition-colors ${
                              activeTab === "download"
                                ? "bg-sc-secondary text-white"
                                : "text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            Download
                          </button>
                          <button
                            onClick={() => setActiveTab("print")}
                            className={`flex-1 py-2 text-center transition-colors ${
                              activeTab === "print" ? "bg-sc-secondary text-white" : "text-gray-600 dark:text-gray-300"
                            }`}
                          >
                            Print
                          </button>
                        </div>

                        <div className="mt-4">
                          {activeTab === "download" && (
                            <div className="space-y-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Download your certificate as a PDF file.
                              </p>
                              <button
                                onClick={handleDownloadPDF}
                                disabled={!recipientName || isGenerating}
                                className="w-full py-2 text-sc-secondary hover:text-white hover:bg-sc-secondary border border-sc-secondary rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isGenerating ? "Generating..." : "Download Certificate"}
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          {activeTab === "print" && (
                            <div className="space-y-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Print your certificate directly.
                              </p>
                              <button
                                onClick={handlePrint}
                                disabled={!recipientName}
                                className="w-full py-2 text-sc-secondary hover:text-white hover:bg-sc-secondary border border-sc-secondary rounded-md transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Print Certificate
                                <Printer className="h-4 w-4 ml-2" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="md:col-span-2 print:w-full" ref={certificateRef}>
                  <Certificate recipientName={recipientName} tableNumber={tableNumber} rank={rank} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-sc-primary text-white py-4 border-t border-white/10 print:hidden">
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
