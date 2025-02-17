import { useCallback, useEffect, useState } from "react"

import { CreateOrderDto, Order, UpdateOrderDto } from "@/types/order"
import { orderEvents, OrderResponse, socket } from "@/lib/socket"

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Listen for order events
    socket.on(orderEvents.orderCreated, (order: Order) => {
      setOrders(prev => [...prev, order])
    })

    socket.on(orderEvents.orderUpdated, (updatedOrder: Order) => {
      setOrders(prev =>
        prev.map(order => (order.id === updatedOrder.id ? updatedOrder : order))
      )
    })

    socket.on(orderEvents.orderDelivering, (updatedOrder: Order) => {
      setOrders(prev =>
        prev.map(order => (order.id === updatedOrder.id ? updatedOrder : order))
      )
    })

    socket.on(orderEvents.orderDeleted, ({ orderId }: { orderId: string }) => {
      setOrders(prev => prev.filter(order => order.id !== orderId))
    })

    return () => {
      socket.off(orderEvents.orderCreated)
      socket.off(orderEvents.orderUpdated)
      socket.off(orderEvents.orderDelivering)
      socket.off(orderEvents.orderDeleted)
    }
  }, [])

  const createOrder = useCallback(
    async (orderData: CreateOrderDto): Promise<OrderResponse> => {
      setLoading(true)
      setError(null)

      return new Promise(resolve => {
        socket.emit(
          orderEvents.createOrder,
          orderData,
          (response: OrderResponse) => {
            setLoading(false)
            if (!response.success) {
              setError(response.error || "Failed to create order")
            }
            resolve(response)
          }
        )
      })
    },
    []
  )

  const updateOrder = useCallback(
    async (orderData: UpdateOrderDto): Promise<OrderResponse> => {
      setLoading(true)
      setError(null)

      return new Promise(resolve => {
        socket.emit(
          orderEvents.updateOrder,
          orderData,
          (response: OrderResponse) => {
            setLoading(false)
            if (!response.success) {
              setError(response.error || "Failed to update order")
            }
            resolve(response)
          }
        )
      })
    },
    []
  )

  const makeDeliver = useCallback(
    async (orderId: string): Promise<OrderResponse> => {
      setLoading(true)
      setError(null)

      return new Promise(resolve => {
        socket.emit(
          orderEvents.makeDeliver,
          { orderId },
          (response: OrderResponse) => {
            setLoading(false)
            if (!response.success) {
              setError(response.error || "Failed to make delivery")
            }
            resolve(response)
          }
        )
      })
    },
    []
  )

  const deleteOrder = useCallback(
    async (orderId: string): Promise<OrderResponse> => {
      setLoading(true)
      setError(null)

      return new Promise(resolve => {
        socket.emit(
          orderEvents.deleteOrder,
          { orderId },
          (response: OrderResponse) => {
            setLoading(false)
            if (!response.success) {
              setError(response.error || "Failed to delete order")
            }
            resolve(response)
          }
        )
      })
    },
    []
  )

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    makeDeliver,
    deleteOrder,
  }
}
