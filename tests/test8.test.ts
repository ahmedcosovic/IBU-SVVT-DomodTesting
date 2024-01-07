import { WebDriver, By, WebElement } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { ProductPage } from "../core/page-objects/product-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let productPage: ProductPage;

beforeAll(async () => {
    driver = await createDriver(dataJson.links.tvremote);
    homePage = new HomePage(driver);
    productPage = new ProductPage(driver);
}, 30000);


test("One-click purchase", async () => {
    const oneClick = await driver.findElement(By.xpath("//button[contains(text(),'Brza kupovina')]"));
    await homePage.scrollToElement(oneClick);
    await oneClick.click();

    await homePage.waitSeconds(1);
    const form = await driver.findElement(By.className("modal-content"));
    await homePage.scrollToElement(form);

    const name = await form.findElement(By.xpath("//input[@id='first_name']"));
    await homePage.scrollToElement(name);
    await name.click();
    await homePage.fillText(name, dataJson.jobinfo.name + " " + dataJson.jobinfo.surname);

    const phone = await form.findElement(By.xpath("//input[@name='phone' and @class='form-e']"));
    await homePage.scrollToElement(phone);
    await phone.click();
    await homePage.fillText(phone, dataJson.jobinfo.phone);

    const email = await form.findElement(By.xpath("//input[@name='email' and @class='form-e']"));
    await homePage.scrollToElement(email);
    await email.click();
    await homePage.fillText(email, dataJson.jobinfo.email);

    const tos = await form.findElement(By.xpath("//input[@type='checkbox']"));
    await tos.click();

    const submitButton = await form.findElement(By.xpath("//button[@type='submit']"));
    //await submitButton.click();
    // expect success message
    await homePage.waitSeconds(5);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);