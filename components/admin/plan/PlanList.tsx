import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { Plan } from '../../../interfaces';
import PlanItem from './PlanItem';
import SERVER from '../../../client/utils/url';
import { useToast } from '../../../client/hooks/useToast';
import Toast from '../../reuse/Toast';

type Props = {
	items: Plan[];
};

const UserTable = styled.table`
	width: 100%;
	margin: 0 auto;
	text-align: center;
	border-collapse: collapse;
	& th {
		font-size: 1em;
	}
	& thead {
		border-bottom: 1px solid #5197d5;
	}
	& tr {
		border-bottom: 1px solid #aaa;
	}
`;

const DeleteButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		display: block;
		margin: 4em 0 2em 0;
		width: 9em;
	}
	&.MuiButton-containedSecondary {
		background-color: #e74c3c;
	}
`;
const CheckTh = styled.th`
	width: 1em;
	padding-bottom: 0.25em;
`;
const CssTh = styled.th`
	padding-left: 1em;
	&.title {
		width: 40%;
	}
	&.nickname {
		width: 25%;
	}
	&.createTime {
		width: 20%;
	}
`;
const CssIconButton = styled(IconButton)`
	&.MuiIconButton-root {
		padding: 0;
	}
`;

export default function PlanList(props: Props) {
	const { items } = props;
	const [plans, setPlans] = useState(items);
	const [state, setState] = useState({});
	const [titleState, setTitleState] = useState(false);
	const [timeState, setTimeState] = useState(false);
	const [nicknameState, setNicknameState] = useState(false);
	const toast = useToast(false);

	useEffect(() => {
		const updatePlans = async () => {
			const list: Plan[] = await (
				await axios.get(`${SERVER}/api/plan/list`)
			).data.plans;
			if (list) {
				setPlans(list);
			}
		};
		updatePlans();
	}, [toast.handleOpen]);

	const DeleteCheckedItems = (state: object) => {
		// 플랜 삭제 기능
		const keys = Object.keys(state);
		const values = Object.values(state);
		for (let i = 0; i < values.length; i++) {
			if (values[i] === true) {
				axios
					.post(`/api/plan/delete`, {
						planId: keys[i],
					})
					.then((res: AxiosResponse<any>) => {
						if (res.data.success) {
							toast.handleOpen('info', '플랜이 삭제되었습니다.');
							Router.push('/admin/plan');
						} else toast.handleOpen('error', '플랜 삭제를 실패했습니다.');
					});
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const ButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		DeleteCheckedItems(state);
	};
	const timeSortHandler = () => {
		setTitleState(false);
		setNicknameState(false);
		setTimeState(!timeState);
		if (timeState) {
			plans.sort(function (a: any, b: any) {
				return a.createTime < b.createTime
					? -1
					: a.createTime > b.createTime
					? 1
					: 0;
			});
		} else {
			plans.sort(function (a: any, b: any) {
				return a.createTime > b.createTime
					? -1
					: a.createTime < b.createTime
					? 1
					: 0;
			});
		}
	};
	const nicknameSortHandler = () => {
		setTimeState(false);
		setTitleState(false);
		setNicknameState(!nicknameState);
		if (nicknameState) {
			plans.sort(function (a: any, b: any) {
				return a.author.nickname < b.author.nickname
					? -1
					: a.author.nickname > b.author.nickname
					? 1
					: 0;
			});
		} else {
			plans.sort(function (a: any, b: any) {
				return a.author.nickname > b.author.nickname
					? -1
					: a.author.nickname < b.author.nickname
					? 1
					: 0;
			});
		}
	};
	const titleSortHandler = () => {
		setTimeState(false);
		setNicknameState(false);
		setTitleState(!titleState);
		if (titleState) {
			plans.sort(function (a: any, b: any) {
				return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
			});
		} else {
			plans.sort(function (a: any, b: any) {
				return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
			});
		}
	};
	return (
		<div>
			<UserTable>
				<thead>
					<tr>
						<CheckTh>선택</CheckTh>
						<CssTh className='title'>
							제목
							<CssIconButton onClick={titleSortHandler}>
								{titleState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh className='nickname'>
							플래너
							<CssIconButton onClick={nicknameSortHandler}>
								{nicknameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh className='createTime'>
							등록일자
							<CssIconButton onClick={timeSortHandler}>
								{timeState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
					</tr>
				</thead>
				<tbody>
					{plans.map((item, i) => (
						<PlanItem
							key={item.id}
							item={item}
							state={state[i]}
							handleChange={handleChange}
						/>
					))}
				</tbody>
			</UserTable>
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
