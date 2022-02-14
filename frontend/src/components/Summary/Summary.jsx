import { useApiContext } from '../../ApiContext';
import Card from '../Card/Card';
import style from './Summary.module.scss';

export default function Summary() {
	const { movements, stocks } = useApiContext();

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
				value={getValorisation(stocks)}
				lastValue={235}
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
function getValorisation(stocks) {
	const live = sum(stocks.map((stock) => stock.live * stock.qty));
	const pru = sum(stocks.map((stock) => stock.pru * stock.qty));

	return live - pru;
}

function getPreviousValorisation(stocks) {
	const lastMonth = new Date();
	lastMonth.setMonth(lastMonth.getMonth() - 1);

	const live = sum(
		stocks.map((stock) => {
			return stock.live * stock.qty;
		})
	);

	const pru = sum(stocks.map((stock) => stock.pru * stock.qty));

	return live - pru;
}

function sum(values) {
	return values.reduce((acc, cur) => acc + cur, 0);
}
