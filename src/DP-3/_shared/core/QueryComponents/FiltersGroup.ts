import type { QueryComponent } from "./QueryComponent";

export class FiltersGroup implements QueryComponent {
  private readonly filters: Array<QueryComponent> = [];

  addFilter(filter: QueryComponent) {
    this.filters.push(filter);

    return this.filters.length;
  }
  
  removeFilter(filter: QueryComponent) {
    const index = this.filters.indexOf(filter);
    if (index !== -1) this.filters.splice(index, 1);
    return this.filters.length;
  }

  query<T>(data:Array<T>): Array<T> {
    let filteredData = data;
    for (const filter of this.filters) {
      filteredData = filter.query(filteredData);
    }

    return filteredData as Array<T>;
  }
}
