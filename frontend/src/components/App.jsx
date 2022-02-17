import { ApiContextProvider } from '../ApiContext';
import '../App.css';
import Distribution from './Distribution';
import Exposure from './Exposure';
import Header from './Header';
import Movement from './Movement';
import Stocks from './Stocks';
import Summary from './Summary';
import Valorisation from './Valorisation';

export default function App() {
	return (
		<ApiContextProvider>
			<div className="dark:bg-slate-900">
				<Header />
				<section className="p-6">
					<h2 className="text-slate-200 text-1xl sm:text-2xl md:text-3xl font-bold">
						Dashboard
					</h2>
					<div className="mt-3 sm:mt-6 flex flex-col md:flex-row gap-4">
						<Summary />
						<Movement />
					</div>
					<div className="h-auto mt-4 flex flex-col md:flex-row gap-4 md:h-96">
						<Valorisation />
						<Distribution />
					</div>
					<div className="h-full mt-4 flex flex-col md:flex-row gap-4 xl:h-128">
						<Stocks />
						<Exposure type="geographic" />
						<Exposure type="sector" />
					</div>
				</section>
				<section></section>
				<section></section>
			</div>
		</ApiContextProvider>
	);
}
