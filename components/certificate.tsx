"use client"

import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface CertificateProps {
  recipientName: string
  tableNumber: string
  rank: string
}

export function Certificate({ recipientName, tableNumber, rank }: CertificateProps) {
  // Debug: Log when props change
  useEffect(() => {
    console.log("Certificate rendered with name:", recipientName)
  }, [recipientName, tableNumber, rank])

  return (
    <div className="certificate-container w-full h-full">
      <div className="certificate relative bg-white rounded-lg shadow-lg aspect-[1.414/1] overflow-hidden">
        {/* Certificate Background Image - Updated with new version */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/certificate.jpg-jzOyDtVHiToUGJFFLpct5zmjE60P8y.jpeg"
            alt="Certificate of Distorted Linguistic Mastery"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Recipient Name Overlay - Fixed positioning and always black text */}
        <div className="absolute inset-0 flex flex-col items-center pointer-events-none">
          {/* Name container with perfect positioning */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-[70%] text-center"
            style={{
              top: "calc(39.5% + 8px)",
              textShadow: "1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white",
              zIndex: 10,
            }}
          >
            <p
              className={cn("text-2xl md:text-3xl lg:text-4xl font-bold font-serif", !recipientName && "opacity-50")}
              style={{ color: "#000000" }} // Force black color regardless of theme
            >
              {recipientName || "RECIPIENT NAME"}
            </p>
          </div>

          {/* Debug overlay - only visible during development */}
          {process.env.NODE_ENV === "development" && (
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs p-2 rounded">
              Debug: Name="{recipientName}", Table={tableNumber}, Rank={rank}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
