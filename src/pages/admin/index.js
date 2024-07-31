import React, { useState } from 'react';
import { login } from '@/services/authService';

const Index = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(mail, password);
      console.log('Logged in user:', user);
      // Redireccionar al usuario o manejar la lógica de inicio de sesión aquí
      window.location.href = '/admin/leads'; // Ejemplo de redirección
    } catch (err) {
      setError('Invalid mail or password');
    }
  };

  return (
    <div className="hero min-h-screen bg-slate-900">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">Administración</h1>
            {/* <a href='/admin/InicioSecion' className='no-underline text-blue-600 hover:underline '>Crear Cuenta</a>  */}
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mail</span>
              </label>
              <input
                type="email"
                placeholder="mail"
                className="input input-bordered"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="form-control mt-6">
              <button className="btn btn-error text-white">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
