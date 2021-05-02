import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Host, Review } from '../../interfaces';
import Button from '../reuse/Button';
import UserPhoto from '../user/UserPhoto';
import LanguageTag from '../reuse/LanguageTag';
import Rating from '../reuse/Rating';
import HostReviewItem from './HostReviewItem';
import axios from 'axios';
import { UserStateContext } from '../../context/user';
import SERVER from '../../utils/url';
import Router from 'next/router';
import TravelStyleTag from '../reuse/TravelStyleTag';
import FollowButton from '../user/FollowButton';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { useAsync } from 'react-async';

interface Props {
	host: Host;
	reviews?: Review[];
	initialFollowed?: boolean;
}

const HostDetailContainer = styled.section`
	width: 100%;
	& > * {
		padding: 1rem 0;
		border-bottom: 1px solid #aaa;
		&:last-child {
			border-bottom: none;
		}
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

const isFollowed = async ({ userId, followerId }) => {
	const res = await axios.post(`${SERVER}/api/user/follow_check`, {
		userId,
		followerId,
	});
	return res.data;
};

const Loading = () => (
	<div
		style={{
			textAlign: 'center',
			height: '85vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}
	>
		<CircularProgress />
	</div>
);

const HostDetail = (props: Props) => {
	const { host, reviews, initialFollowed } = props;
	const [date, setDate] = useState(new Date());
	const onChangeDate = newDate => {
		if (newDate >= new Date()) setDate(newDate);
	};

	const currentUser = useContext(UserStateContext);

	const onApply = async () => {
		const res = await axios.post(`${SERVER}/api/host/application`, {
			id: currentUser.id,
			hostUserId: host.id,
			date: date,
		});

		res.data.success ? Router.push('/hosts') : alert('신청에 실패했습니다.');
	};

	const [on, setOn] = useState(false);

	const { data: followed, error, isLoading } = useAsync({
		promiseFn: isFollowed,
		userId: host.id,
		followerId: currentUser.id,
	});

	if (isLoading) return <Loading />;
	if (error)
		return (
			<div style={{ fontSize: '0.5em', color: '#e74c3c' }}>
				팔로우정보를 가져오지못했습니다.
			</div>
		);
	if (!followed) return null;

	return (
		<HostDetailContainer>
			<div className='profile'>
				<UserPhoto src={host.photo} width={8} margin='0 1rem 0 0' />
				<div className='name'>
					<Rating rating={host.rating || 0} isFilled />
					<div className='flex'>
						<h2>{host.nickname}</h2>
						<FollowButton
							userId={host.id}
							initialFollowed={followed ?? false}
						/>
					</div>
				</div>
				<div className='apply'>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<DatePicker
							format='yyyy/MM/dd'
							margin='dense'
							label='여행 날짜'
							value={date}
							onChange={onChangeDate}
							autoOk
							disablePast
							disableToolbar
						/>
					</MuiPickersUtilsProvider>
					<Button
						padding='0.5em 1.5rem'
						onClick={onApply}
						style={{ fontSize: '1em', fontWeight: 600 }}
					>
						신청
					</Button>
				</div>
			</div>

			<div className='basicInfo'>
				<h3>기본정보</h3>
				<table>
					<tbody>
						<tr>
							<td>성별</td>
							<td>{host.sex === 'male' ? '남' : '여'}</td>
						</tr>
						<tr>
							<td>활동지역</td>
							<td>{host.place.formatted_address}</td>
						</tr>
						<tr>
							<td>사용언어</td>
							<td>
								{host.languages.map(lang =>
									lang ? <LanguageTag language={lang} key={lang} /> : '',
								)}
							</td>
						</tr>
						<tr className='introduction'>
							<td>자기소개</td>
							<td>{host.description}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='additionalInfo'>
				<h3>추가정보</h3>
				<table>
					<tbody>
						<tr>
							<td>여행스타일</td>
							<td>
								<TravelStyleTag
									label='문화재'
									onClick={() => {
										setOn(!on);
									}}
									checked={on}
								/>
							</td>
						</tr>
						<tr>
							<td>매칭횟수</td>
							<td>{0}</td>
						</tr>
						<tr>
							<td>승낙률</td>
							<td>{0}%</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='reviews'>
				<div className='reviews_title'>
					<h3>후기</h3>
					<Rating rating={host.rating || 0} isFilled />
				</div>
				{reviews.length ? (
					reviews.map(review => (
						<HostReviewItem review={review} key={review.id} />
					))
				) : (
					<NoReview />
				)}
			</div>
		</HostDetailContainer>
	);
};

const NoReview = () => {
	return <div style={{ padding: '0.5rem' }}>후기가 없습니다.</div>;
};

export default HostDetail;
