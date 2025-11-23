---
title: "Scaling Satellite Vision: My Thesis Journey with a Model-Agnostic Analysis Pipeline"
date: "2025-11-24"
description: "An ongoing technical retrospective on building a scalable, plug-and-play analysis pipeline for satellite imagery, actively in development for my Bachelor's thesis."
slug: "thesis-journey-bigearthnet-v2"
---

# Scaling Satellite Vision: My Thesis Journey with a Model-Agnostic Satellite Analysis Pipeline

*A technical retrospective on building a scalable, plug-and-play analysis pipeline for satellite imagery, actively in development for my Bachelor's thesis.*

## Introduction

For my thesis, I embarked on a mission to process and analyze massive satellite images using deep learning. The overarching goal was to create a **model-agnostic, plug-and-play pipeline** capable of performing tasks like land cover classification on diverse satellite data. While the initial focus was often on Sentinel-2 data, the true engineering challenge lay in building a system that could efficiently handle gigabytes of geospatial data and seamlessly integrate various deep learning models, provided a suitable 'adapter' is implemented.

This post documents the ongoing evolution of this **Scalable Satellite Analysis Pipeline**, from a simple script to a robust, multi-process system capable of handling city-sized satellite tiles, and its journey towards full model agnosticism. This project is a continuous work in progress, constantly refined to meet the demands of large-scale geospatial AI.

## Phase 1: The Humble Beginnings
**Commit:** `edb2ef4` *first commit - premade patches from disk*

Every project starts somewhere. I began by grounding myself in the basics. My initial setup didn't even touch raw satellite files. I simply used pre-made patches from the BigEarthNet dataset.

The focus here was purely on infrastructure:
- Setting up the GPU environment.
- Integrating an initial deep learning model for proof-of-concept.
- Figuring out efficient batching strategies.

It was a sandbox environment—safe, controlled, and completely unrepresentative of the chaos of real-world data.

## Phase 2: The "Naive" Stitching Approach
**Commit:** `ac682f0` *segmenting full sentinel-2 image and mosaiking*

Once the model was working, I tried to apply it to actual Sentinel-2 images. My first strategy was intuitive but flawed:
1. Cut the entire huge image into thousands of small patches.
2. Run inference on all of them.
3. Stitch them all back together into one giant result.

**The Bottleneck:** This was a disaster for larger images. Holding thousands of high-resolution array patches in memory while trying to reconstruct a massive GeoTIFF crashed my RAM. It became clear that loading everything into memory at once was not a viable path forward.

## Phase 3: Windowed Processing (The Pivot)

I abandoned the "load-all" approach and moved to **Rasterio windows**. This was the turning point. Instead of cutting up the whole image, the pipeline would now:
1. Open the huge satellite image.
2. "Look" at a specific window (chunk) of the data.
3. Process just that chunk.
4. Write the result directly to disk.
5. Move to the next chunk.

This kept memory usage constant, regardless of the image size. 10GB image? No problem. We only ever hold a few megabytes in RAM at a time.

## Phase 4: The Need for Speed (Multiprocessing)
**Commit:** `0daec20` *feat: Refactor project structure and enhance data processing*

While the windowed approach solved the memory crashes, it was *slow*. The GPU would sit idle while the CPU was busy reading data or writing results to disk.

To fix this, I separated the workflow into two distinct processes (Producer-Consumer pattern):
1.  **Process 1 (Main):** Handles reading data, preparing patches, and running GPU inference.
2.  **Process 2 (Writer):** Receives the raw predictions, performs analysis, and writes the files to disk.

This parallelism ensured the GPU was constantly fed data, drastically reducing processing time.

## Phase 5: Expanding Horizons & Optimization
**Commit:** `25a07ca` *finalize S1 support* & `b50a09c` *optimizations*

With the engine running smoothly, I focused on features and storage efficiency:

-   **Sentinel-1 Support:** I integrated support for mixed models, allowing the pipeline to process Synthetic Aperture Radar (SAR) data alongside optical Sentinel-2 imagery.
-   **Smart Outputs:** I stopped outputting the full probability map (which saved gigabytes of space per tile) and instead implemented a flexible system to generate only what is needed:
    -   **Entropy Maps:** To visualize model uncertainty.
    -   **Gap Maps:** showing the confidence margin between the top two classes.
    -   **Class Maps:** The final predictions.

## What I Learned So Far

Building this pipeline has been a crash course in systems engineering for data science. Here are the key takeaways:

1.  **Memory is not Infinite:** In Python, it's easy to forget about memory management until your 32GB RAM server crashes. Streaming data via windows is not just an optimization; it's a necessity for geospatial data.
2.  **Feed the Beast (GPU):** A fast model is useless if it spends 50% of its time waiting for data. Decoupling I/O from inference using multiprocessing was the single biggest performance booster.
3.  **Start Simple, Scale Later:** If I had tried to build the perfect windowed, multi-process, model-agnostic system on day one, I would never have started. Iterating from "naive stitching" to "optimized pipeline" taught me *why* complexity was needed.

## Current Status & The Final Push

Today, the project is a fully pipelined CLI tool with benchmarking and visualization capabilities. However, the work isn't done.

I am currently actively working on the **final major addition: True Model Agnosticism**. 

The goal is to completely decouple the pipeline from specific model architectures. By implementing a standardized adapter interface, the system will allow researchers to plug in *any* PyTorch or TensorFlow model without touching the core pipeline code. This flexibility is the final key to making this tool truly useful for the wider research community.

This ongoing work is central to my upcoming thesis submission in December 2025.

---
*Check out the code and history on [GitHub](https://github.com/rvardiashvili/GeoTiff-Scalable-Analysis-Pipeline).*