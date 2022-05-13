import { Router } from 'express'
import { userRoutes } from './users'
import { loginRouter } from './login'
import { profiles } from './profiles'

const routes = Router();

routes.use('/login', loginRouter)
routes.use('/users', userRoutes)
routes.use('/users/profiles', profiles)

export { routes }