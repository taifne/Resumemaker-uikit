import React, { useState, useEffect, useCallback, useRef } from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
  title?: string;
  orientation?: "horizontal" | "vertical";
  barColor?: string;
  barGradient?: [string, string];
  axisColor?: string;
  showValues?: boolean;
  showAxis?: boolean;
  rangeSlider?: boolean;
  className?: string;
  barRadius?: number;
  padding?: number;
  loadMoreData?: () => void;  // Function to load more data when scrolling
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  orientation = "vertical",
  barColor = "#3B82F6",
  barGradient,
  axisColor = "#6B7280",
  showValues = true,
  showAxis = true,
  rangeSlider = true,
  className = "",
  barRadius = 4,
  padding = 8,
  loadMoreData,  // Callback for loading more data when scrolled to bottom
}) => {
  const [minValue, setMinValue] = useState(Math.min(...data.map(d => d.value)));
  const [maxValue, setMaxValue] = useState(Math.max(...data.map(d => d.value)));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Handle data changes
  useEffect(() => {
    const newMin = Math.min(...data.map(d => d.value));
    const newMax = Math.max(...data.map(d => d.value));
    setMinValue(newMin);
    setMaxValue(newMax);
  }, [data]);

  // Resize observer callback function
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setContainerSize({ width, height });
      });
      resizeObserver.observe(containerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, []);

  // Infinite scrolling effect
  useEffect(() => {
    const onScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const scrollHeight = containerRef.current.scrollHeight;
        const clientHeight = containerRef.current.clientHeight;

        // When user scrolls to the bottom, load more data
        if (scrollTop + clientHeight >= scrollHeight - 10 && loadMoreData) {
          loadMoreData(); // Load more data if function exists
        }
      }
    };

    containerRef.current?.addEventListener("scroll", onScroll);

    return () => {
      containerRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [loadMoreData]);

  const filteredData = data.filter(d => d.value >= minValue && d.value <= maxValue);
  const dataMin = Math.min(...data.map(d => d.value));
  const dataMax = Math.max(...data.map(d => d.value));

  const handleDrag = useCallback((event: React.MouseEvent<HTMLDivElement>, isMin: boolean) => {
    if (!containerRef.current) return;

    const parentRect = containerRef.current.getBoundingClientRect();
    const scale = (dataMax - dataMin) / parentRect.width;
    let isDragging = true;

    const moveHandler = (moveEvent: MouseEvent) => {
      if (!isDragging) return;
      const offsetX = moveEvent.clientX - parentRect.left;
      const newValue = dataMin + (offsetX * scale);

      if (isMin) {
        setMinValue(Math.max(dataMin, Math.min(newValue, maxValue - 1)));
      } else {
        setMaxValue(Math.min(dataMax, Math.max(newValue, minValue + 1)));
      }
    };

    const upHandler = () => {
      isDragging = false;
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
  }, [dataMin, dataMax, minValue, maxValue]);

  const calculateBarSize = (value: number) => {
    const range = dataMax - dataMin;
    if (range === 0) return 100; // Handle edge case
    return ((value - dataMin) / range) * 80;  // Adjust this value for smaller bars
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm border ${className}`} ref={containerRef} style={{ overflowY: "auto", maxHeight: '500px' }}>
      {title && <h2 className="text-lg font-semibold mb-4 text-gray-700">{title}</h2>}

      <div className="relative">
        {showAxis && orientation === "vertical" && (
          <div className="absolute left-0 bottom-0 w-full h-full flex justify-between items-end pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="h-px w-full bg-gray-200"
                style={{ transform: `translateY(-${i * 25}%)` }}
              />
            ))}
          </div>
        )}

        <div 
          className={`flex ${orientation === "horizontal" ? "flex-col" : "flex-row"} gap-2`}
          style={{
            height: orientation === "vertical" ? containerSize.height : "auto",
            padding: `${padding}px`
          }}
        >
          {filteredData.map((d, index) => (
            <div 
              key={d.label + index}
              className="flex items-center transition-opacity hover:opacity-90"
              style={{
                [orientation === "horizontal" ? "height" : "width"]: `${100 / filteredData.length}%`,
                gap: `${padding}px`
              }}
            >
              {orientation === "horizontal" ? (
                <>
                  <span className="text-sm text-gray-600 min-w-[60px] text-right">{d.label}</span>
                  <div className="relative w-full h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${calculateBarSize(d.value)}%`, // Adjust bar width
                        background: barGradient 
                          ? `linear-gradient(to right, ${barGradient[0]}, ${barGradient[1]})`
                          : barColor
                      }}
                    >
                      {showValues && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                          {d.value}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative w-full h-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-300"
                    style={{
                      height: `${calculateBarSize(d.value)}%`, // Adjust bar height
                      background: barGradient 
                        ? `linear-gradient(to top, ${barGradient[0]}, ${barGradient[1]})`
                        : barColor,
                      borderRadius: `${barRadius}px`
                    }}
                  >
                    {showValues && (
                      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white rotate-90">
                        {d.value}
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                    {d.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {rangeSlider && (
        <div className="mt-6">
          <div className="relative h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-blue-100 rounded-full"
              style={{
                left: `${((minValue - dataMin) / (dataMax - dataMin)) * 100}%`,
                right: `${100 - ((maxValue - dataMin) / (dataMax - dataMin)) * 100}%`
              }}
            />
            <div
              className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-sm cursor-pointer -top-1"
              style={{ left: `${((minValue - dataMin) / (dataMax - dataMin)) * 100}%` }}
              onMouseDown={(e) => handleDrag(e, true)}
            />
            <div
              className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-sm cursor-pointer -top-1"
              style={{ left: `${((maxValue - dataMin) / (dataMax - dataMin)) * 100}%` }}
              onMouseDown={(e) => handleDrag(e, false)}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{minValue.toFixed(1)}</span>
            <span>{maxValue.toFixed(1)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(BarChart);
