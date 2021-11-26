import React, { useState, useContext } from 'react';
import '../styles/EditInvoice.scss';
import { ThemeContext } from '../context/theme';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';
import Calendar from '../assets/svg/icon-calendar.svg';

const options = [
	{
		label: 'Net 1 Day',
		value: 1,
	},
	{
		label: 'Net 7 Days',
		value: 7,
	},
	{
		label: 'Net 14 Days',
		value: 14,
	},
	{
		label: 'Net 30 Days',
		value: 30,
	},
];

const EditInvoice = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	const [editedInvoice, setEditedInvoice] = useState(props.newData);
	const [idTally, setIdTally] = useState(1);
	const [selectValue, setSelectValue] = useState(editedInvoice.paymentTerms);
	const ItemAddSchema = {
		id: 0,
		name: '',
		quantity: 0,
		price: 0,
		total: 0,
	};

	const setPaymentDueDate = () => {
		const paymentDueDate = new Date(
			new Date(editedInvoice.createdAt).setDate(
				new Date(editedInvoice.createdAt).getDate() + Number(selectValue)
			)
		);
		let month = paymentDueDate.toLocaleString('en-US', { month: 'short' });
		let day = paymentDueDate.toLocaleString('en-US', { day: '2-digit' });
		let year = paymentDueDate.getFullYear();

		const paymentDueUpdate = editedInvoice;
		paymentDueUpdate.paymentDue = `${day} ${month} ${year}`;
		setEditedInvoice({ ...paymentDueUpdate });
	};

	const handleChange = (type, value, id) => {
		let data = editedInvoice;

		const index = id === undefined ? editedInvoice.items.length - 1 : id;

		switch (type) {
			case 'senderAddress.street':
				data.senderAddress.street = value;
				break;
			case 'senderAddress.city':
				data.senderAddress.city = value;
				break;

			case 'senderAddress.postCode':
				data.senderAddress.postCode = value;
				break;
			case 'senderAddress.country':
				data.senderAddress.country = value;
				break;
			case 'clientName':
				data.clientName = value;
				break;
			case 'clientEmail':
				data.clientEmail = value;
				break;
			case 'clientAddress.street':
				data.clientAddress.street = value;
				break;
			case 'clientAddress.city':
				data.clientAddress.city = value;
				break;
			case 'paymentTerms':
				data.paymentTerms = value;
				setSelectValue(value);
				setPaymentDueDate();
				break;
			case 'clientAddress.postCode':
				data.clientAddress.postCode = value;
				break;
			case 'clientAddress.country':
				data.clientAddress.country = value;
				break;
			case 'createdAt':
				data.createdAt = value;
				break;
			case 'description':
				data.description = value;
				break;
			case 'item.name':
				data.items[index].name = value;
				break;
			case 'item.quantity':
				value < 0
					? (data.items[index].quantity = Number(0))
					: (data.items[index].quantity = Number(value));
				break;
			case 'item.price':
				value < 0
					? (data.items[index].price = 0)
					: (data.items[index].price = Number(value));
				break;
			case 'deleteItem':
				if (data.items.length === 1) {
					break;
				}
				setIdTally(idTally - 1);
				data.items.splice(index, 1);
				break;
			case 'addItem':
				const newItem = ItemAddSchema;
				newItem.id = idTally;
				setIdTally(idTally + 1);
				data.items.push(newItem);
				break;

			default:
				break;
		}
		setEditedInvoice({ ...data });
	};

	const grandTotal = (input) => {
		let grandTotal = 0;
		input.items.forEach((item) => {
			const amount = item.price * item.quantity;
			item.total = amount;
			grandTotal += amount;
		});
		input.total = grandTotal;
		return input;
	};

	const handleSaveChange = (e) => {
		e.preventDefault();
		const output = grandTotal(editedInvoice);
		props.setNewData(output);
		props.stopToggleEditingHandler();
	};

	const itemsList = editedInvoice.items.map((item) => {
		const itemTotal = (item.quantity * item.price).toFixed(2);

		const index = editedInvoice.items.indexOf(item);
		return (
			<div
				key={item.id}
				className='item'
				style={{ backgroundColor: theme.editNew }}
			>
				<div className='new-invoice-control' id='item-name'>
					<label style={{ color: theme.darkGrey }} className='mobile'>
						Item Name
					</label>
					<input
						style={{
							color: theme.color,
							backgroundColor: theme.invoiceBcg,
							border: '1px solid' + theme.borderColor,
						}}
						type='text'
						value={item.name}
						name='item.name'
						onChange={(e) => handleChange(e.target.name, e.target.value, index)}
					/>
				</div>
				<div className='item-stats'>
					<div className='qty-div'>
						<label style={{ color: theme.darkGrey }} className='mobile'>
							Qty.
						</label>
						<input
							style={{
								color: theme.color,
								backgroundColor: theme.invoiceBcg,
								border: '1px solid' + theme.borderColor,
							}}
							value={item.quantity}
							name='item.quantity'
							className='quantity'
							type='number'
							onChange={(e) =>
								handleChange(e.target.name, e.target.value, index)
							}
						/>
					</div>
					<div className='price-div'>
						<label style={{ color: theme.darkGrey }} className='mobile'>
							Price
						</label>
						<input
							style={{
								color: theme.color,
								backgroundColor: theme.invoiceBcg,
								border: '1px solid' + theme.borderColor,
							}}
							value={item.price.toFixed(2)}
							name='item.price'
							className='price'
							type='number'
							onChange={(e) =>
								handleChange(e.target.name, e.target.value, index)
							}
						/>
					</div>
					<div className='price-div' id='total-input'>
						<label style={{ color: theme.darkGrey }} className='mobile'>
							Total
						</label>
						<h4 style={{ color: theme.paragrafColor }}>{itemTotal}</h4>
					</div>
					<svg
						width='13'
						height='16'
						xmlns='http://www.w3.org/2000/svg'
						onClick={() => handleChange('deleteItem', item, index)}
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
	});

	return (
		<div className='edit-invoice-container'>
			<div className='main-edit' style={{ backgroundColor: theme.editNew }}>
				<div className='header-edit' style={{ backgroundColor: theme.editNew }}>
					<img src={LeftArrow} onClick={props.stopToggleEditingHandler} />

					<h2>Go back</h2>
				</div>

				<form
					action=''
					className='main-form-edit'
					style={{ backgroundColor: theme.editNew }}
				>
					<h2 style={{ color: theme.color }}>
						Edit <span>#</span>
						{props.newData.id}
					</h2>
					<div className='bill-from'>
						<h3>Bill From</h3>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }}>Street Address</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.senderAddress.street}
								name='senderAddress.street'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>

						<div className='small-input'>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>City</label>
								<input
									style={{
										color: theme.color,
										backgroundColor: theme.invoiceBcg,
										border: '1px solid' + theme.borderColor,
									}}
									value={props.newData.senderAddress.city}
									name='senderAddress.city'
									className='small'
									type='text'
									onChange={(e) => handleChange(e.target.name, e.target.value)}
								/>
							</div>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>Post Code</label>
								<input
									style={{
										color: theme.color,
										backgroundColor: theme.invoiceBcg,
										border: '1px solid' + theme.borderColor,
									}}
									value={props.newData.senderAddress.postCode}
									name='senderAddress.postCode'
									className='small'
									type='text'
									onChange={(e) => handleChange(e.target.name, e.target.value)}
								/>
							</div>
						</div>
						<div id='country-input' className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>
								Country
							</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.senderAddress.country}
								name='senderAddress.country'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
					</div>
					<div className='bill-to'>
						<h3>Bill To</h3>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>
								Client's Name
							</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.clientName}
								name='clientName'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>
								Client's Email
							</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.clientEmail}
								name='clientEmail'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>
								Street Address
							</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.clientAddress.street}
								name='clientAddress.street'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className='small-input'>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>City</label>
								<input
									style={{
										color: theme.color,
										backgroundColor: theme.invoiceBcg,
										border: '1px solid' + theme.borderColor,
									}}
									value={props.newData.clientAddress.city}
									name='clientAddress.city'
									className='small'
									type='text'
									onChange={(e) => handleChange(e.target.name, e.target.value)}
								/>
							</div>
							<div className='new-invoice-control'>
								<label style={{ color: theme.darkGrey }}>Post Code</label>
								<input
									style={{
										color: theme.color,
										backgroundColor: theme.invoiceBcg,
										border: '1px solid' + theme.borderColor,
									}}
									value={props.newData.clientAddress.postCode}
									name='clientAddress.postCode'
									className='small'
									type='text'
									onChange={(e) => handleChange(e.target.name, e.target.value)}
								/>
							</div>
						</div>
						<div id='country-div' className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }}>Country</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.clientAddress.country}
								name='clientAddress.country'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className='new-invoice-control' id='date-control'>
							<label style={{ color: theme.darkGrey }}>Invoice Date</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.createdAt}
								name='createdAt'
								type='date'
								disabled
							/>
							<img src={Calendar} alt='calendar' />
						</div>
						<div className='new-invoice-control' id='payment-control'>
							<label style={{ color: theme.darkGrey }}>Payment Terms</label>
							<select
								name='paymentTerms'
								value={props.newData.paymentTerms}
								onChange={(e) => handleChange(e.target.name, e.target.value)}
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
							>
								{options.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }}>
								Project Description
							</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={props.newData.description}
								name='description'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
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
						{itemsList}
						<button
							style={{
								color: theme.darkGrey,
								backgroundColor: theme.bottomDiv,
							}}
							className='new-item'
							onClick={() => {
								handleChange('addItem', null, idTally);
							}}
						>
							+ Add New Item
						</button>
						<div className='linear'></div>
					</div>

					<div className='button-div-bottom'>
						<button
							style={{
								color: theme.darkGrey,
								backgroundColor: theme.bottomDiv,
							}}
							className='cancel'
							onClick={props.stopToggleEditingHandler}
						>
							Cancel
						</button>
						<button
							type='submit'
							className='save-send'
							onClick={handleSaveChange}
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditInvoice;
