import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/theme';
import '../styles/NewInvoice.scss';
import LeftArrow from '../assets/svg/icon-arrow-left.svg';
import useForm from '../useForm';
import validate from '../validateInfo';

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

const NewInvoice = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	const [idTally, setIdTally] = useState(1);
	const { setErrors, setIsSubmitting, errors } = useForm(validate);
	const [newInvoice, setNewInvoice] = useState({
		clientAddress: {
			street: '',
			city: '',
			postCode: '',
			country: '',
		},
		clientEmail: '',
		paymentTerms: null,
		clientName: '',
		createdAt: '',
		description: '',
		items: [
			{
				id: 0,
				name: '',
				quantity: 0,
				price: 0,
				total: 0,
			},
		],
		paymentDue: '',
		senderAddress: {
			street: '',
			city: '',
			postCode: '',
			country: '',
		},
		total: 'Not Set',
	});

	const [selectValue, setSelectValue] = useState(newInvoice.paymentTerms);

	const ItemAddSchema = {
		id: 0,
		name: '',
		quantity: 0,
		price: 0,
		total: 0,
	};

	const setPaymentDueDate = () => {
		const paymentDueDate = new Date(
			new Date(newInvoice.createdAt).setDate(
				new Date(newInvoice.createdAt).getDate() + Number(selectValue)
			)
		);
		let month = paymentDueDate.toLocaleString('en-US', { month: 'short' });
		let day = paymentDueDate.toLocaleString('en-US', { day: '2-digit' });
		let year = paymentDueDate.getFullYear();

		const paymentDueUpdate = newInvoice;
		paymentDueUpdate.paymentDue = `${day} ${month} ${year}`;
		setNewInvoice({ ...paymentDueUpdate });
	};

	const handleChange = (type, value, id) => {
		let data = newInvoice;

		const index = id === undefined ? newInvoice.items.length - 1 : id;

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
			case 'paymentTerms':
				data.paymentTerms = value;
				setSelectValue(value);
				setPaymentDueDate();
				break;
			case 'clientAddress.city':
				data.clientAddress.city = value;
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
		setNewInvoice({ ...data });
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

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(validate(newInvoice));
		setIsSubmitting(true);
		const output = grandTotal(newInvoice);
		props.onSaveInvoiceData(output);
	};

	const handleDraftSubmit = (e) => {
		e.preventDefault();
		const output = grandTotal(newInvoice);
		props.onDraftSaveInvoiceData(output);
	};

	const itemsList = newInvoice.items.map((item) => {
		const itemTotal = (item.quantity * item.price).toFixed(2);

		const index = newInvoice.items.indexOf(item);
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
						value={item.name}
						name='item.name'
						type='text'
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
					<div className='price-div'>
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
		<div className='new-invoice-container'>
			<div className='main-new' style={{ backgroundColor: theme.editNew }}>
				<div className='header-new' style={{ backgroundColor: theme.editNew }}>
					<img src={LeftArrow} onClick={props.stopEditingHandler} />

					<h2>Go back</h2>
				</div>

				<form className='main-form' style={{ backgroundColor: theme.editNew }}>
					<h2 style={{ color: theme.color }}>New Invoice</h2>
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
								value={newInvoice.senderAddress.street}
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
									value={newInvoice.senderAddress.city}
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
									value={newInvoice.senderAddress.postCode}
									name='senderAddress.postCode'
									className='small'
									type='text'
									onChange={(e) => handleChange(e.target.name, e.target.value)}
								/>
							</div>
						</div>
						<div className='new-invoice-control' id='country-input'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>
								Country
							</label>
							{/* {errors.senderAddress.country && (
								<small>{errors.senderAddress.country}</small>
							)} */}
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={newInvoice.senderAddress.country}
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
							{errors.clientName && <small>{errors.clientName}</small>}
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={newInvoice.clientName}
								name='clientName'
								type='text'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className='new-invoice-control'>
							<label style={{ color: theme.darkGrey }} htmlFor=''>
								Client's Email
							</label>
							{errors.clientEmail && <small>{errors.clientEmail}</small>}
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={newInvoice.clientEmail}
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
								value={newInvoice.clientAddress.street}
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
									value={newInvoice.clientAddress.city}
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
									value={newInvoice.clientAddress.postCode}
									name='clientAddress.postCode'
									className='small'
									type='text'
									onChange={(e) => handleChange(e.target.name, e.target.value)}
								/>
							</div>
						</div>
						<div className='new-invoice-control' id='country-div'>
							<label style={{ color: theme.darkGrey }}>Country</label>
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={newInvoice.clientAddress.country}
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
								value={newInvoice.createdAt}
								name='createdAt'
								type='date'
								onChange={(e) => handleChange(e.target.name, e.target.value)}
							/>
						</div>
						<div className='new-invoice-control' id='payment-control'>
							<label style={{ color: theme.darkGrey }}>Payment Terms</label>
							<select
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								name='paymentTerms'
								value={newInvoice.paymentTerms}
								onChange={(e) => handleChange(e.target.name, e.target.value)}
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
							{/* {errors.description && <small>{errors.description}</small>} */}
							<input
								style={{
									color: theme.color,
									backgroundColor: theme.invoiceBcg,
									border: '1px solid' + theme.borderColor,
								}}
								value={newInvoice.description}
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
							className='discard'
							onClick={props.stopEditingHandler}
						>
							Discard
						</button>
						<button className='draft' onClick={handleDraftSubmit}>
							Save As Draft
						</button>
						<button type='submit' className='save-send' onClick={handleSubmit}>
							Save And Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default NewInvoice;
