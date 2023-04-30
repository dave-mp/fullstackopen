import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1";

const getByName = (name) => {
  return axios.get(`${baseUrl}/name/${name}`);
};
const countriesService = {
  getByName,
};

export default countriesService;
