import React from "react";
import "./styles.css";

const CountryCard = ({ country }) => {
  if (!country) return null;
  const { name, capital, population, currencies, altSpellings } = country;
  return (
    <div className="Card">
      <div className="cardName">{name}</div>
      <h2>{altSpellings[1]}</h2>
      <table className="table-data">
        <tr>
          <td>Capital</td>
          <td>{capital}</td>
        </tr>
        <tr>
          <td>Population</td>
          <td>{population.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Currency</td>
          <td>{currencies[0].code}</td>
        </tr>
      </table>
    </div>
  );
};

export default CountryCard;
