import 'reflect-metadata';
import { BaseEntity } from './base.entity';
import { describe, expect, it } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { DateTime } from 'luxon';
dotenv.config();

describe('BaseEntity', () => {
  it('should be extend base entity in a new entity', async () => {
    const data = {
      id: uuidv4(),
      name: 'John Doe',
      createdAt: DateTime.now().toUTC(),
    };
    class NewEntity extends BaseEntity {
      name?: string;
      password?: string;
      constructor() {
        super();
        this.createdAt = data.createdAt;
        this.updatedAt = data.createdAt;
      }
    }

    const entity = new NewEntity();
    entity.id = data.id;
    entity.name = data.name;
    expect(entity).toBeInstanceOf(BaseEntity);
    expect(entity).toBeInstanceOf(NewEntity);
    expect(entity.id).toEqual(data.id);
    expect(entity.name).toEqual(data.name);
    expect(entity.createdAt).toEqual(data.createdAt);
  });
});
