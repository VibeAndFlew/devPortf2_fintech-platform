'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { insights } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Lightbulb, AlertTriangle, TrendingUp, Zap, ArrowRight, Sparkles } from 'lucide-react'

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  opportunity: { icon: <Lightbulb className="h-4 w-4" />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  risk: { icon: <AlertTriangle className="h-4 w-4" />, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  trend: { icon: <TrendingUp className="h-4 w-4" />, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  anomaly: { icon: <Zap className="h-4 w-4" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const hours = Math.floor(diffMs / 3600000)
  if (hours < 24) return `${hours}h ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function InsightsPage() {
  const grouped = {
    opportunity: insights.filter(i => i.type === 'opportunity'),
    risk: insights.filter(i => i.type === 'risk'),
    trend: insights.filter(i => i.type === 'trend'),
    anomaly: insights.filter(i => i.type === 'anomaly'),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">AI Insights</h1>
          <p className="text-xs text-muted-foreground">Intelligence-driven recommendations and alerts</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>{insights.length} insights generated</span>
        </div>
      </div>

      {Object.entries(grouped).map(([type, items]) => {
        const config = typeConfig[type]
        return (
          <div key={type}>
            <div className="flex items-center gap-2 mb-3">
              <span className={cn('p-1 rounded-md', config.bg)}>{config.icon}</span>
              <h2 className="text-sm font-medium capitalize">{type}s</h2>
              <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {items.map((insight, i) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn('rounded-xl border p-4', config.bg)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={cn('text-[10px]', config.color)}>{insight.category}</Badge>
                    <span className="text-[10px] text-muted-foreground">{formatDate(insight.timestamp)}</span>
                  </div>
                  <h3 className="text-sm font-medium mb-1">{insight.title}</h3>
                  <p className="text-[11px] text-muted-foreground mb-3 line-clamp-2">{insight.description}</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-muted-foreground">Impact</span>
                        <span className={cn('font-medium', insight.impact > 70 ? config.color : 'text-foreground')}>{insight.impact}%</span>
                      </div>
                      <Progress value={insight.impact} className={cn('h-1', insight.impact > 70 ? '[&>div]:bg-current' : '')} />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-muted-foreground">Confidence</span>
                        <span className="font-medium">{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-1 [&>div]:bg-emerald-400" />
                    </div>
                  </div>
                  {insight.actionable && (
                    <Button size="sm" variant="ghost" className="mt-3 h-7 text-[11px] w-full gap-1 justify-between">
                      <span>Take Action</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
