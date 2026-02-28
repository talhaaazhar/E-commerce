import { likeProduct, unlikeProduct, getMyLikes } from "../../../api/favourites";

export const addToFavourites = async (productId) => {
  const response = await likeProduct(productId);
  return response.data;
};

export const removeFromFavourites = async (productId) => {
  await unlikeProduct(productId);
};

export const fetchFavourites = async () => {
  const res = await getMyLikes();
  return res.data;
};
