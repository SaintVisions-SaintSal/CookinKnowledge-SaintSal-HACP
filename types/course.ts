export interface DialogueLine {
  speaker: string
  text: string
}

export interface Section {
  type: "content" | "dialogue" | "quiz"
  title: string
  content?: string
  speaker?: string
  speakers?: string[]
  lines?: DialogueLine[]
  questions?: Question[]
  isFinal?: boolean
}

export interface Question {
  question: string
  options: string[]
  correct: number
}

export interface Module {
  id: string
  title: string
  duration: string
  sections: Section[]
}

export interface Course {
  id: string
  title: string
  subtitle: string
  duration: string
  icon: string
  color: string
  modules: Module[]
}
