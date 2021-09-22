import React from "react";
import BreweryCard from "../BreweryCard";
import Loading from "../Loading";

const BreweryList = ({ breweries, listStyle, panTo, setSelectedBrew }) => {
  return (
    <div className={listStyle}>
      <Loading type="bars" />
      {breweries.map((b) => (
        <div key={b.name}>
          {
            <BreweryCard
              brewery={b}
              panTo={panTo}
              setSelectedBrew={setSelectedBrew}
            />
          }
        </div>
      ))}
    </div>
  );
};

export default BreweryList;
