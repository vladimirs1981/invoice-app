import React from 'react';
import '../styles/Navbar.scss';

import logo from '../assets/svg/logo.svg';
import sun from '../assets/svg/icon-sun.svg';
import moon from '../assets/svg/icon-moon.svg';
import avatar from '../assets/img/image-avatar.jpg';

const Navbar = () => {
	return (
		<div className='main-navbar-div'>
			<div className='left-div'>
				<div className='inner-left-div'></div>
				<img src={logo} />
			</div>
			<div className='right-div'>
				<div className='toggle-button-div'>
					<img className='sun' src={sun} />
					<img className='moon' src={moon} />
				</div>
				<div className='avatar-div'>
					<img src={avatar} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
