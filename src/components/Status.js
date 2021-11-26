import React from 'react';
import '../styles/Status.scss';

const Status = (props) => {
	return (
		<div
			className={`status ${
				props.status === 'paid'
					? 'paid'
					: props.status === 'pending'
					? 'pending'
					: 'draft'
			}`}
		>
			<div className='circle-div'></div>
			<h3>{props.status}</h3>
		</div>
	);
};

export default Status;
