export default interface ILanguage {
    name: string,
    color: string | null,
    textColor: string | null,
    icon: string | null,
    iconColor: string | null,
    iconStore: "fas" | "far" | "fab" | null,
}