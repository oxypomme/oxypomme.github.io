export enum Locale {
  FRENCH = "fr",
  ENGLISH = "en",
}

interface LocalizedData<T> extends Record<Locale, T> {}

export const dayjsLocales: LocalizedData<() => Promise<any>> = {
  fr: () => import("dayjs/locale/fr"),
  en: () => import("dayjs/locale/en"),
};

export const localizedStrings: {
  [key: string]: LocalizedData<string>;
} = {
  education: {
    fr: "Diplômes",
    en: "Education",
  },
  experience: {
    fr: "Expériences",
    en: "Experiences",
  },
  aprentice: {
    fr: "En alternance",
    en: "Aprenticeship",
  },
};
