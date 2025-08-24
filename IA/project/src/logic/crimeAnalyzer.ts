import { evidences } from '../data/criminalData';
import { CrimeAnalysis, Evidence } from '../types';

export function analyzeCrime(suspectId: string, crimeId: string): CrimeAnalysis {
  const suspectEvidences = evidences.filter(e => 
    e.suspect === suspectId && e.crime === crimeId
  );

  const isGuilty = evaluateGuilt(suspectId, crimeId, suspectEvidences);
  const reasoning = generateReasoning(suspectId, crimeId, suspectEvidences, isGuilty);

  return {
    suspect: suspectId,
    crime: crimeId,
    evidences: suspectEvidences,
    isGuilty,
    reasoning
  };
}

function evaluateGuilt(suspect: string, crime: string, evidences: Evidence[]): boolean {
  const hasEvidence = (type: string) => evidences.some(e => e.type === type);

  switch (crime) {
    case 'vol':
      return hasEvidence('motive') && 
            hasEvidence('location') && 
            hasEvidence('fingerprint') && 
            !hasEvidence('alibi');

    case 'meurtre':
      return hasEvidence('motive') && 
             hasEvidence('location') && 
             (hasEvidence('fingerprint') || hasEvidence('dna') || hasEvidence('confession')) &&
             !hasEvidence('alibi');

    case 'cybercrime':
      return (hasEvidence('motive') && hasEvidence('cyber')) ||
             (hasEvidence('cyber') && hasEvidence('identity')) ||
             (hasEvidence('motive') && hasEvidence('identity'));

    case 'trafic_drogue':
      return hasEvidence('motive') && 
             (hasEvidence('transaction') || hasEvidence('confession'));

    case 'corruption':
      return hasEvidence('motive') && 
             hasEvidence('transaction') && 
             !hasEvidence('alibi');

    default:
      return false;
  }
}

function generateReasoning(suspect: string, crime: string, evidences: Evidence[], isGuilty: boolean): string[] {
  const reasoning: string[] = [];
  const hasEvidence = (type: string) => evidences.some(e => e.type === type);

  reasoning.push(`Analyse du cas: ${suspect.toUpperCase()} pour ${crime.replace('_', ' ').toUpperCase()}`);
  reasoning.push('');

  // Liste des preuves disponibles
  reasoning.push('PREUVES DISPONIBLES:');
  evidences.forEach(evidence => {
    reasoning.push(`✓ ${evidence.label}`);
  });
  reasoning.push('');

  // Analyse selon les règles
  reasoning.push('ANALYSE JURIDIQUE:');
  
  switch (crime) {
    case 'vol':
      if (hasEvidence('motive')) reasoning.push('✓ Motif établi');
      if (hasEvidence('location')) reasoning.push('✓ Présence sur les lieux prouvée');
      if (hasEvidence('fingerprint')) reasoning.push('✓ Empreintes sur l\'arme du crime');
      if (hasEvidence('alibi')) reasoning.push('⚠ Alibi établi - élément disculpant');
      break;

    case 'meurtre':
      if (hasEvidence('motive')) reasoning.push('✓ Motif de meurtre établi');
      if (hasEvidence('location')) reasoning.push('✓ Présence sur la scène de crime');
      if (hasEvidence('dna')) reasoning.push('✓ Preuves ADN concluantes');
      if (hasEvidence('fingerprint')) reasoning.push('✓ Empreintes digitales');
      if (hasEvidence('confession')) reasoning.push('✓ Confession enregistrée');
      if (hasEvidence('alibi')) reasoning.push('⚠ Alibi établi - élément disculpant');
      break;

    case 'cybercrime':
      if (hasEvidence('motive')) reasoning.push('✓ Motif cybercriminel identifié');
      if (hasEvidence('cyber')) reasoning.push('✓ Traces numériques trouvées');
      if (hasEvidence('identity')) reasoning.push('✓ Utilisation d\'identité falsifiée');
      reasoning.push('→ Au moins 2 éléments sur 3 requis pour établir la culpabilité');
      break;

    case 'trafic_drogue':
      if (hasEvidence('motive')) reasoning.push('✓ Motif de trafic établi');
      if (hasEvidence('transaction')) reasoning.push('✓ Transactions bancaires suspectes');
      if (hasEvidence('confession')) reasoning.push('✓ Confession du suspect');
      break;

    case 'corruption':
      if (hasEvidence('motive')) reasoning.push('✓ Motif de corruption (pouvoir/argent)');
      if (hasEvidence('transaction')) reasoning.push('✓ Mouvements financiers suspects');
      if (hasEvidence('alibi')) reasoning.push('⚠ Alibi établi - élément disculpant');
      break;
  }

  reasoning.push('');
  reasoning.push(`VERDICT: ${isGuilty ? 'COUPABLE' : 'NON COUPABLE'}`);
  
  if (!isGuilty) {
    reasoning.push('Les preuves sont insuffisantes selon les critères juridiques établis.');
  }

  return reasoning;
}