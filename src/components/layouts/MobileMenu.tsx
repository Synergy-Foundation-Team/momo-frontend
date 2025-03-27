"use client"

import Link from "next/link"
import { Button } from "@/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet"
import { Heart, Menu, ShoppingBag, User } from "lucide-react"

interface MobileMenuProps {
  totalItems: number
}

export function MobileMenu({ totalItems }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-[300px] flex-col sm:w-[400px]"
        title="Navigation Menu"
      >
        <SheetHeader>
          <SheetTitle>เมนู</SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex flex-1 flex-col gap-4">
          {/* Menu Links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/medicine"
              className="rounded-md px-4 py-2 transition-colors hover:bg-muted"
            >
              ยา
            </Link>
            <Link
              href="/superstore"
              className="rounded-md px-4 py-2 transition-colors hover:bg-muted"
            >
              ซุปเปอร์สโตร์
            </Link>
            <Link
              href="/points"
              className="rounded-md px-4 py-2 transition-colors hover:bg-muted"
            >
              แต้มสะสม
            </Link>
          </div>

          <div className="h-px bg-border" />

          {/* Account Links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/favorites"
              className="flex items-center gap-3 rounded-md px-4 py-2 transition-colors hover:bg-muted"
            >
              <Heart className="h-5 w-5" />
              รายการโปรด
            </Link>
            <Link
              href="/account"
              className="flex items-center gap-3 rounded-md px-4 py-2 transition-colors hover:bg-muted"
            >
              <User className="h-5 w-5" />
              บัญชีของฉัน
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 rounded-md px-4 py-2 transition-colors hover:bg-muted"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                    {totalItems}
                  </span>
                )}
              </div>
              ตะกร้าสินค้า
            </Link>
          </div>
        </div>

        {/* button fix bottom to close menu */}
        <div className="mt-auto w-full border-t pt-4">
          <SheetTrigger asChild>
            <Button variant="secondary" className="w-full">
              ปิดเมนู
            </Button>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  )
}
