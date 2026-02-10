---
title: "Orchard: Native iCloud for Linux"
category: "System / Cloud"
description: "A robust FUSE filesystem that mounts iCloud Drive on Linux. Features optimistic syncing, sparse caching for large files, and conflict resolution."
repo: "https://github.com/rvardiashvili/Orchard"
slug: "orchard"
---

# Technical Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Filesystem** | **FUSE / pyfuse3** | Userspace filesystem interface for native mount integration. |
| **Database** | **SQLite** | The single source of truth for file state, metadata, and conflict tracking. |
| **Sync Engine** | **Python / Threading** | Multi-threaded worker that reconciles local state with Apple's API. |
| **Network** | **PyiCloud** | Reverse-engineered client for Apple's iCloud API. |
| **UI** | **GTK3 / AppIndicator** | System tray and control panel for Linux desktop integration. |

---

# The Problem: The Walled Garden

Apple's ecosystem is amazing, but it's a silo. If you work on Linux, your data is trapped.
The existing solutions were lackluster:
1.  **Web Interface:** Slow, read-only feel, no CLI access.
2.  **Download Scripts:** One-way backup tools. No true sync.

I wanted my iCloud Drive to behave exactly like `~/Documents`. I wanted to `cd` into it, `grep` files, and edit code in VS Code without manually downloading anything.

---

# Architecture: A Database-Driven Filesystem

Orchard is not a simple proxy. It is a complex distributed system where your local SQLite database is the "Brain."

### 1. Optimistic UI & "Local Wins"
Most sync engines fail because they trust the server too much. Orchard trusts *you*.
When you `touch file.txt`, the FUSE layer writes it to disk and updates the SQLite DB immediately. The file exists *instantly*.
A background **Sync Engine** picks up the "Dirty" flag and attempts to upload it.

**Conflict Resolution:** If you edit a file offline and someone else edits it on an iPad, Orchard detects the ETag mismatch. But instead of creating a confusing conflict file, it implements a **"Local Wins"** strategy for edits made on the workstation, forcing the server to accept the new version (after backing up the old one).

### 2. Sparse Caching (The Streaming Magic)
How do you access a 2TB cloud drive on a 256GB laptop?
Orchard implements **Sparse Caching**.
1.  **Metadata Only:** When you mount Orchard, we download the *structure* (filenames, sizes) but 0 bytes of content.
2.  **Lazy Loading:** When an app tries to `read()` a file, Orchard intercepts the call.
3.  **Chunked Download:** It downloads *only* the requested 8MB chunk from Apple's servers.

This means you can open a 4GB movie file in VLC, and it starts playing instantly. Orchard only downloads the parts you watch.

```python
# Sparse Read Logic (Simplified)
def read(self, path, size, offset, fh):
    chunk_idx = offset // CHUNK_SIZE
    if not self.db.has_chunk(obj_id, chunk_idx):
        # Block the read until we fetch just this piece
        self.engine.download_chunk(obj_id, chunk_idx)
    
    # Read from local cache file
    return obj.read_local(size, offset)
```

### 3. Atomic State Management
Synchronization is essentially managing race conditions.
Orchard uses a **Shadow Table** in SQLite to track the "last known good state" of every file.
*   **Objects Table:** Current local state (what you see).
*   **Shadows Table:** What the server thinks we have.
*   **Drive Cache:** Which chunks are actually on disk.

By comparing these three, Orchard can mathematically determine if a file needs to be Pushed, Pulled, or Merged, robustly handling power failures or network drops.

---

# Desktop Integration

Orchard isn't just a backend daemon. It provides:
*   **Context Menus:** "Make Available Offline" in Nautilus/Nemo.
*   **Visual Emblems:** Files show custom icons (Green Check, Cloud, Sync Arrows) rendered directly by the file manager via extended attributes (`xattr`).

---

# Status

Orchard is currently in **Alpha**. The core Drive sync is stable, including large file streaming. Next on the roadmap is bi-directional sync for **Notes** (converting Apple's proprietary format to Markdown) and **Reminders**.

---

# Usage Guide

### 1. Installation
Orchard provides an automated installer to handle dependencies and desktop integration.

```bash
git clone https://github.com/rvardiashvili/Orchard.git
cd Orchard
./install.sh
```

### 2. Getting Started
Once installed, you can launch "Orchard" from your applications menu, or run it manually:

```bash
# Start the GUI and Daemon
./src/main.py
```

On the first run, a setup wizard will appear to help you log in to your Apple ID and select a mount point (default: `~/Orchard`).

### 3. Desktop Integration
*   **Nautilus / Nemo:** Right-click a file to see "Make Available Offline".
*   **System Tray:** Look for the Apple icon in your tray to see sync status or pause/resume the engine.
*   **Conflict Resolution:** If a sync conflict occurs, a notification will appear. Click it to open the Conflict Resolver tool.