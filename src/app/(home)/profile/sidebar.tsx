"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, User } from "lucide-react"

import Addresses from "./address"
import Orders from "./order"
import ProfileInfo from "./profile-info"

interface SidebarProfileProps {
  setActiveComponent: (component: React.ReactNode) => void
}

const menuItems = [
  {
    name: "ข้อมูล ส่วนตัว",
    component: () => <ProfileInfo />,
    icon: <Heart className="h-6 w-6" />,
  },
  {
    name: "My orders",
    component: () => <Orders />,
    icon: <User className="h-6 w-6" />,
  },
  {
    name: "ที่อยู่",
    component: () => <Addresses />,
    icon: <ShoppingBag className="h-6 w-6" />,
  },
]

export default function SidebarProfile({
  setActiveComponent,
}: SidebarProfileProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="z-[999] flex min-h-screen flex-col">
      {/* Desktop View */}
      <aside className="hidden w-64 rounded-lg bg-gray-100 p-4 md:block">
        <nav className="relative space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index)
                setActiveComponent(item.component())
              }}
              className={`relative flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-lg transition-all duration-200 ${activeIndex === index ? "text-[#1B4B66]" : "hover:bg-gray-200"}`}
            >
              {activeIndex === index && (
                <motion.div
                  className="absolute inset-0 rounded-r border-l-[5px] border-l-[#17494D]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                />
              )}
              <span className="relative">{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1"></main>

      {/* Mobile View - Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 flex w-full justify-around bg-white px-3 py-3 shadow-md md:hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index)
              setActiveComponent(item.component())
            }}
            className="relative flex w-1/3 flex-col items-center space-y-1 py-2"
          >
            {/* Background Indicator */}
            {activeIndex === index && (
              <motion.div
                className="absolute bottom-0 left-0 h-[5rem] w-full rounded-lg bg-[#EAF1F8]"
                layoutId="tabActiveBg"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}

            {/* Icon */}
            <span
              className={`relative ${activeIndex === index ? "text-[#1B4B66]" : "text-gray-700"}`}
            >
              {item.icon}
            </span>

            {/* Text */}
            <span
              className={`relative ${activeIndex === index ? "font-medium text-[#1B4B66]" : "text-gray-700"}`}
            >
              {item.name}
            </span>
          </button>
        ))}
      </nav>
    </div>
  )
}
