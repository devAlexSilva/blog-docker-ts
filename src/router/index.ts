import { Router } from 'express'
import { router } from './users'

const routes = Router();

routes.use('/user', router)


export { routes }