const express = require('express')

const { authenticateToken } = require('../middlewares/auth.middleware.js')
const profileController = require('../controllers/profile.controller.js')
const upload = require('../middlewares/upload.middleware.js')

const router = express.Router()

// Cấu hình fields cho multer - cho phép upload nhiều project images
const uploadFields = upload.fields([
    { name: 'avatar', maxCount: 1 },
    // Hỗ trợ tối đa 20 projects
    ...Array.from({ length: 20 }, (_, i) => ({ name: `project_${i}`, maxCount: 1 })),
])

// Public routes with validation
router.get('/all', profileController.getAllProfiles)
router.get('', authenticateToken, profileController.getProfileById)
router.get('/:username', profileController.getProfileByUsername)
router.patch('/:username', authenticateToken, uploadFields, profileController.updateProfile)

module.exports = router
