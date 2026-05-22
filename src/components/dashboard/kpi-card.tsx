'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string
  prefix?: string
  suffix?: string
  trend?: number
  trendLabel?: string
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

export function KPICard({
  label, value, prefix, suffix, trend, trendLabel, icon,
  variant = 'default', className,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState('')
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''))
  const isUp = trend !== undefined && trend >= 0
  const isDown = trend !== undefined && trend < 0

  const variantStyles = {
    default: 'border-border',
    success: 'border-emerald-500/20',
    warning: 'border-yellow-500/20',
    danger: 'border-red-500/20',
  }

  useEffect(() => {
    if (isNaN(numericValue)) {
      setDisplayValue(value)
      return
    }
    let current = 0
    const target = numericValue
    const duration = 800
    const steps = 30
    const increment = target / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, target)
      const formatted = new Intl.NumberFormat('en-US', {
        style: value.startsWith('$') ? 'currency' : 'decimal',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(current)
      setDisplayValue(prefix || value.startsWith('$') ? `${prefix || '$'}${formatted.replace('$', '')}` : formatted)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, numericValue, prefix])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'rounded-xl border bg-card/50 backdrop-blur-sm p-4 hover:bg-card/80 transition-colors',
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>
      <div className="text-2xl font-bold tracking-tight text-foreground mb-1">
        {displayValue || value}
        {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
      </div>
      {trend !== undefined && (
        <div className="flex items-center gap-1.5">
          {isUp && <TrendingUp className="h-3 w-3 text-emerald-400" />}
          {isDown && <TrendingDown className="h-3 w-3 text-red-400" />}
          <span className={cn('text-xs font-medium', isUp ? 'text-emerald-400' : isDown ? 'text-red-400' : 'text-muted-foreground')}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          {trendLabel && <span className="text-[10px] text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </motion.div>
  )
}
