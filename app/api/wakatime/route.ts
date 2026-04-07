import { NextResponse } from 'next/server';

export async function GET() {
  const WAKATIME_USERNAME = "rifkypratama"; // Username WakaTime-mu

  try {
    // Server Next.js yang mengambil data ke WakaTime (Aman dari blokir CORS)
    const res = await fetch(`https://wakatime.com/api/v1/users/${WAKATIME_USERNAME}/stats`, {
      next: { revalidate: 3600 } // Data di-cache selama 1 jam agar web-mu tetap super cepat
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("WakaTime API Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data WakaTime" }, { status: 500 });
  }
}