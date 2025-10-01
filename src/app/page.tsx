import RandomFinder from "./components/RandomFinder";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
            GitHub
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-2">
            Random Repository Finder
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] mx-auto"></div>
        </div>

        {/* Main Content */}
        <RandomFinder />

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          {/* <p>Discover amazing projects from the GitHub universe</p> */}
          <p>Designed and developed with ❤️ by <a className="text-white hover:text-[var(--accent-secondary)] transition-all duration-200" href="https://www.meherab.art" target="_blank" rel="noopener noreferrer">Meherab Hossain</a></p>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent)] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--accent-secondary)] rounded-full opacity-5 blur-3xl"></div>
      </div>
    </main>
  );
}
