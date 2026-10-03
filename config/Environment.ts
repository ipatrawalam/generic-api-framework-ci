export interface Environment{                               //Declaring interface for storing data
    baseURL: string;
    apiKey?: string; //Optional API key specific to environment
    timeout: number;
    retries: number;
}

export const environments: Record<string, Environment> = {  //Declared an Environment Object with stored data based on environment
    dev: {
        baseURL: "https://reqres.in",
        timeout: 30000,
        retries: 3
    },
    staging: {
        baseURL: "https://staging.reqres.in",
        timeout: 45000,
        retries: 2
    },
    prod: {
        baseURL: "https://reqres.in",
        timeout: 60000,
        retries: 1
    }
}

export const getEnvironments = (): Environment => {         //Method to fetch Environment from the object

    const env = process.env.TEST_ENV || 'dev';              //Default to 'dev'
    return environments[env] || environments.dev

}