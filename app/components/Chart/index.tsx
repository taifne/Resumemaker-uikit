import React, { useState } from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
  title?: string;
  orientation?: "horizontal" | "vertical";
}

const BarChart: React.FC<BarChartProps> = ({ data, title, orientation = "vertical" }) => {
  const [minValue, setMinValue] = useState(Math.min(...data.map(d => d.value)));
  const [maxValue, setMaxValue] = useState(Math.max(...data.map(d => d.value)));

  const handleDrag = (event: React.MouseEvent<HTMLDivElement>, isMin: boolean) => {
    const parent = event.currentTarget.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const scale = (maxValue - minValue) / parentRect.width;

    const moveHandler = (moveEvent: MouseEvent) => {
      const newValue =
        Math.min(...data.map(d => d.value)) +
        (moveEvent.clientX - parentRect.left) * scale;

      if (isMin) {
        setMinValue(
          Math.max(
            Math.min(newValue, maxValue - 1),
            Math.min(...data.map(d => d.value))
          )
        );
      } else {
        setMaxValue(
          Math.min(
            Math.max(newValue, minValue + 1),
            Math.max(...data.map(d => d.value))
          )
        );
      }
    };

    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler as unknown as EventListener);
      document.removeEventListener("mouseup", upHandler as unknown as EventListener);
    };

    document.addEventListener("mousemove", moveHandler as unknown as EventListener);
    document.addEventListener("mouseup", upHandler as unknown as EventListener);
  };

  return (
    <div className="p-4 border rounded w-full max-w-lg">
      {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

      <div className="relative">
        {orientation === "vertical" && (
          <div className=" items-center gap-2 flex ml-2">
            {data
              .filter(d => d.value >= minValue && d.value <= maxValue)
              .map((d, index) => (
                <span className="w-7  relative relative rounded-full overflow-hidden" key={index}>{d.label}</span>
              ))}
          </div>
        )}

        <div className={`flex ${orientation === "horizontal" ? "flex-col" : "flex-row"} gap-2 mt-2 border-l border-b border-gray-400 p-2 relative w-80 h-80`}> 
          {data
            .filter(d => d.value >= minValue && d.value <= maxValue)
            .map((d, index) => (
              <div key={index} className="flex items-center gap-2">
                {orientation === "horizontal" ? (
                  <div className="flex items-center w-full">
                    <span className="w-10 text-right text-sm font-medium">{d.label}</span>
                    <div className="w-full bg-gray-300 relative rounded-full ml-2">
                      <div
                        className="bg-blue-500 text-white text-center bg-gradient-to-t from-blue-500 to-teal-500 text-white text-center py-2 w-full rounded-full py-1"
                        style={{ width: `${(d.value / maxValue) * 100}%` }}
                      >
                        {d.value}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full w-7 bg-gray-300 relative  bg-gray-300 relative rounded-full overflow-hidden">
                     
                    <div
                      className="bg-gradient-to-t from-blue-500 to-teal-500 text-white text-center py-2 w-full rounded-full"
                      style={{ height: `${(d.value / maxValue) * 100}%` }}
                    >
                      {d.value}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      <div className="relative h-8 bg-gray-200 mt-4 flex items-center">
        <div
          className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
          style={{ left: `${((minValue - Math.min(...data.map(d => d.value))) / (Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value)))) * 100}%` }}
          onMouseDown={(e) => handleDrag(e, true)}
        ></div>
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer"
          style={{ left: `${((maxValue - Math.min(...data.map(d => d.value))) / (Math.max(...data.map(d => d.value)) - Math.min(...data.map(d => d.value)))) * 100}%` }}
          onMouseDown={(e) => handleDrag(e, false)}
        ></div>
      </div>

      <div className="text-center text-sm mt-2">
        Range: {minValue.toFixed(1)} - {maxValue.toFixed(1)}
      </div>
    </div>
  );
};

export default BarChart;
