import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import { Icon } from "semantic-ui-react";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const CurrentDate = () => {
    const currentDate = new Date().toLocaleString();
  }

  const allIcon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": snow,
    "10n": snow,
    "13d": wind,
    "13n": wind,
  };
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcon[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search(inputRef.current.value);
    }
  };
  // useEffect(() => {
  //   search("Mumbai");
  // }, []);
  return (
    <div className="weather">
      <div className="searchBar">
        <input ref={inputRef} type="text" placeholder="Search"  onKeyDown={handleKeyPress}/>
        <button onClick={() => search(inputRef.current.value)}>
          <Icon
            name="search"
            className="icon"
            onClick={() => search(inputRef.current.value)}
          />
        </button>
      </div>
      <div className="weatherCard">
        <img src={weatherData.icon} alt="" />
        <p className="temp">{weatherData.temp}°C</p>
        <p className="loc">{weatherData.location}</p>
        <p>{CurrentDate}</p>
      </div>
      <div className="weatherData">
        <div className="col">
          <img src={humidity} alt="" className="icon1" />
          <div className="col-txt">
            <p>{weatherData.humidity}% </p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" className="icon1" />
          <div className="col-txt">
            <p>{weatherData.windSpeed}% </p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
