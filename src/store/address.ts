import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AddressState {
  addressLine1: string
  addressLine2?: string
  subdistrict: string
  district: string
  province: string
  postalCode: string
  country?: string
  addressType?: string
  landmark?: string
  setAddress: (address: Partial<AddressState>) => void
}

export const useAddressStore = create<AddressState>()(
  persist(
    set => ({
      addressLine1: "",
      addressLine2: "",
      subdistrict: "",
      district: "",
      province: "",
      postalCode: "",
      country: "",
      addressType: "",
      landmark: "",
      setAddress: address => set(state => ({ ...state, ...address })),
    }),
    {
      name: "address-storage",
    }
  )
)
