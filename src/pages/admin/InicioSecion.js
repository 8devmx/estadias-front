import React from 'react';
import { BiSolidLeftArrowSquare } from "react-icons/bi";

const InicioSecion = () => {

  return (

    <div className="hero min-h-screen bg-slate-900">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">Administración</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" >
            <div className='flex gap-1'>
              <div className='form-control w-1/2'>
                <label className='label'>
                  <span className='label-text'>Name </span>
                </label>
                <input type="text" placeholder='empresa.ing' className='input input-bordered' />
              </div>
              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text">Mail</span>
                </label>
                <input type="email" placeholder="mail" className="input input-bordered" />
              </div>
            </div>
            <div className='flex gap-1'>
              <div className='form-control w-1/2'>
                <label className='label'>
                  <span className='label-text'>Phone</span>
                </label>
                <input type="text" placeholder='phone' className='input input-bordered' />
              </div>
              <div className='form-control w-1/2'>
              <label className='label'>
                  <span className='label-text'>Contact</span>
                </label>
                <input type="text" placeholder='contact' className='input input-bordered' />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" />
            </div>
            <br />
            <div className="flex gap-1">
              <a href="/admin" className='btn px-0 py-0 mt-0 mb-0 text-5xl w-3/1 btn-accent btn-outline'><BiSolidLeftArrowSquare /></a>
              <button className="btn btn-error text-white w-5/6" >Check in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InicioSecion;
