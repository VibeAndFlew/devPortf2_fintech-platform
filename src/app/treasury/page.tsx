'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TreasuryChart } from '@/components/charts/treasury-chart'
import { treasuryBalances, transactions } from '@/lib/mock-data'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, Send, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const assetIcons: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', BTC: '₿', USDC: '₳', GOLD: '👑',
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val)
}

export default function TreasuryPage() {
  const treasuryTx = transactions.filter(t => ['deposit', 'withdrawal', 'transfer'].includes(t.type)).slice(0, 8)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground">Treasury</h1>
        <Button size="sm" className="gap-1.5">
          <Send className="h-3.5 w-3.5" /> Quick Transfer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {treasuryBalances.map((b, i) => (
          <motion.div
            key={b.asset}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold">{assetIcons[b.asset] || b.asset}</span>
              <span className={cn('text-xs font-medium', b.changePct >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                {b.changePct >= 0 ? '+' : ''}{b.changePct.toFixed(2)}%
              </span>
            </div>
            <div className="text-lg font-bold font-mono">{formatCurrency(b.balance)}</div>
            <div className="text-[10px] text-muted-foreground mb-2">{b.label}</div>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Available</span>
                <span className="font-mono text-emerald-400">{formatCurrency(b.available)}</span>
              </div>
              <Progress value={(b.available / b.balance) * 100} className="h-1" />
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-mono text-yellow-400">{formatCurrency(b.pending)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <TreasuryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Treasury Movements</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Reference</th>
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Type</th>
                  <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {treasuryTx.map((tx, i) => (
                  <tr key={tx.id} className={cn('border-b border-border/50', i % 2 === 0 ? '' : 'bg-muted/20')}>
                    <td className="py-2.5 px-4 font-mono text-[10px] text-muted-foreground">{tx.reference}</td>
                    <td className={cn('py-2.5 px-4 font-mono', tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400')}>
                      {tx.type === 'deposit' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </td>
                    <td className="py-2.5 px-4 capitalize">{tx.type}</td>
                    <td className="py-2.5 px-4">
                      <Badge variant={tx.status === 'completed' ? 'default' : tx.status === 'flagged' ? 'destructive' : 'secondary'} className="text-[10px]">
                        {tx.status}
                      </Badge>
                    </td>
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
