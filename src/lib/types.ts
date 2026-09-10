export type Level = "nybegynner" | "viderekommen" | "erfaren";

export const LEVEL_LABELS: Record<Level, string> = {
  nybegynner: "Nybegynner",
  viderekommen: "Litt erfaring",
  erfaren: "Erfaren",
};

export type TaskType =
  | "multiple-choice"
  | "fill-prompt"
  | "rate-prompt"
  | "order-steps";

interface BaseTask {
  id: string;
  type: TaskType;
  xp: number;
  explanation: string;
}

export interface MultipleChoiceTask extends BaseTask {
  type: "multiple-choice";
  question: string;
  options: string[];
  correctIndex: number;
}

export interface FillPromptTask extends BaseTask {
  type: "fill-prompt";
  scenario: string;
  instruction: string;
  placeholder: string;
  keywords: string[];
}

export interface RatePromptChoice {
  label: string;
  correct: boolean;
}

export interface RatePromptTask extends BaseTask {
  type: "rate-prompt";
  scenario: string;
  examplePrompt: string;
  choices: RatePromptChoice[];
}

export interface OrderStepsTask extends BaseTask {
  type: "order-steps";
  instruction: string;
  steps: string[];
}

export type Task =
  | MultipleChoiceTask
  | FillPromptTask
  | RatePromptTask
  | OrderStepsTask;

export interface Lesson {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  lessons: Lesson[];
  locked?: boolean;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
}

export interface Profile {
  name: string;
  level: Level;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  earnedBadges: string[];
  createdAt: string;
}
