// filters allRatings from redux ratings state and returns ratings for brewery
// allRatings = ratingData from redux store
// breweryId = id that is passed down from component using this function
// stateSetter = useState setter
const filterBreweryRatings = (allRatings, breweryId, stateSetter) => {
  const filteredRatings = allRatings.filter(rating => {
    return rating.brewery_id === breweryId
  })
  if (filteredRatings.length > 0) {
    stateSetter(filteredRatings)
  }
}

export default filterBreweryRatings;