import { WebDriver, By } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let keyword = "Galaxy A54";

beforeAll(async () => {
    driver = await createDriver(dataJson.links.home);
    homePage = new HomePage(driver);
}, 30000);


test("Purchasing a product", async () => {
    const searchBox = await driver.findElement(By.className("search-box"));
    await homePage.fillText(searchBox, keyword);
    await homePage.findAndClick(By.className("i-search"));
    await homePage.findAndClick(By.className("list-product"));
    const priceElement = await driver.findElement(By.xpath("//span[@id='price']"));
    const initialPrice = parseFloat(await priceElement.getAttribute("data-price"));
    await homePage.findAndClick(By.className("add-to-cart"));
    const checkoutButton = await driver.findElement(By.partialLinkText("ZAVRŠI KUPOVINU"));
    await homePage.scrollToElement(checkoutButton);
    await checkoutButton.click();
    const newPriceElement = await driver.findElement(By.xpath("//li[@class='subtotal']"));
    const newPrice = parseFloat(await newPriceElement.getAttribute("data-value-total"));
    expect(newPrice).toEqual(initialPrice);

    const sf = driver.findElement(By.className("shipping-form"));

    const fullname = await sf.findElement(By.xpath("//input[@name='buyer_name' and @class='form-e']"));
    await homePage.scrollToElement(fullname);
    await fullname.click();
    await homePage.fillText(fullname, dataJson.shipping.fullname);

    const email = await sf.findElement(By.xpath("//input[@name='buyer_email' and @class='form-e']"));
    await homePage.scrollToElement(email);
    await email.click();
    await homePage.fillText(email, dataJson.shipping.email);

    const address = await sf.findElement(By.xpath("//input[@name='buyer_address' and @class='form-e']"));
    await homePage.scrollToElement(address);
    await address.click();
    await homePage.fillText(address, dataJson.shipping.address);

    const phone = await sf.findElement(By.xpath("//input[@name='buyer_phone' and @class='form-e']"));
    await homePage.scrollToElement(phone);
    await phone.click();
    await homePage.fillText(phone, dataJson.shipping.phone);

    const city = await sf.findElement(By.xpath("//input[@name='buyer_city' and @class='form-e']"));
    await homePage.scrollToElement(city);
    await city.click();
    await homePage.fillText(city, dataJson.shipping.city);

    const pcode = await sf.findElement(By.xpath("//input[@name='buyer_postal_code' and @class='form-e']"));
    await homePage.scrollToElement(pcode);
    await pcode.click();
    await homePage.fillText(pcode, dataJson.shipping.pcode);

    const country = await sf.findElement(By.xpath("//input[@name='buyer_country' and @class='form-e']"));
    await homePage.scrollToElement(country);
    await country.click();
    await homePage.fillText(country, dataJson.shipping.country);

    const sameAddressElement = await driver.findElement(By.id("same-form"));
    const isChecked = sameAddressElement.getAttribute("checked");

    if(isChecked!='checked') {
        sameAddressElement.click();
    }

    const submitButton = await sf.findElement(By.xpath("//button[@type='submit']"));
    await submitButton.click();

    await homePage.findAndClick(By.className("i-truck"));
    const deliveryMsg = await driver.findElement(By.id("delivery_msg"));
    await homePage.fillText(deliveryMsg, dataJson.shipping.delivery_msg);

    const proceed = await driver.findElement(By.xpath("//button[@type='submit']"));
    await homePage.scrollToElement(proceed);
    await proceed.click();
    
    await homePage.findAndClick(By.className("i-cash"));
    const tos = await driver.findElement(By.id("terms"));
    const tosChecked = tos.getAttribute("checked");

    if(tosChecked!='checked') {
        tos.click();
    }

    const finalSubmit = await driver.findElement(By.xpath("//button[@type='submit']"));
    //await finalSubmit.click();
}, 60000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);