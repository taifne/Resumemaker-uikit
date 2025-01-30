import React, { useState } from 'react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthYear = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    return { month, year };
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const { month, year } = getMonthYear();
    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getStartDayOfMonth(month, year);

    let calendarDays = [];
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const currentDay = currentDate.getDate();

  const { month, year } = getMonthYear();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <button onClick={previousMonth} className="nav-button">❮</button>
        <h2 className="month-year">{monthNames[month]} {year}</h2>
        <button onClick={nextMonth} className="nav-button">❯</button>
      </header>

      <div className="calendar-grid">
        <div className="day-name">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>

        {generateCalendar().map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day === currentDay ? 'today' : ''} ${day === null ? 'empty' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
