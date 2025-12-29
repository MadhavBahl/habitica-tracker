import { useState } from 'react';
import './App.css';
import type { DailyTask, HabiticaTasksResponse } from './types';
import { LayoutShell } from './components/LayoutShell';
import { CredentialsForm } from './components/CredentialsForm';
import { DailiesDashboard } from './components/DailiesDashboard';

function App() {
  const [dailies, setDailies] = useState<DailyTask[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userId = String(formData.get('userId') || '').trim();
    const apiKey = String(formData.get('apiKey') || '').trim();

    if (!userId || !apiKey) {
      console.warn('User ID and API Key are required');
      return;
    }

    const url = 'https://habitica.com/api/v3/tasks/user?type=dailys';
    console.log('Fetching Habitica daily tasks from', url);

    setIsLoading(true);
    setError(null);

    fetch(url, {
      headers: {
        'x-api-user': userId,
        'x-api-key': apiKey,
        'x-client': 'habitica-tracker-web',
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Habitica daily tasks request failed', {
            status: res.status,
            statusText: res.statusText,
            body: text,
          });
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json: HabiticaTasksResponse = await res.json();
        console.log('Full Habitica daily tasks JSON:', json);
        setDailies(json.data);
        setIsAuthenticated(true);
      })
      .catch((err: unknown) => {
        console.error('Network or fetch error while calling Habitica:', err);
        setError(
          'Could not load dailies. Check your credentials and try again.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LayoutShell>
      {!isAuthenticated && (
        <>
          <header className='app-header'>
            <h1>Habitica Tracker Setup</h1>
            <p className='subtitle'>
              Connect your Habitica account so we can visualize your tasks and
              habits.
            </p>
          </header>

          <CredentialsForm isLoading={isLoading} onSubmit={handleSubmit} />

          {error && (
            <p className='helper-text' style={{ color: '#f97373' }}>
              {error}
            </p>
          )}
        </>
      )}

      {isAuthenticated && dailies && <DailiesDashboard dailies={dailies} />}
    </LayoutShell>
  );
}

export default App;
