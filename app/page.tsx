"use client"

import { useState } from "react"
import { CourseCard } from "@/components/course-card"
import { LanguageSelector } from "@/components/language-selector"
import { ModuleViewer } from "@/components/module-viewer"
import { useLanguage } from "@/hooks/use-language"
import { crashCourseData, fullCourseData } from "@/lib/course-data"
import type { Course } from "@/types/course"
import Image from "next/image"

export default function HomePage() {
  const { t, language, setLanguage } = useLanguage()
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  if (selectedCourse) {
    return <ModuleViewer course={selectedCourse} onExit={() => setSelectedCourse(null)} t={t} />
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle grid pattern only - no glowing orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />

      <div className="relative z-10">
        <LanguageSelector language={language} setLanguage={setLanguage} />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 max-w-7xl">
          <div className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-4">
            <div className="flex justify-center mb-6 sm:mb-8">
              <Image
                src="/saintsal-logo.png"
                alt="SaintSal"
                width={180}
                height={180}
                className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-wider">
                SAINT VISION GROUP LLC
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              <span className="text-foreground">COOKIN</span>
              <span className="text-primary">TRAINING</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl font-light tracking-wide text-muted-foreground">
              The Capital of <span className="text-neon neon-glow">Capital</span>™
            </p>

            <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground font-mono pt-2">
              <a
                href="https://cookincap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                cookincap.com
              </a>
              <span className="text-border">×</span>
              <a
                href="https://saintsal.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-alt hover:text-neon-alt/80 transition-colors"
              >
                saintsal.ai
              </a>
            </div>
          </div>

          {/* Course Selection */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Select Your <span className="text-neon">Path</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-light">Choose your training track to begin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <CourseCard course={crashCourseData} onSelect={setSelectedCourse} t={t} />
              <CourseCard course={fullCourseData} onSelect={setSelectedCourse} t={t} isCertified />
            </div>
          </div>

          <div className="mt-16 sm:mt-24 text-center space-y-4">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs text-muted-foreground font-mono pt-6">
              <a
                href="https://cookincap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                cookincap.com
              </a>
              <a
                href="https://saintsal.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                saintsal.ai
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
