import React from "react";
import "./styles.css";

const CountryCard = ({ country }) => {
  if (!country) return null;
  return (
    <div className="Card">
      <div className="cardName">{country.name}</div>
      <h2>{country.altSpellings[1]}</h2>
      <table className="table-data">
        <tr>
          <td>Capital</td>
          <td>{country.capital}</td>
        </tr>
        <tr>
          <td>Population</td>
          <td>{country.population.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Currency</td>
          <td>{country.currencies[0].code}</td>
        </tr>
      </table>
    </div>
  );
};

export default CountryCard;
