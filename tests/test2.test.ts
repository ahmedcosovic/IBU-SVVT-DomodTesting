import { WebDriver, By } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let keyword = "S23";

beforeAll(async () => {
    driver = await createDriver(dataJson.links.home);
    homePage = new HomePage(driver);
}, 30000);


test("Search functionality", async () => {
    const searchBox = await driver.findElement(By.className("search-box"));

    await homePage.fillText(searchBox, keyword);
    await homePage.findAndClick(By.className("i-search"));

    const proizvodiBox = await driver.findElement(By.className("item-list"));
    const proizvodiTekst = await proizvodiBox.findElements(By.tagName("h3"));

    let kontrola = 1;

    for (const tekst of proizvodiTekst) {
        let linija = await tekst.getText();
        if(linija.indexOf(keyword)==-1){
            kontrola=0;
        }
    }

    expect(kontrola).toEqual(1);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);