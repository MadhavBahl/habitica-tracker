import type { TooltipProps } from 'recharts';

export type GlobalSeriesPoint = {
  iso: string;
  count: number;
  label: string;
};

export type DailiesGlobalChartProps = {
  series: GlobalSeriesPoint[];
};

export type GlobalHistoryEntry = { date: number };

export function buildGlobalSeries(
  fromHistory: GlobalHistoryEntry[][]
): GlobalSeriesPoint[] {
  const globalByDay = new Map<string, number>();

  for (const dailyHistory of fromHistory) {
    for (const entry of dailyHistory) {
      const day = new Date(entry.date);
      if (Number.isNaN(day.getTime())) continue;
      const key = day.toISOString().slice(0, 10); // YYYY-MM-DD
      globalByDay.set(key, (globalByDay.get(key) ?? 0) + 1);
    }
  }

  const allDaysSorted = Array.from(globalByDay.entries()).sort(([a], [b]) =>
    a < b ? -1 : a > b ? 1 : 0
  );
  const lastDays = allDaysSorted.slice(-7);

  return lastDays.map(([iso, count]) => ({
    iso,
    count,
    label: new Date(iso).toLocaleDateString(),
  }));
}

export type RechartsTooltipProps = TooltipProps<number, string>;
