import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import Summary from './components/Summary/Summary';

ReactDOM.render(
	<React.StrictMode>
		<Header />
		<Summary />
	</React.StrictMode>,
	document.getElementById('root')
);
