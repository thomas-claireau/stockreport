import { useApiContext } from '../../ApiContext';
import Card from '../Card/Card';
import style from './Summary.module.scss';

export default function Summary() {
	const { movements } = useApiContext();

	return (
		<div className={style['Summary']}>
			<Card
				label="Evaluation totale"
				value={getActualReport(movements, 'purchase')}
				lastValue={getPreviousReport(movements, 'purchase')}
			/>
			<Card
				label="Solde espèces"
				value={getActualReport(movements, 'transfer')}
				lastValue={getPreviousReport(movements, 'transfer')}
			/>
			<Card label="Valorisation PRU" value={235} lastValue={235} />
		</div>
	);
}

function getActualReport(movements, type) {
	return sum(
		movements.map((movement) => {
			if (movement.MovementType.name == type) {
				return movement.amount;
			}

			return false;
		})
	);
}

function getPreviousReport(movements, type) {
	const lastMonth = new Date();
	lastMonth.setMonth(lastMonth.getMonth() - 1);

	return sum(
		movements.map((movement) => {
			if (movement.MovementType.name == type) {
				if (new Date(movement.updatedAt) < lastMonth) {
					return movement.amount;
				}
			}

			return false;
		})
	);
}

function sum(values) {
	return values.reduce((acc, cur) => acc + cur, 0);
}
