import { Router } from 'express'
import { Feed } from '../controllers/FeedController'


const router = Router()
const feed = new Feed()

router.get('/', feed.getPostsByIdOrTitle)


export { router as feedRoutes }