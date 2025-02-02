import { useAlertDialog } from "@/store/alert-dialog"
import { CartItem, useCartStore } from "@/store/cart"

export function useCart() {
  const alertDialog = useAlertDialog
  const { removeItem, updateQuantity, clearCart } = useCartStore()

  const confirmRemoveItem = (item: CartItem) => {
    alertDialog.getState().open({
      title: "ยืนยันการลบสินค้า",
      description: `คุณต้องการลบ ${item.name} ออกจากตะกร้าใช่หรือไม่?`,
      confirmText: "ลบสินค้า",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        removeItem(item.id)
      },
    })
  }

  const confirmClearCart = () => {
    alertDialog.getState().open({
      title: "ยืนยันการล้างตะกร้า",
      description: "คุณต้องการลบสินค้าทั้งหมดออกจากตะกร้าใช่หรือไม่?",
      confirmText: "ล้างตะกร้า",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        clearCart()
      },
    })
  }

  const confirmUpdateQuantity = (item: CartItem, newQuantity: number) => {
    if (newQuantity === 0) {
      confirmRemoveItem(item)
      return
    }

    updateQuantity(item.id, newQuantity)
  }

  return {
    confirmRemoveItem,
    confirmClearCart,
    confirmUpdateQuantity,
  }
}
