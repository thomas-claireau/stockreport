import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';
export default function Evolution({ value, type }) {
	return (
		<div className="flex items-center gap-3 mt-3 sm:gap-6 sm:mt-6">
			<Percent value={value} type={type} />
			<h5 className="text-slate-500 text-sm">Depuis le mois dernier</h5>
		</div>
	);
}

function Percent({ value, type }) {
	return (
		<span
			className={`flex items-center gap-2 ${
				value >= 0 ? 'text-green-500' : 'text-red-500'
			}`}
		>
			{value >= 0 ? (
				<ArrowUpIcon className="w-4 h-4 sm:w-8 sm:h-8" />
			) : (
				<ArrowDownIcon className="w-4 h-4 sm:w-8 sm:h-8" />
			)}
			{value.toFixed(2)} {type}
		</span>
	);
}
