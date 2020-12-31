import IIconable from "./IIconable";

export default interface ILanguage extends IIconable {
    name: string,
    color: string | null,
    textColor: string | null,
}