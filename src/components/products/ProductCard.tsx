"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/ui/button"
import { Card, CardContent, CardFooter } from "@/ui/card"
import { Heart, ShoppingCart } from "lucide-react"

import { ProductCardProps } from "@/types/product"

export function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  const { id, name, price, originalPrice, discountPercentage, image } = product
  const formattedPrice = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
  }).format(price)

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(originalPrice)
    : null

  return (
    <Card className="group overflow-hidden">
      <Link href={`/${id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discountPercentage && (
            <div className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-sm text-white">
              ลด {discountPercentage}%
            </div>
          )}
        </div>
      </Link>

      <CardContent className="flex justify-between p-4">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="mb-2 line-clamp-2 text-sm font-medium hover:text-primary">
              {name}
            </h3>
          </Link>

          <div className="flex flex-col">
            <div className="font-semibold text-primary">{formattedPrice}</div>
            {formattedOriginalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                {formattedOriginalPrice}
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <Button
            variant="secondary"
            size="icon"
            className="flex h-10 w-10 items-center justify-center rounded-full"
            onClick={() => onAddToCart?.(product)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="hidden gap-2 p-4 pt-0 md:flex">
        <Button
          variant="secondary"
          size="icon"
          className="flex-1"
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onAddToWishlist?.(product)}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
