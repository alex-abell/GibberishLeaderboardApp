export function SolutionCenterLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      aria-label="Solution Center Logo"
    >
      <rect width="100" height="100" rx="20" fill="#008037" />
      <path d="M30 30 L70 30 L70 70 L30 70 Z" fill="none" stroke="white" strokeWidth="6" />
      <path
        d="M40 50 L50 60 L70 40"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
