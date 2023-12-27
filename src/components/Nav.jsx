import React from 'react'
import './Nav.css'

const Nav = ({onStateChange}) => {

    let date = new Date();
    let day = date.getDate();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    const handlePrev = () => {
      onStateChange(prevWeek=>prevWeek-7);
    };
    const handleNext = () => {
      onStateChange(prevWeek=>prevWeek+7);
    };
    
  return (
    <div className='nav'>
        <button onClick={handlePrev}>Prev</button>
        <h3>{`${month} ${day} ${year}`}</h3>
        <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default Nav