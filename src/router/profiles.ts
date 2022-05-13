import { Router } from 'express'
import { Authentication } from '../controllers/AuthMiddleware'
import { Profile } from '../controllers/ProfileControllers'

const router = Router()

router.post('/', Authentication, async (req, res) => {
    await new Profile().create(req, res)
    res.end()
})

export { router as profiles }