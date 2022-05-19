import { Router } from 'express'
import { Post } from '../controllers/PostController'
import { Authentication } from '../controllers/AuthMiddleware'


const router = Router()
const post = new Post()

router.get('/', Authentication, post.getAllPostsByUser)
router.post('/', Authentication, post.createPost)

export { router as postRoutes }