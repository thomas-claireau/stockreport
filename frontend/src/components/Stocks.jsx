import { useApiContext } from '../ApiContext';

export default function Stocks() {
	const { stocks } = useApiContext();

	console.log(stocks);

	return (
		<div className="dark:bg-slate-800 p-4 flex flex-col gap-4 basis-2/4">
			<h3 className="text-sm sm:text-lg text-slate-500">Liste des actifs</h3>
			<ul className="mt-4 overflow-auto">
				{stocks.map((stock) => (
					<Stock key={stock.id} stock={stock} />
				))}
			</ul>
		</div>
	);
}

function Stock({ stock }) {
	console.log(stock);
	return (
		<li className="pb-4 flex gap-4 justify-between">
			<div>
				<Value>{stock.name}</Value>
				<Label>{new Date(stock.updatedAt).toLocaleDateString()}</Label>
			</div>
			<div class="columns-3 gap-8">
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
