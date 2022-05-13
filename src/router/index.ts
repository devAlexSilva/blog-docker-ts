import { Router } from 'express'
import { userRoutes } from './users'
import { loginRouter } from './login'


const routes = Router();

routes.use('/users', userRoutes)
routes.use('/login', loginRouter)

export { routes }