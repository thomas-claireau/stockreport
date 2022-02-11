import { createContext, useContext, useEffect, useState } from 'react';

const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
	const [movements, setMovements] = useState([]);
	const [stocks, setStocks] = useState([]);

	// get movements
	useEffect(() => {
		fetch('http://localhost:3000/movements')
			.then((response) => response.json())
			.then((data) => {
				return setMovements(data);
			})
			.catch((error) => console.error(error));
	}, []);

	// get stocks
	useEffect(() => {
		fetch('http://localhost:3000/stocks')
			.then((response) => response.json())
			.then((data) => {
				return setStocks(data);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<ApiContext.Provider value={{ movements, stocks }}>
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
