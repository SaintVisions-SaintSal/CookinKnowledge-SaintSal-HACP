"use client"

import { useState } from "react"
import { translations } from "@/lib/translations"

export function useLanguage() {
  const [language, setLanguage] = useState("en")

  return {
    language,
    setLanguage,
    t: translations[language as keyof typeof translations],
  }
}
