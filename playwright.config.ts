import { PlaywrightTestConfig } from '@playwright/test';
import { getEnvironments } from './config/Environment';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: getEnvironments().timeout,
    use: {
      baseURL: getEnvironments().baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      trace: "on-first-retry"
    },
    projects: [
    {
      name: 'api-tests',
      testMatch: "**/*.spec.ts",
      retries: getEnvironments().retries,
    }],
    reporter: [
      ['html'],
      ['allure-playwright',{outputFolder: 'allure-results'}]
    ]

};
export default config;
