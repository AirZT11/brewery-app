import React from "react";
import BreweryCard from "../BreweryCard";
import Loading from "../Loading";

const BreweryList = ({ breweries, listStyle }) => {
  return (
    <div className={listStyle}>
      <Loading type="bars" />
      {breweries.map((b) => (
        <div key={b.name}>{<BreweryCard brewery={b} />}</div>
      ))}
    </div>
  );
};

export default BreweryList;
