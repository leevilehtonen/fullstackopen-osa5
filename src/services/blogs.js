import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};
const create = async data => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
};
const update = async data => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${data._id}`, data, config);
  return response.data;
};
const remove = async data => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${data._id}`, config);
  return response.data;
};

export default { getAll, create, update, remove, setToken };
