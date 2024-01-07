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
    driver = await createDriver(dataJson.links.product);
    homePage = new HomePage(driver);
}, 30000);


test("Add to basket from product page", async () => {
    await homePage.findAndClick(By.className("add-to-cart"));
    const productTitleElement = await driver.findElement(By.className("product-title"));
    const productTitle = await productTitleElement.getText();

    const slika = await driver.findElement(By.className("thumb"));
    const a = await slika.findElement(By.tagName("a"));
    const href = await a.getAttribute("href");

    expect(href).toEqual(dataJson.links.product);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);