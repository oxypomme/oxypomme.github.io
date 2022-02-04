export enum Locale {
  FRENCH = "fr",
  ENGLISH = "en",
}

// interface LocalizedData<T> extends Record<Locale, T> {}
type LocalizedData<T> = Record<Locale, T>;

export const dayjsLocales: LocalizedData<() => Promise<unknown>> = {
  fr: () => import("dayjs/locale/fr"),
  en: () => import("dayjs/locale/en"),
};

export const localizedStrings: LocalizedData<LocalizedData<string>> & {
  [key: string]: LocalizedData<string>;
} = {
  languages: {
    fr: "Langues",
    en: "Languages",
  },
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
  // Timeline part
  timeline: {
    fr: "Comment je suis arrivé ici ?",
    en: "How did I get there ?",
  },
  timelineNext: {
    fr: "Avec vous ?",
    en: "With you ?",
  },
  // Aprentice label
  aprentice: {
    fr: "En alternance",
    en: "Aprenticeship",
  },
  // Projects
  projects: {
    fr: "Qu'ai-je fait ?",
    en: "What did I do ?",
  },
  interestProjects: {
    fr: "Projets notables",
    en: "Cool projects",
  },
  otherProjects: {
    fr: "Projets autres",
    en: "Other projects",
  },
  moreProjects: {
    fr: "Et plus encore sur GitHub",
    en: "And more on GitHub...",
  },
  // Testimonials
  testimonials: {
    fr: "Ils ont travaillés avec moi",
    en: "They worked with me",
  },
} as const;
