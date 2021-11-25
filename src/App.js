import React, { useState, useContext } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './app.scss';
import data from './data/data.json';

import Navbar from './components/Navbar';
import Invoices from './components/Invoices';
import ViewInvoice from './components/ViewInvoice';
import { ThemeContext } from './context/theme';

function App() {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
	console.log(theme);
	const [currentData, setCurrentData] = useState(data);

	const addInvoiceHandler = (invoice) => {
		setCurrentData((prevInvoices) => {
			return [invoice, ...prevInvoices];
		});
	};

	return (
		<BrowserRouter>
			<div className='app' style={{ backgroundColor: theme.backgroundColor }}>
				<Navbar />
				<Route
					path='/'
					exact
					component={() => (
						<Invoices invoices={currentData} onAddInvoice={addInvoiceHandler} />
					)}
				/>
				<Route
					path='/detail/:id'
					component={() => (
						<ViewInvoice
							invoices={currentData}
							setCurrentData={setCurrentData}
						/>
					)}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;
