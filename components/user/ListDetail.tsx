import * as React from 'react';
import { useAsync } from 'react-async';
import styled from 'styled-components';
import { UserStateContext } from '../../context/user';

import { Plan, User } from '../../interfaces';
import FollowButton from './FollowButton';
import UserPhoto from './UserPhoto';
import Router from 'next/router';

type ListDetailProps = {
	item: User;
	isFollowed: boolean;
	plan: Plan;
};

const HostDetailContainer = styled.section`
	width: 100%;
	& > * {
		padding: 1rem 0;
		border-bottom: 1px solid #aaa;
		&:last-child {
			border-bottom: none;
		}
	}
	& table {
		width: 100%;
		min-width: 32em;
		margin: 0 auto 3em auto;
		text-align: center;
		border-collapse: collapse;
		font-size: 1em;
	}
	& th {
		padding: 0.75em 0;
	}
	& thead {
		background-color: #eee;
		border-top: 1px solid #aaa;
		border-bottom: 1px solid #aaa;
	}
	& td {
		padding: 1rem 0.5rem;
		border-bottom: 1px solid #aaa;
	}
	& .planRow {
		cursor: pointer;
	}

	& .profile {
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
		& .name {
			margin: 0;
			flex: 1;
			& h2 {
				margin: 0;
				margin-right: 1rem;
			}
		}
		& > .apply {
			flex: 1;
			display: flex;
			min-width: 300px;
			max-width: 360px;
			justify-content: flex-end;
			margin-top: 1rem;

			& > div {
				flex: 1;
			}
			& > * {
				margin: 0 1em;
			}
		}
	}
	& .basicInfo,
	& .additionalInfo {
		& > table {
			width: 100%;
			& tr.introduction {
				white-space: pre;
				vertical-align: baseline;
			}
			& td {
				padding: 0.5rem;
				&:first-child {
					width: 20%;
				}
			}
		}
	}
	& .reviews {
		& > div:first-child {
			display: flex;
			align-items: center;
			margin: 1em 0;
			& > h3 {
				margin: 0 0.5em 0 0;
			}
		}
	}

	& .flex {
		display: flex;
		align-items: center;
	}
`;

const ListDetail = ({ item: user, isFollowed, plan }: ListDetailProps) => {
	console.log(plan);
	const currentUser = React.useContext(UserStateContext);
	const {
		data: followed,
		error,
		isLoading,
	} = useAsync({
		_promiseFn: isFollowed,
		get promiseFn() {
			return this._promiseFn;
		},
		set promiseFn(value) {
			this._promiseFn = value;
		},
		userId: user.id,
		followerId: currentUser.id,
	});
	const handleTrClickHandler = (
		e: React.MouseEvent<HTMLTableRowElement>,
		planId: number,
	) => {
		e.preventDefault();
		Router.push(`/plans/${planId}`);
	};
	return (
		// <div>
		// 	<h1>Detail for {user.name}</h1>
		// 	<p>ID: {user.id}</p>
		// 	<FollowButton userId={user.id!} initialFollowed={isFollowed} />
		// </div>
		<HostDetailContainer>
			<div className='profile'>
				<UserPhoto src={user.photo} width={8} margin='0 1rem 0 0' />
				<div className='name'>
					<div className='flex'>
						<h2>{user.nickname}</h2>
						<h4>{user.follower}</h4>
						{user.id !== undefined ? (
							<FollowButton
								userId={user.id}
								initialFollowed={(followed as boolean) ?? false}
							/>
						) : (
							''
						)}
					</div>
				</div>
			</div>

			<div className='basicInfo'>
				<h3>유저정보</h3>
				<table>
					<tbody>
						<tr></tr>
					</tbody>
				</table>
			</div>
			<div className='basicInfo'>
				<h3>{user.nickname}님이 작성한 플랜</h3>
				{plan.length === 0 ? (
					<p>작성한 플랜이 없습니다.</p>
				) : (
					<table>
						<thead>
							<tr>
								<td>작성일</td>
								<td>제목</td>
								<td>조회수</td>
							</tr>
						</thead>
						<tbody>
							{plan.map(item => (
								<tr
									className='planRow'
									onClick={e => handleTrClickHandler(e, item.id)}
								>
									<td style={{ width: '30%' }}>{item.createTime}</td>
									<td style={{ width: '60%' }}>{item.title}</td>
									<td style={{ width: '10%' }}>{item.hit}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</HostDetailContainer>
	);
};

export default ListDetail;
