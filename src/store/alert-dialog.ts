import { create } from 'zustand'

export interface AlertDialogState {
  isOpen: boolean
  title: string
  description: string
  cancelText?: string
  confirmText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

interface AlertDialogStore extends AlertDialogState {
  open: (params: Omit<AlertDialogState, 'isOpen'>) => void
  close: () => void
}

const initialState: AlertDialogState = {
  isOpen: false,
  title: '',
  description: '',
  cancelText: 'Cancel',
  confirmText: 'Confirm',
}

export const useAlertDialog = create<AlertDialogStore>((set) => ({
  ...initialState,
  open: (params) => set({ isOpen: true, ...params }),
  close: () => set(initialState),
}))
