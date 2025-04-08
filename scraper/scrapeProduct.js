const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(stealthPlugin());

const Product = require('../models/productModel')

const scrapeProducts = async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  );

  // Add Url of e-commerce website
  await page.goto('https://www.amazon.in/s?k=headphones&crid=25RFJX5I7RVH2&sprefix=headphones%2Caps%2C288&ref=nb_sb_noss_2', {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  });

  await page.waitForSelector('.s-main-slot');

  const products = await page.evaluate(() => {
    const items = [];
    const productCards = document.querySelectorAll('.s-main-slot > div');

    productCards.forEach(el => {
      const name = el.querySelector('h2 span')?.innerText || 'N/A';
      const price = el.querySelector('.a-price span')?.innerText || 'N/A';
      const description = 'Amazon product';
      const ratings = el.querySelector('.a-icon-alt')?.innerText || '0';

      if (name !== 'N/A' && price !== 'N/A') {
        items.push({ name, price, description, ratings });
      }
    });

    return items;
  });

  await browser.close();

  for (const product of products) {
    await Product.updateOne(
      { name: product.name },
      { $set: product },
      { upsert: true }
    );
  }

  console.log(`${products.length} products scraped and saved from Amazon.`);
};

module.exports = scrapeProducts;
