import { createContext, useContext, useEffect, useState } from 'react';
import { formatPrice } from './utils/functions';

const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
	const [movements, setMovements] = useState([]);
	const [reports, setReports] = useState([]);

	// get movements
	useEffect(() => {
		fetch('http://localhost:3000/movements')
			.then((response) => response.json())
			.then((data) => {
				return setMovements(
					data.map((movement) => ({
						...movement,
						amount: formatPrice(movement.amount),
						live: formatPrice(movement.live),
					}))
				);
			})
			.catch((error) => console.error(error));
	}, []);

	// get stocks
	useEffect(() => {
		fetch('http://localhost:3000/reports')
			.then((response) => response.json())
			.then((data) => {
				return setReports(
					data.map((report) => ({
						...report,
						amount: formatPrice(report.amount),
						Stock: {
							...report.Stock,
							pru: formatPrice(report.Stock.pru),
						},
					}))
				);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<ApiContext.Provider value={{ movements, reports }}>
			{children}
		</ApiContext.Provider>
	);
};

// context consumer hook
const useApiContext = () => {
	// get the context
	const context = useContext(ApiContext);

	// if `undefined`, throw an error
	if (context === undefined) {
		throw new Error('useApiContext was used outside of its Provider');
	}

	return context;
};

export { useApiContext, ApiContextProvider };
