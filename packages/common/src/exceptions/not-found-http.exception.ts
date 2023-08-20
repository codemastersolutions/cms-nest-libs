import { HttpException, HttpStatus } from '@nestjs/common';
export class NotFoundHttpException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.NOT_FOUND) {
    super(message, status);
  }
}
