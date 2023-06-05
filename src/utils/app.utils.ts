import { HttpStatus, ValidationPipe } from "@nestjs/common";

const PASSWORD_RULE = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const PASSWORD_RULE_MESSAGE = 'The password should have 1 uppercase,a lowercase along with a number and a special character'

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
})

export const SETTINGS = {
  VALIDATION_PIPE
}


export const MESSAGE = { PASSWORD_RULE_MESSAGE }
export const REGEX = { PASSWORD_RULE }