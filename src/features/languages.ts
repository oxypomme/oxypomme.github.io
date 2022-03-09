import lStrings from "../config/localizedStrings.json";

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

export const localizedStrings = lStrings;
