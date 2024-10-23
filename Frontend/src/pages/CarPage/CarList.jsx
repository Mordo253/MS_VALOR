import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useVehicles } from '../../context/CarContext'; // Importar el contexto de vehículos
import { SearchbarC } from '../../components/car/Searchbar/SearchBar'; // Asegúrate de tener un componente de búsqueda similar
import { ItemC } from '../../components/car/Item/ItemC'; // Componente para renderizar cada vehículo
import { useEffect, useState } from 'react';

export const CarList = () => {
  const { vehicles, loading, error, getAllVehicles } = useVehicles(); // Usar el contexto de vehículos
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  // Ejecutar la función para obtener los vehículos cuando se monta el componente
  useEffect(() => {
    getAllVehicles();
  }, [getAllVehicles]);

  // Filtrar vehículos por nombre, marca o precio
  const filteredVehicles = vehicles.filter((vehicle) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      vehicle.car.toLowerCase().includes(lowerCaseSearch) || // Filtrar por nombre del vehículo
      vehicle.brand.toLowerCase().includes(lowerCaseSearch) || // Filtrar por marca
      (vehicle.price && vehicle.price.toString().includes(lowerCaseSearch)) // Filtrar por precio
    );
  });

  if (loading) {
    return <p>Cargando vehículos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='max-padd-container relative top-20'>
      <div className='max-padd-container py-10 xl:py-22 bg-yellow-50 rounded-3xl'>
        <div>
          <SearchbarC setSearchTerm={setSearchTerm} /> {/* Pasar función al searchbar */}
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10'>
            {/* Mapeo de vehículos filtrados */}
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <ItemC key={vehicle._id} {...vehicle} /> // Asegúrate de que el componente Item esté preparado para recibir los props del vehículo
              ))
            ) : (
              <p>No se encontraron vehículos</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
