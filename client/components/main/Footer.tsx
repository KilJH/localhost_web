import React from 'react';
interface Props {}

const Footer = (props: Props) => {
	return (
		<div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
			Copyright © PlanBee
			<br />
			길진혁 <a href="https://github.com/KilJH">https://github.com/KilJH</a>
			<br />
			이찬빈
			<br />
			황인종
		</div>
	);
};

export default Footer;
