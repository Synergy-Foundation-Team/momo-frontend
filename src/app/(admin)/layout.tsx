"use client"

import React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb"
import { Separator } from "@/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar"

import { AppSidebar } from "@/components/layouts/AppSidebar"

// Define the layout component that accepts page content through `children`
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Remove the first empty element caused by splitting "/"
  const pathSegments = pathname.split("/").filter(segment => segment)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                  const href = "/" + pathSegments.slice(0, index + 1).join("/")
                  const isLast = index === pathSegments.length - 1

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {!isLast ? (
                          <BreadcrumbLink href={href}>
                            {decodeURIComponent(segment)}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>
                            {decodeURIComponent(segment)}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
