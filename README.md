<div align="center">

```text 
 ██████╗ █████╗ ██████╗ ███████╗ ██████╗███████╗██╗     ██╗     
██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██║     ██║     
██║     ███████║██████╔╝█████╗  ██║     █████╗  ██║     ██║     
██║     ██╔══██║██╔══██╗██╔══╝  ██║     ██╔══╝  ██║     ██║     
╚██████╗██║  ██║██║  ██║███████╗╚██████╗███████╗███████╗███████╗
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝╚══════╝╚══════╝
```

## Carecell

> CareCell is a dual-platform medical ecosystem designed to bridge the gap between Sickle Cell Disease (SCD) patients and clinical intervention.

![React Native](https://img.shields.io/badge/React%20Native-Mobile-61DAFB?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge)
![FHIR](https://img.shields.io/badge/HL7-FHIR-FF6B35?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-16A34A?style=for-the-badge)
![License](https://img.shields.io/badge/License-Private-111827?style=for-the-badge)

</div>

---

## 🚑 The Problem It Solves

Sickle cell patients often face life-threatening complications like Acute Chest Syndrome (ACS) that develop rapidly and silently. Traditional monitoring is reactive, often catching crises only after they become emergencies. CareCell changes that model through continuous Respiratory Acoustic Monitoring and Genetic Matchmaking to create earlier interventions and faster clinical pathways

---

## ⚙️ How It Works

| Step | Process                                                                             | Outcome                                   |
| ---- | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| 1    | **Continuous Monitoring** via RAMM module connected to wearable microphones/sensors | Overnight respiratory tracking            |
| 2    | **Autonomous Triage** using DSP logic for respiratory frequency and depth           | Automated ACS risk alerts                 |
| 3    | **Clinical Intervention** through FHIR-compatible bundles                           | Structured referrals and emergency action |

---

## 🧠 Tech Stack

| Technology                | Role in Project                                                                |
| ------------------------- | ------------------------------------------------------------------------------ |
| React Native              | Cross-platform mobile application for patient logging and vitals visualization |
| Node.js / Express         | Core engine for DSP logic, genetic matchmaking, and routing                    |
| Tailwind CSS (NativeWind) | Accessible high-contrast mobile UI                                             |
| Jest                      | Deterministic testing for HLA matching logic                                   |
| HL7 FHIR Standards        | Interoperability with hospital EMR systems                                     |

---

## ✨ Key Features

| Feature                        | Description                                            |
| ------------------------------ | ------------------------------------------------------ |
| 📊 Real-Time Vitals Dashboard  | Visualizes heart rate and respiratory trends           |
| 🔊 RAMM Engine                 | Uses acoustic DSP to detect elevated respiratory rates |
| 🧬 Deterministic HLA Matcher   | Calculates donor match probability within family pools |
| 🚨 Automated Triage Alerts     | Instant alerts when thresholds are breached            |
| 🏥 FHIR Bundle Exporter        | Secure hospital-ready structured data export           |
| 🛡️ Immutable Clinical Records | Append-only records for demographics and genotypes     |

---

## 🚀 How To Run Locally

### Backend

```bash
cd carecell-backend
npm install
npm test
npm start
```

### Frontend

```bash
cd carecell-mobile
npm install
npx react-native run-android
# or
npx react-native run-ios
```

> Backend default: `http://localhost:3000`

---

## 📁 File Structure

```bash
CareCell/
├── carecell-mobile/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   └── utils/
├── carecell-backend/
│   ├── routes/
│   ├── services/
│   │   ├── rammEngine.js
│   │   ├── hlaMatcher.js
│   │   └── fhirConverter.js
│   ├── store.js
│   └── tests/
└── README.md
```

---

## 📊 Roadmap

### Completed

* [x] Core RAMM respiratory threshold detection
* [x] Deterministic HLA matchmaking engine
* [x] React Native dashboard and triage screens
* [x] Basic FHIR Patient + Observation conversion

### Coming Next

* [ ] PostgreSQL persistent storage migration
* [ ] Live wearable microphone sync
* [ ] Predictive AI crisis anticipation models

---

## 🏥 Built For

A specialized medical demo build for researchers and clinicians. Completed February 2026.

---

## 👥 Team

| Role   | Details                                                     |
| ------ | ----------------------------------------------------------- |
| Author | Iwuoha David                                                |
| Team   | Six researchers and biologists from the University of Lagos |

---

## 📌 Final Note

> CareCell focuses on moving sickle cell care from reactive emergency response to proactive early intervention.
