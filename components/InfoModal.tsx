"use client";

import { useState } from "react";

export function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full border transition-all duration-300
          bg-white border-gray-200 text-gray-800 shadow-lg hover:bg-gray-100
          dark:bg-[#161b22] dark:border-green-500/50 dark:text-green-400 dark:hover:bg-[#1f2630] dark:shadow-green-900/20"
        aria-label="How it works"
        title="Security & How it works"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6 md:p-8 transition-all
            bg-white text-gray-900 border border-gray-200
            dark:bg-[#0d1117] dark:text-[#c9d1d9] dark:border-green-500/50 dark:shadow-[0_0_50px_rgba(34,197,94,0.1)]">
            
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <h2 className="text-2xl font-bold mb-6 flex items-center text-indigo-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Security & How it Works
            </h2>

            <div className="space-y-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <section>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🔐 Bring Your Own Key (BYOK)</h3>
                <p>
                  This application operates on a <strong>stateless</strong> model. We do not have a database.
                  Your Personal Access Token is:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Sent directly from your browser to the backend via encrypted <strong>HTTPS</strong>.</li>
                  <li>Kept in the server's RAM only for the duration of the request (seconds).</li>
                  <li>Permanently discarded immediately after the operation completes.</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">🚀 How the Import Works</h3>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li>
                    <strong>Parsing:</strong> Your CSV/Excel file is processed securely to extract titles, descriptions, labels, and milestones.
                  </li>
                  <li>
                    <strong>Setup:</strong> The app checks if the necessary Labels and Milestones exist in your repo. If not, it creates them for you automatically.
                  </li>
                  <li>
                    <strong>Creation:</strong> Issues are created via the official GitHub API. If you provided a Project ID, tasks are added to your project and moved to the "Backlog" column.
                  </li>
                </ol>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">✅ Open Source Transparency</h3>
                <p>
                  The source code is completely transparent. You can verify exactly how your token is handled by inspecting the repository.
                  This ensures that no hidden data collection occurs.
                </p>
                <div className="mt-3">
                  <a 
                    href="https://github.com/TymonPawelczyk/GithubIssueImporter" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:underline dark:text-green-400"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    View Source on GitHub
                  </a>
                </div>
              </section>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
                 <button 
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2 rounded font-bold transition bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700"
                 >
                    I Understand, Let's Import!
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
