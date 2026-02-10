---
title: "GSIP: GeoSpatial Inference Pipeline"
category: "Machine Learning / Engineering"
description: "A high-performance v2.0 inference engine for gigapixel satellite imagery. Features an agnostic adapter/reporter architecture, ERF-aware tiling, and hardware-aware memory management."
repo: "https://github.com/rvardiashvili/GSIP"
slug: "gsip"
---

# Technical Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Inference Engine** | **PyTorch** | Support for ResNet, ConvNeXt, Segformer, and Foundation Models. |
| **GSIP Studio** | **GTK4 / Python** | Native desktop client for performance telemetry and result analysis. |
| **Orchestration** | **Hydra** | Hierarchical configuration for multi-modal adapters and pipelines. |
| **Geospatial I/O** | **Rasterio / GDAL** | Virtual Reprojection (VRT) for on-the-fly multi-sensor alignment. |
| **Architecture** | **Multiprocessing** | Producer-Consumer pattern with zero-copy 'List of Views' optimization. |

---

# The Problem: The "Quilt Effect"

In Earth Observation (EO), images are captured as massive gigapixel tiles (e.g., $10,980 \times 10,980$). Neural networks, however, are restricted to small patches (e.g., $224 \times 224$). Naive tiling results in two major failures:
1.  **Grid Artifacts:** Edge predictions of a patch are lower quality due to truncated spatial context. "Naively" stitching these together creates visible seams—the "Quilt Effect."
2.  **The Memory Wall:** Gigapixel data exceeds GPU VRAM, usually requiring expensive HPC clusters and excluding researchers with consumer hardware.

![Illustration of the "Quilt Effect" grid artifacts](/media/gsip/naive.webp)

---

# Core Engineering: Seamless Inference

GSIP solves these issues through a three-layered spatial strategy that prioritizes mathematical continuity and hardware efficiency.

### 1. Redundant Patch Inference
Within a processing unit, patches are extracted using a sliding window with a 50% overlap. This ensures that every pixel in the final map is analyzed multiple times (4x) by the neural network. To merge these, GSIP applies a **2D Hann Windowing** (sinusoidal weighting) function. This soft-blending gives 100% weight to a patch's center (highest context) and 0% to its edges, resulting in a mathematically seamless probability field.

### 2. Boundary Integrity (The Halo)
To maintain the validity of the overlapping patches at the boundaries of a processing zone, GSIP employs an **ERF-Aware Halo**. Every processing chunk is read with an additional margin of data (the Halo). This allows patches sitting on the zone's edge to still have access to the full spatial context they require. By processing this extra context but only retaining the central results, GSIP ensures every pixel in the output was predicted with a full field-of-view.

### 3. Hardware Democratization (ZoR)
Managing high-context processing on consumer hardware is handled by the **Zone of Responsibility (ZoR)** algorithm. Instead of using fixed tiles, the ZoR dynamically probes the system's available RAM at runtime. It calculates the largest safe "chunk" (ZoR + Halo) that can be processed without triggering Out-Of-Memory (OOM) errors, allowing gigapixel inference to scale from multi-GPU servers down to a standard 16GB laptop.

![Visualizing the Seamless Reconstruction approach](/media/gsip/seamless.webp)

---

# Agnostic Architecture: The True Strength

The defining strength of GSIP is its complete decoupling of the inference engine from specific models or file formats.

*   **Model Agnostic (Adapters):** Through a plug-and-play **Adapter** system, GSIP can wrap around any PyTorch-based model—from classic ResNets to modern Vision Transformers (like NASA/IBM's Prithvi). The engine handles the heavy lifting of data movement, tiling, and reconstruction, while the adapter defines only the model-specific preprocessing and forward pass.
*   **Output Agnostic (Reporters):** The **Reporter** system allows for modular output generation. Users can toggle or add new reporters to generate anything from standard GeoTIFFs and uncertainty maps to low-res previews, interactive HTML viewers, or global probability statistics, all without modifying the core pipeline.

![A look at some qualitative results from GSIP](/media/gsip/results.webp)

---

# Analysis & Uncertainty

### GSIP Studio
A native **GTK4** desktop application designed for deep analysis. It features interactive, synchronized charts for profiling Memory and GPU utilization, enabling researchers to identify hardware bottlenecks and verify pipeline efficiency in real-time.

### Uncertainty Quantification
GSIP provides scientific reliability by outputting per-pixel **Shannon Entropy** and **Prediction Gap** maps. These layers visualize precisely where the model is ambiguous (e.g., confusing cloud shadows with water), allowing for a more nuanced interpretation of geospatial results.

---

# Getting Started

### 1. Installation
```bash
git clone https://github.com/rvardiashvili/GSIP.git
cd GSIP
pip install -r src/requirements.txt
pip install -e .
```

### 2. Usage
```bash
# Run CLI Inference
python src/main.py model=resnet_s2 input_path=/path/to/data output_path=./out

# Launch Analysis Studio
python gtk_client/main.py
```

