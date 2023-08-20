import { TableColumnOptions, TableForeignKey } from 'typeorm';
import { ForeignKeyActions } from './interfaces';

const softDeleteField: TableColumnOptions[] = [
  {
    name: 'deleted_at',
    type: 'datetimeoffset',
    isNullable: true,
    comment: 'Date and time of the record deletion',
  },
  {
    name: 'deleted_by',
    type: 'uniqueidentifier',
    isNullable: true,
    comment: 'ID of the user who deleted the record',
  },
];
const deletedByFK = (
  referencedTableName: string,
  referencedColumnNames: string[] = ['id'],
  actions: ForeignKeyActions,
) => {
  return new TableForeignKey({
    columnNames: ['deleted_by'],
    referencedColumnNames,
    referencedTableName,
    ...actions,
  });
};
export { softDeleteField, deletedByFK };
