'use client'

import { Product, ProductListProps } from '@/types/product'
import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'

export function ProductGrid({ products, loading }: ProductListProps) {
  const handleAddToCart = (product: Product) => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', product)
  }

  const handleAddToWishlist = (product: Product) => {
    // TODO: Implement add to wishlist logic
    console.log('Add to wishlist:', product)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
        />
      ))}
    </div>
  )
}
