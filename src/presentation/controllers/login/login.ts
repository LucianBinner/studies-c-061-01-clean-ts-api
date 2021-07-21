import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, ok, serverError, unauthorizedError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from "./login-protocols";

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication
    constructor(emailValidator: EmailValidator, authentication: Authentication) {
        this.emailValidator = emailValidator
        this.authentication = authentication
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { email, password } = httpRequest.body
            const requiredField = ['email', 'password']
            for (const field of requiredField) {
                if (!httpRequest.body[field])
                    return badRequest(new MissingParamError(field))
            }
            const isValid = this.emailValidator.isValid(email)
            if (!isValid)
                return badRequest(new InvalidParamError('email'))
            const accessToken = await this.authentication.auth(email, password)
            if (!accessToken) {
                return unauthorizedError()
            }
            return ok({ accessToken })
        } catch (error) {
            return serverError(error)
        }
    }
}