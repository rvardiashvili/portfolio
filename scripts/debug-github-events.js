import 'dotenv/config';

const USERNAME = 'rvardiashvili';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, but good for higher rate limits

async function debugGitHubEvents() {
  console.log('--- STARTING DEBUG SCRIPT ---');
  console.log('Fetching GitHub events (REST API) for user:', USERNAME);
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    console.log('Using GITHUB_TOKEN for authentication.');
  } else {
    console.warn('GITHUB_TOKEN not found. May hit lower rate limits or miss private repo events.');
  }

  try {
    const eventsResponse = await fetch(`https://api.github.com/users/${USERNAME}/events`, { headers });
    
    if (!eventsResponse.ok) {
        console.error('Failed to fetch GitHub events:', eventsResponse.status, eventsResponse.statusText);
        console.error('Response Body:', await eventsResponse.text());
        return;
    }
    
    const events = await eventsResponse.json();
    console.log('\n--- RAW GITHUB EVENTS RESPONSE (first 3 events) ---');
    console.log(JSON.stringify(events.slice(0, 3), null, 2));
    if (events.length > 3) console.log(`... ${events.length - 3} more events ...`);


    const dailyActivity = {};

    console.log('\n--- PROCESSING EVENTS ---');
    for (const event of events) {
      if (event.type !== 'PushEvent') {
        // console.log(`Skipping non-PushEvent: ${event.type}`);
        continue;
      }

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
      
      if (Array.isArray(event.payload.commits)) {
        for (const commit of event.payload.commits) {
          dailyActivity[date].commits++;
          dailyActivity[date].messages.push(`${event.repo.name}: ${commit.message}`);

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
                   // console.warn(`Commit ${commit.sha} has no stats.`);
                 }
               } else {
                 console.warn(`Failed to fetch details for commit ${commit.sha}:`, commitDetailsResponse.status, commitDetailsResponse.statusText);
               }
             } catch (err) {
               console.warn(`Error fetching details for commit ${commit.sha}:`, err.message);
             }
          } else {
            // console.warn(`Commit ${commit.sha} has no URL.`);
          }
        }
      } else {
        console.warn(`PushEvent for ${date} in ${event.repo.name} has no 'payload.commits' array.`);
      }
    }

    console.log('\n--- PROCESSED DAILY ACTIVITY ---');
    const sortedDates = Object.keys(dailyActivity).sort().reverse();
    if (sortedDates.length === 0) {
        console.log('No PushEvent activity found in the fetched events.');
    } else {
        for (const date of sortedDates) {
            const activity = dailyActivity[date];
            console.log(`\nDate: ${activity.date}`);
            console.log(`  Commits: ${activity.commits}`);
            console.log(`  Additions: ${activity.additions}`);
            console.log(`  Deletions: ${activity.deletions}`);
            console.log(`  Repos: ${Array.from(activity.repos).join(', ')}`);
            console.log(`  Messages (${activity.messages.length}):`);
            activity.messages.forEach(msg => console.log(`    - ${msg}`));
        }
    }
    
    console.log('\n--- DEBUG SCRIPT FINISHED ---');

  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

debugGitHubEvents();
