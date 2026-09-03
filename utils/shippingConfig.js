export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export const RATES = {
  // Rates with 18% GST included (commented out for now)
  // kerala: { base: 59, addl: 53.1 }, // 50 + 18% GST, 45 + 18% GST
  // south: { base: 82.6, addl: 76.7 }, // 70 + 18%, 65 + 18%
  // metroStates: { base: 100.3, addl: 88.5 }, // 85 + 18%, 75 + 18%
  // restOfIndia: { base: 153.4, addl: 118 }, // 130 + 18%, 100 + 18%
  // specialZone: { base: 188.8, addl: 177 }, // 160 + 18%, 150 + 18%

  // Base rates without GST
  kerala: { base: 50, addl: 45 },
  south: { base: 70, addl: 65 },
  metroStates: { base: 85, addl: 75 },
  restOfIndia: { base: 99, addl: 100 },
  specialZone: { base: 99, addl: 150 }
};

export const ZONES = {
  south: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Puducherry'],
  metroStates: ['Maharashtra', 'Delhi', 'West Bengal'],
  specialZone: [
    'Jammu and Kashmir', 'Himachal Pradesh', 'Assam', 
    'Meghalaya', 'Arunachal Pradesh', 'Manipur', 'Mizoram', 'Nagaland', 
    'Tripura', 'Sikkim', 'Andaman and Nicobar Islands', 'Lakshadweep', 'Ladakh'
  ]
};

export function getZoneForState(state) {
  if (!state) return 'restOfIndia';
  
  if (state === 'Kerala') return 'kerala';
  if (ZONES.south.includes(state)) return 'south';
  if (ZONES.metroStates.includes(state)) return 'metroStates';
  if (ZONES.specialZone.includes(state)) return 'specialZone';
  
  return 'restOfIndia';
}
