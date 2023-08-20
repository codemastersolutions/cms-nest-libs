import { EntityNotFoundError } from 'typeorm';
import {
  AlreadyExistsException,
  AlreadyExistsHttpException,
  UnprocessableHttpException,
  UnprocessableException,
  NotFoundHttpException,
} from '../exceptions';

export interface IMessage {
  [key: string]: string;
}

export class GetHttpException {
  constructor(error: any, messages: IMessage[] = []) {
    const iMessage = messages.find(m => m[error.constructor.name]);
    let message = error.message;
    if (iMessage) {
      message = iMessage[error.constructor.name];
    }
    if (error instanceof AlreadyExistsException) {
      return new AlreadyExistsHttpException(message);
    }
    if (error instanceof UnprocessableException) {
      return new UnprocessableHttpException(message);
    }
    if (error instanceof EntityNotFoundError) {
      return new NotFoundHttpException(message);
    }
  }
}
