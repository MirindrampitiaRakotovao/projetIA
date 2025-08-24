import React from 'react';
import { AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { CrimeAnalysis } from '../types';
import { EvidenceCard } from './EvidenceCard';

interface AnalysisPanelProps {
  analysis: CrimeAnalysis | null;
}

export function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  if (!analysis) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">
          Sélectionnez un suspect et un crime pour commencer l'analyse
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Verdict */}
      <div className={`
        p-6 rounded-lg border-2 transition-all duration-300
        ${analysis.isGuilty 
          ? 'border-red-500 bg-red-50' 
          : 'border-green-500 bg-green-50'
        }
      `}>
        <div className="flex items-center gap-4 mb-4">
          {analysis.isGuilty ? (
            <AlertTriangle className="h-8 w-8 text-red-600" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-600" />
          )}
          <div>
            <h2 className={`text-2xl font-bold ${
              analysis.isGuilty ? 'text-red-700' : 'text-green-700'
            }`}>
              {analysis.isGuilty ? 'COUPABLE' : 'NON COUPABLE'}
            </h2>
            <p className={`text-sm ${
              analysis.isGuilty ? 'text-red-600' : 'text-green-600'
            }`}>
              Cas: {analysis.suspect.toUpperCase()} - {analysis.crime.replace('_', ' ').toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Preuves */}
      {analysis.evidences.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Preuves Disponibles ({analysis.evidences.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.evidences.map((evidence, index) => (
              <EvidenceCard key={index} evidence={evidence} />
            ))}
          </div>
        </div>
      )}

      {/* Raisonnement */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Scale className="h-5 w-5" />
          Raisonnement Juridique
        </h3>
        <div className="space-y-2">
          {analysis.reasoning.map((line, index) => (
            <div key={index} className={`
              text-sm font-mono
              ${line.startsWith('✓') ? 'text-green-600' : 
                line.startsWith('⚠') ? 'text-orange-600' :
                line.startsWith('VERDICT:') ? 'text-lg font-bold text-gray-800' :
                line.startsWith('ANALYSE') || line.startsWith('PREUVES') ? 'font-bold text-gray-700' :
                line === '' ? 'h-2' :
                'text-gray-600'
              }
            `}>
              {line === '' ? <div className="h-1" /> : line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}