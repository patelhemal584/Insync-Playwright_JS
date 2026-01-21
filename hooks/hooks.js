// const { test: base, expect } = require('@playwright/test');
// const { Login } = require('../functionalities/Login');
// const { PLogin } = require('../properties/PLogin');
// const fs = require('fs');

// const test = base.extend({
//   page: async ({ browser }, use) => {
//     let context;

//     // Agar auth.json exist karta hai → reuse karo
//     if (fs.existsSync('auth.json')) {
//       context = await browser.newContext({ storageState: 'auth.json' });
//     } else {
//       // Nahi hai → login karke save karo
//       context = await browser.newContext();
//       const page = await context.newPage();
//       const login = new Login(page);

//       await login.NavigateToUAT();
//       await login.Login();
//       await login.SelectFacility();

//       await context.storageState({ path: 'auth.json' });
//       await page.close();
//     }

//     const page = await context.newPage();
//     await use(page);
//     await context.close();
//   },
// });

// // AfterEach screenshot
// test.afterEach(async ({ page }) => {
//   await page.screenshot({ path: `tests/Screenshot/${Date.now()}_SS.png` });
// });

// module.exports = { test, expect };
