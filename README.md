# price-checker-for-door-hardware

## Instructions:

This is headless browsing!

Make sure you have the latest <b>node.js</b> installed

After cloning this repo - run <code>npm install</code> in a shell

run <code>npm run split</code> - this splits <code>data/urls-to-scrape.csv</code>

go to <code>package.json</code> and modify -> config -> fileNumber (values range from 0 to 40 in the current scenario)

run <code>npm start</code>

## References:

https://www.selenium.dev/selenium/docs/api/javascript/index.html

https://stackabuse.com/reading-and-writing-csv-files-with-node-js

https://c2fo.github.io/fast-csv/docs/introduction/getting-started

For splitting csv to chunks

https://www.npmjs.com/package/csv-split-stream