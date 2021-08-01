import { Validation } from "@/presentation/protocols"

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
      validate(input: any): void | Error {
          return
      }
  }
  return new ValidationStub()
}