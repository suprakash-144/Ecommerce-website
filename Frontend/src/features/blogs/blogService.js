import axios from "axios";
import { base_Url } from "../../utilis/axiosconfig";

const getallBlogs = async () => {
  const response = await axios.get(`${base_Url}blog`);
  if (response.data) {
    return response.data;
  }
};
const getaBlog = async (id) => {
  const response = await axios.get(`${base_Url}blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getallBlogs,
  getaBlog,
};
