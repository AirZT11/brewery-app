import React from "react";
import BreweryCard from "../BreweryCard";
import SearchBar from "../SearchBar";

const BreweryList = ({ breweries, panTo, setSelectedBrew }) => {
  return (
    <div className="brewList-container">
      <div className="brewList">
        <SearchBar panTo={panTo} />
        {Array.isArray(breweries) ? (
          breweries.map((b) => (
            <div key={b.name}>
              {
                <BreweryCard
                  brewery={b}
                  panTo={panTo}
                  setSelectedBrew={setSelectedBrew}
                  panBtnView="block"
                />
              }
            </div>
          ))
        ) : (
          <BreweryCard
            brewery={breweries}
            panTo={panTo}
            setSelectedBrew={setSelectedBrew}
          />
        )}
      </div>
    </div>
  );
};

export default BreweryList;
