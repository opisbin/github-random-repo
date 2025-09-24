// app/api/random/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const language = url.searchParams.get("language") || "";
    const stars = url.searchParams.get("stars") || "0";
    const perPage = 30;

    // build query qualifiers
    const qualifiers = [
      language ? `language:${language}` : "",
      `stars:>=${stars}`
    ].filter(Boolean).join(" ");

    // naive random page (improve per strategy B)
    const page = Math.floor(Math.random() * 10) + 1;

    const searchUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(qualifiers)}&per_page=${perPage}&page=${page}`;

    const res = await fetch(searchUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `GitHub API error: ${res.status}`, details: text }, { status: res.status });
    }

    const data = await res.json();
    const items = data.items ?? [];
    if (items.length === 0) return NextResponse.json({ error: "No results" }, { status: 404 });

    const chosen = items[Math.floor(Math.random() * items.length)];
    return NextResponse.json({ repo: chosen });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
