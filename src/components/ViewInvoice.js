import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/ViewInvoice.scss';
import Status from './Status';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';

import { dateFormat, currencyFormat } from '../Services';

const ViewInvoice = (props) => {
	const location = useLocation();
	const history = useHistory();

	const invoiceId = location.pathname.split('/')[2];

	const currentData = [...props.invoices];

	const [isEditing, setIsEditing] = useState(false);

	const startEditingHandler = () => {
		setIsEditing(true);
	};

	const stopEditingHandler = () => {
		setIsEditing(false);
	};

	const newData = props.invoices.filter((elem) => elem.id === invoiceId)[0];

	//mark as paid
	const onChangeStatusHandler = () => {
		if (newData.status === 'paid') {
			newData.status = 'draft';
		} else if (newData.status === 'pending') {
			newData.status = 'paid';
		}
		props.setCurrentData(currentData);
		history.push('/');
	};

	//delete invoice
	const onDeleteInvoiceHandler = () => {
		const freshData = currentData.filter((elem) => elem.id !== invoiceId);
		props.setCurrentData(freshData);
		history.push('/');
	};

	return (
		<div className='main-view'>
			<div className='header'>
				<Link to='/' style={{ textDecoration: 'none' }}>
					<img src={LeftArrow} />
				</Link>
				<h2>Go back</h2>
			</div>
			<div className='status-div'>
				<h3>Status</h3>
				<Status status={newData.status} />
			</div>
			<div className='main-info-div'>
				<div className='top-info'>
					<h2>
						<span>#</span>
						{newData.id}
					</h2>
					<p>{newData.description}</p>
				</div>
				<div className='address-div'>
					<p>{newData.senderAddress.street}</p>
					<p>{newData.senderAddress.city}</p>
					<p>{newData.senderAddress.postCode}</p>
					<p>{newData.senderAddress.country}</p>
				</div>
				<div className='middle-info'>
					<div className='date-pay-div'>
						<h3>Invoice Date</h3>
						<h2 className='date'>{dateFormat(newData.createdAt)}</h2>
						<h3>Payment Due</h3>
						<h2>{dateFormat(newData.paymentDue)}</h2>
					</div>
					<div className='bill-info'>
						<h3>Bill To</h3>
						<h2>{newData.clientName}</h2>
						<p>{newData.clientAddress.street}</p>
						<p>{newData.clientAddress.city}</p>
						<p>{newData.clientAddress.postCode}</p>
						<p>{newData.clientAddress.country}</p>
					</div>
				</div>
				<div className='sent-to-div'>
					<h3>Sent to</h3>
					<h2>{newData.clientEmail}</h2>
				</div>
				<div className='bottom-div'>
					<div className='items'>
						{newData.items.map((item) => (
							<div className='item-div'>
								<div className='item-name'>
									<h3>{item.name}</h3>
									<p>
										{item.quantity} x {currencyFormat(item.price)}
									</p>
								</div>
								<h3>{currencyFormat(item.total)}</h3>
							</div>
						))}
					</div>
					<div className='amount-due'>
						<p>Amount Due</p>
						<h2>{currencyFormat(newData.total)}</h2>
					</div>
				</div>
			</div>
			<div className='button-div'>
				<button className='edit-button'>Edit</button>
				{!isEditing && (
					<button className='delete-button' onClick={startEditingHandler}>
						Delete
					</button>
				)}

				<button className='mark-button' onClick={onChangeStatusHandler}>
					Mark As Paid
				</button>
			</div>
			{isEditing && (
				<div className='modal-delete'>
					<div className='modal-delete-container'>
						<h2>Confirm Deletion</h2>
						<p>
							Are you sure you want to delete invoice #{newData.id}? This action
							cannot be undone.
						</p>
						<div className='modal-delete-button-container'>
							<button className='cancel-button' onClick={stopEditingHandler}>
								Cancel
							</button>
							<button
								className='delete-button'
								onClick={onDeleteInvoiceHandler}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ViewInvoice;
