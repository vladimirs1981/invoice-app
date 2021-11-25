import React, { useContext } from 'react';
import Empty from '../assets/svg/illustration-empty.svg';
import '../styles/InvoicesEmptyPage.scss';
import { ThemeContext } from '../context/theme';

const InvoicesEmptyPage = () => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	return (
		<div className='emptyDiv'>
			<img src={Empty}></img>
			<h2 style={{ color: theme.color }}>There is nothing here</h2>
			<p style={{ color: theme.paragrafColor }}>
				Create an invoice by clicking the <b>New</b> button and get started
			</p>
		</div>
	);
};

export default InvoicesEmptyPage;
