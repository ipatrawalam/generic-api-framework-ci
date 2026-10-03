import { test, expect } from "@playwright/test"
import { APIFactory } from "../utils/APIFactory"
import { logger } from "../utils/Logger"
import { UsersAPI } from "../apis/UsersAPI"
import APIContext from "../utils/APIContext"

test.describe("User API tests", () =>{

    let usersAPI: UsersAPI;

    //test.beforeAll hook
    //individual test cases
    //test.afterAll hook

    test.beforeAll("Running Before All", async() =>{
        const requestContext = await APIContext.getInstance()
        usersAPI = APIFactory.getUserAPI(requestContext)
        logger.info("User API test suite started!")
    })

    test("Should get user details with given userId", async() => {
        const userId = 2
        const response = await usersAPI.getUser(userId)
        expect(response.ok()).toBeTruthy()
        const responseBody = await response.json()

        //Attach the complete API response 
        test.info().attach("API Response payload",{
            body: JSON.stringify(responseBody,null,2),
            contentType: "application/json"
        })
        expect(responseBody.data.id).toBe(userId)
        expect(responseBody.data.email).toBe("janet.weaver@reqres.in")
        expect(responseBody.data.first_name).toBe("Janet")
        logger.info(`User details retrieved successfully for ID: ${userId}`)
    })

    test("Should create a new user successfully", async() => {
        const userData = {
            name: "Donald",
            job: "President"
        }
        const response = await usersAPI.createUser(userData)
        expect(response.status()).toBe(201)
        const responseBody = await response.json()
        expect(responseBody.name).toBe(userData.name)
        expect(responseBody.job).toBe(userData.job)
        expect(responseBody.id).not.toBeNull()
        logger.info(`New User created with ID: ${responseBody.id}`)
    })

    test.afterAll("Running After All", async() => {
        await APIContext.closeInstance()
        logger.info("User API test suite finished")
    })
})
