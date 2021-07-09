import React, { useContext } from 'react';
import { User } from '../../interfaces/index';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import { UserStateContext } from '../../context/user';
import UserPhoto from './UserPhoto';
import Button from '../reuse/Button';

const menulist = [
	{ url: '/users/mypage', name: '마이페이지' },
	{ url: '/users/mypage/host', name: '신청한 호스트' },
	{ url: '/users/mypage/plan', name: '나의 플랜' },
	{ url: '/users/mypage/board', name: '내가 쓴 글' },
];

const UserMenuContainer = styled.div`
	width: 16rem;
	padding: 2rem;
	& h2 {
		text-align: center;
	}
`;

const MenuList = styled.nav`
	& ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	& li {
		padding: 0.5em;
		box-sizing: border-box;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;

const UserMenu = () => {
	const onLogout = async () => {
		const res = await axios.get(`/api/auth/logout`, {
			withCredentials: true,
		});
		if (res.data.success) location.href = '/';
	};

	const currentUser: User = useContext(UserStateContext);
	return (
		<UserMenuContainer>
			<UserPhoto src={currentUser.photo} />
			<h2>{currentUser.nickname}</h2>

			<MenuList>
				<ul>
					{/* 공통메뉴 */}
					{menulist.map((menu, i) => (
						<Link href={menu.url} key={i}>
							<a>
								<li>{menu.name}</li>
							</a>
						</Link>
					))}

					<hr />
					{/* 호스트 */}
					{currentUser.isHost ? (
						<Link href='/hosts/myhosting'>
							<a>
								<li>나의 호스트정보</li>
							</a>
						</Link>
					) : (
						<Link href='/hosts/request'>
							<a>
								<li>호스트 신청</li>
							</a>
						</Link>
					)}

					{/* 관리자 */}
					{currentUser.isAdmin === 1 && (
						<>
							<hr />
							<Link href='/admin/notice'>
								<a>
									<li style={{ color: '#5197D5' }}>관리자페이지</li>
								</a>
							</Link>
						</>
					)}
				</ul>
				<hr />
				<Button
					onClick={onLogout}
					style={{ width: '100%', height: '3em', fontSize: '0.75rem' }}
					default
				>
					로그아웃
				</Button>
			</MenuList>
		</UserMenuContainer>
	);
};

export default UserMenu;
