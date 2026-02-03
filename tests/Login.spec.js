const { test, expect } = require('@playwright/test');
const { Login } = require('../functionalities/Login');
const { PLogin } = require('../properties/PLogin');
const { ODashboard } = require('../page_objects/ODashboard');
const path = require('path');

const storagePath = path.join(__dirname, '../storageState.json');

let page, lg, OD, PL;

test.describe.serial('Verify Login Process', () => {

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    lg = new Login(page);
    OD = new ODashboard(page);
    PL = new PLogin(page);
  });//changed...

  test.afterEach(async () => {
    await page.screenshot({
      path: `tests/Screenshot/${Date.now()}_Login_SS.png`,
      fullPage: true
    });
    await page.close();
  });

  test('Perform Login and save storageState', async () => {
    await lg.NavigateToUAT();
    await lg.Login();
    await lg.SelectFacility();

    await page.context().storageState({ path: storagePath });
  });

});
//changed...