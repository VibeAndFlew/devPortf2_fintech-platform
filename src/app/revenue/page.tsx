'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RevenueChart } from '@/components/charts/revenue-chart'
import { revenueMetrics } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Clock, PiggyBank } from 'lucide-react'

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val)
}

function formatNumber(val: number) {
  return new Intl.NumberFormat('en-US').format(val)
}

export default function RevenuePage() {
  const latest = revenueMetrics[revenueMetrics.length - 1]
  const prev = revenueMetrics[revenueMetrics.length - 2]
  const first = revenueMetrics[0]
  const totalRevenue = revenueMetrics.reduce((s, m) => s + m.revenue, 0)
  const mrrGrowth = ((latest.revenue - prev.revenue) / prev.revenue * 100).toFixed(1)
  const arrGrowth = ((latest.arr - prev.arr) / prev.arr * 100).toFixed(1)
  const churnRate = 1.2
  const ltv = 28500
  const cac = 4200
  const paybackPeriod = (cac / (latest.revenue / latest.subscriptions)).toFixed(1)

  const metrics = [
    { label: 'MRR', value: formatCurrency(latest.revenue), trend: parseFloat(mrrGrowth), icon: <DollarSign className="h-4 w-4" /> },
    { label: 'ARR', value: formatCurrency(latest.arr), trend: parseFloat(arrGrowth), icon: <Target className="h-4 w-4" /> },
    { label: 'Monthly Churn', value: `${churnRate}%`, trend: -0.3, icon: <TrendingDown className="h-4 w-4" /> },
    { label: 'Avg LTV', value: formatCurrency(ltv), trend: 5.2, icon: <PiggyBank className="h-4 w-4" /> },
    { label: 'CAC', value: formatCurrency(cac), trend: -2.1, icon: <Users className="h-4 w-4" /> },
    { label: 'Payback Period', value: `${paybackPeriod}mo`, trend: -0.4, icon: <Clock className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-foreground">Revenue Analytics</h1>
        <p className="text-xs text-muted-foreground">SaaS metrics and revenue breakdown</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</span>
              <span className="text-muted-foreground">{m.icon}</span>
            </div>
            <div className="text-lg font-bold">{m.value}</div>
            <div className={cn('flex items-center gap-1 text-xs', m.trend >= 0 ? 'text-emerald-400' : 'text-red-400')}>
              {m.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {m.trend > 0 ? '+' : ''}{m.trend}%
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Revenue vs Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart height={280} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Month</th>
                  <th className="text-right py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Revenue</th>
                  <th className="text-right py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Cost</th>
                  <th className="text-right py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Profit</th>
                  <th className="text-right py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Margin</th>
                  <th className="text-right py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Subs</th>
                </tr>
              </thead>
              <tbody>
                {revenueMetrics.map((m, i) => (
                  <tr key={m.month} className={cn('border-b border-border/50', i % 2 === 0 ? '' : 'bg-muted/20')}>
                    <td className="py-2 px-4 font-mono text-[10px] text-muted-foreground">{m.month}</td>
                    <td className="py-2 px-4 text-right font-mono text-emerald-400">{formatCurrency(m.revenue)}</td>
                    <td className="py-2 px-4 text-right font-mono text-red-400">{formatCurrency(m.cost)}</td>
                    <td className="py-2 px-4 text-right font-mono">{formatCurrency(m.profit)}</td>
                    <td className="py-2 px-4 text-right font-mono">{m.margin.toFixed(1)}%</td>
                    <td className="py-2 px-4 text-right font-mono">{formatNumber(m.subscriptions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
