"use client"

import type { Section } from "@/types/course"
import type { JSX } from "react"

interface ContentSectionProps {
  section: Section
}

export function ContentSection({ section }: ContentSectionProps) {
  const renderContent = (content: string) => {
    const lines = content.split("\n")
    const elements: JSX.Element[] = []

    lines.forEach((line, idx) => {
      const trimmedLine = line.trim()

      // Section headers (lines with ━━━ below them are usually headers)
      if (trimmedLine.includes("━━━")) {
        elements.push(<div key={`divider-${idx}`} className="border-t border-primary/30 my-3 sm:my-4" />)
        return
      }

      // Main headers (all caps ending with :)
      if (trimmedLine.match(/^[A-Z\s&-]+:$/) && trimmedLine.length < 60) {
        elements.push(
          <h3 key={idx} className="text-base sm:text-lg font-bold text-primary mt-4 sm:mt-6 mb-2 sm:mb-3 tracking-wide">
            {trimmedLine.replace(":", "")}
          </h3>,
        )
        return
      }

      // Numbered steps
      if (trimmedLine.match(/^[0-9]+\.\s/)) {
        const [number, ...rest] = trimmedLine.split(". ")
        const text = rest.join(". ")
        elements.push(
          <div key={idx} className="flex gap-3 sm:gap-4 mb-3">
            <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 text-primary font-bold flex items-center justify-center text-xs sm:text-sm">
              {number}
            </span>
            <span className="text-foreground/90 leading-relaxed pt-0.5 sm:pt-1 text-sm sm:text-base">{text}</span>
          </div>,
        )
        return
      }

      // Checkboxes
      if (trimmedLine.startsWith("☐")) {
        elements.push(
          <div key={idx} className="flex items-start gap-2 sm:gap-3 mb-2 pl-1 sm:pl-2">
            <span className="text-primary text-sm sm:text-base">☐</span>
            <span className="text-foreground/80 text-sm sm:text-base">{trimmedLine.slice(1).trim()}</span>
          </div>,
        )
        return
      }

      // Bullet points with arrows
      if (trimmedLine.startsWith("→")) {
        elements.push(
          <div key={idx} className="flex items-start gap-2 sm:gap-3 mb-2 pl-4 sm:pl-6 text-neon">
            <span className="text-sm sm:text-base">→</span>
            <span className="text-foreground/90 text-sm sm:text-base">{trimmedLine.slice(1).trim()}</span>
          </div>,
        )
        return
      }

      // Bullet points
      if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
        elements.push(
          <div key={idx} className="flex items-start gap-2 sm:gap-3 mb-2 pl-2 sm:pl-4">
            <span className="text-primary mt-1 sm:mt-1.5 text-sm sm:text-base">•</span>
            <span className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              {trimmedLine.slice(1).trim()}
            </span>
          </div>,
        )
        return
      }

      // Quoted speech/scripts
      if (trimmedLine.startsWith('"') && trimmedLine.endsWith('"')) {
        elements.push(
          <blockquote
            key={idx}
            className="border-l-2 border-primary/50 pl-3 sm:pl-4 py-2 my-3 sm:my-4 bg-primary/5 rounded-r-lg"
          >
            <p className="text-foreground/90 italic text-sm sm:text-base">{trimmedLine}</p>
          </blockquote>,
        )
        return
      }

      // Table-like rows (with →)
      if (trimmedLine.includes("→") && !trimmedLine.startsWith("→")) {
        const parts = trimmedLine.split("→")
        if (parts.length === 2) {
          elements.push(
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-2 py-2 px-3 bg-card/30 rounded-lg"
            >
              <span className="text-foreground/70 text-sm sm:text-base">{parts[0].trim()}</span>
              <span className="text-neon font-medium text-sm sm:text-base">{parts[1].trim()}</span>
            </div>,
          )
          return
        }
      }

      // Empty lines
      if (!trimmedLine) {
        elements.push(<div key={idx} className="h-1 sm:h-2" />)
        return
      }

      // Regular paragraphs
      elements.push(
        <p key={idx} className="text-foreground/80 leading-relaxed mb-2 text-sm sm:text-base">
          {trimmedLine}
        </p>,
      )
    })

    return elements
  }

  return (
    <div className="space-y-2">
      <div className="max-w-none">{section.content && renderContent(section.content)}</div>
    </div>
  )
}
