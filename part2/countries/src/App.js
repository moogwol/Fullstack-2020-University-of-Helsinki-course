import React, {useState, useEffect} from 'react'
import Filter from './components/filter'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([]) // The full list of countries from the API
  const [searchedCountry, setSearchedCountry] = useState('') // The current user search
  const [possibleCountries, setPossibleCountries] = useState([]) // The list of possible countries
  const [currentCountry, setCurrentCountry] = useState('') // The search narrowed down to one country
  const [showSingleCountry, setShowSingleCountry] = useState(false)
  const [weather, setWeather] = useState('')

  const weatherIconURL = weather === ''
                       ? '' : `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  console.log('weather icon url:', weatherIconURL)


  const weather_api_key = process.env.REACT_APP_API_KEY
  console.log('weather key:', weather_api_key)

  // Log the state of currentCountry
  console.log('current country:', currentCountry === ''
              ? 'no country' : currentCountry[0].name)
  console.log('show single country:', showSingleCountry)
  console.log('possible countries:', possibleCountries.length)
  console.log('capital:', currentCountry === ''
              ? 'no capital' : currentCountry[0].capital)
  console.log('weather:', weather)
  console.log('weather:', weather === ''
              ? 'no weather' : weather.weather[0].description)

  // Get the country data from the API
  const countriesRequest = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('request status:', response.status)
      setCountries(response.data)
    })
  }
  useEffect(countriesRequest, [])

  const weatherRequest = () => {
    const city = currentCountry === ''
     ? 'London'
     : currentCountry[0].capital
    console.log('city', city)
    const params = {
      appid: weather_api_key ,
      q: city
    }
    axios
    .get('https://api.openweathermap.org/data/2.5/weather/', {params})
    .then(response => {
      setWeather(response.data)
    }).catch(error => {
      console.log(error)
    })
  }
  useEffect(weatherRequest, [currentCountry]) // runs weatherRequest each time current country changes


  // If the number of possible countries in the user search is narrowed down to
  // one, set the currentCountry to that country.
  const handleCountrySearch = (event) => {
    console.log('current user search:', event.target.value)
    setSearchedCountry(event.target.value)
    if (countryToShow.length === 1) {
      setCurrentCountry(countryToShow)
      setShowSingleCountry(true)
    }
    setPossibleCountries(countryToShow)
  }

  const handleClick = (content) => {
    console.log(content)
    setCurrentCountry([content])
    setShowSingleCountry(true)
  }

  // The filter method for the user's search
  const countryToShow = countries.filter(country =>
    country.name.toLowerCase().includes(searchedCountry))


  const pageContent =
               showSingleCountry ? currentCountry
             : possibleCountries.length === 0 ? 'Search for a country'
             : possibleCountries.length > 10 ? 'too many possibilities'
             : possibleCountries
  console.log('page content:', pageContent, typeof pageContent, typeof pageContent === 'string')

  const ShowPageContent = () =>
               typeof pageContent === 'string' ? <div>{pageContent}</div>
               // if there is a single country show the details
              : showSingleCountry ?
                <div>
                  {currentCountry.map(country =>
                    <ul key={country.alpha2Code}>
                      <div key={country.alpha3Code}><h1>{country.name}</h1></div>
                      <div>population: {country.population}</div>
                      <div>Capital: {country.capital}</div>
                      <div><h2>Languages</h2></div>
                      {country.languages.map(language =>
                        <ul key={language.name}>
                          <li key={language.name}>{language.name}</li>
                        </ul>)}
                      <div><img src={country.flag} style={{ width: 500, margin:10 }}/></div>
                      <div><h2>Weather in {country.capital}</h2></div>
                      <div><h4>{weather.weather[0].description}</h4></div>
                      <div><img src={weatherIconURL}/></div>
                      <div>temperature: {Math.round(weather.main.temp - 273.15)}&deg;</div>
                      <div>Wind: {weather.wind.speed} mph direction {weather.wind.deg}&deg;</div>
                    </ul>
                  )}

                </div>
              // If there are between 2-10 possibilities show a list of countries
              : <div><ul>{possibleCountries.map(country =>
              <div key={country.alpha2Code}>{country.name} <button  onClick={() => handleClick(country)}>show</button></div>)}</ul></div>

  // put the page elements to be rendered here
  return (
    <>
    <Filter search={searchedCountry} handle={handleCountrySearch}/>
    <ShowPageContent />
    </>
  )
}

export default App
