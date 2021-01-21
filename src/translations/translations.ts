import { LANGUAGE } from "../constants";
import translationsDe from "./de.json";
import translationsEn from "./en.json";

export function getTranslation(id: string): string {
  const language = localStorage.getItem(LANGUAGE);
  let translationFile = translationsEn;

  switch (language) {
    case "de":
      translationFile = translationsDe;
      break;
    case "en":
      translationFile = translationsEn;
      break;
  }

  const key = id as keyof typeof translationFile;

  let translation = translationFile[key];

  if (!translation) {
    translation = id;
  }

  return translation;
}
