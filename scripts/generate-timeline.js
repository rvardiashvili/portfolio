import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const HISTORY_FILE = path.join(process.cwd(), 'src/timeline.json');
const USERNAME = 'rvardiashvili';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is missing');
    process.exit(1);
  }

  console.log('Fetching GitHub events...');
  const eventsResponse = await fetch(`https://api.github.com/users/${USERNAME}/events`);
  
  if (!eventsResponse.ok) {
      console.error('Failed to fetch GitHub events:', eventsResponse.statusText);
      process.exit(1);
  }
  
  const events = await eventsResponse.json();
  const dailyActivity = {};

  // Group events by day
  for (const event of events) {
    if (event.type !== 'PushEvent') continue;

    const date = event.created_at.split('T')[0];
    if (!dailyActivity[date]) {
      dailyActivity[date] = {
        date,
        commits: 0,
        repos: new Set(),
        messages: []
      };
    }

    dailyActivity[date].commits += event.payload.size;
    dailyActivity[date].repos.add(event.repo.name);
    
    if (Array.isArray(event.payload.commits)) {
      for (const commit of event.payload.commits) {
        dailyActivity[date].messages.push(`${event.repo.name}: ${commit.message}`);
      }
    }
  }

  // Load existing history
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf-8'));
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  let hasChanges = false;

  // Process each day found in events
  for (const date of Object.keys(dailyActivity).sort().reverse()) {
    const activity = dailyActivity[date];
    const existingEntry = history.find(h => h.date === date);
    
    // If we already have an entry for this date with the same commit count, skip
    // (Simple de-duplication check)
    if (existingEntry && existingEntry.commits === activity.commits) {
        continue;
    }

    console.log(`Generating summary for ${date}...`);
    
    const prompt = `
      Here is Rati's coding activity for today (${date}):
      ${activity.messages.join('\n')}
      
      Act as a witty, observant tech narrator. Write a sentence or two (max 60 words) describing what Rati worked on. 
      - Use a casual but knowledgeable tone.
      - Refer to "Rati" by name or "he".
      - Focus on the technical substance (e.g., "Rati wrestled with the image pipeline..." or "He finally squashed that memory leak...").
      - Mention the specific project/repo name if it adds context.
      - Do NOT use generic phrases like "He made progress." Be specific based on the commit messages.
    `;

    try {
      const result = await model.generateContent(prompt);
      const summary = result.response.text().trim();
      console.log('Generated summary:', summary);

      const newEntry = {
        date,
        commits: activity.commits || activity.messages.length || 1, // Fallback to message count or 1
        repos: Array.from(activity.repos),
        summary
      };

      // Update or add to history
      const index = history.findIndex(h => h.date === date);
      if (index !== -1) {
        history[index] = newEntry;
      } else {
        history.push(newEntry);
      }
      hasChanges = true;
    } catch (error) {
      console.error(`Error generating summary for ${date}:`, error);
    }
  }

  // Sort by date (newest first)
  history.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Limit to last 7 active days
  if (history.length > 7) {
    history = history.slice(0, 7);
    hasChanges = true;
  }

  if (hasChanges) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log('✅ timeline.json updated');
  } else {
    console.log('No new activity to update.');
  }
}

main();
