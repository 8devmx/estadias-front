import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const RequireAuth = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/admin'); // Redirige a la página de admin si no hay token
    }
  }, [router]);

  return <>{children}</>;
};

export default RequireAuth;
