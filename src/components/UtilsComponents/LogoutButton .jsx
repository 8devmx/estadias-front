import React from 'react';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/admin');
  };

  return (
    <div className='pt-1 pr-1'>
        <button onClick={logout} className=" btn btn-outline btn-error">
        Cerrar Sesión
        </button>
    </div>
  );
};

export default LogoutButton;
