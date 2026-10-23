"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import {
  acceptToolName,
  popularTools,
  survey,
  TOOL_NAME_MAX,
  toolChoices,
  type ToolChoice,
} from "@/content/survey";

export function ToolPicker({
  selected,
  describedBy,
  onChange,
}: {
  selected: string[];
  describedBy?: string;
  onChange: (tools: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const options = toolChoices(query, selected);
  const highlighted = options.length === 0 ? -1 : Math.min(activeIndex, options.length - 1);
  const suggestions = popularTools.filter(
    (name) => !selected.some((item) => item.toLowerCase() === name.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (!open || highlighted < 0) return;
    const option = document.getElementById(`${listId}-option-${highlighted}`);
    const list = option?.parentElement;
    if (!option || !list) return;
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }, [open, highlighted, listId]);

  function addName(name: string) {
    const next = acceptToolName(name, selected);
    if (!next) {
      const trimmed = name.trim();
      if (trimmed) setStatus(`${trimmed} is already added`);
      setQuery("");
      setOpen(false);
      return;
    }
    onChange([...selected, next]);
    setQuery("");
    setOpen(false);
    setActiveIndex(0);
    setStatus(`${next} added`);
  }

  function removeName(name: string, viaButton: boolean) {
    const index = selected.indexOf(name);
    if (index < 0) return;
    const next = selected.filter((item) => item !== name);
    onChange(next);
    setStatus(`${name} removed`);
    if (!viaButton) return;
    const target = next.length === 0 ? "input" : Math.min(index, next.length - 1);
    window.setTimeout(() => {
      if (target === "input") inputRef.current?.focus();
      else document.getElementById(`tools-remove-${target}`)?.focus();
    }, 0);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(event.key === "ArrowUp" ? Math.max(options.length - 1, 0) : 0);
        return;
      }
      setActiveIndex((index) => {
        const last = options.length - 1;
        if (last < 0) return 0;
        const current = Math.min(index, last);
        if (event.key === "ArrowDown") return Math.min(current + 1, last);
        return Math.max(current - 1, 0);
      });
      return;
    }
    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(Math.max(options.length - 1, 0));
      return;
    }
    if (event.key === "Escape") {
      if (!open) return;
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.nativeEvent.isComposing) return;
      if (!open && query.trim() === "") return;
      const choice = options[open ? highlighted : 0];
      if (choice) addName(choice.name);
      return;
    }
    if (event.key === "Backspace" && query === "" && selected.length > 0) {
      event.preventDefault();
      const last = selected[selected.length - 1];
      if (last) removeName(last, false);
    }
  }

  return (
    <div className="survey-tools mt-6" ref={rootRef}>
      <label className="survey-tools-label" htmlFor="tools-search">
        {survey.toolPicker.label}
      </label>
      <div className="survey-tools-combo">
        <input
          ref={inputRef}
          id="tools-search"
          className="survey-tools-input"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && highlighted >= 0 ? `${listId}-option-${highlighted}` : undefined}
          aria-describedby={describedBy}
          placeholder={survey.toolPicker.placeholder}
          value={query}
          maxLength={TOOL_NAME_MAX}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
        {open && options.length > 0 ? (
          <ul id={listId} className="survey-tools-list" role="listbox" aria-label="Tools" aria-multiselectable="true">
            {options.map((option, index) => (
              <li
                key={option.kind === "add" ? `add:${option.name}` : option.name}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={index === highlighted}
                className={index === highlighted ? "survey-tools-option survey-tools-option-on" : "survey-tools-option"}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addName(option.name)}
              >
                {optionLabel(option)}
              </li>
            ))}
          </ul>
        ) : null}
        {open && options.length === 0 ? (
          <p className="survey-tools-empty" role="status">
            {query.trim() ? survey.toolPicker.already : survey.toolPicker.browseEmpty}
          </p>
        ) : null}
      </div>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
      {selected.length > 0 ? (
        <ul className="survey-tools-chips" aria-label="Selected tools">
          {selected.map((name, index) => (
            <li key={`${name}:${index}`} className="survey-tool-chip">
              <span className="survey-tool-chip-name">{name}</span>
              <button
                type="button"
                id={`tools-remove-${index}`}
                className="survey-tool-remove"
                aria-label={`Remove ${name}`}
                onClick={() => removeName(name, true)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {suggestions.length > 0 ? (
        <div>
          <p id="tools-popular-label" className="survey-tools-popular-label">
            {survey.toolPicker.popular}
          </p>
          <ul className="survey-tools-picks" aria-labelledby="tools-popular-label">
            {suggestions.map((name) => (
              <li key={name}>
                <button type="button" className="survey-tool-suggest" onClick={() => addName(name)}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function optionLabel(option: ToolChoice): string {
  if (option.kind === "add") return `Add "${option.name}"`;
  return option.name;
}
