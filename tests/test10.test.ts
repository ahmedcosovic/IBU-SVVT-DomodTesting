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
    driver = await createDriver(dataJson.links.home);
    homePage = new HomePage(driver);
}, 30000);


test("Subscribe to Domod newsletter", async () => {
    const nlemail = await driver.findElement(By.id("newsletter-email"));
    await homePage.scrollToElement(nlemail);
    await nlemail.click();
    await homePage.fillText(nlemail, dataJson.jobinfo.email);

    const nlbtn = await driver.findElement(By.id("newsletter_btn"));
    // await nlbtn.click();
}, 60000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);