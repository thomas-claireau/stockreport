import { ApiContextProvider } from '../../ApiContext';
import Header from '../Header/Header';
import Movement from '../Movement/Movement';
import Summary from '../Summary/Summary';
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
				</section>
				<section className={style['middle']}></section>
				<section className={style['last']}></section>
			</div>
		</ApiContextProvider>
	);
}
