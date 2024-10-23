import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, X } from 'lucide-react';

const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(value);
};

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            // Bloquear el scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Permitir el scroll
            document.body.style.overflow = 'unset';
        }

        // Cleanup function para asegurar que el scroll se desbloquee al desmontar
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative top-10">
          <button onClick={onClose} className="float-right text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    );
};

const CreditSimulator = ({ onClose }) => {
    const [amount, setAmount] = useState('');
    const [term, setTerm] = useState(48);
    const [birthDate, setBirthDate] = useState('');
    const [rateType, setRateType] = useState('fixed');
    const [customRate, setCustomRate] = useState('');
    const [result, setResult] = useState(null);
  
    const handleAmountChange = (e) => {
      const value = e.target.value.replace(/\D/g, '');
      setAmount(value ? parseInt(value, 10) : '');
    };
  
    const handleSimulate = () => {
      let interestRate;
      let monthlyPayment;
  
      if (rateType === 'custom') {
        interestRate = parseFloat(customRate);
        const totalInterest = (amount * interestRate * term) / 1200;
        monthlyPayment = (parseFloat(amount) + totalInterest) / term;
      } else {
        const rates = {
          fixed: { rate: 1.78, payment: 623193 },
          variableFixed: { rate: 1.84, payment: 630991 },
          variableVariable: { rate: 1.84, payment: 810467 }
        };
        interestRate = rates[rateType].rate;
        monthlyPayment = rates[rateType].payment;
      }
  
      setResult({ monthlyPayment, interestRate });
    };
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Calculator className="mr-2" /> Simulador de Crédito
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Monto del crédito</label>
          <input
            type="text"
            value={amount ? formatCurrency(amount).replace(/COP\s?/, '') : ''}
            onChange={handleAmountChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="$0"
          />
          <p className="text-xs text-gray-500 mt-1">Monto Mínimo: $1,000,000 - Monto Máximo: $500,000,000</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Plazo (meses)</label>
          <input
            type="number"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            min="48"
            max="84"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">Elije un plazo desde 48 y hasta 84 meses</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <p className="text-xs text-gray-500 mt-1">Debes tener entre 18 y 84 años para solicitar el crédito.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de tasa</label>
          <select
            value={rateType}
            onChange={(e) => setRateType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="fixed">Tasa fija - Cuota fija</option>
            <option value="variableFixed">Tasa variable - Cuota fija</option>
            <option value="variableVariable">Tasa variable - Cuota variable</option>
            <option value="custom">Tasa personalizada</option>
          </select>
        </div>
        {rateType === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tasa personalizada (%)</label>
            <input
              type="number"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              step="0.01"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        )}
        <button
          onClick={handleSimulate}
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          SIMULAR
        </button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Resultado de la simulación:</h3>
            <p>Cuota mensual: {formatCurrency(result.monthlyPayment)}</p>
            <p>Tasa mes vencido: {result.interestRate.toFixed(2)}%</p>
          </div>
        )}
      </div>
    );
};

const InterestRateConverter = ({ onClose }) => {
    const [nominalRate, setNominalRate] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [result, setResult] = useState(null);
  
    const calculateEffectiveRate = () => {
      const nominal = parseFloat(nominalRate);
      if (isNaN(nominal)) {
        setResult('Por favor, ingrese una tasa válida.');
        return;
      }
  
      let effectiveRate;
      switch (frequency) {
        case 'daily':
          effectiveRate = Math.pow(1 + nominal / 100 / 365, 365) - 1;
          break;
        case 'weekly':
          effectiveRate = Math.pow(1 + nominal / 100 / 52, 52) - 1;
          break;
        case 'monthly':
          effectiveRate = Math.pow(1 + nominal / 100 / 12, 12) - 1;
          break;
        case 'quarterly':
          effectiveRate = Math.pow(1 + nominal / 100 / 4, 4) - 1;
          break;
        case 'semiannual':
          effectiveRate = Math.pow(1 + nominal / 100 / 2, 2) - 1;
          break;
        default:
          effectiveRate = nominal / 100;
      }
  
      setResult(effectiveRate * 100);
    };
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <RefreshCw className="mr-2" /> Convertidor de Tasa de Interés
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tasa nominal anual (%)</label>
          <input
            type="number"
            value={nominalRate}
            onChange={(e) => setNominalRate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Frecuencia de capitalización</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="daily">Diaria</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
            <option value="quarterly">Trimestral</option>
            <option value="semiannual">Semestral</option>
            <option value="annual">Anual</option>
          </select>
        </div>
        <button
          onClick={calculateEffectiveRate}
          className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Convertir a Tasa Efectiva Anual
        </button>
        {result !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <h3 className="font-semibold text-lg mb-2">Resultado:</h3>
            <p>Tasa Efectiva Anual: {typeof result === 'number' ? `${result.toFixed(2)}%` : result}</p>
          </div>
        )}
      </div>
    );
};

export const ToolsI = () => {
    const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
    const [isConverterOpen, setIsConverterOpen] = useState(false);

    const toolCards = [
        {
            icon: <Calculator className="w-8 h-8 text-indigo-600" />,
            title: "Simulador de Crédito",
            onClick: () => setIsSimulatorOpen(true),
        },
        {
            icon: <RefreshCw className="w-8 h-8 text-indigo-600" />,
            title: "Convertidor de Tasas de Interés",
            onClick: () => setIsConverterOpen(true),
        },
    ];

    return (
      <div>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
              {toolCards.map((card, index) => (
                  <div 
                      key={index}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer w-48"
                      onClick={card.onClick}
                  >
                      <div className="flex flex-col items-center justify-center p-6 h-40">
                          <div className="bg-indigo-100 rounded-full p-4 mb-4">
                              {card.icon}
                          </div>
                          <span className="text-sm font-medium text-center">{card.title}</span>
                      </div>
                  </div>
              ))}
          </div>

          <Modal isOpen={isSimulatorOpen} onClose={() => setIsSimulatorOpen(false)}>
              <CreditSimulator onClose={() => setIsSimulatorOpen(false)} />
          </Modal>

          <Modal isOpen={isConverterOpen} onClose={() => setIsConverterOpen(false)}>
              <InterestRateConverter onClose={() => setIsConverterOpen(false)} />
          </Modal>
      </div>
    )
}