import React, { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search'
import Header from './components/Header'
import CountryCard from './components/CountryCard';
import CurrencyCard from './components/CurrencyCard';

const getCurrency = (country) => {
  if (!country) return null
  return country.currencies[0]
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState()
  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data => {
        setCurrencies(data.map(country => country.currencies[0]))
      })
  }, [])

  return (
    <div className="App">
      <div className="Header-Container">
        <Header />
        <Search onSelect={setSelectedCountry}/>
      </div>
      <div className="Card-Container">
        <CountryCard country={selectedCountry}/>
        <CurrencyCard currencies={currencies} currency={getCurrency(selectedCountry)}/>
      </div>
    </div>
  );
}

export default App;
