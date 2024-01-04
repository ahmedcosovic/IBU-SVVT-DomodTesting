import { WebDriver, By } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let sort = "Cijena (najniža)";

beforeAll(async () => {
    driver = await createDriver(dataJson.links.search);
    homePage = new HomePage(driver);
}, 30000);


test("Sorting for searched keyword", async () => {
    await homePage.findAndClick(By.id("dropdownMenu1"));
    await homePage.findAndClick(By.partialLinkText(sort));

    const itemList = await driver.findElement(By.className("item-list"));
    const items = await itemList.findElements(By.tagName("span"));

    let prvi = 1;
    let kontrola = 1;
    let lastPrice;
    for (const item of items) {
        let priceAttribute = await item.getAttribute("data-price");
        let price = parseFloat(priceAttribute);
        if (price!=null) {
            if (prvi == 1) {
                prvi = 0;
                lastPrice = price;
            } else {
                if (lastPrice>price) {
                    console.log(lastPrice+" is higher than "+price);
                    kontrola = 0;
                } else {
                    lastPrice = price;
                }
            }
        }
    }
    expect(kontrola).toEqual(1);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);