import 'module-alias/register'
import env from "@/main/config/env";
import { MongoHelper } from "@/infra/db/mongodb/helpers/mongo-helper";

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const name = 'teste'
        const app = (await import("./config/app")).default
        app.listen(env.port, () => console.log(`Server is running at http://localhost:${env.port}`))
    })
    .catch(console.error)
