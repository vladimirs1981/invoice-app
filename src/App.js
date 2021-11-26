import React, { useState, useContext, useEffect } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './app.scss';
import data from './data/data.json';

import Navbar from './components/Navbar';
import Invoices from './components/Invoices';
import ViewInvoice from './components/ViewInvoice';
import { ThemeContext } from './context/theme';
const localData = JSON.parse(localStorage.getItem('localData') || '[]');
function App() {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

	const [currentData, setCurrentData] = useState(data);
	const [savedData, setSavedData] = useState(localData);

	const addInvoiceHandler = (invoice) => {
		setCurrentData((prevInvoices) => {
			return [invoice, ...prevInvoices];
		});
	};

	useEffect(() => {
		localStorage.setItem('localData', JSON.stringify(currentData));
	}, []);

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
