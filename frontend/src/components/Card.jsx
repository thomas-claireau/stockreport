import Evolution from './Evolution';

export default function Card({ label, value, lastValue }) {
  return (
    <div className="text-slate-200 dark:bg-slate-800 p-4">
      <div>
        <h3 className="text-sm sm:text-lg text-slate-500">{label}</h3>
        <span className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold mt-4">
          {value.toFixed(2)} €
        </span>
      </div>
      <Evolution value={renderDiff(value, lastValue)} type="%" />
    </div>
  );
}

function renderDiff(actual, last) {
  return ((actual - last) / last) * 100;
}
