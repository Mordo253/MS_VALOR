import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';

const FinancialItem = ({ symbol, price, percentChange }) => (
  <div className="flex items-center space-x-2 text-xs whitespace-nowrap px-3">
    <span className="font-semibold">{symbol}</span>
    <span className="font-bold">{typeof price === 'number' ? price.toFixed(2) : price}</span>
    <span className={`flex items-center ${percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
      {percentChange >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(percentChange).toFixed(2)}%
    </span>
  </div>
);

export const Indicador = () => {
  const [financialData, setFinancialData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFinancialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/financial-data`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFinancialData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching financial data:', error);
      setError('Error al cargar los datos. Por favor, intente de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/update-data`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await fetchFinancialData();
    } catch (error) {
      console.error('Error updating financial data:', error);
      setError('Error al actualizar los datos. Por favor, intente de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
    const intervalId = setInterval(fetchFinancialData, 5 * 60 * 1000); // Actualiza cada 5 minutos
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading && financialData.length === 0) {
    return <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white py-2 px-4 text-center z-50">Cargando datos financieros...</div>;
  }

  return (
    <div className="fixed  top-0 left-0 right-0 bg-gray-800 text-white py-1 px-4 overflow-hidden z-[1101]">
      <div className="flex justify-between items-center">
        <div className="flex-grow overflow-hidden">
          <div className="animate-scroll flex space-x-6 whitespace-nowrap">
            {[...financialData, ...financialData].map((item, index) => (
              <FinancialItem
                key={index}
                symbol={item.symbol}
                price={item.price}
                percentChange={item.percentChange}
              />
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center space-x-2 ml-4">
          {lastUpdated && (
            <span className="text-xs">
              Actualizado: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button 
            onClick={updateData} 
            className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded flex items-center"
            disabled={isLoading}
          >
            <RefreshCw size={12} className={`mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
        </div>
      </div>
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </div>
  );
};