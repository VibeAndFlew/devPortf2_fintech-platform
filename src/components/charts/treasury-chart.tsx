'use client'

import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart,
} from 'recharts'
import { treasuryBalances } from '@/lib/mock-data'

const formatCurrency = (val: number) => `$${(val / 1000000).toFixed(1)}M`

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

export function TreasuryChart({ height = 300 }: { height?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={treasuryBalances} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" strokeWidth={0.5} />
          <XAxis dataKey="asset" tick={{ fontSize: 10, fill: '#71717a' }} tickLine={false} axisLine={false} />
          <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 10, fill: '#71717a' }} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="balance" fill="#10b981" radius={[4, 4, 0, 0]} name="Balance" barSize={24} />
          <Bar dataKey="pending" fill="#eab308" radius={[4, 4, 0, 0]} name="Pending" barSize={24} />
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
