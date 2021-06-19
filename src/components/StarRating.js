import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import '../css/Rating.css';

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingVal = i + 1;

        return (
        <label>
          <input 
            type='radio' 
            name='rating' 
            value={ratingVal} 
            onClick={() => setRating(ratingVal) } 
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
    </div>
  )
}

export default StarRating;