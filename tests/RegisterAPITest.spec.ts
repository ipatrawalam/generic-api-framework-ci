import { test, expect } from "@playwright/test"
import { APIFactory } from "../utils/APIFactory"
import { logger } from "../utils/Logger"
import { RegisterAPI } from "../apis/RegisterAPI"
import APIContext from "../utils/APIContext"
import { faker } from '@faker-js/faker'; // Import Faker for dynamic test data generation
import { mapAnnotationsToAllure } from "../utils/MapPlaywrightAnnotationsToAllure"

test.describe("Register API tests", () =>{

    let registerAPI: RegisterAPI;

    //test.beforeAll hook
    //individual test cases
    //test.afterAll hook

    test.beforeAll("Running Before All", async() =>{
        const requestContext = await APIContext.getInstance()
        registerAPI = APIFactory.getRegisterAPI(requestContext)
        logger.info("Register API test suite started!")
    })

    test("Should register a new user successfully", async() => {

        await test.step("Set test metadata", async() =>{
            test.info().annotations.push(
                { type: 'severity', description: 'critical' },
                { type: 'tag', description: '@smoke' },
                { type: 'tag', description: '@registration' },
                { type: 'tag', description: '@positive' },
                { type: 'feature', description: 'User Registration' },
                { type: 'story', description: 'Successful user registration with valid credentials' },
                { type: 'owner', description: 'QA Team' }
            );
        })
        mapAnnotationsToAllure(test)

        const userData = {email: 'eve.holt@reqres.in', password: 'pistol'}

        test.step("Send registration request", async() =>{
            const response = await registerAPI.registerUser(userData)

            test.step("Verify response body contains required fields", async() =>{
                expect(response.status()).toBe(200)
                const responseBody = await response.json();
                expect(responseBody.id).not.toBeNull()
                expect(responseBody.token).not.toBeNull()
                logger.info(`New user registered with ID: ${responseBody.id} and token: ${responseBody.token}`)
            })
        })
    })

    test('Should register user with dynamic data', async() =>{
        const userData = {
            email: faker.internet.email({provider: 'reqres.in'}),
            password: faker.internet.password({length: 8, memorable: true})
        }
        logger.info(`Registering user with email: ${userData.email}`)
        const response = await registerAPI.registerUser(userData)
        expect(response.status()).toBe(400)
        const responseBody = await response.json()
        expect(responseBody.id).not.toBeNull()
        expect(responseBody.token).not.toBeNull()
    })

    test.afterAll("Running After All", async() => {
        await APIContext.closeInstance()
        logger.info("Register API test suite finished")
    })
})
