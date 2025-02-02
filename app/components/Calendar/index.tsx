import React, { useState, useEffect } from 'react';

type CalendarProps = {
  colorTheme?: 'blue' | 'green' | 'purple' | 'red' | 'indigo';
  showHeader?: boolean;
  showFooter?: boolean;
  showWeekNumbers?: boolean;
  compactMode?: boolean;
  onDateSelect?: (date: Date) => void;
  customDayRenderer?: (date: Date) => React.ReactNode;
  startOfWeek?: 'sunday' | 'monday';
};

const Calendar: React.FC<CalendarProps> = ({
  colorTheme = 'blue',
  showHeader = true,
  showFooter = true,
  showWeekNumbers = false,
  compactMode = false,
  onDateSelect,
  customDayRenderer,
  startOfWeek = 'sunday'
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const today = new Date();

  const themeColors = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
    green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
    red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-50' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-50' },
  };

  const getMonthYear = () => ({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  });

  const getDaysInMonth = (month: number, year: number) => 
    new Date(year, month + 1, 0).getDate();

  const getStartDayOfMonth = (month: number, year: number) => 
    new Date(year, month, 1).getDay();

  const generateCalendar = () => {
    const { month, year } = getMonthYear();
    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getStartDayOfMonth(month, year);
    const prevMonthDays = getDaysInMonth(month - 1, year);
    
    const days = [];
    const offset = startOfWeek === 'monday' ? (startDay === 0 ? 6 : startDay - 1) : startDay;

    // Previous month days
    for (let i = offset - (startOfWeek === 'monday' ? 1 : 0); i > 0; i--) {
      days.push({ day: prevMonthDays - i + 1, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }

    // Next month days
    const totalCells = showWeekNumbers ? 7 * 6 - 1 : 7 * 6;
    while (days.length < totalCells) {
      days.push({ day: days.length - daysInMonth - offset + 1, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (months: number) => 
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + months)));

  const handleDateSelect = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = startOfWeek === 'sunday' 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className={`p-4 ${themeColors[colorTheme].bg} rounded-xl shadow-lg transition-all duration-300`}>
      {showHeader && (
        <header className="flex items-center justify-between mb-4 px-2">
          <button
            onClick={() => navigateMonth(-1)}
            className={`p-2 rounded-full ${themeColors[colorTheme].hover} transition-colors`}
          >
            ❮
          </button>
          <h2 className={`text-xl font-semibold ${themeColors[colorTheme].text}`}>
            {monthNames[getMonthYear().month]} {getMonthYear().year}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className={`p-2 rounded-full ${themeColors[colorTheme].hover} transition-colors`}
          >
            ❯
          </button>
        </header>
      )}

      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(day => (
          <div key={day} className={`text-center text-sm font-medium ${themeColors[colorTheme].text}`}>
            {compactMode ? day[0] : day}
          </div>
        ))}

        {generateCalendar().map(({ day, isCurrentMonth }, index) => {
          const date = new Date(currentDate);
          date.setDate(day);
          const isToday = date.toDateString() === today.toDateString();
          const isSelected = selectedDate?.toDateString() === date.toDateString();

          return (
            <div
              key={index}
              onClick={() => handleDateSelect(day, isCurrentMonth)}
              className={`
                h-10 flex items-center justify-center rounded-lg transition-all
                ${isCurrentMonth ? 'cursor-pointer hover:bg-white' : 'opacity-40'}
                ${isToday ? `font-bold ${themeColors[colorTheme].text}` : ''}
                ${isSelected ? `bg-white ${themeColors[colorTheme].text} shadow` : ''}
                ${compactMode ? 'text-sm' : 'text-base'}
              `}
            >
              {customDayRenderer ? customDayRenderer(date) : day}
            </div>
          );
        })}
      </div>

      {showFooter && (
        <footer className="mt-4 flex justify-center">
          <button
            onClick={() => setCurrentDate(new Date())}
            className={`px-4 py-2 rounded-lg ${themeColors[colorTheme].hover} ${themeColors[colorTheme].text}`}
          >
            Today
          </button>
        </footer>
      )}
    </div>
  );
};

export default Calendar;