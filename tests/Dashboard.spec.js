const { test, expect } = require('@playwright/test');
const { Login } = require('../functionalities/Login');
const { ODashboard } = require('../page_objects/ODashboard');
const { Dashboard } = require('../functionalities/Dashboard');

const path = require('path');
const storagePath = path.join(__dirname, '../storageState.json');

let OD, Da, page;


test.describe.serial('Verify Dashboard Functionality', () => {
  test.beforeAll(async ({ browser }) => {
    console.log('Logging in before Dashboard tests...');
    page = await browser.newPage();
    const lg = new Login(page);
    await lg.NavigateToUAT();
    await lg.Login();
    await lg.SelectFacility();

    await page.locator('//div[@class="fl lblPractice pract ellipsis bold"]').waitFor({ timeout: 10000 });
    await page.context().storageState({ path: storagePath });

    OD = new ODashboard(page);
    Da = new Dashboard(page);

    
    console.log('Login session saved and page objects initialized.');
  });

  test.afterAll(async () => {
    await page.close();
  });
  test.beforeEach(async()=>{
    test.setTimeout(1200000);
  })
  test.afterEach(async ()=>{
   await page.screenshot({
         path: `tests/Screenshot/${Date.now()}_Dashboard_SS.png`,
         fullPage: true
       });
  })

  test('Verify LoggedIn Practice', async () => {
    await expect(OD.loggedInPractise).toHaveAttribute('title', 'Elite private care 2', { timeout: 10000 });
  });

  test('Verify LoggedIn Facility', async () => {
    await expect(OD.loggedInFacility).toHaveAttribute('title', 'Burton Hills', { timeout: 10000 });
  });

  test.skip('Verify LoggedIn Facility_1', async () => {
    await expect(OD.loggedInFacility).toHaveAttribute('title', 'Burton Hills', { timeout: 10000 });
  });




    test.describe('Verify Dashboard Shortcut : Co-Sign',()=>{

      test('Verify Co-Sign visibility on Dashboard based on Configuration ON/OFF', async () => {
        
        await test.step('Turn ON from Config and verify visible', async () => {
        await Da.EnableFrom_DashboardConfig("Co-Sign List (Last 30 days)"); // default 'Co-Sign'
        await expect(OD.dashboardShortcut_CoSign).toBeVisible({ timeout: 10000 });
        });

        await test.step('Turn OFF from Config and verify hidden', async () => {
        await Da.DisableFrom_DashboardConfig("Co-Sign List (Last 30 days)");
        await expect(OD.dashboardShortcut_CoSign).not.toBeVisible({ timeout: 10000 });
        });
    });
  })
  //Test cases are skipped to reduce execution time...
  // test.describe('Verify Dashboard Shortcut : En.List',()=>{
    
  //   test('Verify En.List visibility on Dashboard based on Configuration ON/OFF', async () => {
        
  //     await test.step('Turn ON from Config and verify visible', async () => {
  //       await Da.EnableFrom_DashboardConfig("En.List (Last 30 days)"); // default 'Co-Sign'
  //       await expect(OD.dashboardShortcut_EnList).toBeVisible({ timeout: 10000 });
  //       });

  //     await test.step('Turn OFF from Config and verify hidden', async () => {
  //       await Da.DisableFrom_DashboardConfig("En.List (Last 30 days)");
  //       await expect(OD.dashboardShortcut_EnList).not.toBeVisible({ timeout: 10000 });
  //       });
  //   });
  // })
  // test.describe('Verify Dashboard Shortcut : eRx',()=>{
    
  //   test('Verify eRx visibility on Dashboard based on Configuration ON/OFF', async () => {
    
  //     await test.step('Turn ON from Config and verify visible', async () => {
  //       await Da.EnableFrom_DashboardConfig("eRx Status"); // default 'Co-Sign'
  //       await expect(OD.dashboardShortcut_eRx).toBeVisible({ timeout: 10000 });
  //       });

  //     await test.step('Turn OFF from Config and verify hidden', async () => {
  //       await Da.DisableFrom_DashboardConfig("eRx Status");
  //       await expect(OD.dashboardShortcut_eRx).not.toBeVisible({ timeout: 10000 });
  //       });
  //   });
  //   })
//   test.describe('Verify Dashboard Shortcut : IMR',()=>{
    
//     test('Verify IMR visibility on Dashboard based on Configuration ON/OFF', async () => {
//       await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.EnableFrom_DashboardConfig("Immunization Registry (Last 30 days) IMR"); // default 'Co-Sign'
//         await expect(OD.dashboardShortcut_IMR).toBeVisible({ timeout: 10000 });
//         });

//       await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.DisableFrom_DashboardConfig("Immunization Registry (Last 30 days) IMR");
//         await expect(OD.dashboardShortcut_IMR).not.toBeVisible({ timeout: 10000 });
//         });
//     });
//   }) 
//   test.describe('Verify Dashboard Shortcut : eResult',()=>{
    
//     test('Verify eResult visibility on Dashboard based on Configuration ON/OFF',async () => {
//       await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.EnableFrom_DashboardConfig("eResult"); // default 'Co-Sign'
//         await expect(OD.dashboardShortcut_eResult).toBeVisible({ timeout: 10000 });
//         });

//       await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.DisableFrom_DashboardConfig("eResult");
//         await expect(OD.dashboardShortcut_eResult).not.toBeVisible({ timeout: 10000 });
//         });
//     });
//   })
//   test.describe('Verify Dashboard Shortcut : eOrder',()=>{
    
//     test('Verify eOrder visibility on Dashboard based on Configuration ON/OFF', async () => {
//       await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.EnableFrom_DashboardConfig("eOrder"); // default 'Co-Sign'
//         await expect(OD.dashboardShortcut_eOrder).toBeVisible({ timeout: 10000 });
//         });

//       await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.DisableFrom_DashboardConfig("eOrder");
//         await expect(OD.dashboardShortcut_eOrder).not.toBeVisible({ timeout: 10000 });
//         });
//     });
//   }) 
//   test.describe('Verify Dashboard Shortcut : Alert',()=>{
    
//     test('Verify Alert visibility on Dashboard based on Configuration ON/OFF', async () => {
//       await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.EnableFrom_DashboardConfig("Alert Tracker"); // default 'Co-Sign'
//         await expect(OD.dashboardShortcut_Alert).toBeVisible({ timeout: 10000 });
//         });

//       await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.DisableFrom_DashboardConfig("Alert Tracker");
//         await expect(OD.dashboardShortcut_Alert).not.toBeVisible({ timeout: 10000 });
//         });
//     });
//   })

//   test.describe('Verify Dashboard Widgets : ToDo',()=>{
    
//     test('Verify ToDo visibility on Dashboard based on Configuration ON/OFF', async () => {
//       await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("To Do"); 
        
//         const isVisible = await Da.CheckWidgetOnDashboard("To Do"); //this can't work in test() -> but we can use Instance
//         expect(isVisible).toBe(true);
        
//         });

//       await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("To Do");
//        const isVisible = await Da.CheckWidgetOnDashboard("To Do");
//         expect(isVisible).toBe(false);  // Widget should be hidden
//         });
//     });
//   })
//   test.describe('Verify Dashboard Widgets : Messages',()=>{
    
//     test('Verify Message visibility on Dashboard based on Configuration ON/OFF', async () => {
//       await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("Messages"); // default 'Co-Sign'
//          const isVisible = await Da.CheckWidgetOnDashboard("Messages");
//         expect(isVisible).toBe(true);
        
//         });

//       await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("Messages");
//        const isVisible = await Da.CheckWidgetOnDashboard("Messages");
//         expect(isVisible).toBe(false);  // Widget should be hidden
//         });
//         });
//     });
  
//   test.describe('Verify Dashboard Widgets : Appointment Requests',()=>{
    
//     test('Verify AppointmentRequests visibility on Dashboard based on Configuration ON/OFF', async () => {
//         await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("Appointment Requests"); // default 'Co-Sign'
//           const isVisible = await Da.CheckWidgetOnDashboard("Appointment Requests");
//         expect(isVisible).toBe(true);
//         });

//         await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("Appointment Requests");
//        const isVisible = await Da.CheckWidgetOnDashboard("Appointment Requests");
//         expect(isVisible).toBe(false);
//         });
//     });
//   })
//   test.describe('Verify Dashboard Widgets : Care Plan Review',()=>{
    
//     test('Verify Care Plan Review visibility on Dashboard based on Configuration ON/OFF', async () => {
//        await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("Care Plan Review"); // default 'Co-Sign'
//         const isVisible = await Da.CheckWidgetOnDashboard("Care Plan Review");
//         expect(isVisible).toBe(true);
//         });

//         await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("Care Plan Review");
//         const isVisible = await Da.CheckWidgetOnDashboard("Care Plan Review");
//         expect(isVisible).toBe(false);
//         });
//     });
//   })
//   test.describe('Verify Dashboard Widgets : Visit Overview',()=>{
    
//     test('Verify Visit Overview visibility on Dashboard based on Configuration ON/OFF', async () => {
//        await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("Visit Overview"); // default 'Co-Sign'
//          const isVisible = await Da.CheckWidgetOnDashboard("Visit Overview");
//         expect(isVisible).toBe(true);
//         });

//         await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("Visit Overview");
//        const isVisible = await Da.CheckWidgetOnDashboard("Visit Overview");
//         expect(isVisible).toBe(false);
//         });
//     });
//   })
//   test.describe('Verify Dashboard Widgets : Productivity / Performance Dashboard',()=>{
    
//     test('Verify Productivity / Performance Dashboard visibility on Dashboard based on Configuration ON/OFF', async () => {
//        await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("Productivity / Performance Dashboard"); // default 'Co-Sign'
//         const isVisible = await Da.CheckWidgetOnDashboard("Productivity / Performance Dashboard");
//         expect(isVisible).toBe(true);
//         });

//         await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("Productivity / Performance Dashboard");
//          const isVisible = await Da.CheckWidgetOnDashboard("Productivity / Performance Dashboard");
//         expect(isVisible).toBe(false);
//         });
//     });
//   })
//   test.describe('Verify Dashboard Widgets : Case load Data',()=>{
   
//     test('Verify Case load visibility on Dashboard based on Configuration ON/OFF', async () => {
//        await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.AddWidgetFrom_DashboardConfig("Case Load"); // default 'Co-Sign'
//       const isVisible = await Da.CheckWidgetOnDashboard("Case Load");
//         expect(isVisible).toBe(true);
//         });

//         await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.RemoveWidgetFrom_DashboardConfig("Case Load");
//   const isVisible = await Da.CheckWidgetOnDashboard("Case Load");
//         expect(isVisible).toBe(false);
//         });
//     });
   
//   });


//   //-----------------------------Bookmark--------------------------------
//   test.describe('Verify Bookmark on Dashboard : Admin',()=>{

//       test('Verify Bookmark : "Admin" visibility on Dashboard based on Configuration ON/OFF', async () => {
        
//         await test.step('Turn ON from Config and verify visible', async () => {
//         await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Admin'); // default
//         const isVisible = await Da.CheckBookmarkOnDashboard("Admin");
//         expect(isVisible).toBe(true);
//         });

//         await test.step('Turn OFF from Config and verify hidden', async () => {
//         await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Admin');
//         const isVisible = await Da.CheckBookmarkOnDashboard("Admin");
//         expect(isVisible).toBe(false);
//         });
//     });
//   })
//   test.describe('Verify Bookmark on Dashboard : Claims',()=>{

//   test('Verify Bookmark : "Claims" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Claims');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Claims");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Claims');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Claims");
//     expect(isVisible).toBe(false);
//     });
//   });
// })

// test.describe('Verify Bookmark on Dashboard : Document Manager',()=>{

//   test('Verify Bookmark : "Document Manager" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Document Manager');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Document Manager");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Document Manager');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Document Manager");
//     expect(isVisible).toBe(false);
//     });
//   });
// })
// test.describe('Verify Bookmark on Dashboard : Facesheet',()=>{

//   test('Verify Bookmark : "Facesheet" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Facesheet');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Facesheet");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Facesheet');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Facesheet");
//     expect(isVisible).toBe(false);
//     });
//   });
// })
// test.describe('Verify Bookmark on Dashboard : Meaningful Use',()=>{

//   test('Verify Bookmark : "Meaningful Use" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Meaningful Use');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Meaningful Use");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Meaningful Use');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Meaningful Use");
//     expect(isVisible).toBe(false);
//     });
//   });
// })
// test.describe('Verify Bookmark on Dashboard : My Offline Preferences',()=>{

//   test('Verify Bookmark : "My Offline Preferences" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','My Offline Preferences');
//     const isVisible = await Da.CheckBookmarkOnDashboard("My Offline Preferences");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','My Offline Preferences');
//     const isVisible = await Da.CheckBookmarkOnDashboard("My Offline Preferences");
//     expect(isVisible).toBe(false);
//     });
//   });
// })
// test.describe('Verify Bookmark on Dashboard : Patient Search',()=>{

//   test('Verify Bookmark : "Patient Search" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Patient Search');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Patient Search");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Patient Search');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Patient Search");
//     expect(isVisible).toBe(false);
//     });
//   });
// })
// test.describe('Verify Bookmark on Dashboard : Payments',()=>{

//   test('Verify Bookmark : "Payments" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Payments');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Payments");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Payments');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Payments");
//     expect(isVisible).toBe(false);
//     });
//   });
// })
// test.describe('Verify Bookmark on Dashboard : Scheduler',()=>{

//   test('Verify Bookmark : "Scheduler" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//     await Da.EnableBookmarkfrom_DashboardConfig('tabs_0','Default','Scheduler');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Scheduler");
//     expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//     await Da.DisableBookmarkfrom_DashboardConfig('tabs_0','Default','Scheduler');
//     const isVisible = await Da.CheckBookmarkOnDashboard("Scheduler");
//     expect(isVisible).toBe(false);
//     });
//   });
// });
//   test.describe('Verify Bookmark on Dashboard : Add Patient',()=>{

//   test('Verify Bookmark : "Add Patient" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Add Patient');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Add Patient");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Add Patient');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Add Patient");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Admit to Bed',()=>{

//   test('Verify Bookmark : "Admit to Bed" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Admit to Bed');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Admit to Bed");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Admit to Bed');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Admit to Bed");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Alert Tracker',()=>{

//   test('Verify Bookmark : "Alert Tracker" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Alert Tracker');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Alert Tracker");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Alert Tracker');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Alert Tracker");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Appointment Request',()=>{

//   test('Verify Bookmark : "Appointment Request" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Appointment Request');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Appointment Request");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Appointment Request');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Appointment Request");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Assessment Tools',()=>{

//   test('Verify Bookmark : "Assessment Tools" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Assessment Tools');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Assessment Tools");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Assessment Tools');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Assessment Tools");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Audit Manager',()=>{

//   test('Verify Bookmark : "Audit Manager" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Audit Manager');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Audit Manager");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Audit Manager');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Audit Manager");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Bed Board',()=>{

//   test('Verify Bookmark : "Bed Board" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Bed Board');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Bed Board");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Bed Board');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Bed Board");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Care Plan Review',()=>{

//   test('Verify Bookmark : "Care Plan Review" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Care Plan Review');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Care Plan Review");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Care Plan Review');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Care Plan Review");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Case Load',()=>{

//   test('Verify Bookmark : "Case Load" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Case Load');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Case Load");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Case Load');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Case Load");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Checked in Appointments',()=>{

//   test('Verify Bookmark : "Checked in Appointments" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Checked in Appointments');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Checked in Appointments");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Checked in Appointments');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Checked in Appointments");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Co-Sign List',()=>{

//   test('Verify Bookmark : "Co-Sign List" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Co-Sign List');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Co-Sign List");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Co-Sign List');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Co-Sign List");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : eMAR',()=>{

//   test('Verify Bookmark : "eMAR" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','eMAR');
//       const isVisible = await Da.CheckBookmarkOnDashboard("eMAR");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','eMAR');
//       const isVisible = await Da.CheckBookmarkOnDashboard("eMAR");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Encounter List',()=>{

//   test('Verify Bookmark : "Encounter List" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Encounter List');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Encounter List");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Encounter List');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Encounter List");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Encounter Note',()=>{

//   test('Verify Bookmark : "Encounter Note" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Encounter Note');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Encounter Note");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Encounter Note');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Encounter Note");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : eRx',()=>{

//   test('Verify Bookmark : "eRx" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','eRx');
//       const isVisible = await Da.CheckBookmarkOnDashboard("eRx");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','eRx');
//       const isVisible = await Da.CheckBookmarkOnDashboard("eRx");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Flag Book',()=>{

//   test('Verify Bookmark : "Flag Book" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Flag Book');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Flag Book");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Flag Book');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Flag Book");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Grant Management',()=>{

//   test('Verify Bookmark : "Grant Management" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Grant Management');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Grant Management");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Grant Management');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Grant Management");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Habilitation Tracker',()=>{

//   test('Verify Bookmark : "Habilitation Tracker" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Habilitation Tracker');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Habilitation Tracker");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Habilitation Tracker');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Habilitation Tracker");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Incident Report',()=>{

//   test('Verify Bookmark : "Incident Report" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Incident Report');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Incident Report");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Incident Report');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Incident Report");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : InSync Analytics',()=>{

//   test('Verify Bookmark : "InSync Analytics" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','InSync Analytics');
//       const isVisible = await Da.CheckBookmarkOnDashboard("InSync Analytics");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','InSync Analytics');
//       const isVisible = await Da.CheckBookmarkOnDashboard("InSync Analytics");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Lab',()=>{

//   test('Verify Bookmark : "Lab" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Lab');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Lab");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Lab');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Lab");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Message',()=>{

//   test('Verify Bookmark : "Message" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Message');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Message");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Message');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Message");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Patient Forms',()=>{

//   test('Verify Bookmark : "Patient Forms" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Patient Forms');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Patient Forms");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Patient Forms');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Patient Forms");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Patient Performance Dashboard',()=>{

//   test('Verify Bookmark : "Patient Performance Dashboard" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Patient Performance Dashboard');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Patient Performance Dashboard");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Patient Performance Dashboard');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Patient Performance Dashboard");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Practice Level Configuration',()=>{

//   test('Verify Bookmark : "Practice Level Configuration" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Practice Level Configuration');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Practice Level Configuration");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Practice Level Configuration');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Practice Level Configuration");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Predictive Decisioning',()=>{

//   test('Verify Bookmark : "Predictive Decisioning" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Predictive Decisioning');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Predictive Decisioning");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Predictive Decisioning');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Predictive Decisioning");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Productivity / Performance Dashboard',()=>{

//   test('Verify Bookmark : "Productivity / Performance Dashboard" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Productivity / Performance Dashboard');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Productivity / Performance Dashboard");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Productivity / Performance Dashboard');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Productivity / Performance Dashboard");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Productivity / Performance Report',()=>{

//   test('Verify Bookmark : "Productivity / Performance Report" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Productivity / Performance Report');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Productivity / Performance Report");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Productivity / Performance Report');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Productivity / Performance Report");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Quick Patient Registration',()=>{

//   test('Verify Bookmark : "Quick Patient Registration" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Quick Patient Registration');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Quick Patient Registration");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Quick Patient Registration');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Quick Patient Registration");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Random Lab Screening',()=>{

//   test('Verify Bookmark : "Random Lab Screening" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Random Lab Screening');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Random Lab Screening");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Random Lab Screening');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Random Lab Screening");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Resource Availability Search',()=>{

//   test('Verify Bookmark : "Resource Availability Search" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Resource Availability Search');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Resource Availability Search");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Resource Availability Search');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Resource Availability Search");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Risk Factor',()=>{

//   test('Verify Bookmark : "Risk Factor" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Risk Factor');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Risk Factor");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Risk Factor');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Risk Factor");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Scheduler Setup',()=>{

//   test('Verify Bookmark : "Scheduler Setup" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Scheduler Setup');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Scheduler Setup");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Scheduler Setup');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Scheduler Setup");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Sticky Note Configuration',()=>{

//   test('Verify Bookmark : "Sticky Note Configuration" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Sticky Note Configuration');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Sticky Note Configuration");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Sticky Note Configuration');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Sticky Note Configuration");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Survey Forms',()=>{

//   test('Verify Bookmark : "Survey Forms" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Survey Forms');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Survey Forms");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Survey Forms');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Survey Forms");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : To Do',()=>{

//   test('Verify Bookmark : "To Do" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','To Do');
//       const isVisible = await Da.CheckBookmarkOnDashboard("To Do");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','To Do');
//       const isVisible = await Da.CheckBookmarkOnDashboard("To Do");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Treatment Plan Letter',()=>{

//   test('Verify Bookmark : "Treatment Plan Letter" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Treatment Plan Letter');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Treatment Plan Letter");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Treatment Plan Letter');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Treatment Plan Letter");
//       expect(isVisible).toBe(false);
//     });
//   });
// });
// test.describe('Verify Bookmark on Dashboard : Waitlist',()=>{

//   test('Verify Bookmark : "Waitlist" visibility on Dashboard based on Configuration ON/OFF', async () => {
    
//     await test.step('Turn ON from Config and verify visible', async () => {
//       await Da.EnableBookmarkfrom_DashboardConfig('tabs_10','General','Waitlist');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Waitlist");
//       expect(isVisible).toBe(true);
//     });

//     await test.step('Turn OFF from Config and verify hidden', async () => {
//       await Da.DisableBookmarkfrom_DashboardConfig('tabs_10','General','Waitlist');
//       const isVisible = await Da.CheckBookmarkOnDashboard("Waitlist");
//       expect(isVisible).toBe(false);
//     });
//   });
// });

});
