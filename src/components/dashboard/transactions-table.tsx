'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { transactions, type Transaction } from '@/lib/mock-data'
import { Badge } from '@/components/ui/badge'
import { ArrowUpDown } from 'lucide-react'

const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  completed: { variant: 'default' },
  pending: { variant: 'secondary' },
  failed: { variant: 'destructive' },
  flagged: { variant: 'outline' },
}

const typeIcons: Record<string, string> = {
  payment: '💳',
  transfer: '🔄',
  deposit: '📥',
  withdrawal: '📤',
}

function getRiskColor(score: number) {
  if (score < 30) return 'text-emerald-400'
  if (score < 60) return 'text-yellow-400'
  return 'text-red-400'
}

function formatAmount(amount: number, currency: string) {
  const validCurrencies: Record<string, string> = { USDC: 'USD', BTC: 'USD', GOLD: 'USD' }
  const curr = validCurrencies[currency] || currency
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, minimumFractionDigits: 0 }).format(amount)
  } catch {
    return `${currency} ${amount.toLocaleString()}`
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function TransactionsTable({ data = transactions }: { data?: Transaction[] }) {
  const [sortField, setSortField] = useState<keyof Transaction>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: keyof Transaction) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('desc') }
  }

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortField]
    const bVal = b[sortField]
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }
    return sortDir === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal)
  })

  const columns: { key: keyof Transaction; label: string; sortable?: boolean }[] = [
    { key: 'reference', label: 'Reference', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'counterparty', label: 'Counterparty', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'riskScore', label: 'Risk' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full overflow-x-auto"
    >
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            {columns.map(col => (
              <th
                key={col.key}
                className={cn(
                  'text-left py-3 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider',
                  col.sortable && 'cursor-pointer hover:text-foreground transition-colors',
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortField === col.key && (
                    <ArrowUpDown className={cn('h-3 w-3', sortDir === 'asc' && 'rotate-180')} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.slice(0, 8).map((tx, i) => (
            <motion.tr
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                'border-b border-border/50 transition-colors hover:bg-accent/5',
                i % 2 === 0 ? 'bg-transparent' : 'bg-muted/20',
              )}
            >
              <td className="py-2.5 px-3 font-mono text-[11px] text-muted-foreground">{tx.reference}</td>
              <td className="py-2.5 px-3">
                <span className="flex items-center gap-1">
                  <span>{typeIcons[tx.type]}</span>
                  <span className="capitalize">{tx.type}</span>
                </span>
              </td>
              <td className="py-2.5 px-3 font-mono font-medium">{formatAmount(tx.amount, tx.currency)}</td>
              <td className="py-2.5 px-3">
                <Badge variant={statusConfig[tx.status]?.variant || 'secondary'} className="text-[10px] px-1.5 py-0">
                  {tx.status}
                </Badge>
              </td>
              <td className="py-2.5 px-3 text-muted-foreground truncate max-w-[120px]">{tx.counterparty}</td>
              <td className="py-2.5 px-3 text-muted-foreground font-mono text-[10px]">{formatDate(tx.date)}</td>
              <td className="py-2.5 px-3">
                <span className={cn('font-mono font-medium', getRiskColor(tx.riskScore))}>
                  {tx.riskScore}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}
