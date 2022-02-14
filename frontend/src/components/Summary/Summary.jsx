import { useApiContext } from '../../ApiContext';
import { sum } from '../../utils/functions';
import Card from '../Card/Card';
import style from './Summary.module.scss';

export default function Summary() {
	const { movements, reports } = useApiContext();

	console.log(reports);

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
			<Card
				label="Valorisation PRU"
				value={getValorisation(reports)}
				lastValue={getPreviousValorisation(reports)}
			/>
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

/**
 * Calcul valorisation PRU = (Somme actifs en cours) - (Somme actifs à l'achat)
 */
function getValorisation(reports) {
	const live = sum(reports.map((report) => report.amount * report.Stock.qty));
	const pru = sum(
		reports.map((report) => report.Stock.qty * report.Stock.qty)
	);

	return live - pru;
}

function getPreviousValorisation(reports) {
	const lastMonth = new Date();
	lastMonth.setMonth(lastMonth.getMonth() - 1);

	const live = sum(
		reports.map((report) => {
			if (new Date(report.updatedAt) < lastMonth) {
				return report.amount * report.Stock.qty;
			}
		})
	);

	const pru = sum(
		reports.map((report) => {
			if (new Date(report.updatedAt) < lastMonth) {
				return report.Stock.pru * report.Stock.qty;
			}
		})
	);

	return live - pru;
}
