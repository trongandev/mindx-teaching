const multer = require('multer')

// Cấu hình multer để lưu file trong memory
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Giới hạn 10MB
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
