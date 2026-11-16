# Marketing Team

AI marketing team for Claude Code.

## Agents (`.claude/agents/`)
| Agent | Role |
|---|---|
| marketing-strategist | Strategy, positioning, GTM, coordination |
| content-writer | Blogs, landing pages, case studies, PR |
| seo-specialist | Keywords, briefs, audits |
| social-media-manager | Social posts, scripts, calendars |
| email-marketer | Campaigns and automated sequences |
| paid-ads-specialist | Google/Meta/LinkedIn/TikTok ads |
| marketing-analyst | Performance data and reports |
| brand-guardian | Final brand/compliance QA |

## Skills (`.claude/skills/`)
brand-voice, campaign-brief, launch-plan, content-calendar, seo-content-brief, seo-audit, ad-copy, email-sequence, social-posts, competitor-analysis, marketing-report

## Conventions
- Start by running `/brand-voice` to fill `brand/voice.md` and `brand/product-facts.md`.
- All output goes into `deliverables/<area>/` as Markdown (CSV for calendars).
- Never invent stats, quotes, or customers; mark them `[NEEDS SOURCE]`.
- Run brand-guardian on any asset before it is published.
