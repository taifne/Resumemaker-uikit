import {
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
  Cell,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Skeleton } from '@mui/material';

export interface DataPoint {
  x: number | string;
  y: number;
  [key: string]: number | string;
}

export interface ChartProps {
  data: DataPoint[];
  title?: string;
  chartType?: 'line' | 'bar' | 'area';
  width?: number | string;
  height?: number | string;
  colors?: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  stacked?: boolean;
  animationDuration?: number;
  brush?: boolean;
  referenceLineY?: number;
  isLoading?: boolean;
}

const CustomChart = ({
  data,
  title = '',
  chartType = 'line',
  width = '100%',
  height = 400,
  colors = scaleOrdinal(schemeCategory10).range(),
  xAxisLabel = '',
  yAxisLabel = '',
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  stacked = false,
  animationDuration = 500,
  brush = false,
  referenceLineY,
  isLoading = false,
}: ChartProps) => {
  const renderChart = (ChartComponent: typeof LineChart | typeof BarChart | typeof AreaChart) => {
    return (
      <ChartComponent data={data} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#eee" />}
        <XAxis
          dataKey="x"
          label={{ value: xAxisLabel, position: 'bottom', offset: 10 }}
          tick={{ fill: '#666' }}
        />
        <YAxis
          label={{ value: yAxisLabel, angle: -90, position: 'left', offset: 10 }}
          tick={{ fill: '#666' }}
        />
        {referenceLineY && (
          <ReferenceLine y={referenceLineY} stroke="#ff7300" strokeDasharray="3 3" />
        )}
        {showTooltip && <Tooltip wrapperStyle={{ backgroundColor: '#fff', border: 'none' }} />}
        {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
        {brush && <Brush dataKey="x" height={30} stroke="#8884d8" />}

        {Object.keys(data[0] || {})
          .filter((key) => key !== 'x')
          .map((key, index) => {
            const commonProps = {
              key,
              dataKey: key,
              stroke: colors[index % colors.length],
              fill: colors[index % colors.length],
              fillOpacity: chartType === 'area' ? 0.6 : 1,
              isAnimationActive: animationDuration > 0,
              animationDuration,
            };

            switch (chartType) {
              case 'line':
                return <Line {...commonProps} />;
              case 'bar':
                return (
                  <Bar {...commonProps}>
                    {data.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={colors[i % colors.length]}
                        opacity={entry.y === 0 ? 0.3 : 1}
                      />
                    ))}
                  </Bar>
                );
              case 'area':
                return <Area {...commonProps} />;
              default:
                return null;
            }
          })}
      </ChartComponent>
    );
  };

  if (isLoading) {
    return (
      <div style={{ width, height }}>
        <Skeleton variant="text" />
        <Skeleton variant="rectangular" width="100%" height={height} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ width, height }} className="chart-error">
        <h3>{title}</h3>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <div style={{ width, height }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line'
            ? renderChart(LineChart)
            : chartType === 'bar'
            ? renderChart(BarChart)
            : renderChart(AreaChart)}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomChart;