import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Summary from './components/Summary/Summary';

config.autoAddCss = false;
library.add(fas, far, fab);

ReactDOM.render(
	<React.StrictMode>
		<Header />
		<Summary />
	</React.StrictMode>,
	document.getElementById('root')
);
