import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import { IsUUID } from 'class-validator';
dotenv.config();

const getDatetimeType = () => {
  return process.env.TYPEORM_CONNECTION == 'postgres'
    ? 'timestamp'
    : 'datetime';
};

@Entity()
export class BaseEntity {
  @ApiProperty({
    example: uuidv4(),
    description: 'ID of the record',
  })
  @IsUUID(4)
  @PrimaryColumn({
    type: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Date of record creation',
    example: DateTime.local().toISO(),
  })
  @CreateDateColumn({
    name: 'created_at',
    type: getDatetimeType(),
    update: false,
    insert: true,
  })
  createdAt: DateTime;

  @ApiProperty({
    description: 'ID of the user who created the record',
    example: uuidv4(),
  })
  @Column({
    name: 'created_by',
    update: false,
    insert: true,
    type: 'uuid',
  })
  createdBy: string;

  @ApiProperty({
    description: 'Date of last record update',
    example: DateTime.local().toISO(),
  })
  @UpdateDateColumn({
    name: 'updated_at',
    type: getDatetimeType(),
    update: true,
    insert: true,
  })
  updatedAt: DateTime;

  @ApiProperty({
    description: 'ID of the user who updated the record',
    example: uuidv4(),
  })
  @IsUUID(4)
  @Column({
    name: 'updated_by',
    update: true,
    insert: true,
    type: 'uuid',
  })
  updatedBy: string;

  @ApiProperty({
    description: 'Date of record deletion',
    example: DateTime.local().toISO(),
  })
  @DeleteDateColumn({
    name: 'deleted_at',
    type: getDatetimeType(),
    update: true,
    insert: false,
  })
  deletedAt: Date;

  @ApiProperty({
    description: 'ID of the user who deleted the record',
    example: uuidv4(),
  })
  @IsUUID(4)
  @Column({
    name: 'deleted_by',
    update: true,
    insert: true,
    type: 'uuid',
  })
  deletedBy: string;

  @BeforeInsert()
  public setId(): void {
    this.id = this.id ? this.id : uuidv4();
  }

  @BeforeInsert()
  public setCreateDate(): void {
    this.createdAt = DateTime.now().toUTC();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  public setUpdateDate(): void {
    this.updatedAt = DateTime.now().toUTC();
  }
}
