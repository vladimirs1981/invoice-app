import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NewInvoice.scss';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';
import TrashCan from '../assets/svg/icon-delete.svg';

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

const NewInvoice = (props) => {
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
		<div className='main'>
			<div className='header'>
				<img src={LeftArrow} onClick={props.stopEditingHandler} />

				<h2>Go back</h2>
			</div>

			<form action='' className='main-form'>
				<h2>New Invoice</h2>
				<div className='bill-from'>
					<h3>Bill From</h3>
					<div className='new-invoice-control'>
						<label>Street Address</label>
						<input type='text' />
					</div>

					<div className='small-input'>
						<div className='new-invoice-control'>
							<label>City</label>
							<input className='small' type='text' />
						</div>
						<div className='new-invoice-control'>
							<label>Post Code</label>
							<input className='small' type='text' />
						</div>
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Country</label>
						<input type='text' />
					</div>
				</div>
				<div className='bill-to'>
					<div className='new-invoice-control'>
						<label htmlFor=''>Client's Name</label>
						<input type='text' />
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Client's Email</label>
						<input type='text' />
					</div>
					<div className='new-invoice-control'>
						<label htmlFor=''>Street Address</label>
						<input type='text' />
					</div>
					<div className='small-input'>
						<div className='new-invoice-control'>
							<label>City</label>
							<input className='small' type='text' />
						</div>
						<div className='new-invoice-control'>
							<label>Post Code</label>
							<input className='small' type='text' />
						</div>
					</div>
					<div className='new-invoice-control'>
						<label>Country</label>
						<input type='text' />
					</div>
					<div className='new-invoice-control'>
						<label>Invoice Date</label>
						<input type='date' />
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
						<input type='text' />
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
