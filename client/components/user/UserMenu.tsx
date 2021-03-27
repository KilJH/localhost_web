import React, { useContext } from 'react';
import { User } from '../../interfaces/index';
import styled from 'styled-components';
import Link from 'next/link';
import SERVER from '../../utils/url';
import axios from 'axios';
import { UserStateContext } from '../../context/user';

interface Props {}

const UserMenuContainer = styled.div`
	width: 16rem;
	padding: 2rem;
	& h2 {
		text-align: center;
	}
`;

const UserPhoto = styled.img`
	width: 5em;
	border-radius: 50%;
	margin: 0 auto;
	display: block;
`;

const MenuList = styled.nav`
	& ul {
		list-style: none;
		padding: 0;
	}
	& li {
		padding: 0.5em;
		box-sizing: border-box;

		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;

const UserMenu = (props: Props) => {
	const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		const res = await axios.get(`${SERVER}/api/auth/logout`, {
			withCredentials: true,
		});
		location.href = '/';
	};

	const currentUser: User = useContext(UserStateContext);

	return (
		<UserMenuContainer>
			<UserPhoto src={currentUser.photo || '/img/default.jpg'} />
			<h2>{currentUser.nickname}</h2>

			<MenuList>
				<ul>
					<Link href='/users/mypage'>
						<a>
							<li>마이페이지</li>
						</a>
					</Link>

					<Link as='/users/mypage' href='/users/mypage?tab=1'>
						<a>
							<li>팔로우 확인</li>
						</a>
					</Link>
					<Link as='/users/mypage' href='/users/mypage?tab=2'>
						<a>
							<li>내가 쓴 글</li>
						</a>
					</Link>
					<Link as='/users/mypage' href='/users/mypage?tab=3'>
						<a>
							<li>나의 여행</li>
						</a>
					</Link>
					<hr></hr>
					<Link href=''>
						<li>
							<button onClick={onLogout}>로그아웃</button>
						</li>
					</Link>
				</ul>
			</MenuList>
		</UserMenuContainer>
	);
};

export default UserMenu;
