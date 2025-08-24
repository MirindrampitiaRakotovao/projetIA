import React from 'react';
import * as Icons from 'lucide-react';
import { Crime } from '../types';

interface CrimeCardProps {
  crime: Crime;
  isSelected: boolean;
  onClick: () => void;
}

export function CrimeCard({ crime, isSelected, onClick }: CrimeCardProps) {
  const IconComponent = Icons[crime.icon as keyof typeof Icons] as React.ComponentType<any>;

  const getCrimeColor = (crimeId: string) => {
    switch (crimeId) {
      case 'vol': return isSelected ? 'border-orange-500 bg-orange-50 text-orange-700' : 'hover:border-orange-300';
      case 'meurtre': return isSelected ? 'border-red-500 bg-red-50 text-red-700' : 'hover:border-red-300';
      case 'cybercrime': return isSelected ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'hover:border-cyan-300';
      case 'trafic_drogue': return isSelected ? 'border-purple-500 bg-purple-50 text-purple-700' : 'hover:border-purple-300';
      case 'corruption': return isSelected ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'hover:border-yellow-300';
      default: return isSelected ? 'border-gray-500 bg-gray-50 text-gray-700' : 'hover:border-gray-300';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-lg border-2 transition-all duration-200 w-full text-left
        hover:scale-105 hover:shadow-md
        ${isSelected 
          ? getCrimeColor(crime.id) + ' shadow-md' 
          : 'border-gray-200 bg-white text-gray-700 ' + getCrimeColor(crime.id)
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-full transition-colors duration-200
          ${isSelected ? 'bg-current bg-opacity-20' : 'bg-gray-200'}
        `}>
          <IconComponent className="h-5 w-5" />
        </div>
        <span className="font-medium">
          {crime.name}
        </span>
      </div>
    </button>
  );
}