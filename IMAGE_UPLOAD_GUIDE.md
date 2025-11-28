# Tính năng Upload Ảnh

## Cấu hình Cloudinary

### 1. Tạo tài khoản Cloudinary

1. Truy cập https://cloudinary.com/
2. Đăng ký tài khoản miễn phí
3. Sau khi đăng ký, vào Dashboard để lấy thông tin:
    - Cloud Name
    - API Key
    - API Secret

### 2. Cấu hình Backend

Thêm các biến môi trường vào file `.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Tính năng

### Upload Avatar

-   **Chọn file**: Click nút "Chọn file" để chọn ảnh từ máy tính
-   **Dán URL**: Paste URL ảnh trực tiếp vào ô input
-   **Paste từ Clipboard**: Click vào ô input và nhấn Ctrl+V để dán ảnh đã copy

### Upload Ảnh Dự Án

Tương tự như avatar, mỗi dự án có thể upload ảnh riêng.

## Luồng xử lý

### Frontend

1. Người dùng chọn/paste ảnh
2. Ảnh được preview ngay lập tức
3. Khi submit form:
    - Nếu là file: File được gửi lên server qua FormData
    - Nếu là URL: URL được gửi trực tiếp

### Backend

1. Nhận request với file/URL
2. Kiểm tra ảnh cũ trong database
3. Nếu có ảnh cũ từ Cloudinary → Xóa ảnh cũ
4. Upload ảnh mới lên Cloudinary (nếu có file)
5. Lưu URL mới vào database
6. Trả về profile đã cập nhật

## Giới hạn

-   Kích thước file tối đa: 5MB
-   Định dạng hỗ trợ: image/\*
-   Số lượng project images: Tối đa 10

## API Endpoints

### Update Profile

```
PATCH /api/profile/:username
Content-Type: multipart/form-data

Body:
- avatar: File (optional)
- project_0: File (optional)
- project_1: File (optional)
- ... các fields khác
```

## Xử lý lỗi

### Frontend

-   File quá lớn: Toast error
-   Format không đúng: Không cho upload
-   Network error: Toast error với message từ server

### Backend

-   File không hợp lệ: Error 400
-   Cloudinary lỗi: Log error nhưng không làm gián đoạn flow
-   Xóa ảnh cũ lỗi: Log warning và tiếp tục upload mới
