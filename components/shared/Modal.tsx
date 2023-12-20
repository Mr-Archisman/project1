// src/components/Modal.tsx
import React from 'react';
import '../../app/globals.css'
import { Pie } from 'react-chartjs-2';
import CreditInfo from '@/constants/CreditInfo';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ModalProps {
  show: boolean;
  onClose: () => void;
  companyData: CreditInfo | null;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose, companyData }) => {
  if (!show) {
    return null;
  }

  const chartData = {
    labels: ['Raised Capital', 'Turnover', 'Net Profit'],
    datasets: [
      {
        label: 'value ($)',
        data: [companyData?.raisedCapital, companyData?.turnover, companyData?.netProfit],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="modal-backdrop">
      <div className="modal min-w-3xl">
        <div className='justify-end w-full flex'>
        <button onClick={onClose}>X</button>
        </div>
        <div className="card">
          <div className='flex items-center justify-between'>
          <h3 className='text-dark-2 font-semibold text-3xl'>{companyData?.companyName}</h3>
          <p className={companyData?.accountStatus === 'active' ? 'text-green-600' : 'text-red-600'}>{companyData?.accountStatus}</p>
          </div>
          <p className='text-dark-2 font-medium text-base'>{companyData?.address}</p>
          <p className='text-[14px] font-medium'>Email: {companyData?.contactEmail}</p>
          <p className='mt-6 text-[12px] font-normal'>Registration Date: {companyData?.registrationDate}</p>
          <p className='mt-1 text-[12px] font-normal'>Number of Employees: {companyData?.numberOfEmployees}</p>
          {/* ...display other company details... */}
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};
