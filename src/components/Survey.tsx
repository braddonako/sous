"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { useSearchParams } from "next/navigation";
import { home } from "@/content/home";
import {
  parseSurveyPath,
  questionsFor,
  resultFor,
  survey,
  type ScoredArea,
  type SurveyAnswers,
  type SurveyPath,
  type SurveyQuestion,
  type SurveyResult,
} from "@/content/survey";
import { onSurveyComplete } from "@/lib/survey-submit";
import { BookCall } from "@/components/BookCall";
import { ArrowRightIcon, StorefrontIcon, TerminalIcon } from "@/components/icons";

type Step = "choose" | "result" | number;

export function Survey() {
  const params = useSearchParams();
  const queryPath = parseSurveyPath(params.get("path"));
  const [path, setPath] = useState<SurveyPath | null>(queryPath);
  const [step, setStep] = useState<Step>(queryPath ? 0 : "choose");
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const focusRef = useRef<HTMLDivElement>(null);
  const initialStep = useRef(step);

  useEffect(() => {
    if (step === initialStep.current) return;
    focusRef.current?.focus();
    window.scrollTo(0, 0);
  }, [step]);

  function choosePath(next: SurveyPath) {
    if (next !== path) setAnswers({});
    setPath(next);
    setStep(0);
  }

  function startOver() {
    setAnswers({});
    setPath(null);
    setStep("choose");
  }

  function goBack() {
    if (typeof step !== "number") return;
    setStep(step === 0 ? "choose" : step - 1);
  }

  function goNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!path || typeof step !== "number") return;
    const questions = questionsFor(path);
    const question = questions[step];
    if (!question || !isAnswered(question, answers)) return;
    if (step >= questions.length - 1) {
      onSurveyComplete(path, snapshotAnswers(answers));
      setStep("result");
      return;
    }
    setStep(step + 1);
  }

  const onQuestion = Boolean(path) && typeof step === "number";

  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-12 desk:px-10 desk:py-16">
      {step === "result" && path ? (
        <ResultStep path={path} answers={answers} focusRef={focusRef} onStartOver={startOver} />
      ) : onQuestion && path && typeof step === "number" ? (
        <QuestionStep
          path={path}
          index={step}
          answers={answers}
          focusRef={focusRef}
          onBack={goBack}
          onNext={goNext}
          onAnswers={setAnswers}
        />
      ) : (
        <ChooseStep focusRef={focusRef} onChoose={choosePath} />
      )}
    </section>
  );
}

function ChooseStep({
  focusRef,
  onChoose,
}: {
  focusRef: RefObject<HTMLDivElement | null>;
  onChoose: (path: SurveyPath) => void;
}) {
  return (
    <>
      <div ref={focusRef} tabIndex={-1} className="survey-focus max-w-[720px]" aria-labelledby="survey-heading">
        <p className="eyebrow text-accent-action">{survey.intro.kicker}</p>
        <h1 id="survey-heading" className="mt-4 text-[40px] desk:text-[52px]">
          {survey.intro.title}
        </h1>
        <p className="mt-4 max-w-[540px] text-[17px] text-muted desk:text-[19px]">{survey.intro.sub}</p>
      </div>
      <p className="eyebrow mt-10 text-muted">{home.paths.prompt}</p>
      <div className="mt-4 grid gap-3.5 desk:grid-cols-2 desk:gap-5">
        <PathButton pathId="business" copy={home.paths.business} onChoose={onChoose} />
        <PathButton pathId="teams" copy={home.paths.dev} onChoose={onChoose} />
      </div>
    </>
  );
}

