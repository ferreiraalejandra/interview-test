import React, { useState } from "react";
import './styles.css';

const Search = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [matchedCountries, setMatchedCountries] = useState([]);

  const searchCountry = async (event) => {
    const newQuery = event.target.value
    setQuery(newQuery);
    const request = await fetch(
        "https://restcountries.eu/rest/v2/name/" + event.target.value
    ).catch((error) => console.log(error));
    
    if (request.status !== 200) return null
    const response = await request.json()
    setMatchedCountries(response);

    const country = matchedCountries.find(
      (matchedCountry) => matchedCountry.name === newQuery
    );
    if (country) onSelect(country);
  };

  return (
    <div className="Search">
      <label className="label">Country</label>
      <input className="Input" onChange={searchCountry} list="countries" value={query}/>
      <datalist id="countries">
        {matchedCountries.map((country) => (
          <option key={country.name} value={country.name} />
        ))}
      </datalist>
    </div>
  );
};

export default Search;
