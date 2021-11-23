import React, { useState } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import './app.scss';
import data from './data/data.json';

import Navbar from './components/Navbar';
import Invoices from './components/Invoices';
import ViewInvoice from './components/ViewInvoice';

function App() {
	const [currentData, setCurrentData] = useState(data);

	return (
		<BrowserRouter>
			<div>
				<Navbar />
				<Route
					path='/'
					exact
					component={() => <Invoices invoices={currentData} />}
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
