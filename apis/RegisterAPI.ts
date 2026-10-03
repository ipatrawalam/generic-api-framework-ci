import BaseAPI from "./BaseAPI";
import { APIResponse } from "@playwright/test";

export class RegisterAPI extends BaseAPI {

    async registerUser(userData: {email: string, password: string}): Promise<APIResponse>{
        return this.post('/api/register', userData)
    }

}