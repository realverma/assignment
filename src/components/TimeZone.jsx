import React from "react";
import "./TimeZone.css";

const TimeZone = () => {
  return (
    <div className="time">
      <h3>TimeZone</h3>
      <div className="timezone">
        <select id="timezone" name="timezone" class="custom-select">
          <option value="Pacific/Honolulu">UTC-0</option>
          <option value="America/Anchorage">
            America/Los_Angeles GMT-8:00
          </option>
        </select>
      </div>
    </div>
  );
};

export default TimeZone;
