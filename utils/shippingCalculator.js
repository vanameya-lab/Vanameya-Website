/**
 * Shipping Calculator based on DTDC Quotation.
 * Base rates and additional weight bands (0.50kg) include 18% GST.
 */

// Each box weighs max 110g including packaging
const BOX_WEIGHT_KG = 0.11; 

const RATES = {
  kerala: { base: 59, addl: 53.1 }, // 50 + 18% GST, 45 + 18% GST
  south: { base: 82.6, addl: 76.7 }, // 70 + 18%, 65 + 18%
  metroStates: { base: 100.3, addl: 88.5 }, // 85 + 18%, 75 + 18%
  restOfIndia: { base: 153.4, addl: 118 }, // 130 + 18%, 100 + 18%
  specialZone: { base: 188.8, addl: 177 } // 160 + 18%, 150 + 18%
};

const ZONES = {
  south: ['tamil nadu', 'karnataka', 'andhra pradesh', 'telangana', 'puducherry'],
  metroStates: ['maharashtra', 'delhi', 'west bengal', 'new delhi'],
  specialZone: [
    'jammu and kashmir', 'jammu & kashmir', 'himachal pradesh', 'assam', 
    'meghalaya', 'arunachal pradesh', 'manipur', 'mizoram', 'nagaland', 
    'tripura', 'sikkim', 'andaman and nicobar islands', 'lakshadweep', 'ladakh'
  ]
};

function getZoneForState(state) {
  if (!state) return 'restOfIndia';
  const normalizedState = state.trim().toLowerCase();
  
  if (normalizedState === 'kerala') return 'kerala';
  if (ZONES.south.includes(normalizedState)) return 'south';
  if (ZONES.metroStates.includes(normalizedState)) return 'metroStates';
  if (ZONES.specialZone.includes(normalizedState)) return 'specialZone';
  
  return 'restOfIndia';
}

export function calculateShipping(state, totalBoxes) {
  const zone = getZoneForState(state);
  const rateConfig = RATES[zone];

  // Calculate total weight in kg
  const totalWeightKg = totalBoxes * BOX_WEIGHT_KG;
  
  let totalCost = rateConfig.base;

  if (totalWeightKg > 0.5) {
    const additionalWeight = totalWeightKg - 0.5;
    // Calculate how many 0.50kg bands are needed for the additional weight
    const additionalBands = Math.ceil(additionalWeight / 0.5);
    totalCost += (additionalBands * rateConfig.addl);
  }

  // Return rounded to nearest integer (Standard practice for shipping)
  return Math.round(totalCost);
}
