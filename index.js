let axios = require('axios');
let cheerio = require('cheerio');

let base_url = process.argv[2];

axios.get(base_url).then(response => {
  let $ = cheerio.load(response.data);

  $('picture', '.we-screenshot-viewer__screenshots').each((i, pictureElement) => {
    const srcsets = $(pictureElement).children('source').first().attr('srcset').split(',');
    const srcsetsWithSizes = srcsets.map(srcset => srcset.trim().split(' '));
    const largestSizeSet = srcsetsWithSizes.filter(srcsetWithSize => srcsetWithSize[1] == '3x');
    const largeImagePaths = largestSizeSet.map(x => x[0]);

    console.log(largeImagePaths[0]);
  });
});
