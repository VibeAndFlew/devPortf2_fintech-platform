'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { DashboardProvider } from '@/store/dashboard-store'
import { ThemeProvider } from './theme-provider'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={300}>
      <ThemeProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </ThemeProvider>
    </TooltipProvider>
  )
}
