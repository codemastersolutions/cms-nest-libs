import { HttpException, HttpStatus } from '@nestjs/common';
export class AlreadyExistsHttpException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.NOT_MODIFIED) {
    super(message, status);
  }
}
