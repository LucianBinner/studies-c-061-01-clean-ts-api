import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository";
import { mockLogErrorRepository } from "@/data/test";
import { mockAccountModel } from "@/domain/test";
import { ok, serverError } from "@/presentation/helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "@/presentation/protocols";
import { LogControllerDecorator } from "./log-controller-decorator";

const makeController = (): Controller => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            return new Promise(resolve => resolve(ok(mockAccountModel())))
        }
    }
    return new ControllerStub()
}

const mockRequest = (): HttpRequest => ({
    body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
    }
})

const makeFakeServerError = (): HttpResponse => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    return serverError(fakeError)
}

type SutTypes = {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
    const controllerStub = makeController()
    const logErrorRepositoryStub = mockLogErrorRepository()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return {
        sut,
        controllerStub,
        logErrorRepositoryStub
    }
}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const { sut, controllerStub } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        await sut.handle(mockRequest())
        expect(handleSpy).toHaveBeenCalledWith(mockRequest())
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(mockRequest())
        expect(httpResponse).toEqual(ok(mockAccountModel()))
    })

    test('Should call LogErrorRepository with correct error if controller return a server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        jest
            .spyOn(controllerStub, 'handle')
            .mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
        await sut.handle(mockRequest())
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})