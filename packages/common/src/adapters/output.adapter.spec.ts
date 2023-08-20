import { OutputAdapter } from './output.adapter';
import { describe, expect, it } from 'vitest';

class BaseClass {
  id?: string;
  name?: string;
  password?: string;
  createdAt?: string;
}

class OutputClass {
  id?: string = '';
  name?: string = '';
}

describe('OutputAdapter', () => {
  it('should be return a transformed object based in a class', async () => {
    const data: BaseClass = {
      id: '1',
      name: 'John Doe',
      password: '123456',
      createdAt: new Date().toISOString(),
    };
    const adater = new OutputAdapter<OutputClass>(new OutputClass(), data);
    const result = await adater.transform();
    expect(result).toBeInstanceOf(OutputClass);
    expect(result.id).toEqual(data.id);
    expect(result.name).toEqual(data.name);
    expect(result.password).toBeUndefined();
    expect(result.createdAt).toBeUndefined();
  });
});
