const csv = require('csv-parser');
const fastcsv = require('fast-csv');
const fs = require('fs');
const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let i = 1;
const waitTime = 120; // in seconds

fs.createReadStream('./read-data/urls-to-scrape.csv')
.pipe(csv())
.on('data', ({url}) => {
  (async function (id) {
    let result = [];
    const ws = fs.createWriteStream('write-data/output.csv', { flags: 'a' });
    const options = new chrome.Options().headless();
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
      console.log(`visiting... ${id}`)
      await driver.get(url);
      const product_main_title = await driver.wait(until.elementLocated(By.className('prodHeading')), waitTime * 1000, '2min timeout').getText();
      const variations = await driver.findElements(By.css('.basketOption'));

      for (let i = 0; i < variations.length; i++) {
        let product_code = await variations[i].findElement(By.css('label.radio-inline')).getText();
        let product_price = await variations[i].findElement(By.css('.price')).getText();
        product_code = product_code.trim().replace(',', '');
        product_price = product_price.replace('£', '');

        result.push({url, product_main_title, product_code, product_price});
      }
      console.log(`writing... ${id}`)
      fastcsv
        .write(result, { includeEndRowDelimiter: true })
        .pipe(ws);
    } finally {
      await driver.quit();
    }
  })(i++);
})
.on('end', () => {
  console.log('this may take a while...')
});