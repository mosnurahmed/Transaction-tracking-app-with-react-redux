import axios from "../../utils/axios";

export const getTransaction = async (input, type) => {
  console.log(input);
  let querystring = "";

  if (input) {
    let searchArr = input.split(" ");
    // console.log(searchArr)

    querystring += searchArr.map((s) => `name_like=${s}`).join("&");
  }
  if (type) {
    querystring = `type_like=${type}`;
  }

  const response = await axios.get(`/transactions/?${querystring}`);
  return response.data;
};
export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);
  return response.data;
};
export const editTransaction = async (data, id) => {
  console.log();
  const response = await axios.put(`/transactions/${id}`, data);
  return response.data;
};
export const removeTransaction = async (id) => {
  const response = await axios.delete(`/transactions/${id}`);
  return response.data;
};
