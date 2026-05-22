'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowLeftRight, Shield, TrendingUp, LineChart, Timer, Dot } from 'lucide-react'
import { KPICard } from '@/components/dashboard/kpi-card'
import { RevenueChart } from '@/components/charts/revenue-chart'
import { TransactionsTable } from '@/components/dashboard/transactions-table'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { RiskGauge } from '@/components/charts/risk-gauge'
import { SkeletonCard, SkeletonChart, SkeletonTable, SkeletonList } from '@/components/skeletons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { transactions, treasuryBalances, revenueMetrics, riskItems } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const totalTreasury = treasuryBalances.reduce((s, b) => s + b.balance, 0)
  const activeTransactions = transactions.filter(t => t.status === 'pending').length
  const avgRisk = Math.round(riskItems.reduce((s, r) => s + r.score, 0) / riskItems.length)
  const latestRevenue = revenueMetrics[revenueMetrics.length - 1]
  const pendingSettlements = transactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0)
  const forecastAccuracy = 94.2

  const kpis = [
    { label: 'Total Treasury', value: `$${(totalTreasury / 1000000).toFixed(1)}M`, trend: 3.2, trendLabel: 'vs yesterday', icon: <Wallet className="h-4 w-4" />, variant: 'default' as const },
    { label: 'Active Transactions', value: activeTransactions.toString(), trend: -2, trendLabel: 'vs yesterday', icon: <ArrowLeftRight className="h-4 w-4" />, variant: 'warning' as const },
    { label: 'Risk Score', value: avgRisk.toString(), suffix: '/100', trend: -5, trendLabel: 'vs yesterday', icon: <Shield className="h-4 w-4" />, variant: avgRisk > 60 ? 'danger' as const : avgRisk > 30 ? 'warning' as const : 'success' as const },
    { label: 'Revenue MTD', value: `$${(latestRevenue.revenue / 1000000).toFixed(1)}M`, trend: latestRevenue.margin, trendLabel: 'margin', icon: <TrendingUp className="h-4 w-4" />, variant: 'success' as const },
    { label: 'Forecast Accuracy', value: `${forecastAccuracy}%`, trend: 1.2, trendLabel: 'vs last month', icon: <LineChart className="h-4 w-4" />, variant: 'default' as const },
    { label: 'Pending Settlements', value: `$${(pendingSettlements / 1000000).toFixed(1)}M`, trend: 8, trendLabel: 'vs yesterday', icon: <Timer className="h-4 w-4" />, variant: 'warning' as const },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <Dot className="h-3 w-3 text-emerald-400" />
            <span className="text-emerald-400">System Status: All Nominal</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpis.map((kpi, i) => (
          loading ? <SkeletonCard key={i} /> : <KPICard key={i} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <SkeletonChart /> : <RevenueChart />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <SkeletonTable rows={5} /> : <TransactionsTable />}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Risk Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? <SkeletonChart /> : <RiskGauge />}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[320px]">
              {loading ? <SkeletonList items={5} /> : <ActivityFeed />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
