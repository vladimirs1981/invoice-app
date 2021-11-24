import React, { useState } from 'react';
import '../styles/EditInvoice.scss';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';
import TrashCan from '../assets/svg/icon-delete.svg';
import Calendar from '../assets/svg/icon-calendar.svg';

const Item = (props) => {
	return (
		<div className='item'>
			<div className='new-invoice-control'>
				<label>Item Name</label>
				<input type='text' />
			</div>
			<div className='item-stats'>
				<div className='qty-div'>
					<label>Qty.</label>
					<input className='quantity' type='number' />
				</div>
				<div className='price-div'>
					<label>Price</label>
					<input className='price' type='number' />
				</div>
				<div className='price-div'>
					<label>Total</label>
					<output type='number' />
				</div>
				<img src={TrashCan} alt='delete' onClick={props.onDeleteItemHandler} />
			</div>
		</div>
	);
};

const EditInvoice = (props) => {
	console.log(props.newData);
	const [itemList, setItemList] = useState([]);

	const onAddItemHandler = (e) => {
		e.preventDefault();
		setItemList(
			itemList.concat(
				<Item key={itemList.length} onDeleteItemHandler={onDeleteItemHandler} />
			)
		);
	};

	const onDeleteItemHandler = (e) => {
		setItemList(itemList.filter((item) => item !== e.target.value));
	};

	return (
		<div className='main-edit'>
			<div className='header-edit'>
				<img src={LeftArrow} onClick={props.stopToggleEditingHandler} />

				<h2>Go back</h2>
			</div>

			<form action='' className='main-form-edit'>
				<h2>
					Edit <span>#</span>
					{props.newData.id}
				</h2>
				<div className='bill-from'>
					<h3>Bill From</h3>
					<div className='new-invoice-control'>
						<label>Street Address</label>
						<input
							value={props.newData.senderAddress.street}
							name='street'
							type='text'
						/>
					</div>

					<div className='small-input'>
						<div className='new-invoice-control'>
							<label>City</label>
							<input
								value={props.newData.senderAddress.city}
								name='city'
								className='small'
								type='text'
							/>
						</div>
						<div className='new-invoice-control'>
							<label>Post Code</label>
							<input
								value={props.newData.senderAddress.postCode}
								name='postCode'
								className='small'
								type='text'
							/>
						</div>
					</div>
					<div id='country-input' className='new-invoice-control'>
						<label htmlFor=''>Country</label>
						<input
							value={props.newData.senderAddress.country}
							name='country'
							type='text'
						/>
					</div>
				</div>
				<div className='bill-to'>
					<div className='new-invoice-control'>
						<label htmlFor=''>Client's Name</label>
						<input
							value={props.newData.clientName}
							name='clientName'
							type='text'
						/>
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Client's Email</label>
						<input
							value={props.newData.clientEmail}
							name='clientEmail'
							type='text'
						/>
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Street Address</label>
						<input
							value={props.newData.clientAddress.street}
							name='street'
							type='text'
						/>
					</div>
					<div className='small-input'>
						<div className='new-invoice-control'>
							<label>City</label>
							<input
								value={props.newData.clientAddress.city}
								name='city'
								className='small'
								type='text'
							/>
						</div>
						<div className='new-invoice-control'>
							<label>Post Code</label>
							<input
								value={props.newData.clientAddress.postCode}
								name='postCode'
								className='small'
								type='text'
							/>
						</div>
					</div>
					<div id='country-div' className='new-invoice-control'>
						<label>Country</label>
						<input
							value={props.newData.clientAddress.country}
							name='country'
							type='text'
						/>
					</div>
					<div className='new-invoice-control' id='date-control'>
						<label>Invoice Date</label>
						<input
							value={props.newData.createdAt}
							name='createdAt'
							type='date'
							disabled
						/>
						<img src={Calendar} alt='calendar' />
					</div>
					<div className='new-invoice-control' id='payment-control'>
						<label>Payment Terms</label>
						<select name='paymentTerms' value='newData.paymentTerms'>
							<option value='1'>Net 1 Day</option>
							<option value='7'>Net 7 Days</option>
							<option value='14'>Net 14 Days</option>
							<option value='30'>Net 30 Days</option>
						</select>
					</div>
					<div className='new-invoice-control'>
						<label>Project Description</label>
						<input
							value={props.newData.description}
							name='description'
							type='text'
						/>
					</div>
				</div>
				<div className='item-list'>
					<h4>Item List</h4>
					<div className="hidden-title">
						<div className="hidden-name">
							<h4>Item Name</h4>
						</div>
						<div className="hidden-qty">
							<h4>Qty.</h4>
						</div>
						<div className="hidden-price">
							<h4>Price</h4>
						</div>
						<div className="hidden-total">
							<h4>Total</h4>
						</div>
					</div>
					{props.newData.items.map((item, index) => (
						<div className='item'>
							<div className='new-invoice-control' id='item-name'>
								<label className='mobile'>Item Name</label>
								<input value={item.name} name='name' type='text' />
							</div>
							<div className='item-stats'>
								<div className='qty-div'>
									<label className='mobile'>Qty.</label>
									<input
										value={item.quantity}
										name='quantity'
										className='quantity'
										type='number'
									/>
								</div>
								<div className='price-div'>
									<label className='mobile'>Price</label>
									<input
										value={item.price}
										name='price'
										className='price'
										type='number'
									/>
								</div>
								<div className='price-div' id='total-input'>
									<label className='mobile'>Total</label>
									<input value={item.total} name='total' type='number' />
								</div>
								<img
									src={TrashCan}
									alt='delete'
									onClick={props.onDeleteItemHandler}
								/>
							</div>
						</div>
					))}
					{itemList}
					<button className='new-item' onClick={onAddItemHandler}>
						+ Add New Item
					</button>
					<div className='linear'></div>
				</div>
				<div className='button-div-bottom'>
					<button className='cancel' onClick={props.stopToggleEditingHandler}>
						Cancel
					</button>
					<button type='submit' className='save-send'>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditInvoice;
