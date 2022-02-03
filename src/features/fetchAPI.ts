import axios from "axios";
import { Locale } from "./languages";

type StrapiDate = `${number}-${number}-${number}`;

export type StrapiAttributes<T> = T & {
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: Locale;
};

export type StrapiObject<T> = {
  id: number;
  attributes: StrapiAttributes<T>;
};

export interface StrapiResult<T extends API[keyof API]> {
  data: T extends Array<infer E> ? StrapiObject<E>[] : StrapiObject<T>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Diploma {
  start: StrapiDate;
  end: StrapiDate;
  name: string;
  location: string;
  isApprentice: boolean;
  description?: string;
  logo?: string;
}

export interface Experience {
  start: StrapiDate;
  end?: StrapiDate;
  name: string;
  location?: string;
  isApprentice: boolean;
  role: string;
  description?: string;
  logo?: string;
}

export interface Description {
  role: string;
  description?: string;
  avatar?: string;
}

export interface ProgConcept {
  name: string;
  color?: string;
  icon?: string;
}

export enum EProjectType {
  PERSONAL = "personal",
  SCHOOL = "school",
  BUSINESS = "business",
}

export enum EGitProvider {
  GITHUB = "GitHub",
  GITLAB = "GitLab",
}

export interface Project {
  name: string;
  type: EProjectType;
  goal?: string;
  description?: string;
  featured: boolean;
  imageURL?: string;
  languages: {
    data: StrapiObject<ProgConcept>[];
  };
  technologies: {
    data: StrapiObject<ProgConcept>[];
  };
  git?: {
    id: number;
    provider: EGitProvider;
    url: string;
  };
  url?: string;
}

interface API {
  diplomes: Diploma[];
  // [endpoint: `diplomes/${number}`]: Diploma;
  experiences: Experience[];
  // [endpoint: `experiences/${number}`]: Experience;
  description: Description;
  projects: Project[];
}

export const getAPI = async <Endpoint extends keyof API>(
  endpoint: Endpoint,
  locale: Locale = Locale.FRENCH,
  query: Record<string, any> = {}
) => {
  const { data } = await axios.get<StrapiResult<API[Endpoint]>>(
    `${process.env.REACT_APP_API_URL}/${endpoint}`,
    {
      params: {
        ...query,
        locale,
      },
    }
  );
  return data;
};
