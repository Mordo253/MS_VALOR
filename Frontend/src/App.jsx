import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContex";
import { PropertyPage } from "./pages/PropertyPage/PropertyPage";
import { PropertyDetails } from "./pages/PropertyPage/PropertyDetail";
import { PropertyList } from "./pages/PropertyPage/PropertyList";
import { VehicleProvider} from "./context/CarContext";
import { CarPage } from "./pages/CarPage/CarPage";
import { CarDetails } from "./pages/CarPage/CarDetail";
import { CarList } from "./pages/CarPage/CarList";
import Header from './components/Header/Header';
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";
import HomePage from "./pages/Home/appD";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import './App.css';
import { Indicador } from "./components/ecommerI/EcommerI";
import { ToolsPage } from "./pages/Tools/ToolsPage";
// import { AdminLayout } from "./pages/Admin/layout/AdminLayout";
import { Admin } from "./pages/Admin/layout/Admin";
import {Footer} from "./components/Footer/Footer";

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <VehicleProvider>
          <BrowserRouter>
            <main>
              {/* <Indicador/> */}
              <Header /> {/* Mover la lógica de visibilidad del header a este componente */}
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/properties" element={<PropertyPage />} />
                <Route path="/properties-list" element={<PropertyList />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />  
                <Route path="/cars" element={<CarPage />} />
                <Route path="/cars-list" element={<CarList />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/tools" element={<ToolsPage />} />

                {/* Rutas protegidas */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin/*" element={<Admin />} />
                </Route>
              </Routes>
              <Footer/>
            </main>
          </BrowserRouter>
        </VehicleProvider>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;
