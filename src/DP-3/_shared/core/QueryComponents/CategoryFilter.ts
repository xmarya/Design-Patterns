import type { QueryComponent } from "./QueryComponent";

export class CategoryFilter implements QueryComponent {
  private categories: string;
  constructor(categories: Array<string> | string) {
    this.categories = typeof categories === "string" ? categories.toLowerCase() : categories.join().toLowerCase();
  }

  query<T>(data: Array<T>, key: keyof T): Array<T> {
    return data.filter(({[key]:cats}) => (cats as Array<string>).some( cat => this.categories.includes(cat.toLowerCase())));
  }
}
