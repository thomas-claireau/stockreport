import { ApiContextProvider } from '../../ApiContext';
import Distribution from '../Distribution/Distribution';
import Header from '../Header/Header';
import Movement from '../Movement/Movement';
import Summary from '../Summary/Summary';
import Valorisation from '../Valorisation/Valorisation';
import style from './App.module.scss';

export default function App() {
	return (
		<ApiContextProvider>
			<div className={style['App']}>
				<Header />
				<section className={`container ${style['first']}`}>
					<h3>Dashboard</h3>
					<div>
						<Summary />
						<Movement />
					</div>
					<div>
						<Valorisation />
						<Distribution />
					</div>
				</section>
				<section className={style['middle']}></section>
				<section className={style['last']}></section>
			</div>
		</ApiContextProvider>
	);
}
