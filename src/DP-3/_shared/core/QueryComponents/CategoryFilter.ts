import type { QueryComponent } from "./QueryComponent";

export class CategoryFilter<T> implements QueryComponent {
  private categories: string;
  constructor(private readonly key: keyof T, categories: Array<string> | string) {
    this.categories = typeof categories === "string" ? categories.toLowerCase() : categories.join().toLowerCase();
    this.key = this.key;
  }

  query<T>(data: Array<T>): Array<T> {
    return data.filter(({[this.key]:cats}) => (cats as Array<string>).some( cat => this.categories.includes(cat.toLowerCase())));
  }
}
