import axios from "axios";
import { base_Url } from "../../utilis/axiosconfig";

const submitcomment = async (contactData) => {
  const response = await axios.post(`${base_Url}enquiry`, contactData);
  if (response.data) {
    return response.data;
  }
};

export const contactService = {
  submitcomment,
};
