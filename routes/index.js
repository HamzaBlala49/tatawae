import authRouter from "./authRoute";
const path = "/auth"

const loginRoute = (app) => {
    app.use(path, authRouter)
}

const logoutRoute = (app) => {
    app.use(path, authRouter)
}

const registerRoute = (app) => {
    app.use(path, authRouter)
}

export default {
    loginRoute,
    registerRoute,
    logoutRoute,
}