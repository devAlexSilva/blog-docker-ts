import { Router } from 'express'
import { Authentication } from '../controllers/AuthMiddleware'
import { Profile } from '../controllers/ProfileControllers'


const router = Router()
const profile = new Profile()

router.post('/', Authentication, profile.createProfile)
router.get('/', Authentication, profile.getOneProfile)
router.get('/all', profile.getAllProfiles)
router.put('/', Authentication, profile.updateProfile)

export { router as profileRoutes }