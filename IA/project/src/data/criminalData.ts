import { Suspect, Crime, Evidence } from '../types';

export const suspects: Suspect[] = [
  { id: 'sarobidy', name: 'Sarobidy' },
  { id: 'mirindra', name: 'Mirindra' },
  { id: 'malala', name: 'Malala' },
  { id: 'tobias', name: 'Tobias' },
  { id: 'alex', name: 'Alex' }
];

export const crimes: Crime[] = [
  { id: 'vol', name: 'Vol', icon: 'ShoppingBag' },
  { id: 'meurtre', name: 'Meurtre', icon: 'Skull' },
  { id: 'cybercrime', name: 'Cybercrime', icon: 'Monitor' },
  { id: 'trafic_drogue', name: 'Trafic de Drogue', icon: 'Pill' },
  { id: 'corruption', name: 'Corruption', icon: 'Banknote' }
];

export const evidences: Evidence[] = [
  { type: 'motive', suspect: 'sarobidy', crime: 'vol', label: 'Motif identifié', icon: 'Target' },
  { type: 'location', suspect: 'sarobidy', crime: 'vol', label: 'Présent sur les lieux', icon: 'MapPin' },
  { type: 'fingerprint', suspect: 'sarobidy', crime: 'vol', label: 'Empreintes sur l\'arme', icon: 'Fingerprint' },

  // MEURTRE - Marie
  { type: 'motive', suspect: 'mirindra', crime: 'meurtre', label: 'Motif identifié', icon: 'Target' },
  { type: 'location', suspect: 'mirindra', crime: 'meurtre', label: 'Présent sur les lieux', icon: 'MapPin' },
  { type: 'dna', suspect: 'mirindra', crime: 'meurtre', label: 'Preuves ADN', icon: 'Dna' },

  // CYBERCRIME - Antoine
  { type: 'motive', suspect: 'malala', crime: 'cybercrime', label: 'Motif identifié', icon: 'Target' },
  { type: 'cyber', suspect: 'malala', crime: 'cybercrime', label: 'Preuves numériques', icon: 'HardDrive' },
  { type: 'identity', suspect: 'tobias', crime: 'cybercrime', label: 'Fausse identité', icon: 'UserX' },

  // TRAFIC DE DROGUE - Celine
  { type: 'motive', suspect: 'tobias', crime: 'trafic_drogue', label: 'Motif identifié', icon: 'Target' },
  { type: 'transaction', suspect: 'tobias', crime: 'trafic_drogue', label: 'Transactions bancaires', icon: 'CreditCard' },
  { type: 'confession', suspect: 'tobias', crime: 'trafic_drogue', label: 'Confession', icon: 'MessageSquare' },

  // CORRUPTION - David
  { type: 'motive', suspect: 'alex', crime: 'corruption', label: 'Motif identifié', icon: 'Target' },
  { type: 'transaction', suspect: 'alex', crime: 'corruption', label: 'Transactions bancaires', icon: 'CreditCard' },
  { type: 'alibi', suspect: 'alex', crime: 'corruption', label: 'Alibi établi', icon: 'Shield' }
];