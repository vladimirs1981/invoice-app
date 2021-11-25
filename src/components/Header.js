import React, { useContext } from 'react';
import '../styles/Header.scss';
import plus from '../assets/svg/icon-plus.svg';
import InvoicesFilter from './InvoicesFilter';
import { ThemeContext } from '../context/theme';

const Header = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	return (
		<div className='header-div'>
			<div className='left-div'>
				<h2 style={{ color: theme.color }}>Invoices</h2>
				<p style={{ color: theme.paragrafColor }}>
					<span>There are </span>
					{props.size}
					<span> total</span> invoices
				</p>
			</div>
			<InvoicesFilter
				selected={props.filteredStatus}
				onChangeFilter={props.filterChangeHandler}
			/>
			<div className='new-button-div' onClick={props.startEditingHandler}>
				<div className='circle-div'>
					<img src={plus} />
				</div>
				<h3>
					New <span>Invoice</span>
				</h3>
			</div>
		</div>
	);
};

export default Header;
