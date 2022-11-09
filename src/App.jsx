import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()

  useEffect(() => {
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords){
      const APIKEY = '9f83df5429dcfe13226812a4ad7c537c'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(0)
          const fahrenheit = (celsius * 9 / 5 + 32).toFixed(0)
          setTemperature({active: 'celsius', celsius, fahrenheit})
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])
  
  return (
    <div className="App">
      <div className='background'><video src="/video/video-background.mp4" autoPlay muted loop playsInline></video></div>
      {
        weather ?
          <WeatherCard weather={weather} temperature={temperature} />
        :
          <Loading />
      }    
    </div>
  )
}

export default App
