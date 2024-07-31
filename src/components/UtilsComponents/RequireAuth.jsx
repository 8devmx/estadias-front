import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const RequireAuth = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin'); // Redirige a la página de admin si no hay token
    }

    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin'); // Redirige a la página de admin si no hay token
      }
    }, 1000); // Verifica cada segundo si el token está presente

    return () => clearInterval(interval);
  }, [router]);

  return <>{children}</>;
};

export default RequireAuth;
