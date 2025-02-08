"use client"

import { useSidebar } from "@/ui/sidebar"
import {
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
    AppWindow,
    ShoppingBag,
    LogOut
} from "lucide-react"
import { ManagementMenu } from "./ManagementMenu"
import { useAlertDialog } from "@/store/alert-dialog"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/ui/sidebar"
import { Button } from "@/ui/button"

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
            title: "Management",
            url: "#",
            icon: AppWindow,
            isActive: true,
            items: [
                {
                    title: "จัดการแบนเนอร์",
                    url: "#",
                },

            ],
        },
        {
            title: "Order",
            url: "#",
            icon: ShoppingBag,
            items: [
                {
                    title: "คำสั่งซื้อ",
                    url: "#",
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
                <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary overflow-hidden">
                    <span className="transition-all duration-300 ease-in-out">{isCollapsed ? 'M' : 'MOMO STORE'}</span>
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
                            title: 'ยืนยันการออกจากระบบ',
                            description: 'คุณต้องการออกจากระบบใช่หรือไม่?',
                            confirmText: 'ออกจากระบบ',
                            cancelText: 'ยกเลิก',
                            onConfirm: () => {
                                // Add your logout logic here
                                console.log('User confirmed logout');
                            }
                        });
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
