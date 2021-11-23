import React, { useState } from 'react';
import Header from './Header';
import InvoiceItem from './InvoiceItem';
import InvoicesEmptyPage from './InvoicesEmptyPage';
import '../styles/Invoices.scss';
import NewInvoice from './NewInvoice';

const Invoices = (props) => {
	const list = props.invoices;

	const [filteredStatus, setFilteredStatus] = useState('all');

	const [isEditing, setIsEditing] = useState(false);

	const startEditingHandler = () => {
		setIsEditing(true);
	};

	const stopEditingHandler = () => {
		setIsEditing(false);
	};

	const filterChangeHandler = (selectedStatus) => {
		setFilteredStatus(selectedStatus);
	};

	const filterInvoices = () => {
		const filteredInvoices = list.filter(
			(invoice) => invoice.status === filteredStatus
		);

		return filteredStatus === 'all' ? list : filteredInvoices;
	};

	return (
		<div className='invoices'>
			<Header
				startEditingHandler={startEditingHandler}
				size={props.invoices.length}
				invoices={props.invoices}
				filteredStatus={filteredStatus}
				filterChangeHandler={filterChangeHandler}
			/>
			{props.invoices.length === 0 && <InvoicesEmptyPage />}
			{props.invoices.length > 0 &&
				filterInvoices().map((elem) => (
					<InvoiceItem
						key={elem.id}
						id={elem.id}
						name={elem.clientName}
						date={elem.paymentDue}
						total={elem.total}
						status={elem.status}
						details={elem}
					/>
				))}
			{isEditing && <NewInvoice stopEditingHandler={stopEditingHandler} />}
		</div>
	);
};

export default Invoices;
