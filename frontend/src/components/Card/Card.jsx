import Evolution from '../Evolution/Evolution';
import style from './Card.module.scss';

export default function Card({ label, value, valueLastMonth }) {
	return (
		<div className={style['Card']}>
			<div>
				<h5>{label}</h5>
				<span className="h3">{renderPrice(value)}</span>
			</div>
			<Evolution value={renderDiff(value, valueLastMonth)} type="%" />
		</div>
	);
}

function renderPrice(cent) {
	return (cent / 100).toFixed(2) + ' €';
}

function renderDiff(actual, last) {
	return ((actual - last) / last) * 100;
}
