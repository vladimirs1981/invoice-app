import { createContext, useState, useEffect } from 'react';

const themes = {
	dark: {
		backgroundColor: '#141625',
		color: '#FFFFFF',
		paragrafColor: '#DFE3FA',
		selectBcg: '#252945',
		invoiceBcg: '#1e2139',
		h3color: '#FFFFFF',
		dateColor: '#FFFFFF',
		viewBcg: '##141625',
		statusColor: '#dfe3fa',
		infoColor: '#dfe3fa',
		bottomDiv: '#252945',
		darkGrey: '#888EB0',
		amountDue: '#0c0e16',
		editNew: '#141625',
		borderColor: '#252945',
	},
	light: {
		backgroundColor: '#F2F2F2',
		color: '#0C0E16',
		paragrafColor: '#888EB0',
		selectBcg: '#FFFFFF',
		invoiceBcg: '#FFFFFF',
		h3color: '#858BB2',
		dateColor: '#7E88C3',
		viewBcg: '#F8F8FB',
		statusColor: '#858BB2',
		infoColor: '#7E88C3',
		bottomDiv: '#F9FAFE',
		darkGrey: '#7E88C3',
		amountDue: '#373B53',
		editNew: '#FFFFFF',
		borderColor: '#DFE3FA',
	},
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(false);
	const theme = isDark ? themes.dark : themes.light;
	const toggleTheme = () => {
		localStorage.setItem('isDark', JSON.stringify(!isDark));
		setIsDark(!isDark);
	};

	useEffect(() => {
		const isDark = localStorage.getItem('isDark') === 'true';
		setIsDark(isDark);
	}, []);

	document.body.style.backgroundColor = theme.backgroundColor;
	return (
		<ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
			{children}
		</ThemeContext.Provider>
	);
};
