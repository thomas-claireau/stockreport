import avatar from '../assets/img/avatar.jpg';

export default function Header() {
	return (
		<header>
			<div>
				<a href="#">
					<h1 className="text-3xl font-bold">📈 StockReport</h1>
				</a>
				<div>
					<img src={avatar} alt="" />
					<div>
						<h2>Thomas Claireau</h2>
						<span>Founder</span>
					</div>
				</div>
			</div>
		</header>
	);
}
