import { Task } from "@/lib/types";
import { MultipleChoiceTaskView } from "./MultipleChoiceTaskView";
import { FillPromptTaskView } from "./FillPromptTaskView";
import { RatePromptTaskView } from "./RatePromptTaskView";
import { OrderStepsTaskView } from "./OrderStepsTaskView";

export function TaskRenderer({
  task,
  onComplete,
}: {
  task: Task;
  onComplete: (correct: boolean) => void;
}) {
  switch (task.type) {
    case "multiple-choice":
      return <MultipleChoiceTaskView task={task} onComplete={onComplete} />;
    case "fill-prompt":
      return <FillPromptTaskView task={task} onComplete={onComplete} />;
    case "rate-prompt":
      return <RatePromptTaskView task={task} onComplete={onComplete} />;
    case "order-steps":
      return <OrderStepsTaskView task={task} onComplete={onComplete} />;
  }
}
