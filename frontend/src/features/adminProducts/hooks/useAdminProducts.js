import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllProducts,
  addProduct,
  editProduct,
  deactivate,
  activate,
  remove,
  uploadImage,
  removeImage,
} from "../services/adminProductService";

export const useFetchProducts = (params) => {
  return useQuery({
    queryKey: ["adminProducts", params],
    queryFn: () => fetchAllProducts(params),
    keepPreviousData: true,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => editProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};

export const useDeactivateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};

export const useActivateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: activate,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};

// ==================== IMAGE HOOKS ====================

// Upload image: expects { productId, file }
export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, file }) => uploadImage(productId, file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};

// Remove image: expects { productId, imageUrl }
export const useRemoveImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, imageUrl }) => removeImage(productId, imageUrl),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adminProducts"] }),
  });
};