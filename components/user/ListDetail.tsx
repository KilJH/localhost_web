import * as React from 'react';
import { useAsync } from 'react-async';
import styled from 'styled-components';
import { UserStateContext } from '../../context/user';

import { Board, Plan, User } from '../../interfaces';
import FollowButton from './FollowButton';
import UserPhoto from './UserPhoto';
import Router from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';

type ListDetailProps = {
	item: User;
	isFollowed: boolean;
	plan: Plan[];
};

const UserDetailContainer = styled.section`
	width: 100%;
	& > * {
		padding: 1rem 0;
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
		min-width: 5em;
	}
	& .infoDiv {
		margin: 0 0 0 auto;
		width: 20em;
	}

	& .postsDiv,
	& .plansDiv,
	& .followersDiv,
	& .followingDiv {
		display: inline-block;
		text-align: center;
		margin: 0 0 0.5em 0;
	}
	& .postsDiv,
	& .plansDiv {
		width: 20%;
	}
	& .followersDiv,
	& .followingDiv {
		width: 30%;
	}
	& .item {
		margin: 0.25em 0;
	}
	& .profile {
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		flex-wrap: wrap;
		border-bottom: 1px solid #aaa;
		& .name {
			margin: 0;
			flex: 1;
			& h2 {
				margin: 1em 0 1em 0.25em;
			}
			& > div > div > button {
				margin: 0.25em 0 0 auto;
				width: 100%;
				display: block;
			}
		}
	}
	& .basicInfo {
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
	& .flex {
		display: flex;
		align-items: center;
	}
	& .row {
		cursor: pointer;
		&:hover {
			background-color: rgba(81, 151, 213, 0.1);
		}
	}
	& .date {
		width: 30%;
	}
	& .title {
		width: 60%;
	}
	& .hits {
		width: 10%;
	}
`;

const ListDetail = ({ item: user, isFollowed, plan }: ListDetailProps) => {
	const currentUser = useContext(UserStateContext);
	const [followers, setFollowers] = useState<Number>(0);
	const [following, setFollowing] = useState<Number>(0);
	const [isFollowButtonClicked, setIsFollowButtonClicked] =
		useState<boolean>(false);
	const [posts, setPosts] = useState<Board[]>();
	const { data: followed } = useAsync({
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

	const handlePostClickHandler = (
		e: React.MouseEvent<HTMLTableRowElement>,
		postId: number | undefined,
	) => {
		e.preventDefault();
		Router.push(`/board/${postId}`);
	};
	const handlePlanClickHandler = (
		e: React.MouseEvent<HTMLTableRowElement>,
		planId: number | undefined,
	) => {
		e.preventDefault();
		Router.push(`/plans/${planId}`);
	};

	useEffect(() => {
		axios
			.post(`/api/user/followingList`, {
				userId: user.id,
			})
			.then((res: AxiosResponse<any>) => {
				if (res.data.success) {
					setFollowing(res.data.followingUsers.length);
				}
			});
		axios
			.post(`/api/user/followerList`, {
				userId: user.id,
			})
			.then((res: AxiosResponse<any>) => {
				if (res.data.success) {
					setFollowers(res.data.followersNum);
				}
			});
		axios
			.post(`/api/board/search`, {
				type: 'nickname',
				item: user.nickname,
			})
			.then((res: AxiosResponse<any>) => {
				if (res.data.success) {
					setPosts(res.data.list);
				}
			});
	}, []);
	useEffect(() => {
		axios
			.post(`/api/user/followerList`, {
				userId: user.id,
			})
			.then((res: AxiosResponse<any>) => {
				if (res.data.success) {
					setFollowers(res.data.followersNum);
				}
			});
	}, [isFollowButtonClicked]);

	const dateFormat = (date: string) => {
		let result;
		if (date.includes('-')) result = date.slice(0, 10);
		else result = date;
		return result;
	};
	return (
		<UserDetailContainer>
			<div className='profile'>
				<UserPhoto src={user.photo} width={8} margin='0 1rem 0 0' />
				<div className='name'>
					<div className='flex'>
						<h2>{user.nickname}</h2>
						<div className='infoDiv'>
							<div className='postsDiv'>
								<h4 className='item'>Posts </h4>
								<h4 className='item'>{posts?.length}</h4>
							</div>
							<div className='plansDiv'>
								<h4 className='item'>Plans </h4>
								<h4 className='item'>{plan.length}</h4>
							</div>
							<div className='followersDiv'>
								<h4 className='item'>Followers </h4>
								<h4 className='item'>{followers}</h4>
							</div>
							<div className='followingDiv'>
								<h4 className='item'>Following </h4>
								<h4 className='item'>{following}</h4>
							</div>

							{user.id !== undefined ? (
								<FollowButton
									userId={user.id}
									initialFollowed={(followed as boolean) ?? false}
									onClickHandler={() =>
										setIsFollowButtonClicked(!isFollowButtonClicked)
									}
								/>
							) : (
								''
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='basicInfo'>
				<h3>{user.nickname}님이 작성한 글</h3>
				{posts?.length === 0 ? (
					<p>작성한 게시물이 없습니다.</p>
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
							{posts?.map(item => (
								<tr
									className='row'
									onClick={e => handlePostClickHandler(e, item.id)}
								>
									<td className='date'>{dateFormat(item.createTime)}</td>
									<td className='title'>{item.title}</td>
									<td className='hits'>{item.hit}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
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
									className='row'
									onClick={e => handlePlanClickHandler(e, item.id)}
								>
									<td className='date'>{dateFormat(item.createTime)}</td>
									<td className='title'>{item.title}</td>
									<td className='hits'>{item.hit}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</UserDetailContainer>
	);
};

export default ListDetail;
