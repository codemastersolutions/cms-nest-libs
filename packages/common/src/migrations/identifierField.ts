import { TableColumnOptions } from 'typeorm';
const identifierField: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'uniqueidentifier',
    isGenerated: true,
    generationStrategy: 'uuid',
    isPrimary: true,
    isUnique: true,
    isNullable: false,
    comment: 'ID of the record',
  },
];
export default identifierField;
