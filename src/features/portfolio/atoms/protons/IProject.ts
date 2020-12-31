import ILanguage from "./ILanguage";

export default interface IProject {
    isPersonal: boolean,
    name: string,
    infos: {
        semester: number,
        duration: number,
        group: number
    } | null,
    collaborators: string[] | null,
    goal: string,
    skills: string | null,
    languages: ILanguage[],
    techs: ILanguage[] | null,
    link: string | null,
    icon: string | null,
    iconStore: "fas" | "far" | "fab" | null,
}