import Evolution from '../Evolution/Evolution';
import style from './Card.module.scss';

export default function Card({ label, value, lastValue }) {
	return (
		<div className={style['Card']}>
			<div>
				<h5>{label}</h5>
				<span className="h4">{value.toFixed(2)} €</span>
			</div>
			<Evolution value={renderDiff(value, lastValue)} type="%" />
		</div>
	);
}

function renderDiff(actual, last) {
	return ((actual - last) / last) * 100;
}
