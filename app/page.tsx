"use client";

import { useState } from "react";
import { parseFileToRows } from "@/lib/parse";
import { ImportRow, ImportResult } from "@/lib/types";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError(null);
    setResult(null);
    try {
      const parsedRows = await parseFileToRows(file);
      setRows(parsedRows);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleImport = async () => {
    if (!token || !owner || !repo || rows.length === 0) return;

    setLoading(true);
    setResult(null);
    setError(null);

    const projNum = projectNumber ? parseInt(projectNumber, 10) : undefined;

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ owner, repo, projectNumber: projNum, rows }),
      });

      const data = await res.json();


      if (!res.ok) {
        throw new Error(data.error || "Import failed");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 text-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto rounded-lg shadow-xl p-6 border transition-all duration-300
        bg-white border-gray-200 shadow-gray-200
        dark:bg-[#161b22] dark:border-gray-700 dark:shadow-green-900/10">
        
        <h1 className="text-3xl font-bold mb-8 pb-4 border-b tracking-wider flex items-center
          text-indigo-600 border-gray-200
          dark:text-green-400 dark:border-gray-800 dark:font-mono">
          
          {/* Dark Mode Title (Matrix Style) */}
          <span className="hidden dark:flex items-center">
            <span className="mr-2 text-gray-500 font-mono">$</span>
            GITHUB_ISSUE_IMPORTER
            <span className="ml-1 animate-pulse font-mono">_</span>
          </span>

          {/* Light Mode Title (Clean Style) */}
          <span className="dark:hidden">
            {t.home.title}
          </span>
        </h1>

        {/* Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-3">
            <label className="block mb-2 text-xs uppercase tracking-widest font-bold
              text-gray-500 dark:text-green-500/80">
              {t.home.tokenLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t.home.tokenPlaceholder}
              className="w-full rounded p-2.5 outline-none transition border font-mono
                bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400
                dark:bg-[#0d1117] dark:border-gray-700 dark:text-gray-300 dark:focus:border-green-500 dark:focus:ring-green-500 dark:placeholder-gray-700"
            />
            <p className="text-xs mt-1 text-gray-400">
              {t.home.tokenHelp}{" "}
              <a 
                href="https://github.com/settings/tokens/new?scopes=repo,project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline dark:text-green-400"
              >
                {t.home.tokenCreateLabel} &rarr;
              </a>
            </p>
          </div>

          <div>
            <label className="block mb-2 text-xs uppercase tracking-widest font-bold
              text-gray-500 dark:text-green-500/80">{t.home.ownerLabel}</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder={t.home.ownerPlaceholder}
              className="w-full rounded p-2.5 outline-none transition border
                bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400
                dark:bg-[#0d1117] dark:border-gray-700 dark:text-gray-300 dark:focus:border-green-500 dark:focus:ring-green-500 dark:placeholder-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs uppercase tracking-widest font-bold
              text-gray-500 dark:text-green-500/80">{t.home.repoLabel}</label>
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder={t.home.repoPlaceholder}
              className="w-full rounded p-2.5 outline-none transition border
                bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400
                dark:bg-[#0d1117] dark:border-gray-700 dark:text-gray-300 dark:focus:border-green-500 dark:focus:ring-green-500 dark:placeholder-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-xs uppercase tracking-widest font-bold
              text-gray-500 dark:text-green-500/80">
              {t.home.projectLabel} <span className="font-normal text-gray-400 normal-case">(Optional)</span>
            </label>
            <input
              type="number"
              value={projectNumber}
              onChange={(e) => setProjectNumber(e.target.value)}
              placeholder={t.home.projectPlaceholder}
              className="w-full rounded p-2.5 outline-none transition border
                bg-gray-50 border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-400
                dark:bg-[#0d1117] dark:border-gray-700 dark:text-gray-300 dark:focus:border-green-500 dark:focus:ring-green-500 dark:placeholder-gray-700"
              title="Project number from URL: github.com/orgs/ORG/projects/12"
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="mb-8 p-6 border border-dashed rounded-lg transition group
          bg-gray-50 border-gray-300 hover:border-indigo-500 hover:bg-indigo-50/30
          dark:bg-[#0d1117]/50 dark:border-gray-700 dark:hover:border-green-500/50 dark:hover:bg-green-900/10">
          <label className="block mb-4 text-xs uppercase tracking-widest font-bold
            text-gray-500 dark:text-green-500/80">
            {t.home.fileLabel}
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer px-4 py-2 rounded text-sm font-bold uppercase tracking-wide transition bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40">
              {t.home.chooseFile}
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-gray-500 dark:text-gray-400 italic">
              {fileName || t.home.noFileSelected}
            </span>
          </div>
          <p className="text-xs mt-3
            text-gray-500 dark:text-gray-600 font-mono">
            {t.home.fileHelp}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 mb-6 rounded border
            bg-red-50 border-red-200 text-red-700
            dark:bg-red-900/20 dark:border-red-500/50 dark:text-red-400">
            <span className="font-bold mr-2">{t.common.error}</span> {error}
          </div>
        )}

        {/* Actions */}
        {rows.length > 0 && !result && (
          <div className="mb-8 flex items-center justify-between p-4 rounded border
            bg-gray-50 border-gray-200
            dark:bg-[#0d1117] dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-white">{t.home.loadedRows(rows.length)}</strong>
            </span>
            <button
              onClick={handleImport}
              disabled={loading || !token || !owner || !repo}
              className={`px-6 py-2 rounded text-sm font-bold uppercase tracking-wide transition border shadow-sm
                ${loading || !token || !owner || !repo 
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700" 
                  : "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 dark:bg-green-600/10 dark:text-green-400 dark:border-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:shadow-[0_0_10px_rgba(34,197,94,0.3)]"}`}
            >
              {loading ? t.common.processing : t.common.executeImport}
            </button>
          </div>
        )}

        {/* Result Report */}
        {result && (
          <div className="mb-8 p-4 border rounded
            bg-gray-50 border-gray-200
            dark:bg-[#0d1117] dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 pb-2 border-b
              text-gray-800 border-gray-200
              dark:text-gray-200 dark:border-gray-800">{t.home.reportTitle}</h3>
            
            <div className="flex gap-6 mb-4">
              <span className="font-bold flex items-center text-green-600 dark:text-green-400">
                <span className="w-2 h-2 rounded-full mr-2 bg-green-600 dark:bg-green-500"></span>
                {t.home.created}: {result.created.length}
              </span>
              <span className="font-bold flex items-center text-red-600 dark:text-red-400">
                <span className={`w-2 h-2 rounded-full mr-2 ${result.errors.length > 0 ? "bg-red-600 dark:bg-red-500" : "bg-gray-400 dark:bg-gray-700"}`}></span>
                {t.home.errors}: {result.errors.length}
              </span>
            </div>

            {result.errors.length > 0 && (
              <div className="mb-4">
                <h4 className="font-bold text-xs uppercase mb-2 text-red-600 dark:text-red-500">{t.home.errorLogs}</h4>
                <div className="p-3 rounded border max-h-40 overflow-y-auto font-mono text-xs
                  bg-white border-red-200 text-red-700
                  dark:bg-black dark:border-red-900/30 dark:text-red-400">
                  {result.errors.map((e, i) => (
                    <div key={i} className="mb-1">
                      <span className="opacity-50">Line {e.rowIndex} [{e.rowTitle}]:</span> {e.error}
                    </div>
                  ))}
                </div>
              </div>
            )}
             {result.created.length > 0 && (
                <div className="mt-2 text-xs text-gray-500">
                    {t.home.lastCreated} <a href={result.created[result.created.length-1].url} target="_blank" className="hover:underline text-indigo-600 dark:text-green-400">#{result.created[result.created.length-1].issueNumber}</a>
                </div>
             )}
             <button 
                onClick={() => { setResult(null); setRows([]); setFileName(""); }}
                className="mt-4 text-xs transition hover:underline
                  text-gray-500 hover:text-indigo-600
                  dark:text-gray-500 dark:hover:text-green-400"
             >
                {t.common.clearReset}
             </button>
          </div>
        )}

        {/* Data Preview */}
        {rows.length > 0 && (
          <div className="overflow-x-auto border rounded
            border-gray-200 dark:border-gray-700">
            <div className="p-2 border-b text-xs uppercase font-bold tracking-wider
              bg-gray-50 border-gray-200 text-gray-500
              dark:bg-[#0d1117] dark:border-gray-700">
              {t.home.dataPreview}
            </div>
            <table className="min-w-full text-xs text-left">
              <thead className="
                bg-gray-100 text-gray-600
                dark:bg-[#161b22] dark:text-gray-400">
                <tr>
                  <th className="p-3 border-b border-gray-200 dark:border-gray-700">{t.home.tableHeaders.number}</th>
                  <th className="p-3 border-b border-gray-200 dark:border-gray-700">{t.home.tableHeaders.title}</th>
                  <th className="p-3 border-b border-gray-200 dark:border-gray-700">{t.home.tableHeaders.labels}</th>
                  <th className="p-3 border-b border-gray-200 dark:border-gray-700">{t.home.tableHeaders.assignee}</th>
                  <th className="p-3 border-b border-gray-200 dark:border-gray-700">{t.home.tableHeaders.milestone}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {rows.slice(0, 50).map((row, i) => (
                  <tr key={i} className="transition-colors
                    hover:bg-gray-50 dark:hover:bg-white/5">
                    <td className="p-3 font-mono text-gray-500 dark:text-gray-600">{i + 1}</td>
                    <td className="p-3 font-medium text-gray-900 dark:text-gray-300">{row.title}</td>
                    <td className="p-3">
                      {row.labels.map(l => (
                        <span key={l} className="inline-block px-2 py-0.5 rounded text-[10px] mr-1 border
                          bg-gray-100 text-gray-700 border-gray-200
                          dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                          {l}
                        </span>
                      ))}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{row.assignees.join(", ")}</td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{row.milestone || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 50 && (
                <div className="p-2 text-center text-xs border-t
                  bg-gray-50 border-gray-200 text-gray-500
                  dark:bg-[#0d1117] dark:border-gray-700 dark:text-gray-600">
                  {t.home.moreRows(rows.length - 50)}
                </div>
            )}
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-xs tracking-widest uppercase transition-colors duration-300
        text-gray-400
        dark:text-green-900/60">
        {t.common.footer}
      </footer>
    </main>
  );
}