function PathButton({
  pathId,
  copy,
  onChoose,
}: {
  pathId: SurveyPath;
  copy: (typeof home.paths)["business"] | (typeof home.paths)["dev"];
  onChoose: (path: SurveyPath) => void;
}) {
  const business = pathId === "business";
  const titleId = business ? "survey-path-business-title" : "survey-path-teams-title";
  const bodyId = business ? "survey-path-business-body" : "survey-path-teams-body";
  return (
    <button
      type="button"
      className={business ? "path-card path-card-biz survey-path" : "path-card survey-path"}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      onClick={() => onChoose(pathId)}
    >
      <p className="flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted">
        {business ? (
          <StorefrontIcon size={26} className="text-sage-deep" />
        ) : (
          <TerminalIcon size={26} className="text-ink" />
        )}
        {copy.kicker}
      </p>
      <h2 id={titleId} className="mt-1.5 mb-2 flex items-center justify-between gap-4 text-[26px] desk:text-[30px]">
        {copy.title}
        <span className={business ? "path-go path-go-biz" : "path-go"} aria-hidden="true">
          <ArrowRightIcon size={20} />
        </span>
      </h2>
      <p id={bodyId} className="max-w-[520px] text-base text-muted">
        {copy.body}
      </p>
    </button>
  );
}

