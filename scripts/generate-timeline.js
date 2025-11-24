import fs from 'fs';
import path from 'path';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const HISTORY_FILE = path.join(process.cwd(), 'src/timeline.json');
const USERNAME = 'rvardiashvili';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, but good for higher rate limits

async function main() {
  if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY is missing');
    process.exit(1);
  }

  console.log('Fetching GitHub events (REST API)...');
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  const eventsResponse = await fetch(`https://api.github.com/users/${USERNAME}/events`, { headers });
  
  if (!eventsResponse.ok) {
      console.error('Failed to fetch GitHub events:', eventsResponse.status, eventsResponse.statusText);
      console.error('Response Body:', await eventsResponse.text());
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
        additions: 0,
        deletions: 0,
        repos: new Set(),
        messages: []
      };
    }

    dailyActivity[date].repos.add(event.repo.name);
    
    // Use compare endpoint to get full commit details
    const { head, before } = event.payload;
    const compareUrl = `${event.repo.url}/compare/${before}...${head}`;

    try {
      const compareResponse = await fetch(compareUrl, { headers });
      if (!compareResponse.ok) {
        console.warn(`Failed to fetch compare for ${event.repo.name} (${before}...${head}): ${compareResponse.status} ${compareResponse.statusText}`);
        continue;
      }
      const compareData = await compareResponse.json();

      if (compareData.commits && Array.isArray(compareData.commits)) {
        for (const commit of compareData.commits) {
          dailyActivity[date].commits++;
          dailyActivity[date].messages.push(`${event.repo.name}: ${commit.commit.message}`); // commit.commit.message for compare API

          // Fetch detailed stats for this commit to get lines changed
          if (commit.url) {
             try {
               const commitDetailsResponse = await fetch(commit.url, { headers });
               if (commitDetailsResponse.ok) {
                 const commitDetails = await commitDetailsResponse.json();
                 if (commitDetails.stats) {
                   dailyActivity[date].additions += commitDetails.stats.additions;
                   dailyActivity[date].deletions += commitDetails.stats.deletions;
                 } else {
                   console.warn(`Commit ${commit.sha} has no stats in details.`);
                 }
               } else {
                 console.warn(`Failed to fetch details for commit ${commit.sha}: ${commitDetailsResponse.status} ${commitDetailsResponse.statusText}`);
               }
             } catch (err) {
               console.warn(`Error fetching details for commit ${commit.sha}:`, err.message);
             }
          }
        }
      } else {
        console.warn(`Compare for ${event.repo.name} (${before}...${head}) returned no commits or malformed data.`);
      }

    } catch (error) {
      console.error(`Error processing PushEvent for ${event.repo.name}:`, error.message);
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
    
    // Update if commits OR additions/deletions changed
    if (existingEntry && 
        existingEntry.commits === activity.commits &&
        existingEntry.additions === activity.additions) {
        continue;
    }

    console.log(`Generating summary for ${date}...`);
    
    const prompt = `
      Here is Rati's coding activity for today (${date}):
      Stats: ${activity.commits} commits, +${activity.additions} lines added, -${activity.deletions} lines deleted.
      Commit Messages:
      ${activity.messages.join('\n')}
      
      Act as a witty, observant tech narrator. Write a short sentence (max 35 words) describing what Rati worked on. 
      - Use a casual but knowledgeable tone.
      - Refer to "Rati" by name or "he".
      - Mention specific projects/repos if relevant.
      - Highlight the scale of work if the line count is high.
    `;

    try {
      const result = await model.generateContent(prompt);
      const summary = result.response.text().trim();
      console.log('Generated summary:', summary);

      const newEntry = {
        date,
        commits: activity.commits,
        additions: activity.additions,
        deletions: activity.deletions,
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