import type { DailyTask } from '../types';
import { formatDate } from '../utils/formatDate';
import { DailyPieChart } from './DailyPieChart';

type DailyCardProps = {
  daily: DailyTask;
};

export function DailyCard({ daily }: DailyCardProps) {
  const lastHistory = daily.history.at(-1);
  const lastDate = lastHistory ? new Date(lastHistory.date) : null;

  const completedCount = daily.history.filter((h) => h.completed).length;
  const totalCount = daily.history.length;
  const incompleteCount = Math.max(totalCount - completedCount, 0);

  return (
    <li className='daily-card'>
      <div className='daily-header'>
        <h3>{daily.text}</h3>
        <span className='streak-pill'>🔥 {daily.streak}-day streak</span>
      </div>

      {daily.notes && <p className='daily-notes'>{daily.notes}</p>}

      <div className='daily-meta'>
        <span>
          Last completed: {lastDate ? formatDate(lastDate) : 'No history yet'}
        </span>
        {daily.nextDue[0] && (
          <span>Next due: {formatDate(new Date(daily.nextDue[0]))}</span>
        )}
      </div>

      {totalCount > 0 && (
        <DailyPieChart
          completedCount={completedCount}
          totalCount={totalCount}
          incompleteCount={incompleteCount}
        />
      )}
    </li>
  );
}
