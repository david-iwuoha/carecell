/**
 * RAMM Engine - Enhanced for Real-Time Monitoring
 * Location: carecell-backend/src/services/rammEngine.js
 */

// We store the current session data in memory for the demo
// In a production app, you might use Redis
let sessionBuffer = []; 

/**
 * processBreathData
 * @param {number} breathIntensity - Signal strength from the microphone
 * @param {number} baseline - The infant's normal respiratory floor
 */
function processBreathData(breathIntensity, baseline) {
  const timestamp = Date.now();
  
  // 1. Add new data point to buffer
  sessionBuffer.push({ breathIntensity, timestamp });

  // 2. Keep only the last 30 seconds of data to save memory
  const thirtySecondsAgo = timestamp - 30000;
  sessionBuffer = sessionBuffer.filter(d => d.timestamp > thirtySecondsAgo);

  // 3. Logic: Check for Apnea (No significant breath for > 15 seconds)
  const lastBreath = sessionBuffer.findLast(d => d.breathIntensity > (baseline * 1.2));
  const secondsSinceLastBreath = lastBreath ? (timestamp - lastBreath.timestamp) / 1000 : 0;

  // 4. Calculate Risk
  let alert = false;
  let status = "Normal";

  if (secondsSinceLastBreath > 15) {
    alert = true;
    status = "APNEA_WARNING";
  } else if (breathIntensity > baseline * 2.5) {
    status = "TACHYPNEA_DETECTION"; // Breathing too fast/labored
    alert = true;
  }

  return {
    status,
    alert,
    secondsSinceLastBreath: secondsSinceLastBreath.toFixed(1),
    currentIntensity: breathIntensity
  };
}

/**
 * Original logic kept for backward compatibility
 */
function evaluateRespiratoryRisk(respiratoryRate, baselineRate) {
  if (!respiratoryRate || !baselineRate) {
    return { riskScore: 0, alert: false, error: "Missing data" };
  }
  const increase = (respiratoryRate - baselineRate) / baselineRate;
  const riskScore = Math.min(Math.max(increase, 0), 1);
  const alert = riskScore >= 0.2;

  return { riskScore, alert };
}

module.exports = { 
  evaluateRespiratoryRisk,
  processBreathData 
};