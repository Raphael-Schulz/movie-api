import { ENGLISH, GERMAN } from "./constants";
import { LANGUAGE } from "./localStorage";

export function formatDate(date: Date): string {
  let parsedDate = new Date(date);
  return parsedDate.toLocaleDateString();
}

export function parseDateForInput(date: Date): string {
  return date.toString().substring(0, 10);
}

export function setLanguage() {
  const language = localStorage.getItem(LANGUAGE);
  language === GERMAN
    ? localStorage.setItem(LANGUAGE, ENGLISH)
    : localStorage.setItem(LANGUAGE, GERMAN);
}
