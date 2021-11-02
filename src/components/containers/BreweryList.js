import React from "react";
import BreweryCard from "../BreweryCard";
import Loading from "../Loading";
import SearchBar from "../SearchBar";

const BreweryList = ({
  breweries,
  listStyle,
  panTo,
  setSelectedBrew,
  handleChange,
  handleSubmit,
  searchInput,
}) => {
  return (
    <div className="brewList-container">
      <div className="brewList">
        {/* <Loading type="bars" /> */}
        <SearchBar
          handleChange={handleChange}
          searchInput={searchInput}
          handleSubmit={handleSubmit}
        />
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
