const express = require('express')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const dotenv = require('dotenv')
const errorHandler = require('./middlewares/errorHandler')
const connectDB = require('./configs/db.config')

const https = require('https')
const fs = require('fs')
const path = require('path')

dotenv.config()
const app = express()

connectDB()

// Đường dẫn đến file chứng chỉ và khóa riêng

app.use(cors())
app.use(express.json())

// dùng để log ra các request đến server
app.use(morgan('dev'))
// dùng để nén dữ liệu trước khi gửi về client
app.use(compression())

app.use('/api', require('./routers/index'))
app.use('', require('./routers/error.router'))
// Middleware xử lý lỗi
app.use(errorHandler)
const PORT = process.env.PORT || 5001

if (process.env.NODE_ENV === 'production') {
    // Tạo server HTTPS
    const options = {}
    options.key = fs.readFileSync(`${process.env.DIRNAME}key.pem`) // Đường dẫn đến file khóa riêng
    options.cert = fs.readFileSync(`${process.env.DIRNAME}cert.pem`) // Đường dẫn đến file chứng chỉ
    https.createServer(options, app).listen(PORT, () => {
        console.log(`Server is running on https://localhost:${PORT}`)
    })
} else {
    app.listen(PORT, () => console.log(`Server running in http://localhost:${PORT}`))
}
