const express = require("express");
const router = express.Router();
const rammEngine = require("../../services/rammEngine");

// POST /api/ramm/monitor
router.post("/monitor", (req, res) => {
  try {
    const { intensity, baseline } = req.body;
    
    // Call the engine logic we updated earlier
    const result = rammEngine.processBreathData(intensity, baseline);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to process respiratory data" });
  }
});

// GET /api/ramm/risk-check (for the old logic)
router.get("/risk-check", (req, res) => {
  const { rate, baseline } = req.query;
  const result = rammEngine.evaluateRespiratoryRisk(parseFloat(rate), parseFloat(baseline));
  res.status(200).json(result);
});

module.exports = router;