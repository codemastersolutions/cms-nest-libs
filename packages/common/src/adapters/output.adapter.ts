export class OutputAdapter<T> {
  properties: string[];

  constructor(private readonly output: T, private readonly data: Partial<T>) {
    this.properties = Object.keys(this.output);
  }

  async transform(): Promise<T> {
    const data = this.data;
    const output = this.output;
    this.properties.forEach(property => {
      if (data[property]) {
        output[property] = data[property];
      }
    });
    return output as T;
  }
}
