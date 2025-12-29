export type DailyHistoryEntry = {
  date: number;
  value: number;
  isDue: boolean;
  completed: boolean;
};

export type DailyTask = {
  id: string;
  text: string;
  notes: string;
  streak: number;
  history: DailyHistoryEntry[];
  nextDue: string[];
};

export type HabiticaTasksResponse = {
  data: DailyTask[];
};
