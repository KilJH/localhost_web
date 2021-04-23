import {
	DatePicker,
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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

interface Props {
	host: Host;
	reviews?: Review[];
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
			& > h2 {
				margin: 0;
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
`;

const HostDetail = ({ host }: Props) => {
	const [date, setDate] = useState(new Date());
	const onChangeDate = date => {
		if (date >= new Date()) setDate(date);
	};

	const currentUser = useContext(UserStateContext);

	const onApply = async () => {
		const res = await axios.post(`${SERVER}/api/host/applyHosting`, {
			id: currentUser.id,
			hostId: host.id,
			date: date,
		});

		res.data.success ? Router.push('/hosts') : alert('신청에 실패했습니다.');
	};

	return (
		<HostDetailContainer>
			<div className='profile'>
				<UserPhoto src={host.photo} width={8} margin='0 1rem 0 0' />
				<div className='name'>
					<Rating rating={host.rating || 0} isFilled />
					<h2>{host.nickname}</h2>
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
					<Button padding='0.5em 1.5rem' onClick={onApply}>
						신청
					</Button>
				</div>
			</div>

			<div className='basicInfo'>
				<h3>기본정보</h3>
				<table>
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
								lang ? <LanguageTag language={lang} /> : '',
							)}
						</td>
					</tr>
					<tr>
						<td>자기소개</td>
						<td>{host.description}</td>
					</tr>
				</table>
			</div>
			<div className='additionalInfo'>
				<h3>추가정보</h3>
				<table>
					<tr>
						<td>여행스타일</td>
						<td></td>
					</tr>
					<tr>
						<td>매칭횟수</td>
						<td>{0}</td>
					</tr>
					<tr>
						<td>승낙률</td>
						<td>{0}%</td>
					</tr>
				</table>
			</div>
			<div className='reviews'>
				<div className='reviews_title'>
					<h3>후기</h3>
					<Rating rating={host.rating || 0} isFilled />
				</div>
				<HostReviewItem />
				<HostReviewItem />
			</div>
		</HostDetailContainer>
	);
};

export default HostDetail;
