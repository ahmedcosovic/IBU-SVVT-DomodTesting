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
let brend = "Gorenje";

beforeAll(async () => {
    driver = await createDriver(dataJson.links.subcat);
    homePage = new HomePage(driver);
}, 30000);


test("Filtering in sub-category", async () => {
    await homePage.findAndClick(By.id("dropdownMenu1"));
    await homePage.findAndClick(By.partialLinkText(sort));

    await homePage.findAndClick(By.id("dropdownMenu2"));
    const otvorenMeni = await driver.findElement(By.className("dropdown-menu"));
    const opcije = await otvorenMeni.findElement(By.xpath('//label[contains(text(), "'+ brend +'")]'));
    const checkboxid = await opcije.getAttribute("for");
    await driver.findElement(By.id(checkboxid)).click();

    await homePage.findAndClick(By.id("dropdownMenu3"));
    const nouibase = await driver.findElement(By.className("noUiSlider"));
    await homePage.setSliderLeft(nouibase,44);
    await homePage.findAndClick(By.id("dropdownMenu3"));
    await homePage.setSliderRight(nouibase,-40);

    await homePage.waitSeconds(1);

    const itemList = await driver.findElement(By.className("item-list"));
    const items = await itemList.findElements(By.tagName("span"));

    const donja = await driver.findElement(By.className("range_min"));
    const gornja = await driver.findElement(By.className("range_max"));

    const donjaGranica = parseInt(await donja.getText());
    const gornjaGranica = parseInt(await donja.getText());

    let prvi = 1;
    let kontrola = 1;
    let lastPrice;
    for (const item of items) {
        let priceAttribute = await item.getAttribute("data-price");
        let price = parseFloat(priceAttribute);
        expect(price).toBeLessThanOrEqual(gornjaGranica);
        expect(price).toBeGreaterThanOrEqual(donjaGranica);
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

    await homePage.waitSeconds(5);
}, 30000);


afterAll(async () => {
    await quitDriver(driver);
}, 30000);