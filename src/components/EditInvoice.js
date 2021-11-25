import React, { useState, useContext } from 'react';
import '../styles/EditInvoice.scss';
import { ThemeContext } from '../context/theme';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';
import Calendar from '../assets/svg/icon-calendar.svg';

const Item = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	return (
		<div className='item' style={{ backgroundColor: theme.editNew }}>
			<div className='new-invoice-control' id='item-name'>
				<label style={{ color: theme.darkGrey }} className='mobile'>Item Name</label>
				<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }} type='text' />
			</div>
			<div className='item-stats'>
				<div className='qty-div'>
					<label style={{ color: theme.darkGrey }} className='mobile'>Qty.</label>
					<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }} className='quantity' type='number' />
				</div>
				<div className='price-div'>
					<label style={{ color: theme.darkGrey }} className='mobile'>Price</label>
					<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }} className='price' type='number' />
				</div>
				<div className='price-div' id='total-input'>
					<label style={{ color: theme.darkGrey }} className='mobile'>Total</label>
					<input type='number' />
				</div>
				<svg
					width='13'
					height='16'
					xmlns='http://www.w3.org/2000/svg'
					onClick={props.onDeleteItemHandler}
				>
					<path
						className='delete-icon'
						d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
						fill='#888EB0'
						fill-rule='nonzero'
					/>
				</svg>
			</div>
		</div>
	);
};

const EditInvoice = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

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
		<div className='edit-invoice-container'>
			<div className='main-edit' style={{ backgroundColor: theme.editNew }}>
				<div className='header-edit' style={{ backgroundColor: theme.editNew }}>
					<img src={LeftArrow} onClick={props.stopToggleEditingHandler} />

					<h2>Go back</h2>
				</div>

				<form action='' className='main-form-edit' style={{ backgroundColor: theme.editNew }}>
					<h2 style={{ color: theme.color }}>
						Edit <span>#</span>
						{props.newData.id}
					</h2>
					<div className='bill-from'>
						<h3>Bill From</h3>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }}>Street Address</label>
							<input
								style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.senderAddress.street}
								name='street'
								type='text'
							/>
						</div>

						<div className='small-input'>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>City</label>
								<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
									value={props.newData.senderAddress.city}
									name='city'
									className='small'
									type='text'
								/>
							</div>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>Post Code</label>
								<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
									value={props.newData.senderAddress.postCode}
									name='postCode'
									className='small'
									type='text'
								/>
							</div>
						</div>
						<div id='country-input' className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>Country</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.senderAddress.country}
								name='country'
								type='text'
							/>
						</div>
					</div>
					<div className='bill-to'>
						<h3>Bill To</h3>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>Client's Name</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.clientName}
								name='clientName'
								type='text'
							/>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>Client's Email</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.clientEmail}
								name='clientEmail'
								type='text'
							/>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>Street Address</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.clientAddress.street}
								name='street'
								type='text'
							/>
						</div>
						<div className='small-input'>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>City</label>
								<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
									value={props.newData.clientAddress.city}
									name='city'
									className='small'
									type='text'
								/>
							</div>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>Post Code</label>
								<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
									value={props.newData.clientAddress.postCode}
									name='postCode'
									className='small'
									type='text'
								/>
							</div>
						</div>
						<div id='country-div' className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }}>Country</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.clientAddress.country}
								name='country'
								type='text'
							/>
						</div>
						<div className='new-invoice-control' id='date-control'>
							<label style={{ color: theme.darkGrey }}>Invoice Date</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.createdAt}
								name='createdAt'
								type='date'
								disabled
							/>
							<img src={Calendar} alt='calendar' />
						</div>
						<div className='new-invoice-control' id='payment-control'>
							<label style={{ color: theme.darkGrey }}>Payment Terms</label>
							<select name='paymentTerms' value='newData.paymentTerms' style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}>
								<option value='1'>Net 1 Day</option>
								<option value='7'>Net 7 Days</option>
								<option value='14'>Net 14 Days</option>
								<option value='30'>Net 30 Days</option>
							</select>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }}>Project Description</label>
							<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
								value={props.newData.description}
								name='description'
								type='text'
							/>
						</div>
					</div>
					<div className='item-list'>
						<h4>Item List</h4>
						<div className='hidden-title'>
							<div className='hidden-name'>
								<h4 style={{ color: theme.darkGrey }}>Item Name</h4>
							</div>
							<div className='hidden-qty'>
								<h4 style={{ color: theme.darkGrey }}>Qty.</h4>
							</div>
							<div className='hidden-price'>
								<h4 style={{ color: theme.darkGrey }}>Price</h4>
							</div>
							<div className='hidden-total'>
								<h4 style={{ color: theme.darkGrey }}>Total</h4>
							</div>
						</div>
						{props.newData.items.map((item, index) => (
							<div className='item'>
								<div className='new-invoice-control' id='item-name'>
									<label style={{ color: theme.darkGrey }} className='mobile'>Item Name</label>
									<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }} value={item.name} name='name' type='text' />
								</div>
								<div className='item-stats'>
									<div className='qty-div'>
										<label style={{ color: theme.darkGrey }} className='mobile'>Qty.</label>
										<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
											value={item.quantity}
											name='quantity'
											className='quantity'
											type='number'
										/>
									</div>
									<div className='price-div'>
										<label style={{ color: theme.darkGrey }} className='mobile'>Price</label>
										<input style={{ color: theme.color, backgroundColor: theme.invoiceBcg, border: '1px solid' + theme.borderColor }}
											value={item.price}
											name='price'
											className='price'
											type='number'
										/>
									</div>
									<div className='price-div' id='total-input'>
										<label style={{ color: theme.darkGrey }} className='mobile'>Total</label>
										<input
											value={item.total}
											name='total'

											type='number' />
									</div>
									<svg
										width='13'
										height='16'
										xmlns='http://www.w3.org/2000/svg'
										onClick={onDeleteItemHandler}
									>
										<path
											className='delete-icon'
											d='M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z'
											fill='#888EB0'
											fill-rule='nonzero'
										/>
									</svg>
								</div>
							</div>
						))}
						{itemList}
						<button style={{ color: theme.darkGrey, backgroundColor: theme.bottomDiv }} className='new-item' onClick={onAddItemHandler}>
							+ Add New Item
						</button>
						<div className='linear'></div>
					</div>

					<div className='button-div-bottom'>
						<button style={{ color: theme.darkGrey, backgroundColor: theme.bottomDiv }} className='cancel' onClick={props.stopToggleEditingHandler}>
							Cancel
						</button>
						<button type='submit' className='save-send'>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditInvoice;
