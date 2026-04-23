import React from 'react';

const Greeting = ({ name }) => {
  const hour = new Date().getHours();
  let timeOfDay;

  if (hour < 12) timeOfDay = 'morning';
  else if (hour < 17) timeOfDay = 'afternoon';
  else timeOfDay = 'evening';

  return (
    <div className="greeting-block">
      <span className="greeting-label">Good {timeOfDay},</span>
      <h1>{name}</h1>
      <div className="date-time">
        <span className="hour-line">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span className="mood-line">Stay Inspired</span>
      </div>
    </div>
  );
};

export default Greeting;
