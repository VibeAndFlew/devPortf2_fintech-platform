'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { transactions, type Transaction } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 10

const statusConfig: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
  completed: { variant: 'default', label: 'Completed' },
  pending: { variant: 'secondary', label: 'Pending' },
  failed: { variant: 'destructive', label: 'Failed' },
  flagged: { variant: 'outline', label: 'Flagged' },
}

function formatAmount(amount: number, currency: string) {
  const validCurrencies: Record<string, string> = { USDC: 'USD', BTC: 'USD', GOLD: 'USD' }
  const curr = validCurrencies[currency] || currency
  const prefix = currency === 'BTC' ? '₿' : currency === 'GOLD' ? '👑 ' : ''
  try {
    return prefix + new Intl.NumberFormat('en-US', { style: 'currency', currency: curr, minimumFractionDigits: 0 }).format(amount)
  } catch {
    return `${currency} ${amount.toLocaleString()}`
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function getRiskColor(score: number) {
  if (score < 30) return 'text-emerald-400 bg-emerald-500/10'
  if (score < 60) return 'text-yellow-400 bg-yellow-500/10'
  return 'text-red-400 bg-red-500/10'
}

export default function TransactionsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = transactions.filter(tx => {
    if (search && !tx.reference.toLowerCase().includes(search.toLowerCase()) && !tx.counterparty.toLowerCase().includes(search.toLowerCase())) return false
    if (statusFilter !== 'all' && tx.status !== statusFilter) return false
    if (typeFilter !== 'all' && tx.type !== typeFilter) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const stats = [
    { label: 'Total Transactions', value: transactions.length },
    { label: 'Completed', value: transactions.filter(t => t.status === 'completed').length, color: 'text-emerald-400' },
    { label: 'Pending', value: transactions.filter(t => t.status === 'pending').length, color: 'text-yellow-400' },
    { label: 'Flagged', value: transactions.filter(t => t.status === 'flagged').length, color: 'text-red-400' },
    { label: 'Failed', value: transactions.filter(t => t.status === 'failed').length, color: 'text-destructive' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-bold text-foreground">Transactions</h1>
        <p className="text-xs text-muted-foreground">Monitor and manage all financial transactions</p>
      </div>

      <div className="flex gap-3">
        {stats.map(s => (
          <div key={s.label} className="rounded-lg border border-border bg-card px-4 py-2">
            <div className={cn('text-lg font-bold', s.color || 'text-foreground')}>{s.value}</div>
            <div className="text-[10px] text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by reference or counterparty..."
                className="pl-8 h-8 text-xs"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase w-8"></th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Reference</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Type</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Amount</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Counterparty</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Date</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Risk</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paged.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn('border-b border-border/50 transition-colors hover:bg-accent/5 cursor-pointer', i % 2 === 0 ? '' : 'bg-muted/20')}
                    onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
                  >
                    <td className="py-2.5 px-4">{expandedId === tx.id ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}</td>
                    <td className="py-2.5 px-4 font-mono text-[10px] text-muted-foreground">{tx.reference}</td>
                    <td className="py-2.5 px-4 capitalize">{tx.type}</td>
                    <td className="py-2.5 px-4 font-mono font-medium">{formatAmount(tx.amount, tx.currency)}</td>
                    <td className="py-2.5 px-4"><Badge variant={statusConfig[tx.status]?.variant || 'secondary'} className="text-[10px]">{statusConfig[tx.status]?.label || tx.status}</Badge></td>
                    <td className="py-2.5 px-4 text-muted-foreground truncate max-w-[140px]">{tx.counterparty}</td>
                    <td className="py-2.5 px-4 text-muted-foreground font-mono text-[10px]">{formatDate(tx.date)}</td>
                    <td className="py-2.5 px-4"><span className={cn('px-1.5 py-0.5 rounded text-[10px] font-mono font-medium', getRiskColor(tx.riskScore))}>{tx.riskScore}</span></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <span className="text-[10px] text-muted-foreground">Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page <= 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="h-3 w-3" /></Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Button key={p} variant={page === p ? 'default' : 'ghost'} size="icon" className="h-7 w-7 text-[11px]" onClick={() => setPage(p)}>{p}</Button>
                ))}
                <Button variant="ghost" size="icon" className="h-7 w-7" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="h-3 w-3" /></Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
