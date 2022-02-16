import avatar from '../assets/img/avatar.jpg';

export default function Header() {
	return (
		<header className="dark:bg-slate-800">
			<div className="flex justify-between items-center p-4">
				<a href="#">
					<h1 className="text-2xl sm:text-3xl text-slate-200">
						📈 StockReport
					</h1>
				</a>
				<div className="flex items-center gap-3">
					<img
						className="w-8 sm:w-12 h-8 sm:h-12 rounded-full object-cover"
						src={avatar}
						alt=""
					/>
					<div className="text-slate-200 text-xs sm:text-base">
						<h2 className="font-bold">Thomas Claireau</h2>
						<span className="font-light">Founder</span>
					</div>
				</div>
			</div>
		</header>
	);
}
