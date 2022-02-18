'use strict';
import 'dotenv/config';
import express from 'express';
import puppeteer from 'puppeteer';
import Summary from './scraper/Summary.js';
import { login } from './utils/scraper/functions.js.js';

const app = express();

puppeteer.launch().then(async function (browser) {
	const [page] = await browser.pages();

	await login(page);

	const [_Summary, summary] = await new Summary(page).init();

	app.get('/', function (req, res) {
		res.send(summary);
	});

	// Closing the Puppeteer controlled headless browser
	await browser.close();
});

app.listen(process.env.PORT || 3000);
