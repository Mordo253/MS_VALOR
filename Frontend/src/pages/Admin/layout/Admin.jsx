import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Dashboard } from "../views/Dashboard/Dashboard";
import { Settings } from "../views/Settings/Settings";
import { CarAU } from '../views/carAU/CarAU';
import { PropertyAU } from '../views/propertyAU/PropertyAU';
import { Adminnav } from '../components/Navbars/Adminnav';
import { PropertyForm } from '../views/propertyAU/PropertyForm';
import { Carform } from '../views/carAU/Carform';

export const Admin = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Adminnav/>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/car" element={<CarAU />} />
            <Route path="/car/car-new" element={<Carform />} />
            <Route path="/car/car-update" element={<Carform />} />
            <Route path="/property" element={<PropertyAU />} />
            <Route path="/property/property-new" element={<PropertyForm />} />
            <Route path="/property/property-update" element={<PropertyForm />} />
            {/* <Route path="/property/property-delete" element={<PropertyAU />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
};
