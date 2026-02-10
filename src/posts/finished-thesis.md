---
title: "GSIP: The Journey of Finishing My Thesis (and Fixing Satellite Maps)"
date: "2025-12-22"
description: "Reflecting on the completion of my bachelor's thesis: how a frustrating technical problem turned into a tool that helps anyone run AI on satellite imagery."
slug: "finished-thesis"
---

It is finally done! 🎓 After a long semester of late-night coding sessions, infinite coffee, and more debugging than I care to admit, I have officially submitted my Bachelor's thesis: **"GeoSpatial Inference Pipeline (GSIP)"**.

Writing a thesis is strange. You start with a grand idea, get completely lost in the weeds for months, and hopefully emerge with something that actually works. I wanted to share a bit about that journey and why I built GSIP in the first place.

## The "Why": A Square Peg in a Round Earth

When I was browsing the list of available thesis topics, this subject—proposed by my supervisor, Professor Peter Baumann—caught my attention immediately.

I chose it because it tackled a problem that is often swept under the rug in academic papers: the *engineering* reality of deploying AI. We have amazing models today, but running them on the massive scale of Earth Observation (EO) data is a completely different beast.

I wanted to bridge the gap between the "AI world" (small, perfect squares) and the "Geo world" (continuous, gigapixel landscapes).

But I hit a wall. 🧱

Deep Learning models are trained on small, perfect little squares (like a 256x256 photo of a cat). But satellite images are **gigantic**. A single scan of a city can be tens of thousands of pixels wide.

When you try to force these massive images through standard AI tools, two bad things usually happen:
1.  **Your computer explodes** (metaphorically). The memory runs out, and the script crashes.
2. **The Quilt Effect.** To avoid crashing, you chop the image into tiles. But when you stitch the results back together, you get these ugly, checkerboard grid lines. A river suddenly stops at the edge of a tile and restarts a few pixels off. It’s not just ugly; it makes the data scientifically useless.

![Illustration of the "Quilt Effect" grid artifacts](/media/gsip/naive.webp)

I realized there was a huge gap between the "AI world" (small squares) and the "Geo world" (continuous landscapes). I wanted to build a bridge.

## What I Built: GSIP

My thesis, the **GeoSpatial Inference Pipeline (GSIP)**, is that bridge. It’s a piece of software designed to take the headache out of running AI on big maps.

Instead of just treating the image as a bunch of numbers, GSIP treats it like a continuous canvas. Here is what makes it special:

### 1. No More Checkerboards 🎨
The core feature is something I call "Seamless Reconstruction." Imagine you are painting a wall. If you paint a bunch of squares next to each other, you see the seams. GSIP uses a smart blending technique (mathematically called a "Hann Window," but think of it as a soft brush) to merge overlapping sections. The result is a perfect, smooth map where rivers flow naturally and forests don't have grid lines.

![Visualizing the Seamless Reconstruction approach](/media/gsip/seamless.webp)

### 2. It Runs on *My* Laptop 💻
This was personal. Usually, processing these huge images requires a massive supercomputer. I didn't have one. I had a gaming laptop.
So, I built GSIP to be "polite." It actually checks how much RAM you have available at any given second and adjusts itself. If you have a powerful server? Great, it runs fast. If you're on a laptop with Chrome open? It takes smaller bites. It democratizes the technology—you don't need a data center to do this kind of science anymore.

![GSIP's dynamic memory management (ZoR)](/media/gsip/memory.webp)

### 3. It's Flexible
I didn't want to lock myself into one specific AI model. I built GSIP using a "plug-and-play" architecture. Whether I'm using an old-school ResNet or the latest fancy Vision Transformer from NASA, GSIP wraps around it and handles the hard heavy lifting of moving data around.

## Why It Matters

Finishing this thesis feels like a massive weight off my shoulders, but I'm also genuinely excited about the tool itself. 

![A look at some qualitative results from GSIP](/media/gsip/results.webp)

We are living in an era where we have more data about our planet than ever before. We can track deforestation, monitor floods, and watch cities grow in near real-time. But having the data isn't enough; we need to be able to *process* it.

GSIP is my small contribution to that. It’s open-source, it’s robust, and it lets researchers focus on the science rather than fighting with memory errors.

If you are curious (or just want to see the code), you can check it out here: [https://github.com/rvardiashvili/GSIP](https://github.com/rvardiashvili/GSIP)

Here is to the next adventure! 🚀