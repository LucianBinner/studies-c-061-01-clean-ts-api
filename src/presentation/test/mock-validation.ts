import { Validation } from "@/presentation/protocols/validation"

export const mockValidation = (): Validation => {
  class validationStub implements Validation {
      validate(input: any): Error | void {
          return
      }
  }
  return new validationStub()
}