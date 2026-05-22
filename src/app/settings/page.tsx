'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { User, Bell, Key, Shield, Users, Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'

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

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-lg font-bold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile" className="gap-1.5"><User className="h-3.5 w-3.5" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5"><Bell className="h-3.5 w-3.5" /> Notifications</TabsTrigger>
          <TabsTrigger value="api" className="gap-1.5"><Key className="h-3.5 w-3.5" /> API Keys</TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Security</TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5"><Users className="h-3.5 w-3.5" /> Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Profile Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs">First Name</Label>
                  <Input id="firstName" defaultValue="Vibhanshu" className="h-8 text-xs" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs">Last Name</Label>
                  <Input id="lastName" defaultValue="Buldeo" className="h-8 text-xs" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input id="email" type="email" defaultValue="v.buldeo@aegis.io" className="h-8 text-xs" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <Input id="role" defaultValue="Chief Treasury Officer" className="h-8 text-xs" />
              </div>
              <Button size="sm">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Suspicious Transactions', desc: 'Get alerted when transactions are flagged for review' },
                { label: 'Risk Threshold Breaches', desc: 'Notifications when risk scores exceed configured thresholds' },
                { label: 'Daily Summary', desc: 'Receive end-of-day treasury summary report' },
                { label: 'System Updates', desc: 'Maintenance windows, version updates, and API changes' },
                { label: 'Weekly Performance Report', desc: 'Weekly revenue and operational metrics digest' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                  </div>
                  <Switch defaultChecked={i < 3} id={`notif-${i}`} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">API Keys</CardTitle>
              <Button size="sm" variant="outline" className="gap-1 h-7 text-xs"><Plus className="h-3 w-3" /> Generate Key</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Production - Treasury API', key: 'aeg_sk_prod_8x7F...kL3m', created: '2026-01-15', lastUsed: '2 hours ago' },
                { name: 'Staging - Sandbox', key: 'aeg_sk_stag_2p9Q...nR5v', created: '2026-03-01', lastUsed: '3 days ago' },
                { name: 'Dev - Local Testing', key: 'aeg_sk_dev_5h1J...wB8x', created: '2026-04-10', lastUsed: '1 hour ago' },
              ].map((api, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">{api.name}</span>
                    <Badge variant="outline" className="text-[10px]">{api.created}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[11px] font-mono bg-muted px-2 py-1 rounded text-muted-foreground">
                      {showApiKey ? api.key : api.key.replace(/[^-]...$/, '••••')}
                    </code>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1">Last used: {api.lastUsed}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader><CardTitle className="text-sm">Security Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Two-Factor Authentication', desc: 'Add an extra layer of security with 2FA', enabled: true },
                { label: 'IP Whitelisting', desc: 'Restrict API access to trusted IP addresses', enabled: true },
                { label: 'Session Timeout', desc: 'Automatically log out after 30 minutes of inactivity', enabled: false },
                { label: 'Audit Logging', desc: 'Record all administrative actions for compliance', enabled: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                  </div>
                  <Switch defaultChecked={item.enabled} id={`sec-${i}`} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Team Members</CardTitle>
              <Button size="sm" variant="outline" className="gap-1 h-7 text-xs"><Plus className="h-3 w-3" /> Invite</Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Vibhanshu Buldeo', email: 'v.buldeo@aegis.io', role: 'CEO & Founder', status: 'Active' },
                { name: 'Vibhanshu Buldeo', email: 'v.buldeo@aegis.io', role: 'Chief Treasury Officer', status: 'Active' },
                { name: 'Anika Sharma', email: 'anika.sharma@aegis.io', role: 'Head of Compliance', status: 'Active' },
                { name: 'Marcus Rivera', email: 'marcus.rivera@aegis.io', role: 'Viewer', status: 'Pending' },
              ].map((member, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="text-sm font-medium">{member.name}</div>
                    <div className="text-[11px] text-muted-foreground">{member.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[10px]">{member.role}</Badge>
                    <Badge variant={member.status === 'Active' ? 'default' : 'secondary'} className="text-[10px]">{member.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
