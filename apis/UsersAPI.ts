import BaseAPI from "./BaseAPI";
import { APIResponse } from "@playwright/test"

export class UsersAPI extends BaseAPI {

    async getUser (userId: number): Promise<APIResponse> {
        return this.get(`/api/users/${userId}`)
    }

    async createUser (userData: {name: string, job: string}): Promise<APIResponse> {
        return this.post(`/api/users/`, userData)
    }

    async updateUser (userId: number, userData: {name: string, job: string}): Promise<APIResponse> {
        return this.put(`/api/users/${userId}`, userData)
    }

    async deleteUser (userId: number): Promise<APIResponse> {
        return this.delete(`/api/users/${userId}`)
    }

    async getUsers(page: number): Promise<APIResponse> {
        return this.get(`/api/users?page=${page}`)
    }

}