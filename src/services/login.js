import axios from "axios";
const baseUrl = "/api/login";

const login = async body => {
  const request = await axios.post(baseUrl, body);
  return request.data;
};

export default { login };
