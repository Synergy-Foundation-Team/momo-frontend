'use client'

import { ProductCardProps } from '@/types/product'
import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter } from '@/ui/card'
import { ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const { id, name, price, originalPrice, discountPercentage, image } = product
  const formattedPrice = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
  }).format(price)

  const formattedOriginalPrice = originalPrice
    ? new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
      }).format(originalPrice)
    : null

  return (
    <Card className="overflow-hidden group">
      <Link href={`/products/${id}`}>
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
              ลด {discountPercentage}%
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary">
            {name}
          </h3>
        </Link>

        <div className="flex flex-col">
          <div className="text-primary font-semibold">{formattedPrice}</div>
          {formattedOriginalPrice && (
            <div className="text-sm text-muted-foreground line-through">
              {formattedOriginalPrice}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
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
