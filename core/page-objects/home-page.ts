import { WebDriver } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }
}
