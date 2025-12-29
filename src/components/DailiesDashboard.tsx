import type { DailyTask } from '../types';
import { DailiesGlobalChart } from './DailiesGlobalChart';
import { DailiesList } from './DailiesList';
import { buildGlobalSeries } from './DailiesGlobalChart.types';

type DailiesDashboardProps = {
  dailies: DailyTask[];
};

export function DailiesDashboard({ dailies }: DailiesDashboardProps) {
  if (dailies.length === 0) return null;

  const globalSeries = buildGlobalSeries(dailies.map((d) => d.history));

  return (
    <section className='dailies-section'>
      <h2>Daily history overview</h2>
      <p className='subtitle'>
        These are your current Habitica dailies with their recent completion
        streaks.
      </p>

      <DailiesGlobalChart series={globalSeries} />

      <DailiesList dailies={dailies} />
    </section>
  );
}
