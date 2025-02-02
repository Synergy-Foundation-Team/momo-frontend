export interface Product {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  discountPercentage?: number
  image: string
  category: string
  isNew?: boolean
  isFavorite?: boolean
}

export interface ProductListProps {
  products: Product[]
  loading?: boolean
}

export interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}
