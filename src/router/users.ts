import express from 'express'
import { UserController } from '../controllers/UserController'

const router = express.Router()

router.get('/', async (req, res) => {
    const users = await new UserController().get()
    res.send(users);
})

export { router }