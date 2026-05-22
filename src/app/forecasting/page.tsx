'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { forecastData, treasuryBalances } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart,
} from 'recharts'

function formatCurrency(val: number) {
  return `$${(val / 1000000).toFixed(1)}M`
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-xl text-xs">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }} className="font-medium">
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  )
}

export default function ForecastingPage() {
  const [scenario, setScenario] = useState('base')
  const totalBalance = treasuryBalances.reduce((s, b) => s + b.balance, 0)
  const latestForecast = forecastData[forecastData.length - 1]
  const accuracy = 94.2
  const mape = 5.8

  const scenarios = ['base', 'bullish', 'bearish']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">Forecasting</h1>
          <p className="text-xs text-muted-foreground">AI-powered cash flow predictions with confidence bands</p>
        </div>
        <div className="flex gap-1">
          {scenarios.map(s => (
            <Button key={s} variant={scenario === s ? 'default' : 'outline'} size="sm" className="capitalize text-xs h-7" onClick={() => setScenario(s)}>
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-[10px] text-muted-foreground uppercase mb-1">Current Balance</div>
          <div className="text-lg font-bold font-mono">{formatCurrency(totalBalance)}</div>
          <div className="text-[10px] text-emerald-400 mt-1">Baseline</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-[10px] text-muted-foreground uppercase mb-1">Forecast (EOM)</div>
          <div className="text-lg font-bold font-mono">{formatCurrency(latestForecast.predicted)}</div>
          <div className="text-[10px] text-emerald-400 mt-1">+{(latestForecast.predicted / totalBalance * 100 - 100).toFixed(1)}%</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-[10px] text-muted-foreground uppercase mb-1">Confidence Band</div>
          <div className="text-lg font-bold font-mono">{formatCurrency(latestForecast.upperBound - latestForecast.lowerBound)}</div>
          <div className="text-[10px] text-yellow-400 mt-1">±{((latestForecast.upperBound - latestForecast.lowerBound) / 2 / latestForecast.predicted * 100).toFixed(1)}%</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-[10px] text-muted-foreground uppercase mb-1">Model Accuracy</div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{accuracy}%</span>
            <Activity className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">MAPE: {mape}%</div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Forecast vs Actual</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={forecastData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeWidth={0.5} />
              <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#71717a' }} tickLine={false} axisLine={false} tickFormatter={v => new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
              <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 9, fill: '#71717a' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="upperBound" stroke="none" fill="url(#confidenceBand)" />
              <Area type="monotone" dataKey="lowerBound" stroke="none" fill="url(#confidenceBand)" />
              <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={2} dot={false} name="Predicted" />
              <Line type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
