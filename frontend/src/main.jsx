import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Movement from './components/Movement/Movement';
import Summary from './components/Summary/Summary';
import style from './main.module.scss';

config.autoAddCss = false;
library.add(fas, far, fab);

ReactDOM.render(
	<React.StrictMode>
		<Header />
		<section className={`container ${style['first']}`}>
			<h3>Dashboard</h3>
			<div>
				<Summary />
				<Movement />
			</div>
		</section>
		<section className={style['middle']}></section>
		<section className={style['last']}></section>
	</React.StrictMode>,
	document.getElementById('root')
);
