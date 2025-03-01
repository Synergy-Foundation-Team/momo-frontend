'use client'
import { useState, ReactNode } from 'react'
import SidebarProfile from './sidebar'
import ProfileInfo from './profile-info'

export default function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState<ReactNode>(() => <ProfileInfo />)

  return (
    <div className="flex min-h-screen">
      <SidebarProfile setActiveComponent={setActiveComponent} />

      <main className="flex-1 p-6">
        {activeComponent}
      </main>
    </div>
  )
}
