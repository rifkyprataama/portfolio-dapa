import { NextResponse } from 'next/server';

export async function GET() {
  const GITHUB_USERNAME = "RifkyPrataama";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: "GitHub token missing" }, { status: 500 });
  }

  // GraphQL Query: Mengambil Data Kontribusi SEKALIGUS Pinned Repositories
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage {
                name
              }
            }
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } 
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    const user = data.data.user;

    // 1. Olah Data Pinned Repos
    const pinnedRepos = user.pinnedItems.nodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : null
    }));

    // 2. Olah Data Kontribusi
    const calendar = user.contributionsCollection.contributionCalendar;
    const totalContributions = calendar.totalContributions;
    const weeks = calendar.weeks;
    
    let bestDay = { date: '', count: 0 };
    let thisWeek = 0;
    let totalDays = 0;

    weeks.forEach((week: any, index: number) => {
      week.contributionDays.forEach((day: any) => {
        totalDays++;
        if (day.contributionCount > bestDay.count) {
          bestDay = { date: day.date, count: day.contributionCount };
        }
        if (index === weeks.length - 1) { 
          thisWeek += day.contributionCount;
        }
      });
    });

    const dailyAvg = totalDays > 0 ? (totalContributions / totalDays).toFixed(1) : "0";

    // Kirim Semuanya ke Dashboard
    return NextResponse.json({
      pinnedRepos,
      totalContributions,
      thisWeek,
      bestDay,
      dailyAvg
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}