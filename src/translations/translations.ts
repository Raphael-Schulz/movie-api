import * as translationFile from "./en.json";

export function getTranslation(id: string): string | null {
  const key = id as keyof typeof translationFile;
  console.log(key);
  console.log(translationFile["login"]);
  
  let translation = translationFile[key];

  console.log(translation);

  if (!translation) {
    translation = id;
    console.log("No translation found. Using ID as fallback.");
  }

  return translation;
}
