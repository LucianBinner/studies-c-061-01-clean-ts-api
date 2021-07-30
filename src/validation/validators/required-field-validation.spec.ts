import { RequiredFieldValidation } from "./required-field-validation";
import { MissingParamError } from "@/presentation/errors";

const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation('field')
}
describe('RequiredField Validation', () => {
    test('Should return a MissingParamError if validation fails', () => {
        const sut = makeSut()
        const error = sut.validate({ fieldless: 'fieldless'})
        expect(error).toEqual(new MissingParamError('field'))
    })
    
    test('Should not return if validation succeeds', () => {
        const sut = makeSut()
        const error = sut.validate({ field: 'field'})
        expect(error).toBeFalsy()
    })
})