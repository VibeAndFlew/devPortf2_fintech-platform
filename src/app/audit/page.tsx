'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { auditLogs } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Search, Download, FileJson, X } from 'lucide-react'

const actionColors: Record<string, string> = {
  CREATE: 'text-emerald-400 bg-emerald-500/10',
  MODIFY: 'text-blue-400 bg-blue-500/10',
  SYSTEM: 'text-purple-400 bg-purple-500/10',
  FLAG: 'text-yellow-400 bg-yellow-500/10',
  FAIL: 'text-red-400 bg-red-500/10',
  ALERT: 'text-red-400 bg-red-500/10',
  AUTO: 'text-muted-foreground bg-muted',
}

const statusColors: Record<string, 'default' | 'secondary' | 'destructive'> = {
  success: 'default',
  warning: 'secondary',
  failure: 'destructive',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AuditPage() {
  const [search, setSearch] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)

  const filtered = auditLogs.filter(entry => {
    if (search && !entry.actor.toLowerCase().includes(search.toLowerCase()) && !entry.action.toLowerCase().includes(search.toLowerCase()) && !entry.resource.toLowerCase().includes(search.toLowerCase())) return false
    if (actionFilter !== 'all' && entry.action !== actionFilter) return false
    if (statusFilter !== 'all' && entry.status !== statusFilter) return false
    return true
  })

  const selectedData = selectedEntry ? auditLogs.find(e => e.id === selectedEntry) : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground">Audit Logs</h1>
          <p className="text-xs text-muted-foreground">Complete audit trail of all system activities</p>
        </div>
        <Button size="sm" variant="outline" className="gap-1.5">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search actor, action, resource..." className="pl-8 h-8 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue placeholder="Action" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="CREATE">CREATE</SelectItem>
                <SelectItem value="MODIFY">MODIFY</SelectItem>
                <SelectItem value="SYSTEM">SYSTEM</SelectItem>
                <SelectItem value="FLAG">FLAG</SelectItem>
                <SelectItem value="FAIL">FAIL</SelectItem>
                <SelectItem value="ALERT">ALERT</SelectItem>
                <SelectItem value="AUTO">AUTO</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Timestamp</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Actor</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Action</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Resource</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase">IP</th>
                <th className="text-left py-3 px-4 text-[10px] font-medium text-muted-foreground uppercase w-10"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {filtered.map((entry, i) => (
                  <motion.tr
                    key={entry.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn('border-b border-border/50 transition-colors hover:bg-accent/5 cursor-pointer', i % 2 === 0 ? '' : 'bg-muted/20')}
                    onClick={() => setSelectedEntry(entry.id === selectedEntry ? null : entry.id)}
                  >
                    <td className="py-2.5 px-4 font-mono text-[10px] text-muted-foreground">{formatDate(entry.timestamp)}</td>
                    <td className="py-2.5 px-4 text-emerald-400">{entry.actor}</td>
                    <td className="py-2.5 px-4"><Badge variant="outline" className={cn('text-[10px] border-0', actionColors[entry.action] || '')}>{entry.action}</Badge></td>
                    <td className="py-2.5 px-4 text-muted-foreground truncate max-w-[200px]">{entry.resource}</td>
                    <td className="py-2.5 px-4"><Badge variant={statusColors[entry.status]} className="text-[10px] capitalize">{entry.status}</Badge></td>
                    <td className="py-2.5 px-4 font-mono text-[10px] text-muted-foreground">{entry.ipAddress}</td>
                    <td className="py-2.5 px-4">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={e => { e.stopPropagation(); setSelectedEntry(selectedEntry === entry.id ? null : entry.id) }}>
                        <FileJson className="h-3 w-3" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium">Entry Details - {selectedData.id}</span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedEntry(null)}>
                <X className="h-3 w-3" />
              </Button>
            </div>
            <pre className="text-[11px] text-muted-foreground font-mono bg-muted/30 rounded-lg p-4 overflow-x-auto">
{JSON.stringify(selectedData, null, 2)}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
