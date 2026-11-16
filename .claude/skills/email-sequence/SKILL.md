---
name: email-sequence
description: Write an automated email sequence (welcome, onboarding, nurture, cart abandonment, re-engagement, launch). Use when the user needs a drip campaign or multiple related emails.
---
# Email Sequence

1. Define: sequence type, trigger, audience segment, end goal, exit conditions.
2. Output a flow table: `# | timing | goal | subject | CTA`.
3. For each email: 3 subject lines (<50 chars), preview text (<90 chars), body (short, scannable, `{{first_name}}` personalization), one CTA, P.S. line optional.
4. Add metrics to track (open rate, CTR, conversion, unsubscribe) and A/B test ideas.

Typical defaults: welcome = 4-5 emails over 10-14 days; re-engagement = 3 emails over 10 days ending with a sunset email.
Save to `deliverables/email/<sequence-slug>.md`.
