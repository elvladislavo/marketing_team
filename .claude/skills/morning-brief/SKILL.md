---
name: morning-brief
description: Produce the 'what you see every morning' status brief - yesterday's output, numbers, approvals and escalations waiting on the human. Use for "morning brief", "status", "marketing status --today".
---
# Morning Brief
Read data/*.csv, queue/approval.md, queue/escalations.md and latest reports/. Write reports/morning-brief-<date>.md:

```
$ marketing status --today
posts written     <n>
videos posted     <n>
comments replied  <n>
leads captured    <n>  (hot: <n>)
calls booked      <n>
revenue (7d)      <amount>
waiting on you    <n>
```
Then: **Needs you** (escalations, top first, one line each with suggested action), **Approve today** (pending rows), **Yesterday's best post** and why, **Today's plan** (3 bullets). Keep it readable in 60 seconds. Only real numbers.
