import React, { useState, useRef, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX, FiCalendar, FiCheck } from 'react-icons/fi';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type DayType = 'prev' | 'curr' | 'next';
type CalendarDay = {
  date: dayjs.Dayjs;
  type: DayType;
};

type DateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  placeholder?: string;
  className?: string;
  format?: string;
  singleDateMode?: boolean;
  showPresets?: boolean;
  showClear?: boolean;
  zIndex?: number;
};

const PRESETS = [
  { label: 'Today', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: 'Yesterday', value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')] },
  { label: 'Last 7 Days', value: [dayjs().subtract(6, 'days').startOf('day'), dayjs().endOf('day')] },
  { label: 'Last 30 Days', value: [dayjs().subtract(29, 'days').startOf('day'), dayjs().endOf('day')] },
  { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: 'Last Month', value: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')] },
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
  placeholder = 'Select date range',
  className = '',
  format = 'MMM D, YYYY',
  singleDateMode = false,
  showPresets = true,
  showClear = true,
  zIndex = 1000,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const today = dayjs().utc();
  const [leftMonth, setLeftMonth] = useState(today.startOf('month'));
  const [rightMonth, setRightMonth] = useState(today.add(1, 'month').startOf('month'));
  const [focusedDate, setFocusedDate] = useState<dayjs.Dayjs | null>(null);
  const [hoveredDate, setHoveredDate] = useState<dayjs.Dayjs | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize months based on selected dates
  useEffect(() => {
    if (showCalendar) {
      if (startDate) {
        const startMonth = dayjs(startDate).startOf('month');
        setLeftMonth(startMonth);
        
        if (endDate) {
          const endMonth = dayjs(endDate).startOf('month');
          // If end month is same as start month, show next month
          if (endMonth.isSame(startMonth, 'month')) {
            setRightMonth(startMonth.add(1, 'month'));
          } else {
            setRightMonth(endMonth);
          }
        } else {
          setRightMonth(startMonth.add(1, 'month'));
        }
      } else {
        setLeftMonth(today.startOf('month'));
        setRightMonth(today.add(1, 'month').startOf('month'));
      }
    }
  }, [showCalendar, startDate, endDate]);

  // Focus management
  useEffect(() => {
    if (showCalendar) {
      inputRef.current?.focus();
      setFocusedDate(startDate ? dayjs(startDate) : today);
    }
  }, [showCalendar]);

  // Generate calendar for a month
  const generateCalendar = useCallback((month: dayjs.Dayjs): CalendarDay[][] => {
    const startOfMonth = month.startOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = startOfMonth.endOf('month').endOf('week');

    const days: CalendarDay[] = [];
    let cursor = startDate;

    while (cursor.isBefore(endDate) || cursor.isSame(endDate)) {
      let type: DayType = 'curr';
      if (cursor.isBefore(startOfMonth, 'month')) type = 'prev';
      else if (cursor.isAfter(startOfMonth, 'month')) type = 'next';
      days.push({ date: cursor, type });
      cursor = cursor.add(1, 'day');
    }

    // Group into weeks
    const weeks: CalendarDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, []);

  const leftWeeks = generateCalendar(leftMonth);
  const rightWeeks = generateCalendar(rightMonth);

  // Format display string
  const displayStr = startDate
    ? endDate
      ? `${dayjs(startDate).format(format)} - ${dayjs(endDate).format(format)}`
      : `${dayjs(startDate).format(format)}`
    : '';

  // Handle day click
  const handleDayClick = (date: dayjs.Dayjs) => {
    if (singleDateMode) {
      onChange(date.toDate(), null);
      return;
    }

    // If both dates are set or no start date, reset selection
    if (!startDate || (startDate && endDate)) {
      onChange(date.toDate(), null);
      // Set left calendar to selected date's month
      setLeftMonth(date.startOf('month'));
      // Set right calendar to next month
      setRightMonth(date.add(1, 'month').startOf('month'));
    } else {
      // Start date already set, selecting end date
      if (date.isBefore(dayjs(startDate))) {
        // Selected date is before start date, swap them
        onChange(date.toDate(), dayjs(startDate).toDate());
      } else {
        onChange(dayjs(startDate).toDate(), date.toDate());
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!focusedDate) return;

    if (e.key === 'ArrowRight') {
      setFocusedDate(focusedDate.add(1, 'day'));
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      setFocusedDate(focusedDate.subtract(1, 'day'));
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      setFocusedDate(focusedDate.add(1, 'week'));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setFocusedDate(focusedDate.subtract(1, 'week'));
      e.preventDefault();
    } else if (e.key === 'Enter' || e.key === ' ') {
      handleDayClick(focusedDate);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setShowCalendar(false);
    } else if (e.key === 'Tab') {
      setShowCalendar(false);
    }
  };

  // Navigation handlers
  const navigateMonths = (direction: 'prev' | 'next', side: 'left' | 'right') => {
    const setter = side === 'left' ? setLeftMonth : setRightMonth;
    const current = side === 'left' ? leftMonth : rightMonth;
    
    setter(direction === 'prev' 
      ? current.subtract(1, 'month') 
      : current.add(1, 'month'));
  };

  // Sync calendars when navigating
  const navigateMonthsSync = (direction: 'prev' | 'next') => {
    setLeftMonth(leftMonth[direction === 'prev' ? 'subtract' : 'add'](1, 'month'));
    setRightMonth(rightMonth[direction === 'prev' ? 'subtract' : 'add'](1, 'month'));
  };

  const navigateToToday = () => {
    const today = dayjs().utc();
    setLeftMonth(today.startOf('month'));
    setRightMonth(today.add(1, 'month').startOf('month'));
    setFocusedDate(today);
  };

  const clearSelection = () => {
    onChange(null, null);
    setShowCalendar(false);
  };

  const applyPreset = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    onChange(start.toDate(), end.toDate());
    setShowCalendar(false);
  };

  // Check if a date is in range
  const isInRange = (date: dayjs.Dayjs) => {
    if (!startDate || !endDate) return false;
    return date.isAfter(dayjs(startDate)) && date.isBefore(dayjs(endDate));
  };

  // Check if date is today
  const isToday = (date: dayjs.Dayjs) => {
    return date.isSame(dayjs(), 'day');
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ zIndex }}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={displayStr}
          onClick={() => setShowCalendar(!showCalendar)}
          placeholder={placeholder}
          className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
          aria-label="Select date range"
          aria-haspopup="dialog"
          aria-expanded={showCalendar}
        />
        <FiCalendar className="absolute left-3 top-3 text-gray-400 pointer-events-none" />
        {showClear && startDate && (
          <button
            onClick={clearSelection}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear selection"
          >
            <FiX />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showCalendar && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[1001] overflow-hidden"
            role="dialog"
            aria-label="Date range picker"
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col p-4 max-w-[640px]">
              {showPresets && (
                <div className="mb-4 pb-4 border-b">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Quick Select</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => applyPreset(preset.value[0], preset.value[1])}
                        className="py-2 px-3 text-sm border border-gray-200 rounded hover:bg-gray-50 transition-colors text-left"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Calendar navigation controls */}
              <div className="flex justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonthsSync('prev')}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous month"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={navigateToToday}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => navigateMonthsSync('next')}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next month"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
                {showClear && (
                  <button
                    onClick={clearSelection}
                    className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <div className="flex gap-6">
                {[
                  { month: leftMonth, weeks: leftWeeks, title: "Start Date Calendar" },
                  { month: rightMonth, weeks: rightWeeks, title: "End Date Calendar" }
                ].map(({ month, weeks, title }, idx) => (
                  <div key={idx} className="w-56">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => navigateMonths('prev', idx === 0 ? 'left' : 'right')}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Previous month"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="font-medium">
                        {months[month.month()]} {month.year()}
                      </div>
                      <button
                        onClick={() => navigateMonths('next', idx === 0 ? 'left' : 'right')}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Next month"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {weekdays.map((d) => (
                        <div key={d} className="text-xs font-medium text-gray-500 text-center py-1">
                          {d}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {weeks.flat().map((day, di) => {
                        const isStart = startDate && day.date.isSame(dayjs(startDate), 'day');
                        const isEnd = endDate && day.date.isSame(dayjs(endDate), 'day');
                        const inRange = isInRange(day.date);
                        const isFocused = focusedDate && day.date.isSame(focusedDate, 'day');
                        const isTodayDate = isToday(day.date);

                        return (
                          <button
                            key={di + (idx * 100)}
                            className={`
                              w-7 h-7 rounded-full text-sm flex items-center justify-center relative
                              ${day.type !== 'curr' ? 'text-gray-300' : 'text-gray-700'}
                              ${isStart ? 'bg-blue-600 text-white' : ''}
                              ${isEnd ? 'bg-green-600 text-white' : ''}
                              ${inRange ? 'bg-blue-100' : ''}
                              ${isTodayDate && day.type === 'curr' ? 'border border-blue-500' : ''}
                              ${isFocused ? 'ring-2 ring-blue-400' : ''}
                              ${day.type === 'curr' ? 'hover:bg-gray-100' : 'cursor-default'}
                            `}
                            role="gridcell"
                            aria-selected={isStart || isEnd||true}
                            aria-label={day.date.format('MMMM D, YYYY')}
                            tabIndex={isFocused ? 0 : -1}
                            data-focused={isFocused || undefined}
                            onClick={() => day.type === 'curr' && handleDayClick(day.date)}
                            onMouseEnter={() => day.type === 'curr' && setHoveredDate(day.date)}
                            onMouseLeave={() => setHoveredDate(null)}
                          >
                            {isStart && (
                              <span className="absolute left-0 w-full h-full bg-blue-600 rounded-full -z-10"></span>
                            )}
                            {isEnd && (
                              <span className="absolute left-0 w-full h-full bg-green-600 rounded-full -z-10"></span>
                            )}
                            {inRange && (
                              <span className="absolute left-0 w-full h-full bg-blue-100 -z-20"></span>
                            )}
                            <span className="z-10">{day.date.date()}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                <div className="text-sm flex items-center">
                  <div className="flex items-center mr-4">
                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
                    <span>Start Date</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-600 mr-1"></div>
                    <span>End Date</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FiCheck className="mr-1" />
                  Apply
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DateRangePicker;
