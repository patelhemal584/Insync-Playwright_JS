// require ('dotenv').config();
const env = require('../env.config');

const { ODashboard } = require('../page_objects/ODashboard');
const { PDashboard } = require('../properties/PDashboard');

class Dashboard{
      /** 
     * @param {import('@playwright/test').Page} page
     */ //To provide code-hint
    constructor(page){
        this.page=page;
        this.OD=new ODashboard(page);
        this.PD=new PDashboard(page);
    }

    async ClickToPatientSearch(){
        await this.OD.patientSearchLocator.click();
        await this.page.waitForLoadState('networkidel');
    }
    async EnableFrom_DashboardConfig(optionText){
        await this.OD.dashboardConfigurationIcon.click();
        await this.page.waitForTimeout(3000);
        await this.OD.dashboardConfig_dashboardSection.click();
        const checkboxXPath = `//div[@id='dvDashShortcutsConfig']//span[normalize-space(.)='${optionText}']/parent::label/input[@type='checkbox']`;
        const checkbox = this.page.locator(checkboxXPath);
         if (!(await checkbox.isChecked()))
             {
                await checkbox.check();
             }
               await this.page.waitForTimeout(5000);
        await this.OD.SaveDashboardConfigurationBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async DisableFrom_DashboardConfig(optionText){
        await this.OD.dashboardConfigurationIcon.click();
        await this.page.waitForTimeout(3000);
        await this.OD.dashboardConfig_dashboardSection.click();
        const checkboxXPath = `//div[@id='dvDashShortcutsConfig']//span[normalize-space(.)='${optionText}']/parent::label/input[@type='checkbox']`;
        
        const checkbox = this.page.locator(checkboxXPath);
        if ((await checkbox.isChecked()))
             {
                await checkbox.uncheck();
             }
               await this.page.waitForTimeout(5000);
        await this.OD.SaveDashboardConfigurationBtn.click();
        await this.page.waitForTimeout(5000);
    }

    async AddWidgetFrom_DashboardConfig(optionText){
        await this.OD.dashboardConfigurationIcon.click();
        await this.page.waitForTimeout(3000);
        await this.OD.dashboardConfig_dashboardSection.click();
        await this.page.waitForTimeout(3000);
        const ElementPresent = await this.page.locator(`//div[@id='divDashboardWidgetsDrag']//a[normalize-space()='${optionText}']`);
  
    if (await ElementPresent.count() > 0) {
        this.OD.SaveDashboardConfigurationBtn.click();
        await this.page.waitForTimeout(5000);
    } 
    else 
    {
        const source = await this.page.locator(`//div[@id='ulDashboardWidgets']/descendant::a[normalize-space()='${optionText}']`);
        //const destination = await this.page.locator("//div[@id='divDashboardWidgetsDrag']/descendant::i[1]");
        const destination = this.OD.dashboardConfig_dragToPlace.first();
        await source.dragTo(destination);
        await this.page.waitForTimeout(5000);
        await this.OD.SaveDashboardConfigurationBtn.click();
        await this.page.waitForTimeout(5000);
    }
    }
    async RemoveWidgetFrom_DashboardConfig(optionText){
        await this.OD.dashboardConfigurationIcon.click();
        await this.page.waitForTimeout(3000);
        await this.OD.dashboardConfig_dashboardSection.click();;
        await this.page.waitForTimeout(3000);
        const ElementPresent = await this.page.locator(`//div[@id='divDashboardWidgetsDrag']//a[normalize-space()='${optionText}']`);

             if (await ElementPresent.count() >= 1) {
              const remove = await this.page.locator(`//a[normalize-space()="${optionText}"]/ancestor::div[@class='col-sm-6']//img[@class="child_close pointer"]`);
              await this.page.waitForTimeout(2000);
              await remove.click();
              await this.page.waitForTimeout(2000);
              await this.OD.SaveDashboardConfigurationBtn.click();
              await this.page.waitForTimeout(5000);
            } 
            else 
            {
              await this.OD.SaveDashboardConfigurationBtn.click();
              await this.page.waitForTimeout(5000);
            }
    }
    
   async CheckWidgetOnDashboard(optionText) {
        const leftCount = await this.page.locator(`//div[@id="Overviews"]//h3[normalize-space()='${optionText}']`).count();
        const rightCount = await this.page.locator(`//div[@id="toDoPanel"]//h3[normalize-space()='${optionText}']`).count();
        return leftCount > 0 || rightCount > 0;
    }

    async EnableBookmarkfrom_DashboardConfig(TabId,optionTab,optionText){
        await this.OD.dashboardConfigurationIcon.click();
        await this.page.waitForTimeout(3000);
        await this.page.locator("//a[@id='lnkBookmarks']").click();
        await this.page.waitForTimeout(3000);
        //Navigate to Tab
        await this.page.locator(`//div[@id='outer-tab-container']/ul/li[normalize-space()='${optionTab}']`).click();
        await this.page.waitForTimeout(3000);
        let checkboxXPath = `//div[@id='${TabId}']//div[@class='is-checkbox p-8 pb-5 is-bookmarkConfig-checkbox']/label[normalize-space(.)='${optionText}']/input[@type="checkbox"]`;
        const checkbox = this.page.locator(checkboxXPath);
            if (!(await checkbox.isChecked())) {
                await checkbox.check();
                }
               await this.page.waitForTimeout(5000);
        await this.page.locator("//div[@class='col-lg-12 col-md-12 col-sm-12']/button[@id='btnSavePreference']").click();
        await this.page.waitForTimeout(5000);
    }
    async DisableBookmarkfrom_DashboardConfig(TabId,optionTab,optionText){
        await this.OD.dashboardConfigurationIcon.click();
        await this.page.waitForTimeout(3000);
        await this.page.locator("//a[@id='lnkBookmarks']").click();
        await this.page.waitForTimeout(3000);
        //Navigate to Tab
        await this.page.locator(`//div[@id='outer-tab-container']/ul/li[normalize-space()='${optionTab}']`).click();
        let checkboxXPath = `//div[@id='${TabId}']//div[@class='is-checkbox p-8 pb-5 is-bookmarkConfig-checkbox']/label[normalize-space(.)='${optionText}']/input[@type="checkbox"]`;
        const checkbox = this.page.locator(checkboxXPath);
         if ((await checkbox.isChecked()))
             {
                await checkbox.uncheck();
             }
               await this.page.waitForTimeout(5000);
        await this.page.locator("//div[@class='col-lg-12 col-md-12 col-sm-12']/button[@id='btnSavePreference']").click();
        await this.page.waitForTimeout(5000);
    }
    async CheckBookmarkOnDashboard(optionText) {
       // const bookmarkCount = await this.page.locator(`//ul[@id='ulMenuPanel']//descendant::span[normalize-space()='${optionText}']`).count();
        const bookmarkCount = await this.page.locator(`//ul[@id='ulMenuPanel']//descendant::span[contains(normalize-space(.),'${optionText}')]`).count();
        return bookmarkCount > 0 ;
    }
}
module.exports = { Dashboard };