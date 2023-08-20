import identifierField from './identifierField';
import { softDeleteField, deletedByFK } from './softDeleteField';
import {
  timestampsAndOperatorsFields,
  createdByFK,
  updatedByFK,
} from './timestampsAndOperatorsFields';
export { ForeignKeyActions } from './interfaces';

export default {
  identifierField,
  softDeleteField,
  timestampsAndOperatorsFields,
  deletedByFK,
  createdByFK,
  updatedByFK,
};
