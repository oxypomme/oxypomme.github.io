import ILanguage from "./ILanguage";
import IIconable from "./IIconable";

export default interface IProject extends IIconable {
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
}