'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type Timeframe = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  read: boolean
  timestamp: string
}

interface DashboardState {
  selectedTimeframe: Timeframe
  selectedAssetPair: string
  notifications: Notification[]
  sidebarCollapsed: boolean
  theme: 'dark'
}

interface DashboardContextValue extends DashboardState {
  setTimeframe: (timeframe: Timeframe) => void
  setAssetPair: (pair: string) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

const DashboardContext = createContext<DashboardContextValue | undefined>(undefined)

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1M')
  const [selectedAssetPair, setSelectedAssetPair] = useState('USD/EUR')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', title: 'Suspicious Transaction Flagged', message: 'High-risk transaction detected requiring immediate review.', type: 'error', read: false, timestamp: new Date().toISOString() },
    { id: 'n2', title: 'T-Bill Maturity', message: '$3.2M T-bill matured and proceeds are available.', type: 'success', read: false, timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 'n3', title: 'FX Exposure Warning', message: 'EUR position exceeded VAR threshold by 12%.', type: 'warning', read: true, timestamp: new Date(Date.now() - 7200000).toISOString() },
  ])

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotif: Notification = {
      ...notification,
      id: `n-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
    setNotifications(prev => [newNotif, ...prev])
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev)
  }, [])

  return (
    <DashboardContext.Provider value={{
      selectedTimeframe, selectedAssetPair, notifications, sidebarCollapsed, theme: 'dark',
      setTimeframe: setSelectedTimeframe, setAssetPair: setSelectedAssetPair,
      addNotification, markNotificationRead, clearNotifications, toggleSidebar, setSidebarCollapsed,
    }}>
      {children}
    </DashboardContext.Provider>
  )
}

function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) throw new Error('useDashboard must be used within DashboardProvider')
  return context
}

export { DashboardProvider, useDashboard, type Timeframe, type Notification }
