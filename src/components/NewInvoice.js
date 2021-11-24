import React, { useState } from 'react';
import '../styles/NewInvoice.scss';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';
import TrashCan from '../assets/svg/icon-delete.svg';

const Item = (props) => {
	return (
		<div className='item'>
			<div className='new-invoice-control'>
				<label>Item Name</label>
				<input value={props.newInvoice.items.name} name='name' type='text' />
			</div>
			<div className='item-stats'>
				<div className='qty-div'>
					<label>Qty.</label>
					<input
						value={props.newInvoice.items.quantity}
						name='quantity'
						className='quantity'
						type='number'
					/>
				</div>
				<div className='price-div'>
					<label>Price</label>
					<input
						value={props.newInvoice.items.price}
						name='price'
						className='price'
						type='number'
					/>
				</div>
				<div className='price-div'>
					<label>Total</label>
					<output
						value={props.newInvoice.items.total}
						name='total'
						type='number'
					/>
				</div>
				<img src={TrashCan} alt='delete' onClick={props.onDeleteItemHandler} />
			</div>
		</div>
	);
};

const NewInvoice = (props) => {
	const [itemList, setItemList] = useState([]);
	const [newInvoice, setNewInvoice] = useState({
		clientAddress: {
			street: '',
			city: '',
			postCode: '',
			country: '',
		},
		clientEmail: '',
		clientName: '',
		createdAt: '',
		description: '',
		items: [],
		paymentDue: '',
		senderAddress: {
			street: '',
			city: '',
			postCode: '',
			country: '',
		},
		total: '',
	});

	const handleChange = (e, elem) => {
		const value = e.target.value;
		const name =
			elem === 'clientAddress'
				? newInvoice.clientAddress[e.target.name]
				: elem === 'senderAddress'
				? newInvoice.senderAddress[e.target.name]
				: e.target.name;

		setNewInvoice({
			...newInvoice,
			[name]: value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		props.onSaveInvoiceData(newInvoice);
	};

	const onAddItemHandler = (e) => {
		e.preventDefault();
		setItemList(
			itemList.concat(
				<Item
					key={itemList.length}
					onDeleteItemHandler={onDeleteItemHandler}
					newInvoice={newInvoice}
				/>
			)
		);
	};

	const onDeleteItemHandler = (e) => {
		setItemList(itemList.filter((item) => item !== e.target.value));
	};

	return (
		<div className='main-new'>
			<div className='header-new'>
				<img src={LeftArrow} onClick={props.stopEditingHandler} />

				<h2>Go back</h2>
			</div>

			<form action='' className='main-form' onSubmit={submitHandler}>
				<h2>New Invoice</h2>
				<div className='bill-from'>
					<h3>Bill From</h3>
					<div className='new-invoice-control'>
						<label>Street Address</label>
						<input
							// value={newInvoice.senderAddress.street}
							name='street'
							type='text'
							onChange={handleChange}
						/>
					</div>

					<div className='small-input'>
						<div className='new-invoice-control'>
							<label>City</label>
							<input
								// value={newInvoice.senderAddress.city}
								name='city'
								className='small'
								type='text'
								onChange={handleChange}
							/>
						</div>
						<div className='new-invoice-control'>
							<label>Post Code</label>
							<input
								// value={newInvoice.senderAddress.postCode}
								name='postCode'
								className='small'
								type='text'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Country</label>
						<input
							// value={newInvoice.senderAddress.country}
							name='senderAddress:country'
							type='text'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='bill-to'>
					<div className='new-invoice-control'>
						<label htmlFor=''>Client's Name</label>
						<input
							// value={newInvoice.clientName}
							name='clientName'
							type='text'
							onChange={handleChange}
						/>
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Client's Email</label>
						<input
							// value={newInvoice.clientEmail}
							name='clientEmail'
							type='text'
							onChange={handleChange}
						/>
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Street Address</label>
						<input
							// value={newInvoice.clientAddress.street}
							name='street'
							type='text'
							onChange={(e) => handleChange(e, 'clientAddress')}
						/>
					</div>
					<div className='small-input'>
						<div className='new-invoice-control'>
							<label>City</label>
							<input
								// value={newInvoice.clientAddress.city}
								name='city'
								className='small'
								type='text'
								onChange={handleChange}
							/>
						</div>
						<div className='new-invoice-control'>
							<label>Post Code</label>
							<input
								// value={newInvoice.clientAddress.postCode}
								name='postCode'
								className='small'
								type='text'
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className='new-invoice-control'>
						<label>Country</label>
						<input
							// value={newInvoice.clientAddress.country}
							name='country'
							type='text'
							onChange={handleChange}
						/>
					</div>
					<div className='new-invoice-control'>
						<label>Invoice Date</label>
						<input
							// value={new Date(newInvoice.createdAt)}
							name='createdAt'
							type='date'
							onChange={handleChange}
						/>
					</div>
					<div className='new-invoice-control'>
						<label>Payment Terms</label>
						<select>
							<option>Net 1 Day</option>
							<option>Net 7 Days</option>
							<option>Net 14 Days</option>
							<option>Net 30 Days</option>
						</select>
					</div>
					<div className='new-invoice-control'>
						<label>Project Description</label>
						<input
							// value={newInvoice.description}
							name='description'
							type='text'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='item-list'>
					<h4>Item List</h4>
					{itemList}

					<button className='new-item' onClick={onAddItemHandler}>
						+ Add New Item
					</button>
					<div className='linear'></div>
				</div>
				<div className='button-div-bottom'>
					<button className='discard' onClick={props.stopEditingHandler}>
						Discard
					</button>
					<button className='draft'>Save As Draft</button>
					<button type='submit' className='save-send'>
						Save And Send
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewInvoice;
