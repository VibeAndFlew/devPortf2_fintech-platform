'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { auditLogs } from '@/lib/mock-data'
import { ArrowLeftRight, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const actionIcons: Record<string, React.ReactNode> = {
  CREATE: <CheckCircle className="h-3 w-3 text-emerald-400" />,
  MODIFY: <RefreshCw className="h-3 w-3 text-blue-400" />,
  FLAG: <AlertTriangle className="h-3 w-3 text-yellow-400" />,
  FAIL: <XCircle className="h-3 w-3 text-red-400" />,
  ALERT: <AlertTriangle className="h-3 w-3 text-red-400" />,
  TRANSFER: <ArrowLeftRight className="h-3 w-3 text-emerald-400" />,
  SYSTEM: <RefreshCw className="h-3 w-3 text-purple-400" />,
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function ActivityFeed({ limit = 10 }: { limit?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [])

  const recent = auditLogs.slice(0, limit)

  return (
    <ScrollArea className="h-full" ref={scrollRef}>
      <div className="space-y-0.5">
        <AnimatePresence initial={false}>
          {recent.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                'flex items-start gap-2.5 px-3 py-2 rounded-lg transition-colors hover:bg-accent/5',
                i === 0 && 'bg-emerald-500/5',
              )}
            >
              <div className="mt-0.5 shrink-0">
                {actionIcons[entry.action] || <RefreshCw className="h-3 w-3 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium truncate">{entry.details}</span>
                  {i === 0 && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground">{entry.actor}</span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{formatTime(entry.timestamp)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  )
}
