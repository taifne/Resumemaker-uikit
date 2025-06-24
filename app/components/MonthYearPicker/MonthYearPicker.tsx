'use client';

import React from 'react';

type Props = {
  value: string; // "YYYY-MM"
  onChange: (newValue: string) => void;
  minYear?: number;
  maxYear?: number;
};

const MonthYearPicker: React.FC<Props> = ({
  value,
  onChange,
  minYear = 2020,
  maxYear = new Date().getFullYear(),
}) => {
  const [year, setYear] = React.useState(() => parseInt(value.split('-')[0]));
  const [month, setMonth] = React.useState(() => parseInt(value.split('-')[1]));

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setYear(newYear);
    onChange(`${newYear}-${month.toString().padStart(2, '0')}`);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    setMonth(newMonth);
    onChange(`${year}-${newMonth.toString().padStart(2, '0')}`);
  };

  return (
    <div className="flex space-x-2">
      <select
        value={year}
        onChange={handleYearChange}
        className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
      >
        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={handleMonthChange}
        className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
          <option key={m} value={m}>
            {new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearPicker;
