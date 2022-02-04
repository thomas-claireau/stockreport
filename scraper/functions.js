'use strict';

export async function login(page) {
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
