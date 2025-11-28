const multer = require('multer')

// Cấu hình multer để lưu file trong memory
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn 5MB
    },
    fileFilter: (req, file, cb) => {
        // Chỉ cho phép upload ảnh
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Chỉ được upload file ảnh!'), false)
        }
    },
})

module.exports = upload
