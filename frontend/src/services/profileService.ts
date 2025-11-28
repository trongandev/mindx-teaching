import axiosInstance from '@/services/axiosInstance'
import { type APIResponse } from '../types/etc'
import { type User } from '../types/user'

class ProfileService {
    async getAllProfile() {
        const response = await axiosInstance.get<APIResponse<User[]>>('/profile/all')
        return response.data.data
    }

    async getProfile() {
        const response = await axiosInstance.get<APIResponse<User>>('/profile')
        return response.data.data
    }

    async getProfileByUsername(username: string) {
        const response = await axiosInstance.get<APIResponse<User>>(`/profile/${username}`)
        return response.data.data
    }

    async updateProfile(userId: string, data: Partial<User>, files?: { avatar?: File; projects?: { [key: number]: File } }) {
        const formData = new FormData()

        // Thêm avatar file nếu có
        if (files?.avatar) {
            formData.append('avatar', files.avatar)
        }

        // Thêm project files nếu có
        if (files?.projects) {
            Object.entries(files.projects).forEach(([index, file]) => {
                formData.append(`project_${index}`, file)
            })
        }

        // Append các fields khác dưới dạng JSON string hoặc individual fields
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value))
                } else {
                    formData.append(key, String(value))
                }
            }
        })

        const response = await axiosInstance.patch<APIResponse<User>>(`/profile/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data
    }
}

export default new ProfileService()
