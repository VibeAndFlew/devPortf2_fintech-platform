'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { auditLogs, revenueMetrics, riskItems } from '@/lib/mock-data'
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle } from 'lucide-react'

function Switch({ checked, defaultChecked, onCheckedChange, id }: { checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (v: boolean) => void; id?: string }) {
  const isChecked = checked ?? defaultChecked ?? false
  return (
    <button
      id={id}
      role="switch"
      aria-checked={isChecked}
      onClick={() => onCheckedChange?.(!isChecked)}
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        isChecked ? 'bg-emerald-500' : 'bg-input',
      )}
    >
      <span className={cn('pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform', isChecked ? 'translate-x-4' : 'translate-x-0')} />
    </button>
  )
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function ProfilePage() {
  const userActivity = auditLogs.filter(e => e.actor === 'v.buldeo@aegis.io')
  const totalActions = userActivity.length
  const successRate = Math.round((userActivity.filter(e => e.status === 'success').length / totalActions) * 100)
  const resolvedRisk = riskItems.filter(r => r.status === 'resolved' || r.status === 'mitigated').length

  const stats = [
    { label: 'Actions Taken', value: totalActions.toString(), icon: <Activity className="h-3.5 w-3.5 text-blue-400" /> },
    { label: 'Success Rate', value: `${successRate}%`, icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> },
    { label: 'Risks Resolved', value: resolvedRisk.toString(), icon: <TrendingDown className="h-3.5 w-3.5 text-emerald-400" /> },
    { label: 'Avg Response', value: '1.2m', icon: <Clock className="h-3.5 w-3.5 text-yellow-400" /> },
  ]

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-lg font-bold text-foreground">Profile</h1>
        <p className="text-xs text-muted-foreground">Your account information and activity</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg bg-emerald-500/20 text-emerald-400">VB</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-bold">Vibhanshu Buldeo</h2>
              <p className="text-xs text-muted-foreground">v.buldeo@aegis.io</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-400">Chief Treasury Officer</Badge>
                <Badge variant="outline" className="text-[10px]">Finance Department</Badge>
              </div>
            </div>
            <Badge variant="default" className="text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted-foreground uppercase">{stat.label}</span>
              {stat.icon}
            </div>
            <div className="text-xl font-bold">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {userActivity.slice(0, 8).map((entry, i) => (
                <div key={entry.id} className={cn('flex items-start gap-3 px-4 py-3', i % 2 === 0 ? '' : 'bg-muted/10')}>
                  <div className={cn(
                    'p-1 rounded-full mt-0.5',
                    entry.status === 'success' ? 'bg-emerald-500/10' : entry.status === 'failure' ? 'bg-red-500/10' : 'bg-yellow-500/10',
                  )}>
                    {entry.status === 'success' ? <CheckCircle className="h-3 w-3 text-emerald-400" /> :
                     entry.status === 'failure' ? <XCircle className="h-3 w-3 text-red-400" /> :
                     <Activity className="h-3 w-3 text-yellow-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate">{entry.details}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{formatDate(entry.timestamp)}</div>
                  </div>
                  <Badge variant={entry.status === 'success' ? 'default' : entry.status === 'failure' ? 'destructive' : 'secondary'} className="text-[9px] px-1 py-0 h-4">{entry.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Notification Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive updates via email' },
              { label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
              { label: 'Daily Digest', desc: 'End-of-day summary report' },
              { label: 'Push Notifications', desc: 'In-app push notifications' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                </div>
                <Switch defaultChecked={i < 3} id={`pref-${i}`} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
