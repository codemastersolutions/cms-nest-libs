import { TableColumnOptions, TableForeignKey } from 'typeorm';
import { ForeignKeyActions } from './interfaces';
const timestampsAndOperatorsFields: TableColumnOptions[] = [
  {
    name: 'created_at',
    type: 'datetimeoffset',
    isNullable: false,
    comment: 'Date and time of the record creation',
  },
  {
    name: 'created_by',
    type: 'uniqueidentifier',
    isNullable: true,
    comment: 'ID of the user who created the record',
  },
  {
    name: 'updated_at',
    type: 'datetimeoffset',
    isNullable: false,
    comment: 'Date and time of the last record update',
  },
  {
    name: 'updated_by',
    type: 'uniqueidentifier',
    isNullable: true,
    comment: 'ID of the user who updated the record',
  },
];
const createdByFK = (
  referencedTableName: string,
  referencedColumnNames: string[] = ['id'],
  actions: ForeignKeyActions,
) => {
  return new TableForeignKey({
    columnNames: ['created_by'],
    referencedColumnNames,
    referencedTableName,
    ...actions,
  });
};
const updatedByFK = (
  referencedTableName: string,
  referencedColumnNames: string[] = ['id'],
  actions: ForeignKeyActions,
) => {
  return new TableForeignKey({
    columnNames: ['updated_by'],
    referencedColumnNames,
    referencedTableName,
    ...actions,
  });
};
export { timestampsAndOperatorsFields, createdByFK, updatedByFK };
