🩸 CareCell: Precision Sickle Cell Monitoring & Intervention

CareCell is a specialized digital health ecosystem designed to support Sickle Cell Disease (SCD) patients through proactive monitoring. By integrating Respiratory Acoustic Monitoring (RAMM) with clinical HLA matchmaking, CareCell shifts the paradigm from reactive treatment to predictive crisis prevention.

🏛️ System Architecture

The project is divided into two primary environments working in tandem:

CareCell Mobile (Frontend): A React Native application for real-time patient logging, wearable data visualization, and emergency triage.

CareCell Engine (Backend): A Node.js environment handling the complex logic for genetic matching, acoustic signal processing (DSP), and FHIR data standards.

💻 Backend Modules & Logic

The backend is built with modularity at its core, ensuring clinical integrity and deterministic outputs.

Module

Component

Technical Role

Status

Patient Enrollment

patients.js

Verification of lab-verified genotype and baseline CBC.

✅ Functional

HLA Matcher

hlaMatcher.js

Evaluates genetic donor probability within family pools.

✅ Functional

RAMM Engine

rammEngine.js

Respiratory Acoustic Monitoring logic for ACS detection.

✅ Functional

Triage System

triage.js

Routes daily logs and generates alerts when thresholds exceed.

✅ Functional

FHIR Export

fhirConverter.js

Converts internal data to HL7 FHIR for hospital interop.

✅ Functional

Analytics

analytics.js

Computes trends from wearable heart rate and breath data.

✅ Functional

Clinical Auth

auth.js

Stub authentication requiring x-clinician-id verification.

🟡 Demo Stub

📱 React Native Frontend Implementation

The frontend is designed for high-stress scenarios (Crisis) and long-term health tracking (Wellness).

Key Features

Vitals Dashboard: Real-time feedback loop displaying data processed by the RAMM engine.

Crisis Triage Interface: A simplified, high-contrast UI allowing patients to report pain levels and symptoms in seconds.

Donor Visualization: A visual representation of the family donor pool and the likelihood of successful Bone Marrow Transplant (BMT) matches.

Secure Clinician View: A specialized UI for doctors to review verified lab data and historical triage trends.

🔬 Core Technical Principles

To maintain medical-grade reliability, the system follows four "Golden Rules":

Clinical Immutability: Patient demographics, donor genotypes, and history are append-only. Records cannot be edited to ensure clinical audit trails.

Deterministic Computation: Algorithms for HLA matching and RAMM thresholds produce consistent results across all environments.

FHIR Compliance: All output destined for external hospital systems follows the HL7 FHIR Bundle structure for seamless EMR integration.

Acoustic-First Triage: Prioritizes respiratory frequency (detected via RAMM) over subjective pain reporting to catch Acute Chest Syndrome (ACS) early.

🧪 Testing & Stability

Reliability is non-negotiable. Our test suite (powered by Jest) covers:

Genetic Logic: Validating match probability calculations.

Triage Alerts: Ensuring RAMM logic triggers alerts at the exact respiratory thresholds.

Data Integrity: Confirming that the central store prevents duplicate patient entries.

🗺️ Roadmap to Production

The current build is a fully functional demo. The following steps will bridge the gap to clinical trials:

[ ] Real-time DSP: Integration with physical wearable microphones for live acoustic analysis.

[ ] Persistence Layer: Transition from store.js (In-memory) to a secure PostgreSQL database.

[ ] Predictive AI: Implementing deep learning models to predict crises before thresholds are reached.

[ ] OAuth2 Integration: Full JWT-based security for patients and clinicians.

🛠️ Installation & Setup

Backend Engine

git clone [https://github.com/david-iwuoha-dev/carecell-backend](https://github.com/david-iwuoha-dev/carecell-backend)
cd carecell-backend
npm install
npm test # Run clinical logic tests
npm start # Launch demo server


Mobile App

cd carecell-mobile
npm install
npx react-native run-android # or run-ios


Lead Developer: Iwuoha David

University: University of Lagos

Collaboration: AI-Assisted Clinical Interface Design

Demo Build Completed: February 2026
