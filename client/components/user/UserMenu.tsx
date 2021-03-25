import React from 'react';
import { User } from '../../interfaces/index';
import styled from 'styled-components';
import Link from 'next/link';
import SERVER from '../../utils/url';
import axios from 'axios';

interface Props {
	user: User;
}

const UserMenuContainer = styled.div`
	width: 16rem;
	padding: 2rem;
`;

const UserPhoto = styled.img`
	border-radius: 50%;
`;

const UserMenu = (props: Props) => {
	const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const res = await axios.get(`${SERVER}/api/auth/logout`, {
			withCredentials: true,
		});
		location.href = '/';
	};

	return (
		<UserMenuContainer>
			{/* <UserPhoto src={props.user.photo||'/img/default.jpg'}/> */}
			<h2>{props.user.name}</h2>

			<ul>
				<Link href=''>
					<li>
						<a>마이페이지</a>
					</li>
				</Link>

				<hr></hr>
				<Link href=''>
					<li>
						<button onClick={onLogout}>로그아웃</button>
					</li>
				</Link>
			</ul>
		</UserMenuContainer>
	);
};

export default UserMenu;
