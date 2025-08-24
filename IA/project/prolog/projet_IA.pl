:- discontiguous has_motive/2.
:- discontiguous was_near_crime_scene/2.
:- discontiguous has_fingerprint_on_weapon/2.
:- discontiguous has_bank_transaction/2.
:- discontiguous owns_fake_identity/2.
:- discontiguous eyewitness_identification/2.
:- discontiguous has_alibi/2.
:- discontiguous has_cyber_evidence/2.
:- discontiguous has_dna_evidence/2.
:- discontiguous has_confession/2.

% Types de crimes
crime_type(vol).
crime_type(meurtre).
crime_type(cybercrime).
crime_type(trafic_drogue).
crime_type(corruption).

% Suspects 
suspect(sarobidy).
suspect(mirindra).
suspect(malala).
suspect(tobias).
suspect(alex).

% Faits et preuves
has_motive(sarobidy, vol).
was_near_crime_scene(sarobidy, vol).
has_fingerprint_on_weapon(sarobidy, vol).


has_motive(mirindra, meurtre). 
was_near_crime_scene(mirindra, meurtre).
has_dna_evidence(mirindra, meurtre).


has_motive(malala, cybercrime).  
has_cyber_evidence(malala, cybercrime).
owns_fake_identity(malala, cybercrime).


has_motive(tobias, trafic_drogue).  
has_bank_transaction(tobias, trafic_drogue).
has_confession(tobias, trafic_drogue).


has_motive(alex, corruption).  % Pouvoir
has_bank_transaction(alex, corruption).
has_alibi(alex, corruption).  

% Regles
is_guilty(Suspect, vol) :-
    has_motive(Suspect, vol),
    was_near_crime_scene(Suspect, vol),
    has_fingerprint_on_weapon(Suspect, vol),
    \+ has_alibi(Suspect, vol).


is_guilty(Suspect, meurtre) :-
    has_motive(Suspect, meurtre),
    was_near_crime_scene(Suspect, meurtre),
    (has_fingerprint_on_weapon(Suspect, meurtre)
    ; has_dna_evidence(Suspect, meurtre)
    ; has_confession(Suspect, meurtre)),
    \+ has_alibi(Suspect, meurtre).


is_guilty(Suspect, cybercrime) :-
    (has_motive(Suspect, cybercrime), has_cyber_evidence(Suspect, cybercrime))
    ; (has_cyber_evidence(Suspect, cybercrime), owns_fake_identity(Suspect, cybercrime))
    ; (has_motive(Suspect, cybercrime), owns_fake_identity(Suspect, cybercrime)).


is_guilty(Suspect, trafic_drogue) :-
    has_motive(Suspect, trafic_drogue),
    (has_bank_transaction(Suspect, trafic_drogue)
    ; has_confession(Suspect, trafic_drogue)).


is_guilty(Suspect, corruption) :-
    has_motive(Suspect, corruption),
    has_bank_transaction(Suspect, corruption),
    \+ has_alibi(Suspect, corruption).

main :-
    write('Entrez le crime (ex: crime(pierre, vol)): '),
    read(Crime),
    Crime = crime(Suspect, CrimeType),
    (is_guilty(Suspect, CrimeType) -> 
        format('~w est coupable de ~w.~n', [Suspect, CrimeType])
    ; 
        format('~w n\'est pas coupable de ~w.~n', [Suspect, CrimeType])
),
    halt.
:- initialization(main).