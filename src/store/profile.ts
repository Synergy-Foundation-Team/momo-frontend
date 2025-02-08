import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProfileState {
  firstName: string
  lastName: string
  phone: string
  email: string
  points: number
  expiryDate: string
  setProfile: (profile: Partial<ProfileState>) => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      points: 200,
      expiryDate: '10/25',
      setProfile: (profile) => set((state) => ({ ...state, ...profile })),
    }),
    {
      name: 'profile-storage',
    }
  )
)
