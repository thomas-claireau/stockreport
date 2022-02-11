import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Evolution.module.scss';

export default function Evolution({ value, type }) {
	return (
		<div className={style['Evolution']}>
			{value >= 0 ? (
				<span className={style['up']}>
					<FontAwesomeIcon icon="arrow-up" />
					{value.toFixed(2)} {type}
				</span>
			) : (
				<span className={style['down']}>
					<FontAwesomeIcon icon="arrow-down" />
					{value.toFixed(2)} {type}
				</span>
			)}
			<h5>Depuis le mois dernier</h5>
		</div>
	);
}
