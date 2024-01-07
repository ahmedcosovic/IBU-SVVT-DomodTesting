import { By, WebDriver, until, WebElement } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync, readdirSync, statSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const dataJson = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class Catalogs extends BasePage {
    constructor(driver: WebDriver) {
        super(driver);
    }

    async getLastDownloadedFileAttributes(downloadDirectory: string): Promise<string | null> {
        const files = readdirSync(downloadDirectory);

        const onlyFiles = files.filter((file) => statSync(path.join(downloadDirectory, file)).isFile());

        const sortedFiles = onlyFiles
            .map((file) => {
                const filePath = path.join(downloadDirectory, file);
                const stats = statSync(filePath);
                return { file, size: stats.size, mtime: stats.mtime };
            })
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        if (sortedFiles.length > 0) {
            const latestFile = sortedFiles[0];
            return `File Name: ${latestFile.file}, File Size: ${latestFile.size} bytes, Last Modified: ${latestFile.mtime}`;
        }

        return null;
    }
    async getLastDownloadedFileSize(downloadDirectory: string) : Promise<number>{
        const files = readdirSync(downloadDirectory);

        const onlyFiles = files.filter((file) => statSync(path.join(downloadDirectory, file)).isFile());

        const sortedFiles = onlyFiles
            .map((file) => {
                const filePath = path.join(downloadDirectory, file);
                const stats = statSync(filePath);
                return { file, size: stats.size, mtime: stats.mtime };
            })
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

        if (sortedFiles.length > 0) {
            const latestFile = sortedFiles[0];
            let size = latestFile.size;
            size = size / 1048576;
            let roundedsize = (Math.round(size * 100) / 100).toFixed(2);
            return parseFloat(roundedsize);
        }
        return -1;
    }
    async isFilePresentInFolder(folderPath: string, fileName: string) {
        const files = readdirSync(folderPath);
        if (files.includes(fileName)) return true; else return false;
      }
}
