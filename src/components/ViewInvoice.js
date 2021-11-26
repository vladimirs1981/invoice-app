import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme';
import '../styles/ViewInvoice.scss';
import Status from './Status';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';

import { dateFormat, currencyFormat } from '../Services';
import EditInvoice from './EditInvoice';

const ViewInvoice = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	const location = useLocation();
	const history = useHistory();

	const invoiceId = location.pathname.split('/')[2];

	const currentData = [...props.invoices];
	const [newData, setNewData] = useState(
		props.invoices.filter((elem) => elem.id === invoiceId)[0]
	);

	const [isEditing, setIsEditing] = useState(false);
	const [toggleEdit, setToggleEdit] = useState(false);

	const startEditingHandler = () => {
		setIsEditing(true);
	};

	const stopEditingHandler = () => {
		setIsEditing(false);
	};

	const startToggleEditingHandler = () => {
		setToggleEdit(true);
	};

	const stopToggleEditingHandler = () => {
		setToggleEdit(false);
	};

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
		<div className='main-view' style={{ backgroundColor: theme.viewBcg }}>
			<div className='header'>
				<Link to='/' style={{ textDecoration: 'none' }}>
					<img src={LeftArrow} />
				</Link>
				<h2 style={{ color: theme.color }}>Go back</h2>
			</div>
			<div className='status-div' style={{ backgroundColor: theme.invoiceBcg }}>
				<h3 style={{ color: theme.statusColor }}>Status</h3>
				<Status status={newData.status} />
			</div>
			<div
				className='main-info-div'
				style={{ backgroundColor: theme.invoiceBcg }}
			>
				<div className='top-wrapper'>
					<div className='top-info'>
						<h2 style={{ color: theme.color }}>
							<span>#</span>
							{newData.id}
						</h2>
						<p style={{ color: theme.infoColor }}>{newData.description}</p>
					</div>
					<div className='address-div' style={{ color: theme.infoColor }}>
						<p>{newData.senderAddress.street}</p>
						<p>{newData.senderAddress.city}</p>
						<p>{newData.senderAddress.postCode}</p>
						<p>{newData.senderAddress.country}</p>
					</div>
				</div>
				<div className='middle-wrapper'>
					<div className='middle-info'>
						<div className='date-pay-div'>
							<h3 style={{ color: theme.infoColor }}>Invoice Date</h3>
							<h2 className='date' style={{ color: theme.color }}>
								{dateFormat(newData.createdAt)}
							</h2>
							<h3 style={{ color: theme.infoColor }}>Payment Due</h3>
							<h2 style={{ color: theme.color }}>{newData.paymentDue}</h2>
						</div>
						<div className='bill-info'>
							<h3 style={{ color: theme.infoColor }}>Bill To</h3>
							<h2 style={{ color: theme.color }}>{newData.clientName}</h2>
							<p style={{ color: theme.infoColor }}>
								{newData.clientAddress.street}
							</p>
							<p style={{ color: theme.infoColor }}>
								{newData.clientAddress.city}
							</p>
							<p style={{ color: theme.infoColor }}>
								{newData.clientAddress.postCode}
							</p>
							<p style={{ color: theme.infoColor }}>
								{newData.clientAddress.country}
							</p>
						</div>
					</div>
					<div className='sent-to-div'>
						<h3 style={{ color: theme.infoColor }}>Sent to</h3>
						<h2 style={{ color: theme.color }}>{newData.clientEmail}</h2>
					</div>
				</div>
				<div
					className='bottom-div'
					style={{ backgroundColor: theme.bottomDiv }}
				>
					<div className='items'>
						<div className='hidden-titles'>
							<div className='item-name-hidden'>
								<h4 style={{ color: theme.infoColor }}>Item Name</h4>
							</div>
							<div className='item-qty-hidden'>
								<h4 style={{ color: theme.infoColor }}>QTY.</h4>
							</div>
							<div className='item-price-hidden'>
								<h4 style={{ color: theme.infoColor }}>Price</h4>
							</div>
							<div className='item-total-hidden'>
								<h4 style={{ color: theme.infoColor }}>Total</h4>
							</div>
						</div>
						{newData.items.map((item) => (
							<div key={item.id} className='item-div'>
								<div className='item-name'>
									<h3 id='name-toggle' style={{ color: theme.color }}>
										{item.name}
									</h3>
									<div id='name-div-h3' className='hidden-divs'>
										<h3 style={{ color: theme.color }}>{item.name}</h3>
									</div>
									<div id='qty-div-h4' className='hidden-divs'>
										<h4 style={{ color: theme.infoColor }}>{item.quantity}</h4>
									</div>
									<div id='price-div-h4' className='hidden-divs'>
										<h4 style={{ color: theme.infoColor }}>
											{currencyFormat(item.price)}
										</h4>
									</div>
									<p style={{ color: theme.darkGrey }}>
										{item.quantity} x {currencyFormat(item.price)}
									</p>
								</div>
								<h3 style={{ color: theme.color }}>
									{currencyFormat(item.total)}
								</h3>
							</div>
						))}
					</div>
					<div
						className='amount-due'
						style={{ backgroundColor: theme.amountDue }}
					>
						<p>Amount Due</p>
						<h2>{currencyFormat(newData.total)}</h2>
					</div>
				</div>
			</div>
			<div className='button-div' style={{ backgroundColor: theme.invoiceBcg }}>
				<button
					className='edit-button'
					onClick={startToggleEditingHandler}
					style={{ color: theme.infoColor, backgroundColor: theme.bottomDiv }}
				>
					Edit
				</button>
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
					<div
						className='modal-delete-container'
						style={{ backgroundColor: theme.invoiceBcg }}
					>
						<h2 style={{ color: theme.color }}>Confirm Deletion</h2>
						<p>
							Are you sure you want to delete invoice #{newData.id}? This action
							cannot be undone.
						</p>
						<div className='modal-delete-button-container'>
							<button
								style={{
									color: theme.darkGrey,
									backgroundColor: theme.bottomDiv,
								}}
								className='cancel-button'
								onClick={stopEditingHandler}
							>
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
			{toggleEdit && (
				<EditInvoice
					newData={newData}
					setNewData={setNewData}
					stopToggleEditingHandler={stopToggleEditingHandler}
				/>
			)}
		</div>
	);
};

export default ViewInvoice;
