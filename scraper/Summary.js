'use strict';

import translator from '../utils/translator.js';

export default class Summary {
	constructor(page) {
		this._page = page;
	}

	async init() {
		this._page.goto(process.env.APP_SUMMARY_URL);

		await this._page.waitForNavigation();

		await this._page.screenshot({ path: 'screenshots/bd-summary.png' });

		const scrape = await this._page.$$eval(
			'.valGlobal table tr td b',
			(html, translator) => {
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

					if (translator['summary'][item.innerText]) {
						data.push({
							title: translator['summary'][item.innerText],
							value,
						});
					}
				});

				return data;
			},
			translator
		);

		return [this, scrape];
	}
}
