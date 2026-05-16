import type { QueryComponent } from "./QueryComponent";

export class StatusFilter<T> implements QueryComponent {
  constructor(private readonly key: keyof T, private status: string) {}

  query<T>(data: Array<T>): Array<T> {
      return data.filter(({[this.key]: status}) => status === this.status);
  }
}
