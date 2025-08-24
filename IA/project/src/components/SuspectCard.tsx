import React from 'react';
import { User } from 'lucide-react';
import { Suspect } from '../types';

interface SuspectCardProps {
  suspect: Suspect;
  isSelected: boolean;
  onClick: () => void;
}

export function SuspectCard({ suspect, isSelected, onClick }: SuspectCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-lg border-2 transition-all duration-200 w-full text-left
        hover:scale-105 hover:shadow-md
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md' 
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-full transition-colors duration-200
          ${isSelected ? 'bg-blue-200' : 'bg-gray-200'}
        `}>
          <User className="h-5 w-5" />
        </div>
        <span className="font-medium">
          {suspect.name}
        </span>
      </div>
    </button>
  );
}