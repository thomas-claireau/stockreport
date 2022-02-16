import { ApiContextProvider } from '../ApiContext';
import '../App.css';
import Distribution from './Distribution';
import Header from './Header';
import Movement from './Movement';
import Summary from './Summary';
import Valorisation from './Valorisation';

export default function App() {
	return (
		<ApiContextProvider>
			<div>
				<Header />
				<section>
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
				<section></section>
				<section></section>
			</div>
		</ApiContextProvider>
	);
}
