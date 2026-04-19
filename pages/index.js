import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const startStreaming = async () => {
    const response = await fetch('/api/stream', {
      method: 'POST',
    });
    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <h1>Live Streaming Control</h1>
      <button onClick={startStreaming}>Start Streaming</button>
      {message && <p>{message}</p>}
    </div>
  );
}