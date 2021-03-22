import React from 'react';
interface Props {}

const Footer = (props: Props) => {
	return (
		<div style={{ textAlign: 'center', fontSize: '0.8rem' }}>
			Copyright © localhost
			<br />
			길진혁 <a href="https://github.com/KilJH">https://github.com/KilJH</a>
			<br />
			이찬빈 <a href="https://github.com/KilJH">https://github.com/SiaXia</a>
			<br />
			황인종 <a href="https://github.com/KilJH">https://github.com/Injong_</a>
		</div>
	);
};

export default Footer;
