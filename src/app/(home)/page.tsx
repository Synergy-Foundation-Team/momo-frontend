'use client'

import { ProductGrid } from '@/components/products/ProductGrid'
import { Product } from '@/types/product'
import { Paginator } from '@/components/ui/Paginator'
import { useEffect, useState, useRef } from 'react'


export default function HomePage() {
  const productSectionRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 12

  const fetchProducts = async (page: number) => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate pagination with sample data
      const totalItems = 50 // Total number of produ cts
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage)
      setTotalPages(calculatedTotalPages)

      const startIndex = (page - 1) * itemsPerPage
      const sampleProducts: Product[] = Array.from({ length: itemsPerPage }, (_, i) => ({
        id: `product-${startIndex + i + 1}`,
        name: `สินค้าตัวอย่าง ${startIndex + i + 1}`,
        price: 499.99,
        originalPrice: 999.99,
        discountPercentage: 50,
        image: `https://placehold.co/400x400?text=Product+${startIndex + i + 1}`,
        category: 'sample',
      }))

      setProducts(sampleProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(currentPage)
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentPage])

  return (
    <div>
      <div ref={productSectionRef} className="mx-auto md:container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">สินค้าแนะนำ</h1>
          <div className="text-sm text-muted-foreground">
            แสดง {products.length} รายการ
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <ProductGrid products={products} loading={loading} />
          <Paginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  )
}
