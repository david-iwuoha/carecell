
---

## **Backend Modules**

### **1. Patient Enrollment (`patients.js`)**

- Clinician-verified enrollment into **NSCDIR**.  
- Records **patient demographics**, **lab-verified genotype**, and **baseline CBC**.  
- Creates immutable **family donor pool** using `Donor.js`.  
- Enforces **append-only, read-only policies** for clinical integrity.  

---

### **2. HLA Matcher (`hlaMatcher.js` & `matchmaking.js`)**

- Evaluates the **probability of a genetically matched donor** in the family.  
- High potential triggers automated **BMT referral package** creation.  
- Deterministic, **risk-free computation** using only lab-verified donor genotypes.  

---

### **3. RAMM & Triage (`rammEngine.js` & `triage.js`)**

- **Respiratory Acoustic Monitoring Module (RAMM)** uses simple DSP logic to detect elevated respiratory rates.  
- **Triage route** collects daily logs and generates **ACS alerts** when thresholds are exceeded.  
- Ensures **real-time crisis prevention**.  

---

### **4. Analytics & Wearables (`analytics.js`)**

- Computes trends from **daily logs** and **wearable summaries**.  
- Provides **average respiratory rates**, **alerts triggered**, and **heart rate metrics**.  
- Supports **clinical decision-making** for caregivers and clinicians.  

---

### **5. FHIR Export (`fhirConverter.js`)**

- Converts internal patient records into **FHIR-compatible bundles**.  
- Includes **Patient resources** and **CBC Observations**.  
- Enables **secure hospital integration** without direct login.  

---

### **6. Clinician Authentication (`auth.js`)**

- Simple stub requiring `x-clinician-id` header.  
- Attaches `clinicianId` to request object for downstream verification.  
- Applied across **enrollment, triage, and matchmaking routes**.  

---

### **7. Central In-Memory Store (`store.js`)**

- Single source of truth for **patients** and **donors**.  
- Prevents **duplicate or inconsistent data** across routes.  
- Fully replaceable with a persistent database later.  

---

## **Automated Tests (`/tests`)**

- Validates **patient enrollment**, **donor immutability**, **HLA matching**, and **RAMM alerts**.  
- Uses **Jest** for lightweight, reproducible testing.  
- Ensures **backend stability** for hackathon demonstrations and further development.  

---

## **Key Technical Principles**

- **Immutable clinical records**: No edits or deletions in donors or patient history.  
- **Deterministic algorithms**: RAMM, HLA matching, and analytics produce reproducible results.  
- **Modular architecture**: Services and routes are isolated, making it easy to replace or scale.  
- **Clinician-first security**: Stub auth enforces verified access while keeping families in control.  
- **FHIR compliance**: Structured output for hospitals and EMRs.  

---

## **Next Steps / Future Enhancements**

1. **Integrate real DSP from wearable microphones** for RAMM.  
2. **Replace central store with database** (SQLite / PostgreSQL).  
3. **Extend analytics** with predictive AI models for crisis anticipation.  
4. **Full OAuth / JWT clinician authentication**.  
5. **Complete FHIR coverage** for all lab and triage data.  
6. **End-to-end automated workflow demonstration** for hackathon or production-ready demo.  

---

## **Getting Started**

1. Clone repository:
```bash
git clone < https://github.com/david-iwuoha-dev/carecell >
cd carecell-backend
