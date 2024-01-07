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


test("Apply for loan", async () => {
    await homePage.findAndClick(By.partialLinkText("ZAHTJEV ZA KREDIT"));

    const form = driver.findElement(By.className("default-form"));
    await homePage.scrollToElement(form);

    const name = await form.findElement(By.xpath("//input[@name='name' and @class='form-e']"));
    await homePage.scrollToElement(name);
    await name.click();
    await homePage.fillText(name, dataJson.loaninfo.name);

    const surname = await form.findElement(By.xpath("//input[@name='surname' and @class='form-e']"));
    await homePage.scrollToElement(surname);
    await surname.click();
    await homePage.fillText(surname, dataJson.loaninfo.surname);

    const email = await form.findElement(By.xpath("//input[@name='email' and @class='form-e']"));
    await homePage.scrollToElement(email);
    await email.click();
    await homePage.fillText(email, dataJson.loaninfo.email);

    const phone = await form.findElement(By.xpath("//input[@name='phone' and @class='form-e']"));
    await homePage.scrollToElement(phone);
    await phone.click();
    await homePage.fillText(phone, dataJson.loaninfo.phone);

    const address = await form.findElement(By.xpath("//input[@name='address' and @class='form-e']"));
    await homePage.scrollToElement(address);
    await address.click();
    await homePage.fillText(address, dataJson.loaninfo.address);

    const city = await form.findElement(By.xpath("//input[@name='city' and @class='form-e']"));
    await homePage.scrollToElement(city);
    await city.click();
    await homePage.fillText(city, dataJson.loaninfo.city);

    const jmbg = await form.findElement(By.xpath("//input[@name='jmbg' and @class='form-e']"));
    await homePage.scrollToElement(jmbg);
    await jmbg.click();
    await homePage.fillText(jmbg, dataJson.loaninfo.jmbg);

    const instalments = await form.findElement(By.xpath("//input[@name='instalments' and @class='form-e']"));
    await homePage.scrollToElement(instalments);
    await instalments.click();
    await homePage.fillText(instalments, dataJson.loaninfo.instalments);

    const device = await form.findElement(By.xpath("//input[@name='device' and @class='form-e']"));
    await homePage.scrollToElement(device);
    await device.click();
    await homePage.fillText(device, dataJson.loaninfo.device);

    const msg = await form.findElement(By.xpath("//textarea[@name='msg' and @class='form-e']"));
    await homePage.scrollToElement(msg);
    await msg.click();
    await homePage.fillText(msg, dataJson.loaninfo.msg);

    

    const tos = await form.findElement(By.xpath("//input[@type='checkbox']"));
    await tos.click();

    const submitButton = await form.findElement(By.xpath("//button[@type='submit']"));
    //await submitButton.click();
    // expect success message
}, 60000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);