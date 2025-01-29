import { SidebarProvider, SidebarTrigger } from '@/ui/sidebar'
import { AdminSidebar } from '@/components/layouts/AdminSidebar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({ children }: Props) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}