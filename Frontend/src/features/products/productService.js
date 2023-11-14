import axios from "axios";
import { base_Url, config } from "../../utilis/axiosconfig";

const getallProducts = async () => {
  const response = await axios.get(`${base_Url}product`);
  if (response.data) {
    return response.data;
  }
};
const getSingleProducts = async (id) => {
  const response = await axios.get(`${base_Url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};
const addtoWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_Url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const productService = {
  getallProducts,
  addtoWishlist,
  getSingleProducts,
};
