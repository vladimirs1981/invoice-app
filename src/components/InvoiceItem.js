import React, { useContext } from 'react';
import Status from './Status';
import '../styles/InvoiceItem.scss';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme';

import { dateFormat, currencyFormat } from '../Services';
import RightArrow from '../assets/svg/icon-arrow-right.svg';

const InvoiceItem = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	const viewInvoiceHandler = () => {
		console.log('click');
	};

	return (
		<div
			className='invoices-wrapper'
			onClick={viewInvoiceHandler}
			style={{ backgroundColor: theme.invoiceBcg }}
		>
			<Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}>
				<div className='top'>
					<div className='id-holder'>
						<span>#</span>
						<h2 style={{ color: theme.color }}>{props.id.toString()}</h2>
					</div>
					<h3 style={{ color: theme.h3color }}>{props.name}</h3>
				</div>
				<div className='bottom'>
					<div className='bottom-left'>
						<p style={{ color: theme.dateColor }}>
							Due {dateFormat(props.date)}
						</p>
						<h2 style={{ color: theme.color }}>
							{currencyFormat(props.total)}
						</h2>
					</div>
					<Status status={props.status} />
					<img src={RightArrow} alt='view' />
				</div>
			</Link>
		</div>
	);
};

export default InvoiceItem;
