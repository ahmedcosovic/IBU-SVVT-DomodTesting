import { WebDriver, By } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;

beforeAll(async () => {
    driver = await createDriver(dataJson.links.catalogs);
    homePage = new HomePage(driver);
}, 30000);


test("Download weekly/monthly catalog", async () => {
    
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);