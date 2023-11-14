import axios from "axios";
import { base_Url, config } from "../../utilis/axiosconfig";

const register = async (userData) => {
  const response = await axios.post(`${base_Url}user/register`, userData);
  if (response.data) {
    return response.data;
  }
};
const login = async (userData) => {
  const response = await axios.post(`${base_Url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};
const updateuser = async (userData) => {
  const response = await axios.put(
    `${base_Url}user/edit-user`,
    userData,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const forgetpassword = async (userData) => {
  const response = await axios.post(
    `${base_Url}user/forgot-password-token`,
    userData,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const resetpassword = async (userData) => {
  const response = await axios.put(
    `${base_Url}user/reset-password/${userData.token}`,
    userData,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUserwishlist = async () => {
  const response = await axios.get(`${base_Url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};
const addToCart = async (data) => {
  const response = await axios.post(`${base_Url}user/cart`, data, config);
  if (response.data) {
    return response.data;
  }
};
const GetCart = async () => {
  const response = await axios.get(`${base_Url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};
const removeFromCart = async (id) => {
  const response = await axios.delete(
    `${base_Url}user/remove-cart/${id}`,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const updateFromCart = async (data) => {
  const response = await axios.put(
    `${base_Url}user/update-cart/`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const createOrder = async (data) => {
  const response = await axios.post(
    `${base_Url}user/cart/create-order`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getOrders = async () => {
  const response = await axios.get(`${base_Url}user/order`, config);
  if (response.data) {
    return response.data;
  }
};
export const authService = {
  register,
  login,
  updateuser,
  forgetpassword,
  getUserwishlist,
  addToCart,
  GetCart,
  removeFromCart,
  updateFromCart,
  createOrder,
  getOrders,
  resetpassword,
};
