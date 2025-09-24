"use client";
import { useState } from "react";

interface Repository {
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  updated_at: string;
}

export default function RandomFinder() {
  const [repo, setRepo] = useState<Repository | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    language: "JavaScript",
    stars: "0",
  });

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Rust",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
  ];

  const starOptions = [
    { label: "Any", value: "0" },
    { label: "10+", value: "10" },
    { label: "100+", value: "100" },
    { label: "1000+", value: "1000" },
    { label: "10000+", value: "10000" },
  ];

  const fetchRandom = async (
    language = filters.language,
    stars = filters.stars
  ) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/random?language=${encodeURIComponent(language)}&stars=${stars}`
      );
      const json = await response.json();
      setRepo(json.repo ?? null);
    } catch (error) {
      console.error(error);
      setRepo(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* Language Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] 
                         focus:border-transparent transition-all duration-200"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang} className="bg-[var(--surface)]">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Stars Filter */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Minimum Stars
            </label>
            <select
              value={filters.stars}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, stars: e.target.value }))
              }
              className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-lg 
                         text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] 
                         focus:border-transparent transition-all duration-200"
            >
              {starOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-[var(--surface)]"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={() => fetchRandom()}
            disabled={loading}
            className="w-full px-8 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] 
                       text-white font-semibold rounded-lg shadow-lg hover:shadow-[var(--glow)] 
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent)] 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Searching...</span>
              </div>
            ) : (
              "Discover Repository"
            )}
          </button>
        </div>
      </div>

      {/* Repository Card */}
      {repo && (
        <div
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 
                        backdrop-blur-sm hover:border-[var(--accent)] transition-all duration-500
                        animate-in slide-in-from-bottom-4 fade-in"
        >
          <div className="space-y-4">
            {/* Repository Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-xl font-bold text-[var(--accent)] hover:text-[var(--accent-secondary)] 
                           transition-colors duration-200 break-all hover:underline"
              >
                {repo.full_name}
              </a>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Updated {formatDate(repo.updated_at)}</span>
              </div>
            </div>

            {/* Description */}
            {repo.description && (
              <p className="text-gray-300 leading-relaxed">
                {repo.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-medium">
                  {formatNumber(repo.stargazers_count)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 7l3.707-3.707a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white font-medium">
                  {formatNumber(repo.forks_count)}
                </span>
              </div>

              {repo.language && (
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[var(--accent)] rounded-full"></div>
                  <span className="text-gray-300 font-medium">
                    {repo.language}
                  </span>
                </div>
              )}

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="ml-auto px-4 py-2 bg-[var(--background)] border border-[var(--border)] 
                           text-white rounded-lg hover:border-[var(--accent)] transition-all duration-200
                           flex items-center space-x-2 group"
              >
                <span>View Repository</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!repo && !loading && (
        <div className="text-center py-12">
          <div
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] 
                          rounded-full flex items-center justify-center"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            Ready to Explore?
          </h3>
          <p className="text-gray-500">
            Click &quot;Discover Repository&quot; to find amazing projects
          </p>
        </div>
      )}
    </div>
  );
}
