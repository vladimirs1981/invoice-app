import React, { useContext } from 'react';
import '../styles/InvoicesFilter.scss';
import { ThemeContext } from '../context/theme';

const InvoicesFilter = (props) => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	const dropDownChangeHandler = (e) => {
		props.onChangeFilter(e.target.value);
	};
	return (
		<div className='invoices-filter'>
			<div className='invoices-filter-control'>
				<label style={{ color: theme.color }}>
					Filter <span> by status</span>
				</label>
				<select value={props.selected} onChange={dropDownChangeHandler}>
					<option
						value='all'
						style={{ backgroundColor: theme.selectBcg, color: theme.color }}
					>
						All
					</option>
					<option
						value='draft'
						style={{ backgroundColor: theme.selectBcg, color: theme.color }}
					>
						Draft
					</option>
					<option
						value='pending'
						style={{ backgroundColor: theme.selectBcg, color: theme.color }}
					>
						Pending
					</option>
					<option
						value='paid'
						style={{ backgroundColor: theme.selectBcg, color: theme.color }}
					>
						Paid
					</option>
				</select>
			</div>
		</div>
	);
};

export default InvoicesFilter;
