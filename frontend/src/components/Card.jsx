import Evolution from './Evolution';

export default function Card({ label, value, lastValue }) {
	return (
		<div>
			<div>
				<h5>{label}</h5>
				<span>{value.toFixed(2)} €</span>
			</div>
			<Evolution value={renderDiff(value, lastValue)} type="%" />
		</div>
	);
}

function renderDiff(actual, last) {
	return ((actual - last) / last) * 100;
}
