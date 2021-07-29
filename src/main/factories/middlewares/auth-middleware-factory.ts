import { AuthMiddleware } from "../../../presentation/middlewares/auth-middleware";
import { MiddleWare } from "../../../presentation/protocols";
import { makeDbLoadAccountByToken } from "../usecases/account/load-account-by-token/db-load-account-by-token-factory";

export const makeAuthMiddleware = (role?: string): MiddleWare => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}