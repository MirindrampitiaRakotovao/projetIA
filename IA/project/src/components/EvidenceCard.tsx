import React from 'react';
import { Evidence } from '../types';
import * as Icons from 'lucide-react';

interface EvidenceCardProps {
  evidence: Evidence;
}

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  const IconComponent = Icons[evidence.icon as keyof typeof Icons] as React.ComponentType<any>;

  const getEvidenceColor = (type: string) => {
    switch (type) {
      case 'motive': return 'bg-red-100 text-red-700 border-red-200';
      case 'location': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'fingerprint': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'dna': return 'bg-green-100 text-green-700 border-green-200';
      case 'cyber': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'identity': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'transaction': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'confession': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'alibi': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 hover:shadow-md
      ${getEvidenceColor(evidence.type)}
    `}>
      <div className="flex items-center gap-3">
        <IconComponent className="h-5 w-5" />
        <span className="font-medium text-sm">
          {evidence.label}
        </span>
      </div>
    </div>
  );
}