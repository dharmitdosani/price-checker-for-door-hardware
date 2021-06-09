const csvSplitStream = require('csv-split-stream');
const fs = require('fs');

const folderNames = ['./inputs', './outputs'];
for (let i = 0; i < folderNames.length; i++) {
  const folderName = folderNames[i];
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName)
    }
  } catch (err) {
    console.error(err)
  }
}

return csvSplitStream.split(
  fs.createReadStream('./data/urls-to-scrape.csv'),
  {
    lineLimit: 100
  },
  (index) => fs.createWriteStream(`./inputs/input-${index}.csv`)
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);
}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});