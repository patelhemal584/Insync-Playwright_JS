const env = require('../env.config');
const { OLogin } = require('../page_objects/OLogin');
const { PLogin } = require('../properties/PLogin');

class Login {

  constructor(page){
    this.page = page;
    this.OL = new OLogin(page);
    this.PL = new PLogin(page);
  }

  async NavigateToUAT(){
    await this.page.goto(process.env.BASE_URL);
    await this.page.waitForLoadState('networkidle');
  }

  async Login(){
    await this.OL.usernameLocator.fill(this.PL.username);
    await this.OL.passwordLocator.fill(this.PL.password);
    await this.OL.signInLocator.click();
    await this.page.waitForTimeout(6000);
  }

 async SelectFacility(){
  await this.page.waitForLoadState('networkidle');

  await this.OL.selectFacilityLocator.waitFor({ state: 'visible', timeout: 15000 });
  await this.OL.selectFacilityLocator.selectOption(process.env.FACILITY);

  await this.OL.facilityOkLocator.waitFor({ state: 'visible', timeout: 5000 });
  await this.OL.facilityOkLocator.click();

  await this.page.waitForLoadState('networkidle');
}

}

module.exports = { Login };
