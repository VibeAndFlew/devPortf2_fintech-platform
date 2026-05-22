'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useDashboard } from '@/store/dashboard-store'
import {
  LayoutDashboard, Wallet, ArrowLeftRight, TrendingUp, Shield,
  ClipboardList, LineChart, Brain, Settings, Diamond, ChevronLeft,
  ChevronRight, User,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/treasury', label: 'Treasury', icon: Wallet },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/revenue', label: 'Revenue', icon: TrendingUp },
  { href: '/risk', label: 'Risk Engine', icon: Shield },
  { href: '/audit', label: 'Audit Logs', icon: ClipboardList },
  { href: '/forecasting', label: 'Forecasting', icon: LineChart },
  { href: '/insights', label: 'AI Insights', icon: Brain },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useDashboard()

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 64 : 240 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="flex flex-col bg-[#0d0d14] border-r border-border h-screen overflow-hidden shrink-0"
    >
      <div className={cn(
        'flex items-center gap-2 px-4 h-14 border-b border-border',
        sidebarCollapsed && 'justify-center px-2',
      )}>
        <Diamond className="text-emerald-400 h-5 w-5 shrink-0" />
        <AnimatePresence mode="wait">
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-lg font-bold tracking-widest text-emerald-400 whitespace-nowrap"
            >
              AEGIS
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 py-3 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                'hover:bg-emerald-500/10 hover:text-emerald-400',
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 shadow-[0_0_12px_-4px_#10b981]'
                  : 'text-muted-foreground',
                sidebarCollapsed && 'justify-center px-2',
              )}>
                <Icon className="h-4 w-4 shrink-0" />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !sidebarCollapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400"
                  />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className={cn(
        'border-t border-border p-3 space-y-3',
        sidebarCollapsed && 'flex flex-col items-center',
      )}>
        <div className={cn('flex items-center gap-2', sidebarCollapsed && 'flex-col')}>
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs"
              >
                <div className="text-emerald-400 font-medium">Status: Online</div>
                <div className="text-muted-foreground">System: Operational</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </motion.aside>
  )
}
