
import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import TimeZone from "./components/TimeZone";
import { useState,useEffect } from "react";

function App() {


  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./data.json");
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the component mounts

console.log(jsonData);


  // Current Date
  function getCurrentDate(daysToAdd) {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const[week, setWeek] = useState(0);
  const handleChildStateChange = (newState) => {
    setWeek(newState);
  };
  const currentDate = getCurrentDate(week);

  function getWeekDaysFromDate(date) {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const inputDate = new Date(date);
    const dayIndex = inputDate.getUTCDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const daysInWeek = [];

    // Calculate the difference between the current day and Monday
    const daysDifference = (dayIndex + 6) % 7;

    // Calculate the date for Monday of the current week
    const mondayDate = new Date(inputDate);
    mondayDate.setUTCDate(inputDate.getUTCDate() - daysDifference);

    // Populate the array with week days (excluding Saturday and Sunday)
    for (let i = 0; i < 5; i++) {
      const currentDay = new Date(mondayDate);
      currentDay.setUTCDate(mondayDate.getUTCDate() + i);






      // Add time slots from 8:00 AM to 11:30 PM with half-hour intervals
      const timeSlots = [];
let startTime = new Date(currentDay);
startTime.setUTCHours(8, 0, 0);

while (startTime.getUTCHours() < 23 || (startTime.getUTCHours() === 12 && startTime.getUTCMinutes() <= 30)) {
  const hours = startTime.getUTCHours() % 12 || 12; // Convert to 12-hour format
  const minutes = startTime.getUTCMinutes();
  const ampm = startTime.getUTCHours() < 12 ? 'AM' : 'PM';

  // Format the time as 'hh:mm AM/PM'
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
  
  timeSlots.push(formattedTime);
  startTime.setUTCMinutes(startTime.getUTCMinutes() + 30);
}





      daysInWeek.push({
        day: daysOfWeek[i],
        date: currentDay.toISOString().split("T")[0],
        timeSlot: timeSlots,
      });
    }

    return daysInWeek;
  }

  // Example usage
  const inputDate = currentDate; // Replace with your desired date in 'YYYY-MM-DD' format
  const weekDays = getWeekDaysFromDate(inputDate);


  return (
    <div className="App">
      <Nav onStateChange={handleChildStateChange}/>
      <TimeZone />
      <Main weekDays={weekDays}  />
    </div>
  );
}

export default App;
