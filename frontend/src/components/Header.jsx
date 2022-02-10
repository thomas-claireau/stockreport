import avatar from '../assets/img/avatar.jpg';
import style from './Header.module.scss';

export default function Header() {
	return (
		<header className={style['header']}>
			<div className="container">
				<a href="#">
					<h1>📈 StockReport</h1>
				</a>
				<div className={style['personna']}>
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
