import type { DailiesGlobalChartProps } from './DailiesGlobalChart.types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

export function DailiesGlobalChart({ series }: DailiesGlobalChartProps) {
  if (series.length === 0) return null;

  return (
    <div className='global-chart-card'>
      <h3 className='chart-title'>Completions per day</h3>
      <div className='line-chart'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={series}
            margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#1f2933' />
            <XAxis dataKey='label' stroke='#9ca3af' tick={{ fontSize: 11 }} />
            <YAxis
              allowDecimals={false}
              stroke='#9ca3af'
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#020617',
                borderRadius: 8,
                border: '1px solid rgba(148, 163, 184, 0.5)',
                padding: '0.4rem 0.6rem',
                fontSize: 12,
              }}
              labelStyle={{ color: '#e5e7eb' }}
              formatter={(value?: number) =>
                typeof value === 'number'
                  ? [`${value} completed`, '']
                  : ['', '']
              }
            />
            <Line
              type='monotone'
              dataKey='count'
              stroke='#38bdf8'
              strokeWidth={2.2}
              dot={{ r: 3, strokeWidth: 1, stroke: '#0f172a' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
