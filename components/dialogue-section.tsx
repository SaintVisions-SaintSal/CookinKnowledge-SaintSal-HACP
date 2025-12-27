"use client"

import type { Section } from "@/types/course"
import type { Translation } from "@/lib/translations"

interface DialogueSectionProps {
  section: Section
  t: Translation
}

export function DialogueSection({ section, t }: DialogueSectionProps) {
  const speakers = section.speakers || []

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h2 className="text-2xl font-bold text-foreground mb-2">{section.title}</h2>
        {speakers.length > 0 && (
          <div className="flex items-center gap-4 mt-3">
            {speakers.map((speaker, idx) => (
              <div key={speaker} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${idx === 0 ? "bg-primary" : "bg-neon"}`} />
                <span className="text-sm font-mono text-muted-foreground">{speaker}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {section.lines?.map((line, idx) => {
          const isFirstSpeaker = speakers.indexOf(line.speaker) === 0
          return (
            <div key={idx} className={`flex ${isFirstSpeaker ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  isFirstSpeaker
                    ? "bg-primary/10 border border-primary/20 rounded-tl-sm"
                    : "bg-card border border-border rounded-tr-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${isFirstSpeaker ? "bg-primary" : "bg-neon"}`} />
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isFirstSpeaker ? "text-primary" : "text-neon"
                    }`}
                  >
                    {line.speaker}
                  </span>
                </div>
                <p className="text-foreground/90 leading-relaxed">{line.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 mt-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🎯</span>
          <div>
            <p className="text-sm font-semibold text-foreground mb-1">Practice Tip</p>
            <p className="text-xs text-muted-foreground">
              Role-play this dialogue with a partner. Practice until the responses feel natural.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
