import { useState } from 'react';
import './Calendar.css';

function Calendar({ selectedDate, setSelectedDate }) {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const today = new Date();
  const isSameDay = (d1, d2) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();

  const calendarDays = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isGhost: true,
      date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
    });
  }

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    calendarDays.push({
      day,
      isGhost: false,
      date: new Date(currentYear, currentMonth, day),
    });
  }


  const totalSlots = Math.ceil(calendarDays.length / 7) * 7;
  const nextMonthGhosts = totalSlots - calendarDays.length;
  for (let i = 1; i <= nextMonthGhosts; i++) {
    calendarDays.push({
      day: i,
      isGhost: true,
      date: new Date(currentYear, currentMonth + 1, i),
    });
  }

  const handleNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handlePrevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  return (
    <div className='calendar-root'>
    <div className='calendar-wrapper'>
        <div className="calendar-header-row">
          <button onClick={handlePrevMonth} className="nav-arrow">&lt;</button>
          <h4>
            {selectedDate.toLocaleString('default', { month: 'long' })} {currentYear}
          </h4>
          <button onClick={handleNextMonth} className="nav-arrow">&gt;</button>
        </div>

        <div className="calendar-header">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-name">{day}</div>
          ))}
        </div>

        <div className="calendar-body">
          {calendarDays.map((dateObj, index) => (
            <button
              key={index}
              className={`day-cell
                ${dateObj.isGhost ? 'ghost' : ''}
                ${isSameDay(dateObj.date, today) ? 'today' : ''}
                ${isSameDay(dateObj.date, selectedDate) ? 'selected' : ''}
              `}
              onClick={() =>
                !dateObj.isGhost && setSelectedDate(dateObj.date)
              }
            >
              {dateObj.day}
            </button>
          ))}
      </div>

      <p className="selected-info">
        Today: <strong>{today.toDateString()}</strong>
      </p>
    </div>
    </div>
  );
}

export default Calendar;
