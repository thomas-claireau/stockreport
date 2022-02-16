import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Evolution({ value, type }) {
	return (
		<div>
			{value >= 0 ? (
				<span>
					<FontAwesomeIcon icon="arrow-up" />
					{value.toFixed(2)} {type}
				</span>
			) : (
				<span>
					<FontAwesomeIcon icon="arrow-down" />
					{value.toFixed(2)} {type}
				</span>
			)}
			<h5>Depuis le mois dernier</h5>
		</div>
	);
}
