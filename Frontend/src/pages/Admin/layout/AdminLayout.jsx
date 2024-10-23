import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNavbar } from "../components/Navbars/Adminnav";
import { Sidebar } from "../components/Sidebar/Sidebar";
import Header from '../../../components/Header/Header';

export const AdminLayout = () => {
  return (
    <>
      {/* Header ha sido removido aquí */}
      
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100 top-20">
        <AdminNavbar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Outlet /> {/* Aquí se renderizarán las rutas hijas de admin */}
        </div>
      </div>
    </>
  );
};
