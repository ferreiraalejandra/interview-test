import React, { useEffect, useState } from "react";
import "./styles.css";

const CurrencyCard = ({ currencies, currency }) => {
  const [amountFrom, setAmountFrom] = useState(1);
  const [rate, setRate] = useState(1);
  const [currencyTo, setCurrencyTo] = useState();
  const [currencyQuery, setCurrencyQuery] = useState("");

  const selectCurrency = (evt) => {
    setCurrencyQuery(evt.target.value);
    const selectedCurrency = currencies.find(
      (curr) => curr.code === evt.target.value
    );
    if (selectedCurrency) setCurrencyTo(selectedCurrency);
  };

  useEffect(() => {
    if (currency && currencyTo) {
      const API_KEY = process.env.REACT_APP_FIXER_API_KEY
      fetch(
        `http://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=${currency.code},${currencyTo.code}`
      )
        .then((response) => response.json())
        .then((data) => {
          const rate = data.rates[currencyTo.code] / data.rates[currency.code];
          setRate(rate);
        });
    }
  });

  if (!currency) return null;

  return (
    <div className="Card">
      <div>
        <p className="converted-details">
          {amountFrom} {currency.name} equals to{" "}
          {(amountFrom * rate).toFixed(2)} {currencyTo?.name}
        </p>
      </div>
      <div className="currency-row">
        <label htmlFor="amount-from" hidden>
          From
        </label>
        <input
          className="currency"
          type="text"
          id="amount-from"
          onChange={(evt) => setAmountFrom(evt.target.value)}
          value={amountFrom}
        />
        <span className="span-currency-card">{currency.code}</span>
      </div>
      <div className="currency-row">
        <span className="span-currency-card">
          {(amountFrom * rate).toFixed(2)}
        </span>
        <input
          className="currency"
          type="text"
          list="currencies"
          value={currencyQuery}
          onChange={selectCurrency}
        />
        <datalist id="currencies">
          {currencies.map((cur) => (
            <option value={cur.code}>{cur.name}</option>
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default CurrencyCard;
