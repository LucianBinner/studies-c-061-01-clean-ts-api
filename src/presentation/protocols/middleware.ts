import { HttpRequest, HttpResponse } from "./http";

export interface MiddleWare {
    handle (httpRequest: HttpRequest): Promise<HttpResponse>
}