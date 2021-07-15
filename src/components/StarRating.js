import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import '../css/Rating.css';
import { postRating } from '../actions/ratingActions';

// TODO: 
    // Display how many ratings there are for a specific brewery - DONE
    // *Figure out why cancelling rating activates postRating Action*
    // Add a popup component that lets you sign in or sign up
    // Make the <p> tag for # of reviews be a link to see the reviews

const StarRating = ({breweryId, currentUser, breweryName, allRatings, postRating}) => {
  const [breweryRatings, setBreweryRatings] = useState([]); 
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [submitDisplay, setSubmitDisplay] = useState('none');
  const [review, setReview] = useState('');

  useEffect(() => {
    filterBreweryRatings(breweryId)
  }, [])

  // filters allRatings and returns ratings for brewery
  const filterBreweryRatings = breweryId => {
    const filteredRatings = allRatings.filter(rating => {
      return rating.brewery_id === breweryId
    })
    if (filteredRatings.length > 0) {
      setBreweryRatings(filteredRatings)
    }
  }

  const handleClick = (ratingVal) => {
    if (currentUser) {
      setRating(ratingVal)
      setSubmitDisplay('block')
    } else {
      // Add a popup component that lets you sign in or sign up
      alert('Please sign up or sign in to submit a review')
    }
  }

  const handleChange = (event) => {
    setReview(event.target.value)
  }

  const handleCancel = () => {
    setSubmitDisplay('none')
    setRating('null')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const state = {
      rating: rating,
      userId: currentUser.user.id,
      breweryId: breweryId,
      breweryName: breweryName,
      review: review
    }
    postRating(state)
    setSubmitDisplay('none')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;

        return (
        <label>
          <input 
            type='radio' 
            name='rating' 
            value={ratingVal} 
            onClick={() => handleClick(ratingVal) } 
            style={{display: 'none' }}
          />
          < FaStar 
            className='star' 
            onMouseEnter={() => setHover(ratingVal)}
            onMouseLeave={() => setHover(null)}
            color={ratingVal <= (hover || rating) ? '#ffc107' : '#e4e5e9'} 
          />
        </label>
      )})}
      <p>{breweryRatings.length} Reviews</p>
      <div style={{display: submitDisplay}} >
        <input type='text' name='review' onChange={handleChange} placeholder='Submit a review...'></input>
        <button onClick={handleCancel} >Cancel</button>
        <input type='submit' ></input>
      </div>
      
      </form>
      
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser,
  allRatings: state.ratingData.ratings
})

export default connect(mapStateToProps, { postRating })(StarRating);