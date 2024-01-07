import { WebDriver, WebElement, until, By } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async setSliderLeft(sliderElement: WebElement, value: number) {
        await this.driver.wait(until.elementIsVisible(sliderElement), 10000);

        const dimenzije = await sliderElement.getRect();
        const sirina = dimenzije.width;

        const lower = sliderElement.findElement(By.className("noUi-handle-lower"));
        const actions = this.driver.actions({ bridge: true });
      
        await actions.dragAndDrop(lower, { x: Math.round(sirina*(value/100)), y: 0 }).perform();
    }
    async setSliderRight(sliderElement: WebElement, value: number) {
        await this.driver.wait(until.elementIsVisible(sliderElement), 10000);

        const dimenzije = await sliderElement.getRect();
        const sirina = dimenzije.width;

        const lower = sliderElement.findElement(By.className("noUi-handle-upper"));
        const actions = this.driver.actions({ bridge: true });
      
        await actions.dragAndDrop(lower, { x: Math.round(sirina*(value/100)), y: 0 }).perform();
    }
}
