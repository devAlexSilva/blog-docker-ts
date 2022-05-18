import { Router } from 'express'
import { Token } from '../controllers/TokenLoginController'


const router = Router()

router.post('/', async (req, res) => {
    await new Token(req, res).create()
    res.end()
})

export { router as loginRoutes }