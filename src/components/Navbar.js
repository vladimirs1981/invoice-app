import React, { useContext } from 'react';
import '../styles/Navbar.scss';
import { moon } from '../assets/images';
import { sun } from '../assets/images';
import logo from '../assets/svg/logo.svg';

import avatar from '../assets/img/image-avatar.jpg';
import { ThemeContext } from '../context/theme';

const Navbar = () => {
	const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

	const icon = {};
	return (
		<div className='main-navbar-div'>
			<div className='left-div'>
				<div className='inner-left-div'></div>
				<img src={logo} />
			</div>
			<div className='right-div'>
				<div className='toggle-button-div' onClick={toggleTheme}>
					{isDark ? sun : moon}
				</div>
				<div className='avatar-div'>
					<img src={avatar} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
