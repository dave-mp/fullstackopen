import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";

const App = () => {
  const [filterText, setFilterText] = useState("");
  const handleFilterTextChange = ({ target: { value } }) =>
    setFilterText(value);
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (filterText.length) {
      countriesService.getByName(filterText).then(({ data }) => {
        setCountries(data);
      });
    } else {
      setCountries([]);
    }
  }, [filterText]);

  useEffect(() => {
    if (countries.length === 1) {
      weatherService
        .getByLatLon(...countries[0].capitalInfo.latlng)
        .then(({ data }) => {
          setWeather(data);
        });
    }
  }, [countries]);

  const getLanguagesArray = (languages) => {
    const languagesArray = [];
    for (const l in languages) {
      languagesArray.push(languages[l]);
    }
    return languagesArray;
  };

  return (
    <div>
      <div>
        Filter shown with:{" "}
        <input value={filterText} onChange={handleFilterTextChange} />
        {countries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : countries.length === 1 ? (
          <div>
            <h1>{countries[0].name.common}</h1>
            <p>
              Capital: {countries[0].capital[0]}
              <br />
              Area: {countries[0].area}
            </p>
            <div>
              <h3>Languages:</h3>
              <ul>
                {getLanguagesArray(countries[0].languages).map((l) => {
                  return <li key={l}>{l}</li>;
                })}
              </ul>
            </div>
            <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
            {!!weather ? (
              <div>
                <h2>Weather in {countries[0].capital[0]}</h2>
                <p>Temperature: {weather.main.temp} Celcius</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].main}
                />
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div>
            {countries.map((country) => {
              return (
                <div key={country.name.common}>
                  {country.name.common}{" "}
                  <button
                    onClick={() => {
                      setCountries([country]);
                    }}
                  >
                    show
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
