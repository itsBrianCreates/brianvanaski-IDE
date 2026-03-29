# CodeStory

**An agent skill that turns your coding sessions into social media content.**

```
 ██████╗ ██████╗ ██████╗ ███████╗███████╗████████╗ ██████╗ ██████╗ ██╗   ██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
██║     ██║   ██║██║  ██║█████╗  ███████╗   ██║   ██║   ██║██████╔╝ ╚████╔╝
██║     ██║   ██║██║  ██║██╔══╝  ╚════██║   ██║   ██║   ██║██╔══██╗  ╚██╔╝
╚██████╗╚██████╔╝██████╔╝███████╗███████║   ██║   ╚██████╔╝██║  ██║   ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝
```

## What it does

CodeStory is a skill for Claude Code that automatically tracks your development work — technical wins, debugging moments, feature completions, architecture decisions — and converts them into polished social media content.

Built for people who build in public and want to share their progress without stopping to write about it.

## How it works

As you work in Claude Code, CodeStory quietly tracks notable moments and saves them to a session draft. When you're ready, invoke it with `/CodeStory` or just say "run CodeStory" and it generates platform-specific content.

**Multi-platform output:** Tailored drafts for LinkedIn, X/Twitter, Threads, and Bluesky. Configurable tone (casual, professional, educational) and length (short, medium, long).

**No hashtags. No corporate jargon. No AI-sounding phrases.** Just conversational, specific, narrative storytelling about what you actually built.

## Install

One command:

```bash
curl -fsSL https://raw.githubusercontent.com/itsBrianCreates/CodeStory/main/codestory/install.sh | bash
```

## What gets created

- `.claude/skills/CodeStory/SKILL.md` — the skill logic
- `CLAUDE.md` — auto-tracking behavior
- `.social-config.md` — your preferences (tone, platforms, length)
- `.social-draft-{name}.md` — raw session notes (gitignored)
- `socialmedia-{name}.md` — polished output history

## Why I built it

I share what I build on LinkedIn almost every day. Writing those posts used to be a separate task — open a doc, try to remember what I did, write it up. CodeStory makes it automatic. The AI watches me work and writes the story for me.

It's open source and MIT licensed.

[View on GitHub](https://github.com/itsBrianCreates/CodeStory)
