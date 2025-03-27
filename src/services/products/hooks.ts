import { useMutation, useQuery } from "@tanstack/react-query"

import { createProduct, getProducts } from "./api"
import type { Product } from "./types"

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  })
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) => createProduct(newProduct),
  })
}
