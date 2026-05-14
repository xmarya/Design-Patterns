import type { QueryComponent } from "./QueryComponent";


export class KeywordFilter implements QueryComponent {
    private keywords:string
    constructor(keywords:Array<string> | string) {
        this.keywords = typeof keywords === "string" ? keywords.toLowerCase() : keywords.join().toLowerCase();
    }

    query<T>(data: Array<T>, key: keyof T): Array<T> {
        return data.filter(({[key]: keywords}) => (keywords as Array<string>).some(kw => this.keywords.includes(kw.toLowerCase())));
    }
}