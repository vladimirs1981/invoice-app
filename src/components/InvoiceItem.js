import React from 'react';
import Status from './Status';
import '../styles/InvoiceItem.scss';
import { Link } from 'react-router-dom';

import { dateFormat, currencyFormat } from '../Services';
import RightArrow from '../assets/svg/icon-arrow-right.svg';

const InvoiceItem = (props) => {
	const viewInvoiceHandler = () => {
		console.log('click');
	};

	return (
		<div className='invoices-wrapper' onClick={viewInvoiceHandler}>
			<Link to={`/detail/${props.id}`} style={{ textDecoration: 'none' }}>
				<div className='top'>
					<div className='id-holder'>
						<span>#</span>
						<h2>{props.id.toString()}</h2>
					</div>
					<h3>{props.name}</h3>
				</div>
				<div className='bottom'>
					<div className='bottom-left'>
						<p>Due {dateFormat(props.date)}</p>
						<h2>{currencyFormat(props.total)}</h2>
					</div>
					<Status status={props.status} />
					<img src={RightArrow} alt="view" />
				</div>
			</Link>
		</div>
	);
};

export default InvoiceItem;
