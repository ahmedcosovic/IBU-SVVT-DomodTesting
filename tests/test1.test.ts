import { WebDriver, By, until } from "selenium-webdriver";
import { SmartTelefoni } from "../core/page-objects/smart-telefoni";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let smartTelefoni: SmartTelefoni;

const cat = "Televizori, AV oprema";
const subCat = "LED TV";

beforeAll(async () => {
    driver = await createDriver(dataJson.links.home);
    homePage = new HomePage(driver);
    smartTelefoni = new SmartTelefoni(driver);
}, 30000);


test("Sub-categories", async () => {

    await homePage.findAndClick(By.partialLinkText(cat));

    const scElement = await driver.findElement(By.partialLinkText(subCat));
    await driver.wait(until.elementLocated(By.partialLinkText(subCat)), 10000);
    
    const elementSaStringom = await homePage.getParentElement(scElement);
    const stringSaBrojem = await elementSaStringom.getText();
    let brojArtikalaString = stringSaBrojem.substring(stringSaBrojem.indexOf('(')+1);
    brojArtikalaString = brojArtikalaString.substring(0,brojArtikalaString.indexOf(')'));
    const brojArtikala = parseInt(brojArtikalaString);

    await scElement.click();
    await homePage.waitSeconds(3);

    const provjeraCat = await smartTelefoni.provjeriKategoriju();

    expect(provjeraCat).toEqual(subCat);

    const stranice = await driver.findElement(By.className("pagination"));

    await homePage.scrollToElement(stranice);

    const brojevi = await stranice.findElements(By.tagName("a"));
    let max = 1;

    for (const broj of brojevi) {
        let tekst = await broj.getText();
        if (!isNaN(parseInt(tekst))) {
            max = parseInt(tekst);
        }
    }
    const zadnjaStranica = max;
    let ukupanBrojArtikala = (max - 1) * 12;

    let trenutnaStranica = await driver.getCurrentUrl();

    await driver.get(trenutnaStranica + "?page=" + zadnjaStranica);

    const artikli = await driver.findElement(By.className("item-list"));
    const artikliList = await artikli.findElements(By.className("list-product"));

    ukupanBrojArtikala = ukupanBrojArtikala + artikliList.length;

    expect(ukupanBrojArtikala).toEqual(brojArtikala);
}, 30000);

afterAll(async () => {
    await quitDriver(driver);
}, 30000);