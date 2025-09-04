import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any): any {
    try {
      console.log("i was here validation");
      return this.schema.parse(value);
    } catch (e) {
      console.log("i was here - catch", e);
      throw new BadRequestException("Request validation failed");
    }
  }
}
