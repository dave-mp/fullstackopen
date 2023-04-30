import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5";

const getByLatLon = (lat, lon) => {
  return axios.get(
    `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
  );
};
const weatherService = {
  getByLatLon,
};

export default weatherService;
