import { useQuery, useMutation } from "@tanstack/react-query"
import { getProducts, createProduct } from "./api"
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
