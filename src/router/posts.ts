import { Router } from 'express'
import { Post } from '../controllers/PostController'
import { Authentication } from '../controllers/AuthMiddleware'


const router = Router()
const post = new Post()

router.get('/', post.getAllPostsByUser)
router.post('/', Authentication, post.createPost)
router.get('/:postId', Authentication, post.getPostsById)
router.put('/:postId', Authentication, post.updatePosts)

export { router as postRoutes }