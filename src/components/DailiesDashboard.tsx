import type { DailyTask } from '../types';
import { formatDate } from '../utils/formatDate';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

type DailiesDashboardProps = {
  dailies: DailyTask[];
};

export function DailiesDashboard({ dailies }: DailiesDashboardProps) {
  if (dailies.length === 0) return null;

  // Aggregate completions per day across all dailies for a simple line chart.
  const globalByDay = new Map<string, number>();

  for (const daily of dailies) {
    for (const entry of daily.history) {
      const day = new Date(entry.date);
      if (Number.isNaN(day.getTime())) continue;
      const key = day.toISOString().slice(0, 10); // YYYY-MM-DD

      // Treat "completed" entries as stronger signal, but if Habitica doesn't
      // flag them we still want a bar, so just count every history entry.
      globalByDay.set(key, (globalByDay.get(key) ?? 0) + 1);
    }
  }

  const allDaysSorted = Array.from(globalByDay.entries()).sort(([a], [b]) =>
    a < b ? -1 : a > b ? 1 : 0
  );
  const lastDays = allDaysSorted.slice(-7); // show last 7 days at most
  const globalSeries = lastDays.map(([iso, count]) => ({
    iso,
    count,
    label: formatDate(new Date(iso)),
  }));

  // Debug log to verify data reaching the chart
  console.log('Global series for completions-per-day chart:', globalSeries);

  return (
    <section className='dailies-section'>
      <h2>Daily history overview</h2>
      <p className='subtitle'>
        These are your current Habitica dailies with their recent completion
        streaks.
      </p>

      {globalSeries.length > 0 && (
        <div className='global-chart-card'>
          <h3 className='chart-title'>Completions per day</h3>
          <div className='line-chart'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                data={globalSeries}
                margin={{ top: 10, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' stroke='#1f2933' />
                <XAxis
                  dataKey='label'
                  stroke='#9ca3af'
                  tick={{ fontSize: 11 }}
                />
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
                  formatter={(value: number) => [`${value} completed`, '']}
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
      )}

      <ul className='dailies-list'>
        {dailies.map((daily) => {
          const lastHistory = daily.history.at(-1);
          const lastDate = lastHistory ? new Date(lastHistory.date) : null;

          const completedCount = daily.history.filter(
            (h: DailyTask['history'][number]) => h.completed
          ).length;
          const totalCount = daily.history.length;
          const incompleteCount = Math.max(totalCount - completedCount, 0);

          return (
            <li key={daily.id} className='daily-card'>
              <div className='daily-header'>
                <h3>{daily.text}</h3>
                <span className='streak-pill'>
                  🔥 {daily.streak}-day streak
                </span>
              </div>

              {daily.notes && <p className='daily-notes'>{daily.notes}</p>}

              <div className='daily-meta'>
                <span>
                  Last completed:{' '}
                  {lastDate ? formatDate(lastDate) : 'No history yet'}
                </span>
                {daily.nextDue[0] && (
                  <span>
                    Next due: {formatDate(new Date(daily.nextDue[0]))}
                  </span>
                )}
              </div>

              {totalCount > 0 && (
                <div className='daily-pie-wrapper'>
                  <div className='daily-pie-chart'>
                    <svg viewBox='0 0 32 32' className='pie-svg'>
                      {/* Background ring for total days (incomplete segment) */}
                      <circle
                        cx='16'
                        cy='16'
                        r='14'
                        className='pie-segment-incomplete'
                      />
                      {/* Completed overlay arc approximated by stroke-dasharray */}
                      <circle
                        cx='16'
                        cy='16'
                        r='14'
                        className='pie-segment-complete'
                        style={{
                          strokeDasharray: `${
                            (completedCount / totalCount) * 88
                          } 88`,
                        }}
                      />
                    </svg>
                  </div>
                  <div className='daily-pie-legend'>
                    <span>✅ {completedCount} completed</span>
                    <span>⭕ {incompleteCount} not completed</span>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
