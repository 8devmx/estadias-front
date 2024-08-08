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
      localStorage.setItem('email', mail); // Guarda el correo en localStorage
      
      window.location.href = '/admin/leads'; // Ejemplo de redirección
    } catch (err) {
      setError('Invalid mail or password');
    }
  };

  return (
    <div>

    <div className="hero min-h-screen bg-slate-900">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className='p-2'>
            <center>
              <img className='max-w-48 ite ' src="/TechLogo.png" alt="cargano logo tech pech" />
              <h1 className='text-4xl font-bold text-blak pt-1'>Administración</h1>
            </center>
          </div>
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
                </div>
  );
};

export default Index;

