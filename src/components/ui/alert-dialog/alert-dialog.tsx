"use client"

import { useAlertDialog } from "@/store/alert-dialog"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialog as AlertDialogRoot,
  AlertDialogTitle,
} from "@/ui/alert-dialog"

export function AlertDialog() {
  const {
    isOpen,
    title,
    description,
    cancelText,
    confirmText,
    onConfirm,
    onCancel,
    close,
  } = useAlertDialog()

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    close()
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    close()
  }

  return (
    <AlertDialogRoot open={isOpen} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelText || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmText || "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  )
}
