import { resolve } from "path/posix";
import { MissingParamError, ServerError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class LoginController implements Controller{
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        if(!httpRequest.body.email) {
            return new Promise(resolve => 
                resolve(badRequest(new MissingParamError('email')))
            )
        }
        if(!httpRequest.body.password) {
            return new Promise(resolve => 
                resolve(badRequest(new MissingParamError('password')))
            )
        }
        return {
            statusCode: 200,
            body: {
                message: 'Success'
            }
        }
    }
}