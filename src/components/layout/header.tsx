'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, User, Clock, Dot } from 'lucide-react'
import { useDashboard } from '@/store/dashboard-store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Header() {
  const { notifications, markNotificationRead } = useDashboard()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="h-14 border-b border-border bg-background/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-bold tracking-wider text-emerald-400">
          AEGIS TREASURY
        </h1>
        <span className="text-xs text-muted-foreground hidden md:inline">|</span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground hidden md:flex">
          <Dot className="h-4 w-4 text-emerald-400" />
          <span>All Systems Nominal</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions, accounts..."
            className="h-8 w-56 lg:w-72 rounded-md border border-input bg-muted/50 pl-8 pr-3 text-xs placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-0.5">
            <kbd className="px-1 py-0.5 text-[10px] rounded bg-muted text-muted-foreground border border-border">⌘K</kbd>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono">{time.toLocaleTimeString()}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="px-2 py-4 text-center text-xs text-muted-foreground">No notifications</div>
            ) : (
              notifications.slice(0, 5).map((n) => (
                <DropdownMenuItem key={n.id} className={cn('flex flex-col items-start gap-1 py-2', !n.read && 'bg-accent/5')} onClick={() => markNotificationRead(n.id)}>
                  <div className="flex items-center gap-2 w-full">
                    <span className={cn(
                      'h-1.5 w-1.5 rounded-full shrink-0',
                      n.type === 'error' && 'bg-destructive',
                      n.type === 'warning' && 'bg-yellow-500',
                      n.type === 'success' && 'bg-emerald-400',
                      n.type === 'info' && 'bg-blue-400',
                    )} />
                    <span className="text-xs font-medium">{n.title}</span>
                    {!n.read && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                  </div>
                  <span className="text-[11px] text-muted-foreground ml-3.5">{n.message}</span>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 h-8 px-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px] bg-emerald-500/20 text-emerald-400">VB</AvatarFallback>
              </Avatar>
              <span className="text-xs hidden sm:inline">v.buldeo</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
