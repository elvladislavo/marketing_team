# One-Person Marketing Team

You (the main session, Opus) act as the **orchestrator**: plan, delegate, review. All department work runs on **Sonnet** subagents (`model: sonnet` in each agent file). For big multi-step jobs you can also delegate to the `orchestrator` agent (Opus).

## Structure
```
knowledge/   voice, offer, rules, audience, content, channels, compliance, reporting  (source of truth)
data/        posts.csv, leads.csv, sales.csv                                         (system of record)
queue/       approval.md (human approves), escalations.md (needs you)
content/     drafts, creative, email, blog, launch ...                               (agent output)
reports/     morning briefs, analytics, next-week priorities
```

## Departments (40 Sonnet agents, `.claude/agents/`)
| Department | Agents |
|---|---|
| Research & Content | trend-spotter, audience-researcher, keyword-finder, post-writer, email-writer |
| Creative Studio | video-maker, graphic-designer, voiceover, editor, approval-desk |
| Distribution & Community | scheduler, short-form-poster, long-form-poster, comment-dm-agent, escalation |
| Email & Nurture | newsletter, sequences, lead-magnet, segmenter, win-back |
| Leads & Booking | lead-catcher, lead-scorer, call-booker, reminder, payment-link |
| Search & Website | seo-writer, rank-tracker, page-updater, repurposer, lead-forms |
| The Analytics Loop | post-analyst, call-tracker, revenue-tracker, email-analyst, loop-feeder |
| Growth & Reach | hashtag-scout, profile-optimizer, engagement-hunter, collab-finder, local-presence |

## Skills
`/setup-knowledge` (run first) · `/daily-run` · `/morning-brief` · `/approve` · `/analytics-loop` · `/launch-plan` · `/campaign-brief` · `/content-calendar` · `/social-posts` · `/email-sequence` · `/ad-copy` · `/seo-content-brief` · `/seo-audit` · `/competitor-analysis` · `/marketing-report`

## Rules
- Manager thinks (Opus); agents execute small, focused tasks (Sonnet). Run independent tasks in parallel.
- Nothing is published, sent or paid for without `approve` in `queue/approval.md`.
- Escalate: wants a person, angry comment, risky claim, hot lead, viral post, unlicensed music, low credits.
- Never invent data, quotes, customers or prices.
- External tools (HubSpot, Canva, Buffer, ElevenLabs, Stripe, Calendly...) work only when their MCP connector is connected; otherwise agents produce ready-to-use drafts and files.
- `scripts/gen_agents.py` regenerates the 35 department agents - edit it, then run `python3 scripts/gen_agents.py`.

## Studio (images & animated Reels)
`studio/` renders brand-styled content: `node render.js image <html> <png>` (1080x1350 carousel slides) and `node render.js video <html> <mp4> <secs> 30` (1080x1920 Reels, animation in `window.render(t)`). Output goes to `content/media/`. Run `npm i` in `studio/` first in a new session.
Buffer needs a **public URL** for media: upload files to a public host (e.g. elvladislavo.com/media/) before scheduling Instagram posts.
8-bit music: `studio/chip.sh <in.mp4> <out.mp4> [seed]` adds an original NES-style chiptune (default for Reels, output *-8bit.mp4; generator: studio/chiptune.py).
Ambient audio: `studio/ambient.sh <in.mp4> <out.mp4> warm|tech|calm` adds an original license-free pad (use for every Reel; name output *-a.mp4).
Media hosting: the repo is public, so Buffer uses `https://raw.githubusercontent.com/elvladislavo/marketing_team/<branch>/content/media/<file>` - commit & push media before scheduling, and never delete scheduled media from that branch.
