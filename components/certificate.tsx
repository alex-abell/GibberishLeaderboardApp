import { cn } from "@/lib/utils"

interface CertificateProps {
  recipientName: string
  teamName: string
  rank: string
}

export function Certificate({ recipientName, teamName, rank }: CertificateProps) {
  const rankText = () => {
    switch (rank) {
      case "1":
        return "GOLD MEDAL"
      case "2":
        return "SILVER MEDAL"
      case "3":
        return "BRONZE MEDAL"
      default:
        return ""
    }
  }

  return (
    <div className="certificate-container w-full h-full">
      <div className="certificate bg-white border-8 border-double border-[#d4af37] p-8 rounded-lg shadow-lg">
        <div className="certificate-header text-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#00458b]">OAK RIDGE NATIONAL LABORATORY</h2>
          <h3 className="text-lg md:text-xl font-semibold text-[#00458b]">
            INFORMATION TECHNOLOGY SERVICES DIRECTORATE
          </h3>
        </div>

        <div className="certificate-title text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#d4af37] tracking-wide">
            CERTIFICATE OF DISTORTED LINGUISTIC MASTERY
          </h1>
          {rankText() && (
            <div className="mt-2 inline-block px-4 py-1 bg-[#00458b] text-white rounded-full text-sm font-bold">
              {rankText()}
            </div>
          )}
        </div>

        <div className="certificate-body text-center mb-8">
          <p className="text-lg mb-2">Awarded to:</p>
          <p className={cn("text-2xl md:text-3xl font-bold mb-6 text-[#00458b]", !recipientName && "text-gray-300")}>
            {recipientName || "RECIPIENT NAME"}
          </p>

          <p className="text-base md:text-lg mb-4 px-4 md:px-8">
            For outstanding achievement in the field of{" "}
            <span className="font-bold">ENTERPRISE GIBBERISH INTERPRETATION</span>, this certificate recognizes your
            uncanny ability to decipher phrases like "<span className="font-bold italic">ITCHY YELL PITA KIT</span>" and
            know what it means: "<span className="font-bold">IT Help Ticket</span>."
          </p>

          <p className="text-base md:text-lg mb-4 px-4 md:px-8">
            Through your mastery of incomprehensible syllables, vague acronyms, and auditory hallucinations that somehow
            produce real answers, you have proven yourself to be the
            <span className="font-bold"> INCOHEARENT Champion</span> of Application Development.
          </p>

          <p className="text-base md:text-lg mb-4 px-4 md:px-8">
            Your official lab title is now:
            <br />
            <span className="font-bold">Gibberish Interpretation Expert (GIE-1)</span>
            <br />
            <span className="text-sm italic">Pay grade pending formal SBMS revision approval.</span>
          </p>
        </div>

        <div className="certificate-footer flex justify-between items-center mt-12 px-4 md:px-12">
          <div className="signature text-center">
            <div className="signature-line border-t-2 border-black w-40 mb-1"></div>
            <p className="font-semibold">Jay Eckles</p>
            <p className="text-sm">Division Director, Application Development</p>
          </div>

          <div className="signature text-center">
            <div className="signature-line border-t-2 border-black w-40 mb-1"></div>
            <p className="font-semibold">Kris Torgerson</p>
            <p className="text-sm">CIO, ITSD</p>
          </div>
        </div>

        <div className="certificate-date text-center mt-8 text-sm text-gray-600">
          {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </div>
  )
}
