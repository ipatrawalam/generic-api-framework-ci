import { APIRequestContext } from "@playwright/test";
import { UsersAPI } from "../apis/UsersAPI";
import { RegisterAPI } from "../apis/RegisterAPI";


export class APIFactory{

    public static getUserAPI(requestContext: APIRequestContext): UsersAPI {
        return new UsersAPI(requestContext)
    }

    public static getRegisterAPI(requestContext: APIRequestContext): RegisterAPI {
        return new RegisterAPI(requestContext)
    }

    public static getAPI(apiName: string, requestContext: APIRequestContext){
        
        switch(apiName){
            case this.APINames.USERS_API:
                return new UsersAPI(requestContext);
            case this.APINames.REGISTER_API:
                return new RegisterAPI(requestContext);
            default:
                throw new Error(`API ${apiName} not found in API Factory!`)
        }
    }

    static APINames = Object.freeze({
        USERS_API: 'UsersAPI',
        REGISTER_API: 'RegisterAPI'
    });
}
