export function OrnlLogo({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} aria-label="ORNL Logo">
      <circle cx="50" cy="50" r="45" fill="#00458b" />
      <path
        d="M50 15 C 30 15, 15 30, 15 50 C 15 70, 30 85, 50 85 C 70 85, 85 70, 85 50 C 85 30, 70 15, 50 15 Z M50 25 C 65 25, 75 35, 75 50 C 75 65, 65 75, 50 75 C 35 75, 25 65, 25 50 C 25 35, 35 25, 50 25 Z"
        fill="#d4af37"
      />
      <circle cx="50" cy="50" r="15" fill="#00458b" />
    </svg>
  )
}
