import { adaptRoute } from "@/main/adapter/express-route-adapter";
import { makeLoginController } from "@/main/factories/controllers/login/login/login-controller-factory";
import { makeSignUpController } from "@/main/factories/controllers/login/signup/signup-controller-factory";
import { Router } from "express";

export default (router: Router): void => {
    router.post('/login', adaptRoute(makeLoginController()))
    router.post('/signup', adaptRoute(makeSignUpController()))
}