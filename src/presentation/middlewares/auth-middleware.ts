import { AccessDeniedError } from "../errors";
import { forbidden } from "../helpers/http/http-helper";
import { HttpRequest, HttpResponse, MiddleWare } from "../protocols";

export class AuthMiddleware implements MiddleWare {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}