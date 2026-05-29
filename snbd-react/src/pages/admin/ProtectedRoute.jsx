import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'ok' | 'denied'

  useEffect(() => {
    fetch('/api/auth/verify', { credentials: 'include' })
      .then(res => setStatus(res.ok ? 'ok' : 'denied'))
      .catch(() => setStatus('denied'));
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#CC0000] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
