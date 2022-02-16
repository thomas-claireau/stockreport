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
			<div className="dark:bg-slate-900">
				<Header />
				<section className="p-6">
					<h2 className="text-slate-200 text-3xl font-bold">Dashboard</h2>
					<div className="mt-6 flex flex-row gap-4">
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
