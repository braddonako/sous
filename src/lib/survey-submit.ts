import type { SurveyAnswers, SurveyPath } from "@/content/survey";

/**
 * Called once when someone finishes the check.
 * `path` is "business" or "teams".
 * `answers` maps each question id to an option id, a list of option ids, or free text.
 * Question and option ids live in src/content/survey.ts.
 */
export function onSurveyComplete(path: SurveyPath, answers: SurveyAnswers): void {
  // TODO: a backend goes here.
  void path;
  void answers;
}
