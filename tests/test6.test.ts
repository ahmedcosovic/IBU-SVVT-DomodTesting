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
    driver = await createDriver(dataJson.links.job);
    homePage = new HomePage(driver);
}, 30000);


test("Apply for job", async () => {
    const jf = await driver.findElement(By.id("job-form"));

    const boxName = await jf.findElement(By.id("name"));
    await homePage.fillText(boxName, dataJson.jobinfo.name);

    const boxSurname = await jf.findElement(By.id("surname"));
    await homePage.fillText(boxSurname, dataJson.jobinfo.surname);

    const boxEmail = await jf.findElement(By.id("email"));
    await homePage.fillText(boxEmail, dataJson.jobinfo.email);

    const boxPhone = await jf.findElement(By.id("phone"));
    await homePage.fillText(boxPhone, dataJson.jobinfo.phone);

    const boxCity = await jf.findElement(By.id("city"));
    await homePage.fillText(boxCity, dataJson.jobinfo.city);

    const boxMsg = await jf.findElement(By.id("msg"));
    await homePage.fillText(boxMsg, dataJson.jobinfo.msg);

    const uploadCv = await jf.findElement(By.id("form-control-cv"));
    await homePage.fillText(uploadCv, "C:/Users/Korisnik/Desktop/DomodTesting/DomodTesting/tests/files/cv.pdf");
    
    const tos = await jf.findElement(By.id("tos"));
    await tos.click();

    const submitButton = await jf.findElement(By.xpath("//button[@type='submit']"));
    //await submitButton.click();

    //await homePage.waitSeconds(10);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);