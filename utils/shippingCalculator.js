/**
 * Shipping Calculator based on DTDC Quotation.
 * Base rates and additional weight bands (0.50kg) currently exclude GST (commented out).
 */

import { getZoneForState, RATES } from './shippingConfig';

// Each box weighs max 110g including packaging
const BOX_WEIGHT_KG = 0.11; 

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
