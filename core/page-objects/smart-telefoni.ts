import { By, WebDriver, until, WebElement } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SmartTelefoni extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async provjeriKategoriju() {
        const element = await this.driver.findElements(By.tagName("h1"));
        let x = await element[1].getText();
        return x;
    }

    
}
