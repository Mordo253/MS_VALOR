import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProperties } from '../../context/PropertyContex';
import { Searchbar } from '../../components/property/Searhbar/Searchbar';
import { Item } from '../../components/property/Item/Item';
import { useEffect, useState } from 'react';

export const PropertyList = () => {
  const { properties, loading, error, getAllProperties } = useProperties();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filters, setFilters] = useState({
    zona: '',
    tipoInmueble: '',
    precioMin: '',
    precioMax: '',
    alcobas: '',
    banos: ''
  }); // Estado para filtros

  // Ejecutar la función para obtener las propiedades cuando se monta el componente
  useEffect(() => {
    getAllProperties();
  }, [getAllProperties]);

  // Obtener valores mínimo y máximo de precio (costo)
  const minPrice = Math.min(...properties.map(p => p.costo));
  const maxPrice = Math.max(...properties.map(p => p.costo));

  // Función para manejar los filtros
  const handleSetFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Obtener tipos de inmueble únicos
  const uniqueTiposInmueble = [...new Set(properties.map(property => property.tipoInmueble))];

  // Filtrar propiedades por nombre, ciudad, precio y los filtros adicionales
  const filteredProperties = properties.filter((property) => {
    const lowerCaseSearch = searchTerm.toLowerCase();

    // Verificación de los filtros
    const matchesSearchTerm = property.title.toLowerCase().includes(lowerCaseSearch) ||
                              property.ciudad.toLowerCase().includes(lowerCaseSearch) ||
                              (property.costo && property.costo.toString().includes(searchTerm));

    const matchesZona = filters.zona ? property.zona.toLowerCase() === filters.zona.toLowerCase() : true;
    const matchesTipoInmueble = filters.tipoInmueble ? property.tipoInmueble.toLowerCase() === filters.tipoInmueble.toLowerCase() : true;
    const matchesPrecio = (
      (!filters.precioMin || property.costo >= parseInt(filters.precioMin)) &&
      (!filters.precioMax || property.costo <= parseInt(filters.precioMax))
    );
    const matchesAlcobas = filters.alcobas ? property.alcobas >= parseInt(filters.alcobas) : true;
    const matchesBanos = filters.banos ? property.banos >= parseInt(filters.banos) : true;

    return (
      matchesSearchTerm &&
      matchesZona &&
      matchesTipoInmueble &&
      matchesPrecio &&
      matchesAlcobas &&
      matchesBanos
    );
  });

  if (loading) {
    return <p>Cargando propiedades...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className='max-padd-container relative top-20'>
      <div className='max-padd-container py-10 xl:py-22 bg-yellow-50 rounded-3xl'>
        <div>
          <Searchbar
            setSearchTerm={setSearchTerm}
            setFilters={handleSetFilters}
            tiposInmueble={uniqueTiposInmueble}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-10'>
            {/* Mapeo de propiedades filtradas */}
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Item key={property._id} {...property} />
              ))
            ) : (
              <p>No se encontraron propiedades</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};