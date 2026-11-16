---
name: launch-plan
description: Plan a product or feature launch end-to-end, coordinating strategy, content, SEO, social, email, ads, and review. Use for "we're launching X" or full go-to-market requests.
---
# Launch Plan (team orchestration)

Run the marketing team in this order, delegating to subagents:
1. **marketing-strategist** -> campaign brief (use the `campaign-brief` skill) and positioning.
2. In parallel:
   - **content-writer** -> launch blog post, landing page copy, press release
   - **seo-specialist** -> keyword targets and SEO brief for the landing page
   - **social-media-manager** -> launch-week social posts
   - **email-marketer** -> announcement email + follow-up sequence
   - **paid-ads-specialist** -> launch ad campaign and copy
3. **brand-guardian** -> review every asset; fix issues.
4. **marketing-analyst** -> define tracking (UTMs, events) and the success dashboard metrics.

Finish with `deliverables/launch/<product>-launch-plan.md`: timeline (T-30 to T+30), asset checklist with owners/status, and links to all deliverables.
