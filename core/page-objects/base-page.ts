import { By, WebDriver, WebElement, until } from "selenium-webdriver";
export default class BasePage {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }
    async getTitle(){
        return await this.driver.getTitle();
    }
    async waitSeconds(n: number){
        await this.driver.sleep(n*1000);
    }
    async findAndClick(selector: By){
        const element = await this.driver.findElement(selector);
        await this.driver.wait(until.elementLocated(selector),10000);
        await element.click();
        await this.waitSeconds(3);
        //await this.driver.wait(until.stalenessOf(element), 10000); // samo za provjeru
    }
    async getHyperlinkHref(element: WebElement) {
        const link = await element.getAttribute("href");
        return link;
    }
    async checkMatchingElements(selector: By, matchingItem: string){
        const element = await this.driver.findElement(selector);
        const elementText = await element.getText();
        expect(elementText).toMatch(matchingItem);
    }
    async checkTitle(page: { getTitle: () => Promise<string>}, page_title: string){
        let title = await page.getTitle();
        expect(title).toMatch(page_title);
    }  
    async waitAndClick(elementLocator, timeout) {
        await this.driver.wait(
            until.elementLocated(elementLocator), timeout).click();
    }
    async waitForElement(elementLocator, timeout) {
        return this.driver.wait(until.elementLocated(elementLocator), timeout);
    }
    async hoverElement(element: WebElement) {
        const actions = this.driver.actions({ bridge: true });
        await actions
                    .move({ duration: 2000, origin: element, x: 0, y: 0 })
                    .perform();
    }
    async scrollToElement(element: WebElement): Promise<void> {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }
    async fillText(element: WebElement, text: String): Promise<void> {
        //await element.click();
        await element.sendKeys(text);
    }
}
