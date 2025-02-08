"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/store/cart"
import { Button } from "@/ui/button"
import { Input } from "@/ui/input"
import { Heart, Search, ShoppingBag, User } from "lucide-react"

import { SearchCommand } from "@/components/SearchCommand"

import { MobileMenu } from "./MobileMenu"

export default function Navbar() {
    const totalItems = useCartStore(state => state.totalItems)
    const [open, setOpen] = useState(false)

    return (
        <nav className="sticky left-0 right-0 top-0 z-50 border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
                <div className="flex items-center gap-4">
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
                    <div className="hidden items-center gap-6 text-base md:flex">
                        <Link
                            href="/medicine"
                            className="transition-colors hover:text-primary"
                        >
                            ยา
                        </Link>
                        <Link
                            href="/superstore"
                            className="transition-colors hover:text-primary"
                        >
                            ซุปเปอร์สโตร์
                        </Link>
                        <Link
                            href="/points"
                            className="transition-colors hover:text-primary"
                        >
                            แต้มสะสม
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="max-w-2xl flex-1">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="ค้นหาสินค้า"
                                className="w-full pl-10"
                            />
                        </div>
                        <div className="relative md:hidden">
                            <Search className="left-3 top-1/2 h-4 w-4  text-muted-foreground" onClick={() => setOpen(true)} />

                            {/* <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="ค้นหาสินค้า"
                                className="w-full pl-10"
                                onClick={() => setOpen(true)}
                            /> */}

                        </div>
                    </div>

                    <SearchCommand open={open} onOpenChange={setOpen} />

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <div className="hidden items-center gap-2 md:flex">
                            <Button variant="ghost" size="icon">
                                <Heart className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="relative" asChild>
                                <Link href="/cart">
                                    <ShoppingBag className="h-5 w-5" />
                                    {totalItems > 0 && (
                                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                            </Button>
                        </div>
                        <MobileMenu totalItems={totalItems} />
                    </div>
                </div>
            </div>
        </nav>
    )
}
