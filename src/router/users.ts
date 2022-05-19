import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { Authentication } from '../controllers/AuthMiddleware'


const router = Router()
const user = new UserController()

router.post('/', user.create)
router.get('/', Authentication, user.getById)
router.delete('/', Authentication, user.delete)


export { router as userRoutes }