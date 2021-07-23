import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";

describe('RequiredField Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = new RequiredFieldValidation('field')
        const error = sut.validate({ fieldless: 'fieldless'})
        expect(error).toEqual(new MissingParamError('field'))
    });
});