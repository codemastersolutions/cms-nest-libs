import { HttpException, HttpStatus } from '@nestjs/common';
export class UnprocessableHttpException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(message, status);
  }
}
