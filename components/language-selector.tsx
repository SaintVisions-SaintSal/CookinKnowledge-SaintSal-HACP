"use client"

interface LanguageSelectorProps {
  language: string
  setLanguage: (lang: string) => void
}

export function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  const languages = ["en", "es", "zh", "tl"]

  return (
    <div className="absolute top-4 right-4 flex gap-2 z-50">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === lang ? "bg-amber-500 text-slate-900" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
