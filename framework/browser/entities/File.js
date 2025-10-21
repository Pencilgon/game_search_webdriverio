import fs from 'fs-extra';
import path from 'path';

import Timeouts from '../../constants/Timeouts.js';
import Logger from '../../utils/Logger.js';

export class File {
  constructor() {
    this.browser = null;
  }

  /**
     * Upload file to page
     * @param {string} filepath - path to file location
     * @returns {Promise<void>}
     */
  async uploadFile(filepath) {
    Logger(`Upload file from path "${filepath}"`);
    return this.browser.uploadFile(filepath);
  }

  /**
     * Wait for file to be downloaded
     * @param {string} filepath - path to file location (ex. with default folder ".tmp/fileName.txt")
     * @param {number} timeout - Timeout for waiting for file will be downloaded
     * @returns {Promise<boolean>}
     */
  async isFileExist(filePath, timeout = Timeouts.fileDownload) {
    const pathObj = path.parse(path.resolve(filePath));
    const file = path.join(pathObj.dir, pathObj.base);

    Logger.info(`Check that file "${file}" exist`);
    try {
      await this.#waitForFileExists(file, timeout);
    } catch (err) {
      Logger.info(err);
    }
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file);
      return true;
    }
    return false;
  }

  #waitForFileExists(filePath, timeout = Timeouts.fileDownload) {
    return new Promise((resolve, reject) => {
      const checkFile = function () {
        fs.stat(filePath, (err, stats) => {
          if (!err && stats.size > 0) {
            let fileContent;
            try {
              fileContent = fs.readFileSync(filePath, 'utf8');
            } catch {
            }
            if (fileContent?.length > 0) {
              clearTimeout(timer);
              watcher.close();
              resolve();
            }
          }
        });
      };

      const dir = path.dirname(filePath);
      const watcher = fs.watch(dir, { persistent: false }, () => {
        checkFile();
      });

      checkFile();

      const timer = setTimeout(() => {
        watcher.close();
        reject(new Error(`File "${filePath}" did not exists and was not created during the timeout(${timeout}ms)`));
      }, timeout);
    });
  }
}
