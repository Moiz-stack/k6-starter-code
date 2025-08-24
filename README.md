# K6 Load Testing Project

This project demonstrates a **structured K6 performance testing framework**.

## 📂 Project Structure
- `scripts/` → Load, Stress, and Smoke tests
- `config/` → Centralized configuration and URLs
- `utils/` → Helper checks and reusable logic
- `results/` → JSON/HTML reports

## 🚀 Run Tests
1. Install [K6](https://k6.io/docs/get-started/installation/).
2. Run a script:
   ```bash
   k6 run scripts/load-test.js
