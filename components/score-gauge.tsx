'use client'

const RADIUS = 56
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type Props = { score: number }

export default function ScoreGauge({ score }: Props) {
  const progress = (score / 100) * CIRCUMFERENCE
  const color = score >= 90 ? '#00C897' : score >= 50 ? '#FF9F1C' : '#ef4444'

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="160" height="160" viewBox="0 0 160 160" aria-label={`Score: ${score} de 100`}>
        <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="12" />
        <circle
          cx="80" cy="80" r={RADIUS} fill="none"
          stroke={color} strokeWidth="12"
          strokeDasharray={`${progress} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center leading-tight">
        <span className="text-4xl font-black" style={{ color }}>{score}</span>
        <span className="text-sm text-gray-400 font-medium">/ 100</span>
      </div>
    </div>
  )
}
