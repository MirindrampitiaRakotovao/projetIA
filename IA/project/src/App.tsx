import React, { useState } from 'react';
import { Scale, Brain, User} from 'lucide-react';
import { suspects, crimes } from './data/criminalData';
import { analyzeCrime } from './logic/crimeAnalyzer';
import { AnalysisPanel } from './components/AnalysisPanel';
import { CrimeAnalysis } from './types';

function App() {
  const [selectedSuspect, setSelectedSuspect] = useState<string>('');
  const [selectedCrime, setSelectedCrime] = useState<string>('');
  const [analysis, setAnalysis] = useState<CrimeAnalysis | null>(null);

  const handleAnalyze = () => {
    if (selectedSuspect && selectedCrime) {
      const result = analyzeCrime(selectedSuspect, selectedCrime);
      setAnalysis(result);
    }
  };

  const resetAnalysis = () => {
    setSelectedSuspect('');
    setSelectedCrime('');
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
   
      <header className="text-center py-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <Scale className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Système d'Analyse Criminelle
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto px-4">
          Analysez les preuves et déterminez la culpabilité des suspects
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-16">
     
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-white" />
            <h2 className="text-2xl font-bold text-white">Nouvelle Analyse</h2>
          </div>
          <p className="text-blue-100 mb-8">
            Sélectionnez un suspect et un type de crime pour commencer l'analyse
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
            <div>
              <label className="block text-white font-semibold mb-3">Suspect</label>
              <select
                value={selectedSuspect}
                onChange={(e) => setSelectedSuspect(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="" className="bg-gray-800 text-white">Choisir un suspect</option>
                {suspects.map(suspect => (
                  <option key={suspect.id} value={suspect.id} className="bg-gray-800 text-white">
                    {suspect.name} 
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Type de Crime</label>
              <select
                value={selectedCrime}
                onChange={(e) => setSelectedCrime(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="" className="bg-gray-800 text-white">Choisir un crime</option>
                {crimes.map(crime => (
                  <option key={crime.id} value={crime.id} className="bg-gray-800 text-white">
                    {crime.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

        
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAnalyze}
              disabled={!selectedSuspect || !selectedCrime}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <Brain className="h-5 w-5" />
              Analyser le Cas
            </button>
            
            <button
              onClick={resetAnalysis}
              className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 border border-white/20"
            >
              Réinitialiser
            </button>
          </div>
        </div>

   
        <AnalysisPanel analysis={analysis} />
      </main>
    </div>
  );
}

export default App;