function QuestionStep({
  path,
  index,
  answers,
  focusRef,
  onBack,
  onNext,
  onAnswers,
}: {
  path: SurveyPath;
  index: number;
  answers: SurveyAnswers;
  focusRef: RefObject<HTMLDivElement | null>;
  onBack: () => void;
  onNext: (event: FormEvent<HTMLFormElement>) => void;
  onAnswers: (answers: SurveyAnswers) => void;
}) {
  const questions = questionsFor(path);
  const question = questions[index];
  if (!question) return null;
  const total = questions.length;
  const ready = isAnswered(question, answers);
  const progress = `Question ${index + 1} of ${total}`;

  function selectSingle(optionId: string) {
    onAnswers({ ...answers, [question.id]: optionId });
  }

  function toggleOption(optionId: string) {
    const value = answers[question.id];
    const current = Array.isArray(value) ? value : [];
    const next = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
    onAnswers({ ...answers, [question.id]: next });
  }

  function setText(text: string) {
    onAnswers({ ...answers, [question.id]: text });
  }

  return (
    <form className="max-w-[720px]" onSubmit={onNext} noValidate>
      <div ref={focusRef} tabIndex={-1} className="survey-focus" aria-labelledby="survey-progress survey-heading">
        <p id="survey-progress" className="text-[15px] font-semibold text-muted">
          {progress}
        </p>
        <div className="survey-dots" aria-hidden="true">
          {questions.map((item, dot) => (
            <span key={item.id} className={dot <= index ? "survey-dot survey-dot-on" : "survey-dot"} />
          ))}
        </div>
        <h1 id="survey-heading" className="mt-6 text-[32px] desk:text-[44px]">
          {question.prompt}
        </h1>
        <p id="survey-hint" className="mt-3 text-[17px] text-muted">
          {survey.hints[question.kind]}
        </p>
      </div>

      {question.kind === "text" ? (
        <textarea
          id={`${question.id}-answer`}
          className="survey-text mt-6"
          aria-labelledby="survey-heading"
          aria-describedby="survey-hint"
          value={typeof answers[question.id] === "string" ? answers[question.id] : ""}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          autoComplete="off"
        />
      ) : (
        <fieldset className="survey-fieldset mt-6" aria-describedby="survey-hint">
          <legend className="sr-only">{question.prompt}</legend>
          <div className="flex flex-col gap-3">
            {question.options?.map((option) => {
              const value = answers[question.id];
              const selected = question.kind === "single" ? value === option.id : Array.isArray(value) && value.includes(option.id);
              return (
                <label key={option.id} className={selected ? "survey-choice survey-choice-on" : "survey-choice"}>
                  <input
                    type={question.kind === "single" ? "radio" : "checkbox"}
                    name={question.id}
                    value={option.id}
                    checked={selected}
                    onChange={() => (question.kind === "single" ? selectSingle(option.id) : toggleOption(option.id))}
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="mt-8 flex flex-col gap-3 desk:flex-row desk:items-center desk:justify-between">
        <button type="button" className="btn-quiet" onClick={onBack}>
          {survey.back}
        </button>
        <button type="submit" className="btn-primary btn-lg survey-next" aria-disabled={!ready}>
          {survey.next}
          <ArrowRightIcon size={18} mono />
          {!ready ? <span className="sr-only"> {survey.nextBlocked}</span> : null}
        </button>
      </div>
    </form>
  );
}

function ResultStep({
  path,
  answers,
  focusRef,
  onStartOver,
}: {
  path: SurveyPath;
  answers: SurveyAnswers;
  focusRef: RefObject<HTMLDivElement | null>;
  onStartOver: () => void;
}) {
  const result = resultFor(path, answers);
  return (
    <div className="max-w-[720px]">
      <div ref={focusRef} tabIndex={-1} className="survey-focus" aria-labelledby="survey-heading">
        <p className="eyebrow text-accent-action">{survey.resultKicker}</p>
        <h1 id="survey-heading" className="mt-4 text-[40px] desk:text-[56px]">
          {result.level.label}
        </h1>
        <p className="mt-4 max-w-[540px] text-[18px]">{result.level.body}</p>
      </div>

      <h2 className="mt-12 text-[28px] text-sage-deep desk:text-[32px]">{survey.barsTitle}</h2>
      <p id="survey-bars-note" className="mt-3 max-w-[540px] text-[17px]">
        {survey.barsNote[path]}
      </p>
      <AreaBars areas={result.areas} />

      <h2 className="mt-12 text-[28px] desk:text-[32px]">{survey.suggestionsTitle}</h2>
      <SuggestionList result={result} />

      {result.echo ? (
        <p className="survey-echo mt-8 text-[17px]">
          {result.echo.lead}{" "}
          <span className="font-semibold whitespace-pre-wrap">{result.echo.text}</span>
        </p>
      ) : null}

      <div className="survey-book mt-10">
        <BookCall label={survey.bookLabel} />
      </div>
      <p className="mt-4 text-[15px] text-muted">{survey.savedNote}</p>
      <button type="button" className="btn-quiet mt-2 px-0" onClick={onStartOver}>
        {survey.startOver}
      </button>
    </div>
  );
}

function AreaBars({ areas }: { areas: ScoredArea[] }) {
  return (
    <ul className="mt-6 flex list-none flex-col gap-5 p-0" aria-label={survey.barsTitle} aria-describedby="survey-bars-note">
      {areas.map((area) => (
        <li key={area.id}>
          <p className="sr-only">
            {area.label}: {area.labelWord}
          </p>
          <div aria-hidden="true">
            <p className="text-[18px] font-semibold">{area.label}</p>
            <div className="survey-bar-row mt-2">
              <span className="survey-segs">
                {[1, 2, 3].map((segment) => (
                  <span
                    key={segment}
                    className={segment <= area.score ? "survey-seg survey-seg-on" : "survey-seg"}
                    style={segment <= area.score ? { animationDelay: `${(segment - 1) * 140}ms` } : undefined}
                  />
                ))}
              </span>
              <span className="survey-bar-word">{area.labelWord}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SuggestionList({ result }: { result: SurveyResult }) {
  return (
    <ul className="survey-suggestions mt-5">
      {result.suggestions.map((item) => (
        <li key={item.id} className="survey-suggestion">
          <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-sage-deep">{item.areaLabel}</p>
          <p className="mt-1.5 text-[17px]">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

function isAnswered(question: SurveyQuestion, answers: SurveyAnswers): boolean {
  if (question.kind === "text") return true;
  const value = answers[question.id];
  if (question.kind === "single") return typeof value === "string" && value.length > 0;
  return Array.isArray(value) && value.length > 0;
}

function snapshotAnswers(answers: SurveyAnswers): SurveyAnswers {
  const snapshot: SurveyAnswers = {};
  for (const [key, value] of Object.entries(answers)) {
    snapshot[key] = Array.isArray(value) ? [...value] : value;
  }
  return snapshot;
}
