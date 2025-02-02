"use client"

import { Button } from "@/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet"
import { Menu, Heart, User, ShoppingBag } from "lucide-react"
import Link from "next/link"

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
      <SheetContent side="right" className="w-[300px] sm:w-[400px]" title="Navigation Menu">
        <SheetHeader>
          <SheetTitle>เมนู</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          {/* Menu Links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/medicine"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
            >
              ยา
            </Link>
            <Link
              href="/superstore"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
            >
              ซุปเปอร์สโตร์
            </Link>
            <Link
              href="/points"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors"
            >
              แต้มสะสม
            </Link>
          </div>

          <div className="h-px bg-border" />

          {/* Account Links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/favorites"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Heart className="h-5 w-5" />
              รายการโปรด
            </Link>
            <Link
              href="/account"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <User className="h-5 w-5" />
              บัญชีของฉัน
            </Link>
            <Link
              href="/cart"
              className="px-4 py-2 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-white">
                    {totalItems}
                  </span>
                )}
              </div>
              ตะกร้าสินค้า
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
