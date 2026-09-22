# Anas Latheef - Projects Overview & Interview Guide

This document provides a comprehensive overview of the projects showcased on your portfolio website. It is designed to serve as a reference guide for interviews, highlighting your technical skills, problem-solving abilities, and expertise in logistics, inventory management, and AI automation.

## 1. Smart Inventory System
**Overview:** An advanced Excel-based Inventory Management System designed for precise tracking and optimization of stock levels.
**The Problem Solved:** Manual, error-prone inventory tracking leads to stockouts, overstocking, and poor visibility.
**Key Features & Technical Implementation:**
- Employs advanced Microsoft Excel techniques including Power Pivot, complex formulas (Index Match, XLOOKUP), and dynamic Pivot Tables.
- Provides a centralized dashboard for real-time inventory visibility and precise tracking.

## 2. Predictive Analytics AI
**Overview:** A forecasting model that anticipates inventory shortages up to 3 weeks in advance.
**The Problem Solved:** Reactive inventory management often results in late purchasing and lost sales. This model shifts the paradigm from reactive to proactive.
**Key Features & Technical Implementation:**
- Analyzes historical consumption data and seasonality.
- Employs predictive analytics models to identify potential future stockouts before they affect the supply chain.

## 3. Data Pipeline Automation
**Overview:** An automated system integrating global vendor APIs to display real-time errors and metrics on a unified dashboard.
**The Problem Solved:** Disconnected vendor systems and manual data fetching create blind spots in the supply chain and delay response times to critical logistical errors.
**Key Features & Technical Implementation:**
- Seamless API integration connecting various vendor endpoints.
- Modern automated data workflows ensuring that error logs and pipeline status are instantaneously reflected on the dashboard.

## 4. Executive Freight Dashboard
**Overview:** An interactive data visualization suite tracking global transit times, bottlenecks, warehouse shrinkage, and cost-per-unit.
**The Problem Solved:** Executive leadership lacking a high-level, clear overview of the most critical logistical KPIs necessary for strategic decision-making.
**Key Features & Technical Implementation:**
- Built using Power BI / Advanced Dashboarding tools.
- Visualizes complex datasets including transit durations, operational bottlenecks, inventory shrinkage, and unit economics into an easily digestible layout.

## 5. Zero-Stock Automation Trigger
**Overview:** An automated, real-time webhook alerting system linking raw warehouse data with proactive procurement.
**The Problem Solved:** The lag between an item hitting critical stock levels and procurement placing an order. This system stops stockouts before they happen.
**Key Features & Technical Implementation:**
- **Tech Stack:** Python, Webhooks, Power BI, DAX.
- **Dynamic Logic:** A Python engine actively checks stock levels against the Reorder Point (ROP). Once breached, an instant JSON payload is fired via webhooks to the procurement channel.
- Validated via dynamic data simulations testing consumption metrics under stress.

## 6. Dynamic Fleet Routing Engine
**Overview:** A predictive model optimized for multi-stop delivery routes.
**The Problem Solved:** Inefficient delivery routing resulting in high fuel consumption, delayed ETAs, and increased vehicle wear and tear.
**Key Features & Technical Implementation:**
- Calculates the most cost-effective and time-efficient delivery pathways.
- Minimizes fuel usage and improves the accuracy of Estimated Times of Arrival (ETA).

## 7. Velocity-Based Warehouse Slotting
**Overview:** A strategic planning tool that reorganizes SKUs based on pick-velocity and product seasonality.
**The Problem Solved:** Poor warehouse organization where fast-moving items are placed far from dispatch zones, increasing picker travel time and slowing down throughput.
**Key Features & Technical Implementation:**
- Analyzes pick-velocity data to stratify inventory (ABC Analysis).
- Offers a strategically reorganized layout blueprint that drastically cuts down the time layout operators spend walking the warehouse floor.

## 8. WealthSync
**Overview:** A smart personal finance and wealth management application.
**The Problem Solved:** Fragmented personal finance data across different accounts and formats.
**Key Features & Technical Implementation:**
- Designed to sync, track, and optimize financial portfolios in real-time within a secure ecosystem.

## 9. AL-Finance
**Overview:** A full-stack personal finance application.
**The Problem Solved:** Need for a centralized platform to thoroughly track personal income, expenses, and upload receipts with high usability.
**Key Features & Technical Implementation:**
- Full-stack web development implementation (deployed on Vercel).
- Features beautiful analytics charts for visual financial tracking and deep data insights.
- Integrates receipt tracking and categorization capabilities.

---
### Interview Strategy & Guidance
When discussing these projects in an interview, structure your answers using the **STAR Method** (Situation, Task, Action, Result):
1. **Focus on the Business Impact:** Always highlight how your projects saved money (e.g., reduced fuel consumption, cut warehouse picker travel time) or saved time (automated webhooks).
2. **Bridge the Gap:** Emphasize your unique ability to speak both the language of Logistics Operations and Modern Technical AI/Automation. You aren't just an analyst; you are an implementer.
3. **Be Prepared for Technical Deep Dives:** Be ready to explain *how* your Python webhook integrates with the data layer, or *how* your DAX formulas calculate shrinkage in Power BI.
