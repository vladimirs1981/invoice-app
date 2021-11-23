import React from 'react';
import Empty from '../assets/svg/illustration-empty.svg';
import '../styles/InvoicesEmptyPage.scss';

const InvoicesEmptyPage = () => {
	return (
		<div className='emptyDiv'>
			<img src={Empty}></img>
			<h2>There is nothing here</h2>
			<p>
				Create an invoice by clicking the <b>New</b> button and get started
			</p>
		</div>
	);
};

export default InvoicesEmptyPage;
