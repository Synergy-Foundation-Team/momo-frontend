export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  quantity: number
  price: number
}

export interface CreateOrderDto {
  userId: string
  items: OrderItem[]
}

export interface UpdateOrderDto {
  status?: "pending" | "processing" | "shipped" | "delivered"
}
