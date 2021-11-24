import React from 'react';
import '../styles/Header.scss';
import plus from '../assets/svg/icon-plus.svg';
import InvoicesFilter from './InvoicesFilter';

const Header = (props) => {
	return (
		<div className='header-div'>
			<div className='left-div'>
				<h2>Invoices</h2>
				<p>
					<span>There are </span>
					{props.size}
					<span> total</span> invoices
				</p>
			</div>
			<InvoicesFilter
				selected={props.filteredStatus}
				onChangeFilter={props.filterChangeHandler}
			/>
			<div className='new-button-div' onClick={props.startEditingHandler}>
				<div className='circle-div'>
					<img src={plus} />
				</div>
				<h3>
					New <span>Invoice</span>
				</h3>
			</div>
		</div>
	);
};

export default Header;
