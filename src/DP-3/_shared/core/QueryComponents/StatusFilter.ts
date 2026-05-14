import type { QueryComponent } from "./QueryComponent";

export class StatusFilter implements QueryComponent {
  constructor(private status: string) {}

  query<T>(data: Array<T>, key: keyof T): Array<T> {
      return data.filter(({[key]: status}) => status === this.status);
  }
}
