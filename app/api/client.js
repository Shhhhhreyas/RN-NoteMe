import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.43.149:9001/api",
});

const get = apiClient.get;

apiClient.get = async (url, params, axiosConfig) => {
  return await get(url, params, axiosConfig);
};

export default apiClient;
