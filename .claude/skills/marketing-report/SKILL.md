---
name: marketing-report
description: Analyze campaign/channel performance data (CSV, exports, pasted numbers) and produce a performance report with insights and recommendations. Use for weekly/monthly reports or "how did we do".
---
# Marketing Performance Report

1. Load and validate data (use Python/pandas via Bash for files). Note gaps or anomalies.
2. Calculate relevant KPIs: spend, impressions, clicks, CTR, CPC, conversions, CVR, CPA, revenue, ROAS, CAC, LTV:CAC.
3. Compare period-over-period and against targets.
4. Write `deliverables/reports/report-<period>.md`:
   - Executive summary (3 bullets: what happened, why, what next)
   - KPI table with deltas
   - Channel / campaign breakdown
   - Wins, losses, and root causes
   - Prioritized recommendations (action, expected impact, owner)
Only use numbers from the provided data.
