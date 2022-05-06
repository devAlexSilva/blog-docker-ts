import express from 'express'
import { UserController } from '../controllers/UserController'

const router = express.Router()

router.get('/', async (req, res) => {
    await new UserController().get(res)
    return res.end()
})

router.post('/create', async (req, res) => {
    await new UserController().create(req, res)
    return res.end()
})

export { router }