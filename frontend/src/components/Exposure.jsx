import GeographicExposure from './GeographicExposure';
import SectorExposure from './SectorExposure';

export default function Exposure({ className, type }) {
	return (
		<div className={`${className} h-96 dark:bg-slate-800 p-4 sm:h-auto`}>
			{type === 'geographic' ? <GeographicExposure /> : <SectorExposure />}
		</div>
	);
}
