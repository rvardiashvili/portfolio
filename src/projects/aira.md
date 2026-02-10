---
title: "AIRA: AI Responsive Assistant"
category: "AI / Productivity"
description: "A native, local-first AI assistant for Linux. Integrates deep system tools (file indexing, RAG) with a minimalist UI powered by Ollama and PyQt6."
repo: "https://github.com/rvardiashvili/AIRA"
slug: "aira"
---

# Technical Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **GUI Framework** | **PyQt6** | Native, hardware-accelerated UI with minimal RAM footprint. |
| **LLM Inference** | **Ollama** | Local runner for Llama 3, Mistral, and Gemma models. |
| **Vector DB (RAG)** | **ChromaDB** | Semantic storage for document indexing and long-term memory. |
| **System Control** | **DBus / xclip** | Low-level Linux integration for clipboard, brightness, and volume. |
| **Vision** | **PyAutoGUI** | Screen capture and interaction for multimodal context. |
| **Concurrency** | **QThread** | Asynchronous tool execution without freezing the UI. |

---

# Philosophy: "Invisible until Needed"

The modern AI workflow is broken. Switching context to a web browser, logging in, and pasting data breaks your flow.
**AIRA** is designed to be a native extension of the Linux desktop—a "Spotlight Search" for intelligence.

It runs completely offline, respects your privacy, and has direct access to your filesystem.

---

# Architecture: The "Local Agent"

AIRA isn't just a chatbot; it is a semi-autonomous agent built on a **Tool-Use** loop.

### 1. The RAG Pipeline (Semantic Memory)
AIRA uses **ChromaDB** to index your life. When you ask a question, it doesn't just rely on the LLM's training data.
1.  **Indexing:** You can right-click any folder in Nautilus/Nemo and select "Index with AIRA". The system recursively scans PDFs, text files, and code.
2.  **Retrieval:** When you prompt the AI, it first queries the vector store for relevant context chunks.
3.  **Generation:** This context is injected into the system prompt, allowing the local Llama 3 model to answer questions like *"Where is the auth logic in my backend?"* accurately.

```python
# Core Memory Logic (Snippet)
def query(self, text, top_k=3):
    query_embedding = ollama.embeddings(model=self.MODEL, prompt=text)['embedding']
    results = self.collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
    return results['documents'][0] if results else []
```

### 2. The Tool Loop (QThread)
Unlike web chats which are passive, AIRA can *do* things.
It implements an **Ollama Worker Thread** that parses the model's output for specific function calls.
If the model says `{"function": "take_screenshot"}`, AIRA intercepts it, captures the screen, and feeds the image back into the vision model—all in milliseconds.

Supported Tools:
*   **System:** Kill process, Get System Stats (CPU/RAM), Media Control.
*   **Vision:** Analyze Screenshot (Multimodal).
*   **Web:** DuckDuckGo Search, Web Scraper.
*   **Files:** Read PDF/Txt, Index Directory.

---

# Why PyQt6 over Electron?

Most modern "desktop" apps are just web browsers in disguise (Electron). While easy to develop, they eat 500MB+ of RAM just to idle.

I chose **PyQt6** for AIRA because performance is a feature.
*   **Startup Time:** Instant (<200ms).
*   **Memory Usage:** ~60MB idle (excluding the LLM).
*   **Native Integration:** Qt provides deep hooks into the window manager and system clipboard that web technologies simply can't match.

---

# Challenges: "Eventual Consistency" in Conversation

One of the hardest parts of building AIRA was managing the **Context Window** of local models. Llama 3 is smart, but it forgets.
I implemented a "Memory Processing" step: after every interaction, AIRA runs a background background task to summarize the conversation into a concise "fact" and stores it in ChromaDB. This gives it "Long Term Memory" without blowing up the context window of the current session.

---

# Usage Guide

### 1. Installation
AIRA requires `ollama` to be installed and running.

```bash
# 1. Install Ollama (if not already installed)
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2

# 2. Clone AIRA
git clone https://github.com/rvardiashvili/AIRA.git
cd AIRA

# 3. Run the Installer
./install.sh
```

### 2. Usage
*   **Toggle AIRA:** Press `Super + Space` (or your configured hotkey).
*   **Index a Folder:** Right-click any directory in your file manager and select **"Index with AIRA"**.
*   **Screenshots:** Type "take screenshot" or "analyze this" while AIRA is open.

### 3. Configuration
Settings for personas, chat history, and themes can be managed directly within the app. Simply click the **Settings (⚙️)** icon in the top corner of the chat window once it's open. 

Local configuration is stored in `~/.config/aira/config.json`.
```json
{
  "theme": "nord",
  "default_model": "llama3.2",
  "user_profile": {
    "name": "Rati",
    "role": "Software Engineer"
  }
}
```