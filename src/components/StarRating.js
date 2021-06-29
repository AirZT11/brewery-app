import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import '../css/Rating.css';
import { postRating } from '../actions/ratingActions';

const StarRating = ({breweryId, userId, breweryName, postRating}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [submitDisplay, setSubmitDisplay] = useState('none');
  const [review, setReview] = useState('');

  const handleClick = (ratingVal) => {
    setRating(ratingVal)
    setSubmitDisplay('block')
  }

  const handleChange = (event) => {
    setReview(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const state = {
      rating: rating,
      userId: userId,
      breweryId: breweryId,
      breweryName: breweryName,
      review: review
    }
    postRating(state)
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
      <input type='text' name='review' onChange={handleChange} style={{display: submitDisplay}} placeholder='Submit a review...'></input>
      <input type='submit' style={{display: submitDisplay}}></input>
      </form>
      
    </div>
  )
}

const mapStateToProps = state => ({
  userId: state.userData.currentUser.user.id
})

export default connect(mapStateToProps, { postRating })(StarRating);