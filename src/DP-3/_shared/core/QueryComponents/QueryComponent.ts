export interface QueryComponent {
  query<T>(data:Array<T>): Array<T>;
}
