import { useState } from 'react'
import Search from './components/search/search'
import CurrentWeather from './components/current-weather/current-weather'
import './App.css'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import Forecast from './components/forecast/forecast'

function App() {
 
  const[currWeather, setCurrentWeather]= useState(null);
  const[forecast, setForecast]= useState(null);

  //it will take searchdata from onSearchChange and console log it
  const handleOnSearchChange= (SearchData) => {
     const[lat, lon]=SearchData.value.split(" ")        //SearchData.value contains longitude and latitude we are spliting and storing them in respective variable
  
    const currentWeatherFetch= fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch= fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async(response)=> {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city:SearchData.label ,...weatherResponse});
        setForecast({city:SearchData.label ,...forecastResponse});
      })
      .catch((err) => console.log(err));
    }

    // console.log(currWeather);
    console.log(forecast)
  
  // we are calling search component in this div
  return (
    <div className='container'>   
    {/* we are calling onSearchChange from search.jsx by passing searchData as argument and  onSearchChange is calling handleOnSearchChange*/}
        <Search onSearchChange={handleOnSearchChange}/>  
        {currWeather && <CurrentWeather data={currWeather}/>}
        {forecast && <Forecast data={forecast}/>}
    </div>

  )
}

export default App
