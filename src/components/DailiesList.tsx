import type { DailyTask } from '../types';
import { DailyCard } from './DailyCard';

type DailiesListProps = {
  dailies: DailyTask[];
};

export function DailiesList({ dailies }: DailiesListProps) {
  return (
    <ul className='dailies-list'>
      {dailies.map((daily) => (
        <DailyCard key={daily.id} daily={daily} />
      ))}
    </ul>
  );
}
