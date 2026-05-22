'use client'

import { motion } from 'framer-motion'
import { riskItems } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function getRiskColor(score: number) {
  if (score < 30) return { text: 'text-emerald-400', ring: 'border-emerald-400' }
  if (score < 60) return { text: 'text-yellow-400', ring: 'border-yellow-400' }
  return { text: 'text-red-400', ring: 'border-red-400' }
}

export function RiskGauge({ height = 300 }: { height?: number }) {
  const avgScore = Math.round(riskItems.reduce((sum, r) => sum + r.score, 0) / riskItems.length)
  const color = getRiskColor(avgScore)
  const openCount = riskItems.filter(r => r.status === 'open').length
  const criticalCount = riskItems.filter(r => r.severity === 'critical').length
  const highCount = riskItems.filter(r => r.severity === 'high').length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full gap-4 py-4"
    >
      <div className="relative flex items-center justify-center">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="68" fill="none" stroke="#1e293b" strokeWidth="8" />
          <motion.circle
            cx="80" cy="80" r="68"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${(avgScore / 100) * 427} 427`}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            className={cn('transition-colors', color.text)}
            initial={{ strokeDasharray: '0 427' }}
            animate={{ strokeDasharray: `${(avgScore / 100) * 427} 427` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <text x="80" y="72" textAnchor="middle" className="fill-foreground text-3xl font-bold">{avgScore}</text>
          <text x="80" y="92" textAnchor="middle" className="fill-muted-foreground text-xs">Avg Risk Score</text>
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full px-4">
        <div className="text-center">
          <div className="text-lg font-bold text-red-400">{criticalCount}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Critical</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-400">{highCount}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">High</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-emerald-400">{openCount}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Open</div>
        </div>
      </div>
    </motion.div>
  )
}
