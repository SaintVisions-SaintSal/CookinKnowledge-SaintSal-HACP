"use client"

import { useState, useEffect } from "react"
import type { Course } from "@/types/course"
import type { Translation } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { QuizSection } from "@/components/quiz-section"
import { DialogueSection } from "@/components/dialogue-section"
import { ContentSection } from "@/components/content-section"
import { CertificateView } from "@/components/certificate-view"
import { cn } from "@/lib/utils"

interface ModuleViewerProps {
  course: Course
  onExit: () => void
  t: Translation
}

const STORAGE_KEYS = {
  currentModule: (courseId: string) => `cookin-training-${courseId}-module`,
  currentSection: (courseId: string) => `cookin-training-${courseId}-section`,
  completedModules: (courseId: string) => `cookin-training-${courseId}-completed`,
  quizAnswers: (courseId: string) => `cookin-training-${courseId}-answers`,
}

export function ModuleViewer({ course, onExit, t }: ModuleViewerProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.currentModule(course.id))
      return saved ? Number.parseInt(saved, 10) : 0
    }
    return 0
  })

  const [currentSectionIndex, setCurrentSectionIndex] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.currentSection(course.id))
      return saved ? Number.parseInt(saved, 10) : 0
    }
    return 0
  })

  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.completedModules(course.id))
      return saved ? new Set(JSON.parse(saved)) : new Set()
    }
    return new Set()
  })

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEYS.quizAnswers(course.id))
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const [showCertificate, setShowCertificate] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currentModule(course.id), currentModuleIndex.toString())
  }, [currentModuleIndex, course.id])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.currentSection(course.id), currentSectionIndex.toString())
  }, [currentSectionIndex, course.id])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.completedModules(course.id), JSON.stringify([...completedModules]))
  }, [completedModules, course.id])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.quizAnswers(course.id), JSON.stringify(quizAnswers))
  }, [quizAnswers, course.id])

  const currentModule = course.modules[currentModuleIndex]
  const currentSection = currentModule.sections[currentSectionIndex]
  const totalSections = currentModule.sections.length
  const moduleProgress = ((currentSectionIndex + 1) / totalSections) * 100

  const totalCourseSections = course.modules.reduce((acc, m) => acc + m.sections.length, 0)
  const completedSections =
    course.modules.slice(0, currentModuleIndex).reduce((acc, m) => acc + m.sections.length, 0) + currentSectionIndex + 1
  const overallProgress = (completedSections / totalCourseSections) * 100

  const avgMinutesPerSection = 5
  const remainingSections = totalCourseSections - completedSections
  const estimatedMinutes = remainingSections * avgMinutesPerSection
  const hours = Math.floor(estimatedMinutes / 60)
  const minutes = estimatedMinutes % 60

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
    } else if (currentModuleIndex < course.modules.length - 1) {
      const newCompleted = new Set([...completedModules, currentModule.id])
      setCompletedModules(newCompleted)
      setCurrentModuleIndex(currentModuleIndex + 1)
      setCurrentSectionIndex(0)
    } else {
      const newCompleted = new Set([...completedModules, currentModule.id])
      setCompletedModules(newCompleted)

      if (currentSection.type === "quiz" && currentSection.isFinal) {
        const questions = currentSection.questions || []
        let correct = 0
        questions.forEach((q, idx) => {
          if (quizAnswers[`${currentModuleIndex}-${currentSectionIndex}-${idx}`] === q.correct) {
            correct++
          }
        })
        const score = Math.round((correct / questions.length) * 100)
        setFinalScore(score)
      }
      setShowCertificate(true)
    }
  }

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1)
      setCurrentSectionIndex(course.modules[currentModuleIndex - 1].sections.length - 1)
    }
  }

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const key = `${currentModuleIndex}-${currentSectionIndex}-${questionIndex}`
    setQuizAnswers({ ...quizAnswers, [key]: answerIndex })
  }

  const jumpToModule = (moduleIndex: number) => {
    setCurrentModuleIndex(moduleIndex)
    setCurrentSectionIndex(0)
  }

  const handleExit = () => {
    if (confirm("Exit training? Your progress has been saved and you can resume anytime.")) {
      onExit()
    }
  }

  const handleReset = () => {
    if (confirm("Reset all progress for this course? This cannot be undone.")) {
      localStorage.removeItem(STORAGE_KEYS.currentModule(course.id))
      localStorage.removeItem(STORAGE_KEYS.currentSection(course.id))
      localStorage.removeItem(STORAGE_KEYS.completedModules(course.id))
      localStorage.removeItem(STORAGE_KEYS.quizAnswers(course.id))
      window.location.reload()
    }
  }

  if (showCertificate) {
    return <CertificateView course={course} score={finalScore} onExit={handleExit} onReset={handleReset} t={t} />
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-card border-r border-border z-50 transition-all duration-300 overflow-hidden",
          "md:block",
          showSidebar ? "w-full md:w-72" : "w-0",
        )}
      >
        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">{course.icon}</span>
              <div>
                <h2 className="text-xs sm:text-sm font-bold text-foreground">{course.title}</h2>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{course.duration}</p>
              </div>
            </div>
            <button
              onClick={() => setShowSidebar(false)}
              className="md:hidden p-2 hover:bg-card/80 rounded-lg transition-colors"
            >
              <span className="text-sm">✕</span>
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] sm:text-xs">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-primary font-mono font-bold">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            <div className="flex justify-between text-[10px] sm:text-xs pt-1">
              <span className="text-muted-foreground">
                {completedSections} / {totalCourseSections} sections
              </span>
              <span className="text-muted-foreground">{hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`} left</span>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] p-2">
          <nav className="space-y-1">
            {course.modules.map((module, idx) => {
              const isCompleted = completedModules.has(module.id)
              const isCurrent = idx === currentModuleIndex

              return (
                <button
                  key={module.id}
                  onClick={() => jumpToModule(idx)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all text-sm",
                    isCurrent
                      ? "bg-primary/10 border border-primary/30 text-foreground"
                      : isCompleted
                        ? "bg-primary/5 hover:bg-card/80 text-muted-foreground"
                        : "hover:bg-card/50 text-muted-foreground",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 mt-0.5",
                        isCompleted
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : isCurrent
                            ? "bg-primary text-background"
                            : "bg-card border border-border text-muted-foreground",
                      )}
                    >
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className={cn("font-medium text-xs", isCurrent && "text-foreground")}>{module.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{module.sections.length} sections</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className={cn(
          "fixed top-4 z-50 bg-card border border-border rounded-lg p-2 sm:p-2.5 transition-all hover:bg-card/80 shadow-lg",
          showSidebar ? "left-auto right-4 md:left-[280px] md:right-auto" : "left-2 sm:left-4",
        )}
      >
        <span className="text-xs sm:text-sm">{showSidebar ? "✕" : "☰"}</span>
      </button>

      <div className={cn("flex-1 transition-all duration-300 w-full", showSidebar ? "md:ml-72" : "ml-0")}>
        <div className="relative overflow-hidden min-h-screen">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />

          <div className="relative z-10 container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div>
                <p className="text-[10px] sm:text-xs font-mono text-primary mb-1">
                  MODULE {currentModuleIndex + 1} OF {course.modules.length}
                </p>
                <h1 className="text-base sm:text-xl font-bold text-foreground">{currentModule.title}</h1>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="text-[10px] sm:text-xs bg-transparent flex-1 sm:flex-none"
                >
                  Reset
                </Button>
                <Button
                  onClick={handleExit}
                  variant="outline"
                  size="sm"
                  className="text-[10px] sm:text-xs bg-transparent flex-1 sm:flex-none"
                >
                  Exit
                </Button>
              </div>
            </div>

            {/* Module Progress */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
                  Section {currentSectionIndex + 1} of {totalSections}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-primary font-bold">
                  {Math.round(moduleProgress)}%
                </span>
              </div>
              <Progress value={moduleProgress} className="h-1.5" />
            </div>

            <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 hide-scrollbar">
              {currentModule.sections.map((section, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono transition-all shrink-0",
                    idx === currentSectionIndex
                      ? section.type === "quiz"
                        ? "bg-neon-alt/20 text-neon-alt border border-neon-alt/30"
                        : section.type === "dialogue"
                          ? "bg-neon/20 text-neon border border-neon/30"
                          : "bg-primary/20 text-primary border border-primary/30"
                      : idx < currentSectionIndex
                        ? "bg-primary/10 text-primary/60 border border-primary/10"
                        : "bg-card text-muted-foreground border border-border",
                  )}
                >
                  {section.type === "quiz" ? "📝" : section.type === "dialogue" ? "💬" : "📚"}{" "}
                  <span className="hidden sm:inline">
                    {section.type === "quiz" ? "Quiz" : section.type === "dialogue" ? "Script" : "Learn"}
                  </span>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-6 sm:mb-8 min-h-[400px] sm:min-h-[500px]">
              <h2 className="text-sm sm:text-lg font-bold text-foreground mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-border">
                {currentSection.title}
              </h2>

              {currentSection.type === "content" && <ContentSection section={currentSection} />}
              {currentSection.type === "dialogue" && <DialogueSection section={currentSection} t={t} />}
              {currentSection.type === "quiz" && (
                <QuizSection
                  section={currentSection}
                  moduleIndex={currentModuleIndex}
                  sectionIndex={currentSectionIndex}
                  answers={quizAnswers}
                  onAnswer={handleQuizAnswer}
                  t={t}
                />
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <Button
                onClick={handlePrevious}
                disabled={currentModuleIndex === 0 && currentSectionIndex === 0}
                variant="outline"
                size="lg"
                className="gap-1 sm:gap-2 bg-transparent flex-1 sm:flex-none text-xs sm:text-sm"
              >
                ← <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <div className="hidden sm:flex gap-1.5">
                {currentModule.sections.map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      idx === currentSectionIndex
                        ? "bg-primary w-8"
                        : idx < currentSectionIndex
                          ? "bg-primary/60 w-2"
                          : "bg-border w-2",
                    )}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                size="lg"
                className="gap-1 sm:gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 flex-1 sm:flex-none text-xs sm:text-sm"
              >
                {currentModuleIndex === course.modules.length - 1 && currentSectionIndex === totalSections - 1 ? (
                  <span className="hidden sm:inline">Complete</span>
                ) : (
                  <>
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                  </>
                )}{" "}
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
