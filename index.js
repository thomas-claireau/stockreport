require('dotenv').config();
const translator = require('./translator.json');
const express = require('express');

const app = express();

const puppeteer = require('puppeteer');

app.set('view engine', 'pug');

async function login(page) {
	await page.goto(process.env.APP_LOGIN_URL);
	await page.type('input[id=bd_auth_login_type_login]', process.env.APP_ID);
	await page.type(
		'input[id=bd_auth_login_type_password]',
		process.env.APP_PASSWORD
	);

	await page.evaluate(() => {
		document.querySelector('button[id=bd_auth_login_type_submit]').click();
	});

	await page.waitForNavigation();
}

async function getSummary(page) {
	page.goto(process.env.APP_SUMMARY_URL);

	await page.waitForNavigation();

	await page.screenshot({ path: 'screenshots/bd-summary.png' });

	const scrape = await page.$$eval('.valGlobal table tr td b', (html) => {
		const data = [];

		html.forEach((item) => {
			const parent = item.parentElement;

			let value;
			let next = parent.nextElementSibling;

			while (next) {
				if (next.classList.contains('row1')) {
					value = next.innerText;
					break;
				}

				next = next.nextElementSibling;
			}

			data.push({
				title: item.innerText,
				value,
			});
		});

		return data;
	});

	return scrape;
}

puppeteer.launch().then(async function (browser) {
	const [page] = await browser.pages();

	await login(page);

	const summary = await getSummary(page);

	app.get('/', function (req, res) {
		res.send(summary);
	});

	// Closing the Puppeteer controlled headless browser
	await browser.close();
});

app.listen(process.env.PORT || 3000);
