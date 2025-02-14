"use client"

import { useAlertDialog } from "@/store/alert-dialog"
import { Button } from "@/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/ui/sidebar"
import {
  AppWindow,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LogOut,
  ShoppingBag,
} from "lucide-react"

import { ManagementMenu } from "./ManagementMenu"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMainManagement: [
    {
      title: "Order",
      url: "#",
      icon: ShoppingBag,
      isActive: true,
      items: [
        {
          title: "คำสั่งซื้อ",
          url: "/orders",
        },
      ],
    },
    {
      title: "Management",
      url: "#",
      icon: AppWindow,
      isActive: true,
      items: [
        {
          title: "จัดการแบนเนอร์",
          url: "/managements/banner",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center justify-center gap-2 overflow-hidden text-4xl font-bold text-primary">
          <span className="transition-all duration-300 ease-in-out">
            {isCollapsed ? "M" : "MOMO STORE"}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ManagementMenu items={data.navMainManagement} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <Button
          variant="outline"
          onClick={() => {
            useAlertDialog.getState().open({
              title: "ยืนยันการออกจากระบบ",
              description: "คุณต้องการออกจากระบบใช่หรือไม่?",
              confirmText: "ออกจากระบบ",
              cancelText: "ยกเลิก",
              onConfirm: () => {
                // Add your logout logic here
                console.log("User confirmed logout")
              },
            })
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          ออกจากระบบ
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
