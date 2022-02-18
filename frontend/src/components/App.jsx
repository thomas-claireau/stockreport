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
				<main className="p-6">
					<h2 className="text-slate-200 text-1xl sm:text-2xl md:text-3xl font-bold">
						Dashboard
					</h2>
					<section className="mt-3 sm:mt-6 flex flex-col md:flex-row gap-4">
						<Summary className="basis-1/3" />
						<Movement className="basis-2/3" />
					</section>
					<section className="h-auto mt-4 flex flex-col md:flex-row gap-4 md:h-96">
						<Valorisation className="basis-2/3" />
						<Distribution className="md:basis-1/3" />
					</section>
					<section className="h-auto mt-4 flex flex-col xl:flex-row gap-4 xl:h-128">
						<Stocks className="basis-full xl:basis-2/4" />
						<div className="sm:h-96 flex flex-col gap-4 xl:h-auto xl:basis-2/4 sm:flex-row">
							<Exposure className="sm:basis-1/2" type="geographic" />
							<Exposure className="sm:basis-1/2" type="sector" />
						</div>
					</section>
				</main>
			</div>
		</ApiContextProvider>
	);
}
