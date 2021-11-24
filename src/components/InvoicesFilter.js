import React from 'react';
import '../styles/InvoicesFilter.scss';

const InvoicesFilter = (props) => {
	const dropDownChangeHandler = (e) => {
		props.onChangeFilter(e.target.value);
	};
	return (
		<div className='invoices-filter'>
			<div className='invoices-filter-control'>
				<label>
					Filter <span> by status</span>
				</label>
				<select value={props.selected} onChange={dropDownChangeHandler}>
					<option value='all'>All</option>
					<option value='draft'>Draft</option>
					<option value='pending'>Pending</option>
					<option value='paid'>Paid</option>
				</select>
			</div>
		</div>
	);
};

export default InvoicesFilter;
