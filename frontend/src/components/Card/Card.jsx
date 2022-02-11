import style from './Card.module.scss';

export default function Card({ children }) {
	return <div className={style}>{children}</div>;
}
