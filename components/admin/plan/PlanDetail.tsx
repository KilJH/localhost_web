import { Plan } from '../../../interfaces';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserPhoto from '../../user/UserPhoto';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Toast from '../../reuse/Toast';
import { useToast } from '../../../client/hooks/useToast';

type Props = {
	item: Plan;
};
const Table = styled.table`
	width: 100%;
	min-width: 32em;
	margin: 0 auto 3em auto;
	text-align: center;
	border-collapse: collapse;
	font-size: 1em;
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
	& img {
		max-width: 90%;
		max-height: 25em;
		object-fit: cover;
	}
	/* & tbody > tr:nth-child(odd) {
		background-color: #eee;
	} */
`;
const NameTag = styled.div`
	margin-top: 1em;
	margin-bottom: 0;
	display: block;
	text-align: center;
`;
const Nickname = styled.h2`
	display: inline;
	text-align: center;
`;
const Name = styled.h4`
	color: rgba(0, 0, 0, 0.5);
	margin-left: 0.15em;
	display: inline;
	text-align: center;
`;
const Email = styled.h4`
	color: rgba(0, 0, 0, 0.5);
	margin-top: 0;
	margin-bottom: 0;
	display: block;
	text-align: center;
`;
const MainTitle = styled.h3`
	color: #5197d5;
	text-align: center;
	margin-top: 0;
	margin-bottom: 3em;
	padding-top: 2em;
`;
const PlanDiv = styled.div`
	display: inline-block;
	&.title {
		width: 60%;
	}
	&.createTime {
		width: 30%;
	}
	&.hit {
		width: 10%;
	}
	margin: 0 0 2em 0;
`;
const SubTitle = styled.h5`
	color: #5197d5;
	display: block;
	margin-bottom: 1em;
`;
const Details = styled.a`
	display: block;
`;
const DeleteButton = styled(Button)`
	&.MuiButton-root {
		display: block;
		margin: 8em auto 1em auto;
	}
	&.MuiButton-containedSecondary {
		background-color: #e74c3c;
	}
`;
export default function PlanItem({ item }: Props) {
	const toast = useToast(false);
	const ButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		axios
			.post(`/api/plan/delete`, {
				planId: item.id,
			})
			.then((res: AxiosResponse<any>) => {
				if (res.data.success) {
					alert('플랜 삭제 완료');
					Router.push('/admin/plan');
				}
			});
	};
	return (
		<div>
			<div style={{ marginLeft: '.5em' }}>
				<PlanDiv className='title'>
					<SubTitle>제목</SubTitle>
					<Details>{item.title}</Details>
				</PlanDiv>
				<PlanDiv className='createTime'>
					<SubTitle>등록일자</SubTitle>
					<Details>{item!.createTime!.substring(0, 10)}</Details>
				</PlanDiv>
				<PlanDiv className='hit'>
					<SubTitle>조회수</SubTitle>
					<Details>{item.hit}</Details>
				</PlanDiv>
			</div>
			<Table>
				<thead>
					<tr>
						<th style={{ width: '10%' }}>일차</th>
						<th style={{ width: '10%' }}>시각</th>
						<th style={{ width: '20%' }}>장소</th>
						<th style={{ width: '35%' }}>세부 내용</th>
						<th style={{ width: '10%' }}>종류</th>
						<th style={{ width: '15%' }}>가격</th>
					</tr>
				</thead>
				<tbody>
					{item.planDays?.map(planDay => {
						return (
							<>
								{planDay.planTimes.map(planTime => (
									<>
										{planTime.photo?.map(src =>
											src ? (
												<tr>
													<td colSpan={6}>
														<img src={src} style={{ width: '100%' }} />
													</td>
												</tr>
											) : (
												''
											),
										)}
										<tr>
											<td>{planDay.day}</td>
											<td>{planTime.time}</td>
											<td>{planTime.place.formatted_address}</td>
											<td>{planTime.description}</td>
											<td>{planTime.type}</td>
											<td>{planTime.price}원</td>
										</tr>
									</>
								))}
							</>
						);
					})}
				</tbody>
			</Table>
			<MainTitle>작성자</MainTitle>
			<UserPhoto src={item!.author!.photo} width={5} />
			<NameTag>
				<Nickname>{item!.author!.nickname}</Nickname>
				<Name>#{item!.author!.name}</Name>
			</NameTag>
			<Email>({item!.author!.email})</Email>

			<DeleteButton
				type='submit'
				onClick={ButtonHandler}
				variant='contained'
				color='secondary'
			>
				플랜 삭제
			</DeleteButton>
			<Toast {...toast}>{toast.message}</Toast>
		</div>
	);
}
