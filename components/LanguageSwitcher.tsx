"use client";

import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 mr-4">
      {(["en", "pl", "es"] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-2 py-1 rounded text-xs font-bold uppercase transition-colors
            ${language === lang 
              ? "bg-indigo-600 text-white dark:bg-green-600" 
              : "bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
