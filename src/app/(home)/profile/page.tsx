"use client"

import { ReactNode, useState } from "react"

import ProfileInfo from "./profile-info"
import SidebarProfile from "./sidebar"

export default function ProfilePage() {
  const [activeComponent, setActiveComponent] = useState<ReactNode>(() => (
    <ProfileInfo />
  ))

  return (
    <div className="flex min-h-screen">
      <SidebarProfile setActiveComponent={setActiveComponent} />

      <main className="flex-1 p-6">{activeComponent}</main>
    </div>
  )
}
