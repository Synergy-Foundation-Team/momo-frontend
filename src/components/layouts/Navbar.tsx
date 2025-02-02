"use client"

import { Search, Heart, User, ShoppingBag } from "lucide-react"
import { MobileMenu } from "./MobileMenu"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/ui/input"
import { Button } from "@/ui/button"
import { useCartStore } from "@/store/cart"
import { SearchCommand } from "@/components/SearchCommand"
import { useState } from "react"

export default function Navbar() {
    const totalItems = useCartStore((state) => state.totalItems)
    const [open, setOpen] = useState(false)

    return (
        <nav className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image
                        src="/logo.svg"
                        alt="MOMO STORE"
                        width={120}
                        height={40}
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Main Menu */}
                <div className="hidden md:flex items-center gap-6 text-base">
                    <Link href="/medicine" className="hover:text-primary transition-colors">
                        ยา
                    </Link>
                    <Link href="/superstore" className="hover:text-primary transition-colors">
                        ซุปเปอร์สโตร์
                    </Link>
                    <Link href="/points" className="hover:text-primary transition-colors">
                        แต้มสะสม
                    </Link>
                </div>

                {/* Search */}
                <div className="flex-1 max-w-xl">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for products or brands"
                            className="pl-10 w-full"
                        />
                    </div>
                    <div className="relative md:hidden">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for products or brands"
                            className="pl-10 w-full"
                            onClick={() => setOpen(true)}
                        />
                    </div>
                </div>
                <SearchCommand open={open} onOpenChange={setOpen} />

                {/* Icons */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-white">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </div>
                    <MobileMenu totalItems={totalItems} />
                </div>
            </div>
        </nav>
    )
}