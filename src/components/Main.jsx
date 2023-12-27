import React, { useEffect, useState } from "react";
import "./Main.css";
import jsonData from "../data.json";



const Main = ({ weekDays }) => {


const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("../data.json", {  
      headers: {
        'Content-Type': 'application/json',  
        'Accept': "application/json"  
      }  
    })
      .then((response) => response.json())
      .then((data) => setJsonData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log("chk dta"+jsonData);

// to 24-hour format
function convertTo24HourFormat(time) {
  const [timePart, period] = time.split(' ');
  const [hour, minute] = timePart.split(':');

  let hour24 = parseInt(hour, 10);
  if (period === 'PM' && hour24 !== 12) {
    hour24 += 12;
  } else if (period === 'AM' && hour24 === 12) {
    hour24 = 0;
  }

  return `${hour24}:${minute}`;
}

    function isDateBeforeCurrentDate(inputDate) {
        const currentDate = new Date();
        const inputDateTime = new Date(inputDate);
      
        currentDate.setUTCHours(0, 0, 0, 0);
        inputDateTime.setUTCHours(0, 0, 0, 0);
      
        return inputDateTime < currentDate;
      }


  return (
    <div className="main">
      {/* Left main  */}
      {weekDays.map((day, index) => (
        <div className="datebox_main">
            <div className="datebox" key={index}>
            <h3>{day.day}</h3>
            <p>{day.date}</p>
            </div>

            <div className="timebox_main">
            {!isDateBeforeCurrentDate(day.date) ? (
              day.timeSlot.map((time, index) => {
                // Check if jsonData has a matching date and time
                const isMatchingDateTime = jsonData.some(
                  (data) => data.Date === day.date && data.Time === convertTo24HourFormat(time)
                );

                return (
                  <span className="timebox" key={index}>
                    <input
                      type="checkbox"
                      id={`${day.date}-${index}`}
                      name="subscribe"
                      value={time}
                      checked={isMatchingDateTime}
                    />
                    <label htmlFor={`${day.date}-${index}`}>{time}</label>
                  </span>
                );
              })
            ) : (
              <span>Past</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Main;
