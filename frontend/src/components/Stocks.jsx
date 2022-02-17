import { useApiContext } from '../ApiContext';

export default function Stocks({ className }) {
	const { stocks } = useApiContext();

	return (
		<div className={`${className} dark:bg-slate-800 p-4 flex flex-col gap-4`}>
			<h3 className="text-sm sm:text-lg text-slate-500">Liste des actifs</h3>
			<ul className="h-96 overflow-auto divide-y divide-slate-600 xl:h-auto">
				{stocks.map((stock) => (
					<Stock key={stock.id} stock={stock} />
				))}
			</ul>
		</div>
	);
}

function Stock({ stock }) {
	return (
		<li className="py-4 flex flex-col justify-between gap-4 sm:flex-row">
			<div className="w-1/2">
				<Value>{stock.name}</Value>
				<Label>{new Date(stock.updatedAt).toLocaleDateString()}</Label>
			</div>
			<div className="w-full flex justify-between gap-4 sm:w-1/2">
				<div>
					<Value>{stock.pru.euro} €</Value>
					<Label>Price</Label>
				</div>
				<div>
					<Value>{stock.qty}</Value>
					<Label>Quantity</Label>
				</div>
				<div>
					<Value>{(stock.pru.euro * stock.qty).toFixed(2)} €</Value>
					<Label>Amount</Label>
				</div>
			</div>
		</li>
	);
}

function Value({ children }) {
	return <h4 className="text-lg text-slate-300">{children}</h4>;
}

function Label({ children }) {
	return <span className="text-slate-500">{children}</span>;
}
