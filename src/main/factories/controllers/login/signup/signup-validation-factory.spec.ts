import { Validation } from "@/presentation/protocols/validation";
import { mockEmailValidator } from "@/validation/test";
import {
    CompareFieldsValidation,
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite
} from "@/validation/validators";
import { makeSignValidation } from "./signup-validation-factory";

jest.mock('@/validation/validators/validation-composite')

describe('SignUp Validation', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeSignValidation()
        const validations: Validation[] = []
        for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
            validations.push(new RequiredFieldValidation(field))
        }
        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', mockEmailValidator()))
        expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
    });
});