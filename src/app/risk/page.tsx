'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { RiskGauge } from '@/components/charts/risk-gauge'
import { riskItems } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { AlertTriangle, Shield, Activity, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const severityColor: Record<string, string> = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  high: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  medium: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  low: 'text-muted-foreground bg-muted border-border',
}

const statusColor: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  open: 'destructive',
  investigating: 'secondary',
  mitigated: 'outline',
  resolved: 'default',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function RiskPage() {
  const critical = riskItems.filter(r => r.severity === 'critical')
  const high = riskItems.filter(r => r.severity === 'high')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-foreground">Risk Engine</h1>
        <p className="text-xs text-muted-foreground">Real-time risk monitoring and threat detection</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskGauge height={280} />
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {riskItems.slice(0, 16).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={cn(
                    'rounded-lg border p-2 text-[10px]',
                    item.score > 80 ? 'bg-red-500/20 border-red-500/40' :
                    item.score > 60 ? 'bg-yellow-500/20 border-yellow-500/40' :
                    item.score > 30 ? 'bg-blue-500/10 border-blue-500/30' :
                    'bg-muted/20 border-border',
                  )}
                >
                  <div className="font-medium truncate">{item.category}</div>
                  <div className="text-muted-foreground mt-0.5">{item.score}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Risk Items</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Severity</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Category</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Description</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Score</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Detected</th>
              </tr>
            </thead>
            <tbody>
              {riskItems.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={cn('border-b border-border/50', i % 2 === 0 ? '' : 'bg-muted/20')}
                >
                  <td className="py-2.5 px-4">
                    <Badge variant="outline" className={cn('text-[10px] border', severityColor[item.severity])}>
                      {item.severity}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-4 font-medium">{item.category}</td>
                  <td className="py-2.5 px-4 text-muted-foreground truncate max-w-[300px]">{item.description}</td>
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <Progress value={item.score} className="h-1.5 w-16" />
                      <span className="font-mono text-[10px]">{item.score}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4">
                    <Badge variant={statusColor[item.status]} className="text-[10px] capitalize">{item.status}</Badge>
                  </td>
                  <td className="py-2.5 px-4 text-muted-foreground font-mono text-[10px]">{formatDate(item.detectedAt)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
