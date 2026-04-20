const express = require("express");
const app = express();

// Core middleware
app.use(express.json());

// Routes
const patientRoutes = require("./api/routes/patients");
const triageRoutes = require("./api/routes/triage");
const matchmakingRoutes = require("./api/routes/matchmaking");
const analyticsRoutes = require("./api/routes/analytics");
const rammRoutes = require("./api/routes/ramm");

app.use("/api/patients", patientRoutes);
app.use("/api/triage", triageRoutes);
app.use("/api/matchmaking", matchmakingRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ramm", rammRoutes);


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "CareCell Backend",
    timestamp: new Date().toISOString()
  });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CareCell backend running on port ${PORT}`);
});
