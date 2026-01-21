

class OLogin{
    #usernameLocator;
    #passwordLocator;
    #signInLocator;
    #selectFacilityLocator;
    #facilityOkLocator;
    #practiceSelectionLocator;
    #userSelectionLocator;
    constructor(page){
        this.page=page;
        this.#usernameLocator = page.locator('input[id="UserName"]');
        this.#passwordLocator = page.locator('input[id="Password"]');
        this.#signInLocator = page.locator('button[id="loginBtn"]');
        this.#selectFacilityLocator = page.locator('select[id="FacilityId"]');
        this.#facilityOkLocator = page.locator('button[id="facilitySelect"]');
        this.#practiceSelectionLocator = page.locator("//div[@class='SumoSelect sumo_PracticeId']");
        this.#userSelectionLocator = page.locator("//div[@class='SumoSelect sumo_UserId']");
    }

    get usernameLocator(){ return this.#usernameLocator };
    get passwordLocator(){ return this.#passwordLocator };
    get signInLocator(){ return this.#signInLocator };
    get selectFacilityLocator(){ return this.#selectFacilityLocator };
    get facilityOkLocator(){ return this.#facilityOkLocator };
    get practiceSelectionLocator(){ return this.#practiceSelectionLocator };
    get userSelectionLocator(){ return this.#userSelectionLocator };
}

module.exports = { OLogin };