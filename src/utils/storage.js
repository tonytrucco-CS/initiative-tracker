const PARTY_KEY = 'pf2e:pcs';

export const saveParty = (participants = []) => {
  try {
    const party = participants
      .filter((c) => c.type === 'pc')
      .map((c) => ({ ...c, initiative: 0 }));
    localStorage.setItem(PARTY_KEY, JSON.stringify(party));
  } catch (err) {
    console.error('Error saving the party:', err);
  }
};

export const loadParty = () => {
  try {
    const raw = localStorage.getItem(PARTY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error loading the party:', err);
    return [];
  }
};

export const clearParty = () => {
  try {
    localStorage.removeItem(PARTY_KEY);
  } catch (err) {
    console.error('Error removing party:', err);
  }
};
