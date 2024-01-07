import { WebDriver, By, WebElement } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { Catalogs } from "../core/page-objects/catalogs";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let catalogs: Catalogs;

beforeAll(async () => {
    driver = await createDriver(dataJson.links.catalogs);
    homePage = new HomePage(driver);
    catalogs = new Catalogs(driver);
}, 30000);


test("Download weekly/monthly catalog", async () => {
    const preuzmi = await driver.findElement(By.xpath("//a[@href='"+dataJson.katalozi.link+"' and @class='small-btn']"));
    await preuzmi.click();
    await homePage.waitSeconds(3);

    let preuzmiParent: WebElement;
    preuzmiParent = await homePage.getParentElement(preuzmi);
    const span = await preuzmiParent.findElement(By.xpath('//span[contains(text(), "Veličina: ")]'));
    let velicinaTekst = await span.getText();
    velicinaTekst = velicinaTekst.replace("Veličina: ","");
    velicinaTekst = velicinaTekst.substring(0,velicinaTekst.indexOf("MB"));
    velicinaTekst = velicinaTekst.replace(',','.');
    const velicinaMb = parseFloat(velicinaTekst);

    let filepresent = await catalogs.isFilePresentInFolder("C:/Users/ahmed/Downloads", dataJson.katalozi.link.substring(dataJson.katalozi.link.lastIndexOf("/")+1));
    expect(filepresent).toEqual(true);

    let info: number;
    info = await catalogs.getLastDownloadedFileSize("C:/Users/ahmed/Downloads");
    expect(velicinaMb).toBeCloseTo(info,0);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);