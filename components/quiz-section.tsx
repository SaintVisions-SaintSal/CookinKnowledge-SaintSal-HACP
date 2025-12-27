"use client"

import { useState } from "react"
import type { Section } from "@/types/course"
import type { Translation } from "@/lib/translations"
import { Button } from "@/components/ui/button"

interface QuizSectionProps {
  section: Section
  moduleIndex: number
  sectionIndex: number
  answers: Record<string, number>
  onAnswer: (questionIndex: number, answerIndex: number) => void
  t: Translation
}

export function QuizSection({ section, moduleIndex, sectionIndex, answers, onAnswer, t }: QuizSectionProps) {
  const [showResults, setShowResults] = useState(false)

  const questions = section.questions || []
  const isFinal = section.isFinal

  const calculateScore = () => {
    let correct = 0
    questions.forEach((q, idx) => {
      const key = `${moduleIndex}-${sectionIndex}-${idx}`
      if (answers[key] === q.correct) {
        correct++
      }
    })
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    }
  }

  const score = showResults ? calculateScore() : null

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{section.title}</h2>
        {isFinal && <p className="text-sm text-neon-alt font-mono mb-4">Required: 85% to pass</p>}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const key = `${moduleIndex}-${sectionIndex}-${qIdx}`
          const selectedAnswer = answers[key]
          const isCorrect = selectedAnswer === q.correct

          return (
            <div key={qIdx} className="space-y-3">
              <p className="text-foreground font-semibold">
                {qIdx + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((option, oIdx) => {
                  const isSelected = selectedAnswer === oIdx
                  const isCorrectAnswer = oIdx === q.correct
                  const showCorrect = showResults && isCorrectAnswer
                  const showIncorrect = showResults && isSelected && !isCorrect

                  return (
                    <button
                      key={oIdx}
                      onClick={() => !showResults && onAnswer(qIdx, oIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        showCorrect
                          ? "bg-primary/20 border-primary text-primary"
                          : showIncorrect
                            ? "bg-red-500/20 border-red-500 text-red-400"
                            : isSelected
                              ? "bg-card border-primary"
                              : "bg-card/50 border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrect && <span className="text-primary">✓</span>}
                        {showIncorrect && <span className="text-red-400">✗</span>}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {!showResults ? (
        <Button
          onClick={() => setShowResults(true)}
          disabled={
            Object.keys(answers).filter((k) => k.startsWith(`${moduleIndex}-${sectionIndex}`)).length !==
            questions.length
          }
          className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
          size="lg"
        >
          {t.submit}
        </Button>
      ) : (
        <div className="p-6 rounded-lg border-2 border-primary/30 bg-card">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground font-mono">{t.score}</p>
            <p className="text-4xl font-bold text-primary">
              {score?.correct}/{score?.total}
            </p>
            <p className="text-xl font-semibold text-foreground">{score?.percentage}%</p>
            {isFinal && (
              <p className={`text-lg font-bold ${score && score.percentage >= 85 ? "text-primary" : "text-red-400"}`}>
                {score && score.percentage >= 85 ? t.passed : t.failed}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
