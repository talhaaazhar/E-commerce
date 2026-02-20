import { apiClient } from "./client";


export const likeProduct = (productId) => {
  return apiClient.post("/user/likes/", {
    product_id: productId,
  });
};

export const unlikeProduct = (productId) => {
  return apiClient.delete(`/user/likes/${productId}`);
};

export const getMyLikes = () => {
  return apiClient.get("/user/likes/");
};
