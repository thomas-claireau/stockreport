import { useApiContext } from '../../ApiContext';
import style from './Valorisation.module.scss';

export default function Valorisation() {
	const { reports } = useApiContext();
	console.log(reports);
	return <div className={style['Valorisation']}></div>;
}
