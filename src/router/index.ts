import { Router } from 'express'
import { userRoutes } from './users'
import { loginRoutes } from './login'
import { profileRoutes } from './profiles'
import { postRoutes } from './posts'
import { feedRoutes } from './feed'

const routes = Router();

routes.use('/login', loginRoutes)
routes.use('/users', userRoutes)
routes.use('/users/profiles', profileRoutes)
routes.use('/users/posts', postRoutes)
routes.use('/feed', feedRoutes)

export { routes }