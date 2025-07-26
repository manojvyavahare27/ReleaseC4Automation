// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  //globalSetup: require.resolve("./config/global-setup"),
  testDir: './tests',
  

  /* Maximum time one test can run for. */
  timeout: 600 * 10000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 8000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source x  code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: 'html',
  // reporter: 'html',
  reporter: [ ['html']
              //['allure-playwright',{outputFolder: 'my-allure-result'}]

            ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        //...devices['Desktop Chrome'],
        screenshot:"on",
        video:"on",
        trace:"on",
        headless:false,
     // storageState:'Shree.json',
        reporter: [["dot"],
                  ["json", { outputFile: "test-result.json" }],
                  ['allure-playwright', {outputFile: 'my-allure-results'}]
                ],
       // ['experimental-allure-playwright']],
       viewport: null,
        launchOptions:{
         //slowMo:1000,
         args: ['--start-maximized']
        }
      }
    },

    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] ,
    //   screenshot:"on",
    //     video:"on",
    //     trace:"on",
    //     headless:false,
    //     storageState:'ExcelToJSON.json',
    //     reporter: [["dot"], ["json", { outputFile: "test-result.json" }],
        
    //     ['experimental-allure-playwright']],
    //     launchOptions:{
    //      // slowMo:500
    //     }
    //   }
    // },

    // {
    //   name: 'Edge',
    //    use: { channel: 'msedge' ,
    //     screenshot:"on",
    //     video:"on",
    //     trace:"on",
    //     headless:false,
    //    // storageState:'Shree.json',
    //     reporter: [["dot"], ["json", { outputFile: "test-result.json" }],
    //     ['experimental-allure-playwright']],
    //     launchOptions:{
    //      // slowMo:500
    //     }
    //   }
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

