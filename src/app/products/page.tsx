'use client'

import { ProductGrid } from '@/components/products/ProductGrid'
import { Product } from '@/types/product'
import { useEffect, useState } from 'react'

export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        
        // Sample data
        const sampleProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
          id: `product-${i + 1}`,
          name: `สินค้าตัวอย่าง ${i + 1}`,
          price: 499.99,
          originalPrice: 999.99,
          discountPercentage: 50,
          image: `https://placehold.co/400x400?text=Product+${i + 1}`,
          category: 'sample',
        }))

        setProducts(sampleProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">สินค้าทั้งหมด</h1>
        <div className="text-sm text-muted-foreground">
          แสดง {products.length} รายการ
        </div>
      </div>

      <ProductGrid products={products} loading={loading} />
    </div>
  )
}
