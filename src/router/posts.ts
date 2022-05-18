import { Router } from 'express'
import { Post } from '../controllers/PostController'


const router = Router()
const post = new Post()

router.get('/', post.getAllPostByUser)


export { router as postRoutes }