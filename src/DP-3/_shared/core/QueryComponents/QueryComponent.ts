export interface QueryComponent {
  query<T>(data:Array<T>, key:keyof T): Array<T>;
}
