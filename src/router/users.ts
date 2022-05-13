import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { Authentication } from '../controllers/AuthMiddleware'


const router = Router()

router.get('/', Authentication, async (req, res) => {
    await new UserController().getById(req, res)
    return res.end()
})

router.post('/', async (req, res) => {
    await new UserController().create(req, res)
    return res.end()
})

router.delete('/', Authentication, async (req, res) => {
    await new UserController().delete(req, res)
    res.end()
})
export { router as userRoutes }