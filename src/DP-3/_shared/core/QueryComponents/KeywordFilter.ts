import type { QueryComponent } from "./QueryComponent";


export class KeywordFilter<T> implements QueryComponent {
    private keywords:string
    constructor(private readonly key: keyof T,keywords:Array<string> | string) {
        this.keywords = typeof keywords === "string" ? keywords.toLowerCase() : keywords.join().toLowerCase();
    }

    query<T>(data: Array<T>): Array<T> {
        return data.filter(({[this.key]: keywords}) => (keywords as Array<string>).some(kw => this.keywords.includes(kw.toLowerCase())));
    }
}