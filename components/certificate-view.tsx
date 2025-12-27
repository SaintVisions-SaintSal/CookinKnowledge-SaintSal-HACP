"use client"

import type { Course } from "@/types/course"
import type { Translation } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CertificateViewProps {
  course: Course
  score: number
  onExit: () => void
  onReset: () => void
  t: Translation
}

export function CertificateView({ course, score, onExit, onReset, t }: CertificateViewProps) {
  const passed = score >= 85 || course.id === "crash-course"
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  if (!passed && course.id === "full-course") {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 text-center space-y-6 max-w-md mx-auto px-6">
          <div className="text-6xl">😔</div>
          <h1 className="text-3xl font-bold text-foreground">{t.failed}</h1>
          <p className="text-muted-foreground">
            {t.score}: {score}%
          </p>
          <p className="text-sm text-muted-foreground">{t.passScore}</p>
          <div className="flex gap-4 justify-center pt-4">
            <Button onClick={onExit} variant="outline" size="lg">
              {t.home}
            </Button>
            <Button
              onClick={onReset}
              size="lg"
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
            >
              {t.retake}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl w-full">
        <div className="glass-card rounded-3xl p-12 border-2 border-primary/20 text-center space-y-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/saintsal-logo.png"
              alt="SaintSal"
              width={120}
              height={120}
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-muted-foreground tracking-widest">SAINT VISION GROUP LLC</div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              CERTIFICATE OF <span className="text-primary">COMPLETION</span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <div className="space-y-4 py-8">
            <p className="text-lg text-muted-foreground">{t.congratulations}</p>
            <p className="text-xl text-foreground font-semibold">{t.certified}</p>
            <div className="text-5xl my-4">{course.icon}</div>
            <p className="text-2xl font-bold text-primary">{course.title}</p>
            {course.id === "full-course" && score >= 85 && (
              <div className="inline-block px-6 py-3 rounded-full bg-primary/20 border border-primary/30">
                <p className="text-lg font-bold text-primary">
                  {t.score}: {score}%
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground font-mono">
            <p>{today}</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://cookincap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                cookincap.com
              </a>
              <span>×</span>
              <a
                href="https://saintsal.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-alt hover:text-neon-alt/80"
              >
                saintsal.ai
              </a>
            </div>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button onClick={onExit} variant="outline" size="lg">
              {t.home}
            </Button>
            <Button
              onClick={() => window.print()}
              size="lg"
              className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 gap-2"
            >
              🖨️ {t.downloadCert}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
