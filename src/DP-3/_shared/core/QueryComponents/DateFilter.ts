import type { QueryComponent } from "./QueryComponent";

export class DateFilter<T> implements QueryComponent {
  private dateStartsTime: number;
  private dateEndsTime: number;

  constructor(private readonly key: keyof T, { dateStarts, dateEnds }: { dateStarts: string; dateEnds: string }) {
    this.dateStartsTime = new Date(dateStarts).getTime();
    this.dateEndsTime = new Date(dateEnds).getTime();
  }

  private isWithin(date: string | number) {
    return new Date(date).getTime() >= this.dateStartsTime && new Date(date).getTime() <= this.dateEndsTime;
  }

  query<T>(data: Array<T>) {
    return data.filter(({ [this.key]: date }) => (typeof date === "string" || typeof date === "number") && this.isWithin(date));
  }
}
