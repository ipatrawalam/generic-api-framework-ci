import { APIRequestContext, request } from "@playwright/test"
import config from "../playwright.config"

class APIContext {
    private static instance: APIRequestContext | null;  //static variable to hold the single instances, can be null
    private constructor() {}                            //Private constructor to prevent direct installation

    public static async getInstance(): Promise<APIRequestContext> {
        if(!APIContext.instance){
            APIContext.instance = await request.newContext({    //Create a new Playwright APIRequestContext
                baseURL: config.use?.baseURL,                   //Inherit baseURL from playwright.config.ts
                extraHTTPHeaders: config.use?.extraHTTPHeaders  //Inherit headers from playwright.config.ts
            })
        }
        return APIContext.instance
    }

    public static async closeInstance(){            //Usually called once at end of suite
        if(APIContext.instance){
            await APIContext.instance.dispose();    //Dispose of Playwright APIRequestContext
            APIContext.instance = null;             //Reset the instance
        }
    }
}

export default APIContext;