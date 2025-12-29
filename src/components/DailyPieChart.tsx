type DailyPieChartProps = {
  completedCount: number;
  totalCount: number;
  incompleteCount: number;
};

export function DailyPieChart({
  completedCount,
  totalCount,
  incompleteCount,
}: DailyPieChartProps) {
  if (totalCount === 0) return null;

  return (
    <div className='daily-pie-wrapper'>
      <div className='daily-pie-chart'>
        <svg viewBox='0 0 32 32' className='pie-svg'>
          <circle cx='16' cy='16' r='14' className='pie-segment-incomplete' />
          <circle
            cx='16'
            cy='16'
            r='14'
            className='pie-segment-complete'
            style={{
              strokeDasharray: `${(completedCount / totalCount) * 88} 88`,
            }}
          />
        </svg>
      </div>
      <div className='daily-pie-legend'>
        <span>✅ {completedCount} completed</span>
        <span>⭕ {incompleteCount} not completed</span>
      </div>
    </div>
  );
}
