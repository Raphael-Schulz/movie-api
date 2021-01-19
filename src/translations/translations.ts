import translationFile from "./en.json";

export function getTranslation(id: string): string {
  const key = id as keyof typeof translationFile;

  let translation = translationFile[key];

  if (!translation) {
    translation = id;
    console.log("No translation found. Using ID as fallback.");
  }

  return translation;
}
