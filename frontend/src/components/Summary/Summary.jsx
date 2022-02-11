import { useApiContext } from '../../ApiContext';
import Card from '../Card/Card';
import style from './Summary.module.scss';

export default function Summary() {
	const { movements } = useApiContext();

	console.log(movements);

	return (
		<div className={style['Summary']}>
			<Card
				label="Evaluation totale"
				value={366056}
				valueLastMonth={366056}
			/>
			<Card label="Solde espèces" value={86709} valueLastMonth={8670} />
			<Card label="Valorisation PRU" value={235} valueLastMonth={235} />
		</div>
	);
}
