'use-client'

import { useState, useEffect } from "react";
import Image from 'next/image';

const Weather = ({ value, year, month, day }) => {

    const [weather, setWeather] = useState({
        /*  min: Number,
         max: Number,
         name: String,
         main: String,
         avgClouds: Number, */
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=7ca6af663011c294f639e4c682834e46&units=metric`);
                    const data = await response.json();
                    const currentWeather = data.list.filter((item) => item.dt_txt.includes(`${year}-0${month}-${day}`))
                    const min = currentWeather.map(item => item.main.temp_min).sort((a, b) => a - b)[0]
                    const max = currentWeather.map(item => item.main.temp_max).sort((a, b) => b - a)[0]
                    const main = currentWeather.map(item => item.weather[0].main)
                    const name = data.city.name
                    const clouds = currentWeather.map(item => item.clouds.all)
                    const avgClouds = clouds.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / (clouds.length)
                    if (currentWeather.length > 0) {
                        setWeather({ min: min, max: max, name: name, main: 'Clouds', avgClouds: avgClouds })
                    } else {
                        setWeather(null)
                    }
                    console.log(weather)
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [value]);
    return (
        weather && <div className="weather blue_gradient">
            <Image width={30} height={30} src={weather.avgClouds > 50 ? '/assets/cloudy.svg' : '/assets/sunny.svg'} alt='weather' />
            <p>{Math.floor(weather.min)}°C - {Math.floor(weather.max)}°C</p>
        </div>)
}

export default Weather