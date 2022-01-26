export enum Locale {
  FRENCH = "fr",
  ENGLISH = "en",
}

interface LocalizedData<T> extends Record<Locale, T> {}

export const dayjsLocales: LocalizedData<() => Promise<any>> = {
  fr: () => import("dayjs/locale/fr"),
  en: () => import("dayjs/locale/en"),
};

export const localizedStrings: LocalizedData<LocalizedData<string>> & {
  [key: string]: LocalizedData<string>;
} = {
  // French language name
  fr: {
    fr: "🇫🇷 Français",
    en: "🇫🇷 French",
  },
  // English language name
  en: {
    fr: "🇺🇸 Anglais",
    en: "🇺🇸 English",
  },
  // Education part
  education: {
    fr: "Diplômes",
    en: "Education",
  },
  // Experience part
  experience: {
    fr: "Expériences",
    en: "Experiences",
  },
  // Aprentice label
  aprentice: {
    fr: "En alternance",
    en: "Aprenticeship",
  },
  languages: {
    fr: "Langues",
    en: "Languages",
  },
} as const;
