import type { FormEventHandler } from 'react';

type CredentialsFormProps = {
  isLoading: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function CredentialsForm({ isLoading, onSubmit }: CredentialsFormProps) {
  return (
    <form className='credentials-form' onSubmit={onSubmit}>
      <div className='field-group'>
        <label htmlFor='userId'>Habitica User ID</label>
        <input
          id='userId'
          name='userId'
          type='text'
          placeholder='e.g. 1234abcd-5678-ef00-1234-abcdef567890'
          autoComplete='off'
          required
        />
      </div>

      <div className='field-group'>
        <label htmlFor='apiKey'>API Token</label>
        <input
          id='apiKey'
          name='apiKey'
          type='password'
          placeholder='Paste your Habitica API token'
          autoComplete='off'
          required
        />
      </div>

      <button className='primary-button' type='submit' disabled={isLoading}>
        {isLoading ? 'Connecting…' : 'Connect & Fetch Dailies'}
      </button>

      <p className='helper-text'>
        Your API token is used only from your browser to talk directly to
        Habitica.
      </p>
    </form>
  );
}
