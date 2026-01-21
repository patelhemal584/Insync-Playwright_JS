
class ODashboard{

    //#patientSearchLocator;
    #loggedInFacility;
    #loggedInPractise;
    #dashboardShortcut_CoSign;
    #dashboardShortcut_EnList;
    #dashboardShortcut_eRx;
    #dashboardShortcut_IMR;
    #dashboardShortcut_eResult;
    #dashboardShortcut_eOrder;
    #dashboardShortcut_Alert;
    #dashboardWidget_ToDo;
    #dashboardWidget_Message;
    #dashboardWidget_AppointmentRequests;
    #dashboardWidget_CarePlanReview;
    #dashboardWidget_ProductivityPerformanceDashboard;
    #dashboardWidget_VisitOverview;
    #dashboardWidget_CaseLoadData;
    #SaveDashboardConfigurationBtn;
    #dashboardConfigurationIcon;
    #dashboardConfig_dashboardSection;
    #dashboardConfig_dragToPlace;
    constructor(page){
        this.page=page;
        //this.#patientSearchLocator = page.locator('//img[@title="Patient Search"]');
        this.#loggedInFacility = page.locator('//span[@id="lblFacilityName"]');
        this.#loggedInPractise = page.locator("//div[@class='fl lblPractice pract ellipsis bold']");
        this.#dashboardShortcut_CoSign = page.locator('//div[@id="DC_CurrentWeekCosign"]');
        this.#dashboardShortcut_EnList = page.locator('//div[@id="DC_CurrentWeekEncounter"]');
        this.#dashboardShortcut_eRx = page.locator('//div[@id="DC_eRx"]');
        this.#dashboardShortcut_IMR = page.locator('//div[@id="DC_ImmRegReport"]');
        this.#dashboardShortcut_eResult = page.locator('//div[@id="DC_eResult"]');
        this.#dashboardShortcut_eOrder = page.locator('//div[@id="DC_eOrder"]');
        this.#dashboardShortcut_Alert = page.locator('//div[@id="DC_AlertTracker"]');
        this.#dashboardConfigurationIcon = page.locator("//img[@title='Click to Configure User Profile']");
        this.#dashboardConfig_dashboardSection = page.locator("//div[@id='userProfile']//child::li/a[normalize-space()='Dashboard']");
        this.#dashboardConfig_dragToPlace = page.locator("//div[@id='divDashboardWidgetsDrag']//div[@class='elem-placeholder ui-droppable']");
        this.#SaveDashboardConfigurationBtn = page.locator("//div[@id='dvdeshprofileConfiguration']//button[@id='btnSavePreference']");
    }
    get loggedInFacility(){ return this.#loggedInFacility; }
    get loggedInPractise(){ return this.#loggedInPractise; }
    get dashboardShortcut_CoSign(){ return this.#dashboardShortcut_CoSign; }
    get dashboardShortcut_EnList(){ return this.#dashboardShortcut_EnList; }
    get dashboardShortcut_eRx(){ return this.#dashboardShortcut_eRx; }
    get dashboardShortcut_IMR(){ return this.#dashboardShortcut_IMR; }
    get dashboardShortcut_eResult(){ return this.#dashboardShortcut_eResult; }
    get dashboardShortcut_eOrder(){ return this.#dashboardShortcut_eOrder; }
    get dashboardShortcut_Alert(){ return this.#dashboardShortcut_Alert; }

    get dashboardConfigurationIcon(){ return this.#dashboardConfigurationIcon; }
    get dashboardConfig_dashboardSection(){ return this.#dashboardConfig_dashboardSection; }
    get dashboardConfig_dragToPlace(){ return this.#dashboardConfig_dragToPlace; }
    get SaveDashboardConfigurationBtn(){ return this.#SaveDashboardConfigurationBtn; }

}
module.exports = { ODashboard };

        // this.#dashboardWidget_ToDo = page.locator('//div[@id="_ToDos"]');
        // this.#dashboardWidget_Message = page.locator('//div[@id="_Messages"]');
        // this.#dashboardWidget_AppointmentRequests = page.locator('//div[@id="_AppointmentRequests"]');
        // this.#dashboardWidget_CarePlanReview = page.locator('//div[@id="subCarePlanReview"]');
        // this.#dashboardWidget_VisitOverview = page.locator('//div[@id="_VisitOverview"]');
        // this.#dashboardWidget_ProductivityPerformanceDashboard = page.locator('//div[@id="subPerformanceDashboard"]');
        // this.#dashboardWidget_CaseLoadData = page.locator(' //div[@id="subCaseLoad"]');
        
   // get dashboardWidget_ToDo(){ return this.#dashboardWidget_ToDo; }
    // get dashboardWidget_Message(){ return this.#dashboardWidget_Message; }
    // get dashboardWidget_AppointmentRequests(){ return this.#dashboardWidget_AppointmentRequests; }
    // get dashboardWidget_CarePlanReview(){ return this.#dashboardWidget_CarePlanReview; }
    // get dashboardWidget_VisitOverview(){ return this.#dashboardWidget_VisitOverview; }
    // get dashboardWidget_ProductivityPerformanceDashboard(){ return this.#dashboardWidget_ProductivityPerformanceDashboard; }
    // get dashboardWidget_CaseLoadData(){ return this.#dashboardWidget_CaseLoadData; }