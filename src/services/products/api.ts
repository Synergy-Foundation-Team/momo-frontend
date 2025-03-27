import { fetcher } from "@/lib/axiosInstance"

import { Product } from "./types"

export const getProducts = () => {
  return fetcher<Product[]>({
    url: "/products",
  })
}

export const createProduct = (newProduct: Omit<Product, "id">) => {
  return fetcher<Product>({
    url: "/products",
    method: "POST",
    data: newProduct,
  })
}
