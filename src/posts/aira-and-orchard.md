---
title: "Fiddling with New Projects: AIRA and Orchard"
date: "2026-01-11"
description: "A look at two open-source tools I'm building to make my Linux life better: a local AI assistant and a native iCloud client."
slug: "aira-and-orchard"
---

I have a bit of a confession: I am a chronic "tool builder." If I find a friction point in my daily workflow, instead of finding a workaround, I tend to accidentally spend three weeks building an entire software architecture to fix it.

Recently, I've been pouring my weekends into two such projects: **AIRA** and **Orchard**. They address two very different problems, but they share the same philosophy: **My Linux machine should be a first-class citizen.**

## AIRA: The Local AI Assistant 🤖

**GitHub:** [rvardiashvili/AIRA](https://github.com/rvardiashvili/AIRA)

We live in the age of LLMs, but I hated the workflow of switching to a browser, logging into ChatGPT, and pasting context. It felt disconnected. I wanted an AI that lived *inside* my OS, knew about my files, and respected my privacy.

So I built **AIRA** (AI Responsive Assistant).

It’s a minimalist desktop assistant powered by **Ollama** and **PyQt6**. I chose PyQt over web-based frameworks like Electron because I wanted it to be blazing fast and light on RAM—it shouldn't eat up your system just to answer a question. The idea is simple: press `Super+Space`, and an input bar appears (think Spotlight or Alfred). You type, it answers. Instantly.

### Under the Hood
What makes AIRA cool isn't just the UI; it's the **RAG (Retrieval-Augmented Generation)** pipeline.
- It uses **ChromaDB** to index my documents and codebases.
- I wrote file manager extensions for **Nautilus, Nemo, and Dolphin**. I can right-click a folder and say "Index with AIRA," and suddenly the AI knows everything in that directory.
- It has a "Disk Indexer" that recursively scans my projects, so I can ask questions like *"Where is the auth logic in the backend?"* and it actually knows.

It’s completely local. No API keys, no monthly fees, no data leaving my machine.

## Orchard: Bridging Apple and Linux 🍎

**GitHub:** [rvardiashvili/Orchard](https://github.com/rvardiashvili/Orchard)

This one is born purely out of frustration. I love my Linux workstation, but I also use an iPhone. The data silo between them is painful. Accessing iCloud Drive on Linux usually means using the slow web interface or hacky one-way download scripts.

I didn't want a downloader. I wanted a **filesystem**.

**Orchard** is a FUSE-based sync engine that mounts your iCloud Drive as a native local folder.

### The "Hard Magic" of Sync
Building a sync engine is significantly harder than I expected. You can't just download files; you have to manage *state*.
- **Optimistic UI:** When I `touch` a file in the Orchard folder, it appears instantly. The upload happens asynchronously in the background.
- **Sparse Caching:** If I have a 5GB movie in iCloud, Orchard doesn't download the whole thing. It creates a "sparse" placeholder. It only downloads the specific 8MB chunks I actually try to read. This lets me stream media instantly without filling up my disk.
- **Conflict Resolution:** It implements a "Local Wins" strategy. If I edit a file offline, my changes are preserved and pushed when I reconnect.

It’s still in active development (syncing *Notes* and *Reminders* is next on the roadmap), but it’s already changed how I work. I can finally edit a document on my Linux desktop and see it update on my iPhone seconds later.

## Lessons Learned 🧠

Building these tools wasn't just about the final product; it was a masterclass in the "darker" corners of software engineering:

1.  **Distributed systems are everywhere.** Even a sync engine on one machine is a distributed system once you introduce a remote server and an unreliable network. I learned that "eventual consistency" is a lifestyle, not just a buzzword.
2.  **State is the enemy.** In Orchard, the hardest part wasn't moving the data—it was managing the metadata. Keeping a local SQLite database in sync with Apple's server-side ETags while the user is actively moving files is a constant battle against entropy.
3.  **Latency is the ultimate UI killer.** In AIRA, the difference between a 200ms and a 20ms response time is the difference between an assistant that feels like an extension of your mind and one that feels like a chore to use.

---

Both of these projects are open-source and available on my GitHub. If you're a Linux user who wants more control over your AI or your cloud data, give them a spin! 🚀
