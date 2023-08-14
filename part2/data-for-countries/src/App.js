import React, {useState, useEffect} from "react";
import axios from "axios";

const SearchBar = (props) => {
  const {search, behiavor} = props
  return(
    <div>
      find countries: <input value={search} onChange={behiavor}/>
    </div>
  )
}

const CountryName = (props) => {
  const {name, handleView, index} = props

  return(
    <div>
      {name} <button onClick={() => handleView(index)}>show</button>
    </div>
  )
}

const Country = (props) => {  
  const {country} = props
  const values = Object.values(country.languages)
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        console.log("Promise Fullfiled")
        setWeather(response)
      })
  }, [])

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>populaton {country.population}</p>
      <h2>languages</h2>
      <ul>
        {values.map(v => <li key={v}>{v}</li>)}
      </ul>
      <img src={country.flags.svg} height={100}></img>
      <h2>Weather in {country.name.common}</h2>
      {weather.data ? (
        <>
          <p><strong>temperature: </strong> {weather.data.current.temperature} Celsius</p>
          <img src={weather.data.current.weather_icons} height={100}></img>
          <p><strong>wind:</strong> {weather.data.current.wind_speed} mph direction {weather.data.current.wind_dir}</p>
        </>
      ) : (
        <p>Wheather loading...</p>
      )}
    </div>
  )
}

const Countries = (props) => {
  const {countries, handleView, view} = props
  console.log(countries);

  if(countries.length === 1){
    return(
      <Country country={countries[0]} />
    )
  }
  if(view !== -1){
    return(
      <Country country={countries[view]} />
    )
  }
  if(countries.length < 11){
    console.log("Lista paises");
    return(
      <div>
        {countries.map((country, index) => <CountryName key={country.name.common} name={country.name.common} handleView={handleView} index={index}/>)}
      </div>
    )
  }else{
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [view, setView] = useState(-1)

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log("Promise fullfilled");
        setData(data.concat(response.data))
      })
  }, [])

  const handleSearch = (event) => {
    const text = event.target.value
    console.log(text);
    setSearch(text)
    setView(-1)
  }

  const countriesToShow = search === '' ? [] : data.filter(country => country.name.common.toLowerCase().includes(search))

  const handleView = (index) => {
    setView(index)
    console.log(index);
  }

  return (
    <div>
      <SearchBar search={search} behiavor={handleSearch} />
      <Countries countries={countriesToShow} handleView={handleView} view={view} />   
    </div> 
  );
}

export default App;
