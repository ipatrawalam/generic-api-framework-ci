import { APIRequestContext, APIResponse } from "@playwright/test"
import { logger } from "../utils/Logger"

export class BaseAPI{
    protected request: APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request
    }

    async get(endpoint: string): Promise <APIResponse> {
        logger.info(`Sending GET request to : ${endpoint}`);
        const response = await this.request.get(endpoint);
        this.logResponseStatus(response, 'GET', endpoint);
        return response;
    }

    async post(endpoint: string, data: any): Promise <APIResponse> {
        logger.info(`Sending POST request to : ${endpoint} with data: ${JSON.stringify(data)}`);
        const response = await this.request.post(endpoint, {data});
        this.logResponseStatus(response, 'POST', endpoint);
        return response;
    }

    async put(endpoint: string, data?: any): Promise <APIResponse> {
        logger.info(`Sending PUT request to : ${endpoint} with data: ${JSON.stringify(data)}`);
        //Playwright put  method expects 'data' directly, not wrapped in {data}
        const response = await this.request.put(endpoint, {data});
        this.logResponseStatus(response, 'PUT', endpoint);
        return response;
    }

    async delete(endpoint: string): Promise <APIResponse> {
        logger.info(`Sending DELETE request to : ${endpoint}`);
        const response = await this.request.delete(endpoint);
        this.logResponseStatus(response, 'DELETE', endpoint);
        return response;
    }

    protected logResponseStatus(response: APIResponse, method: string, endpoint: string): void {
        if(response.ok()){
            logger.info(`Response (${method} ${endpoint}) : ${response.status()} ${response.statusText()}`);
        } else {
            logger.error(`Response ERROR (${method} ${endpoint}): $(response.status()} ${response.statusText()} - URL: ${response.url()})`);
            //Optionally log response body for errors
            response.text().then(text => logger.error(`Error Body: ${text}`)).catch(() => {})
        }
    }
}

export default BaseAPI;