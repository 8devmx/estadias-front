import React from 'react';
import Link from 'next/link';
import { PiUsersFill } from "react-icons/pi"
import { FaUsersCog, FaBuilding } from "react-icons/fa"
import { RiPagesLine } from "react-icons/ri";
import { IoIosBriefcase } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { AiFillApi } from "react-icons/ai";

const LayoutAdmin = ({ children }) => {
  return (
    <div data-theme="light">
      <div className="container mx-auto">
        <div className="drawer min-h-screen">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="overflow-x-auto">
              <div className="navbar bg-base-100">
                <div className="flex-none">
                  <label className="btn btn-square btn-ghost drawer-button" htmlFor="my-drawer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </label>
                </div>
                <div className="flex-1">
                  <a className="btn btn-ghost text-xl">TECH PECH</a>
                </div>
                <div className="flex-none">
                  <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                {children}
              </div>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <li><Link href="/admin/candidates"><FaUsersCog /> Candidatos</Link></li>
              <li><Link href="/admin/companies"><FaBuilding /> Empresas</Link></li>
              <li><Link href="/admin/landings"><RiPagesLine /> Landings</Link></li>
              <li><Link href="/admin/leads"><MdLeaderboard /> Prospectos</Link></li>
              <li><Link href="/admin/users"><PiUsersFill /> Usuarios</Link></li>
              <li><Link href="/admin/vacancies"><IoIosBriefcase />Vacantes</Link></li>
              <li><Link href="/admin/job"><AiFillApi />Job</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-gray-800 text-white fixed bottom-0">
        <aside>
          <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
}

export default LayoutAdmin;
