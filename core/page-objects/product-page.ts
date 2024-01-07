import { By, WebDriver, until, WebElement } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync, readdirSync, statSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ProductPage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
}
