"use client"

import type { Course } from "@/types/course"
import type { Translation } from "@/lib/translations"

interface CourseCardProps {
  course: Course
  onSelect: (course: Course) => void
  t: Translation
  isCertified?: boolean
}

export function CourseCard({ course, onSelect, t, isCertified }: CourseCardProps) {
  const isCrashCourse = course.id === "crash-course"

  return (
    <div onClick={() => onSelect(course)} className="group relative cursor-pointer">
      <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border-primary/10 hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500 rounded-2xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          {isCertified && (
            <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-primary text-background text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-primary/20">
              CERTIFIED
            </div>
          )}

          <div className="mb-4 sm:mb-6">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3 filter drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              {course.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground tracking-tight">
              {isCrashCourse ? (
                <>
                  <span className="text-neon neon-glow">{t.crashCourse.split(" ")[0]}</span>{" "}
                  <span>{t.crashCourse.split(" ").slice(1).join(" ")}</span>
                </>
              ) : (
                <>
                  <span className="text-primary">{t.fullCourse.split(" ")[0]}</span>{" "}
                  <span>{t.fullCourse.split(" ").slice(1).join(" ")}</span>
                </>
              )}
            </h3>
            <p className="text-muted-foreground text-[10px] sm:text-xs font-light">{course.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] mb-4 sm:mb-6 font-mono text-muted-foreground">
            {/* Hover glow effect */}
            {isCrashCourse ? (
              <>
                <span className="flex items-center gap-1">
                  <span className="text-primary">⏱</span> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-primary">📚</span> {course.modules.length} Modules
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-primary">🎯</span> {isCertified ? "Certified" : "Interactive"}
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">
                  <span className="text-primary">⏱</span> {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-primary">📚</span> {course.modules.length} Modules
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-primary">🎯</span> {isCertified ? "Certified" : "Interactive"}
                </span>
              </>
            )}
          </div>

          <ul className="text-[11px] sm:text-xs space-y-2 sm:space-y-2.5 mb-5 sm:mb-6">
            {isCrashCourse ? (
              <>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-neon mt-0.5">→</span>
                  <span>
                    Saint Vision <span className="text-neon">Ecosystem</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-neon mt-0.5">→</span>
                  <span>
                    Daily <span className="text-neon">Systems</span> & CRM
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-neon mt-0.5">→</span>
                  <span>
                    Sales & <span className="text-neon">Buying Signals</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-neon mt-0.5">→</span>
                  <span>
                    The <span className="text-neon">Lender Call</span> Scripts
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-neon mt-0.5">→</span>
                  <span>File Processing & Docs</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-neon mt-0.5">→</span>
                  <span>
                    <span className="text-neon">Objection</span> Handling
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    <span className="text-primary">HFCI + SVG</span> Integration
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    Commercial <span className="text-primary">Lending</span> Products
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    The <span className="text-primary">Five C's</span> of Credit
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    Real Estate & <span className="text-primary">Wholesaling</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    Investment <span className="text-primary">Products</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    Pipeline & <span className="text-primary">Cross-Sell</span>
                  </span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-primary mt-0.5">→</span>
                  <span>
                    Final <span className="text-primary">Certification</span> Exam
                  </span>
                </li>
              </>
            )}
          </ul>

          <button
            className={`w-full py-3 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 border relative overflow-hidden group/btn ${
              isCrashCourse
                ? "bg-neon/10 text-neon border-neon/20 hover:bg-neon/20 hover:border-neon/40 active:bg-neon/30"
                : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/40 active:bg-primary/30"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t.startLearning}
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </span>
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
              <div className="gold-shimmer absolute inset-0" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
