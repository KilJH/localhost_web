import React, { useState } from 'react';
import { Notice } from '../../../interfaces';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import NoticeItem from './NoticeItem';
import { useToast } from '../../../client/hooks/useToast';
import Toast from '../../reuse/Toast';

type Props = {
	items: Notice[];
};

const UserTable = styled.table`
	width: 100%;
	min-width: 32em;
	margin: 0 auto;
	text-align: center;
	border-collapse: collapse;
	& th {
		font-size: 1em;
	}
	& thead {
		border-bottom: 3px solid #5197d5;
	}
	& td {
		border-bottom: 1px solid black;
	}
`;

const ButtonDiv = styled.div`
	width: fit-content;
	display: inline;
`;

const DeleteButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		width: 8em;
		margin: 4em 1em 2em 0;
	}
	&.MuiButton-containedSecondary {
		background-color: #ff6b81;
	}
`;
const WriteButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		width: 8em;
		margin: 4em 0 2em 1em;
	}
	&.MuiButton-containedPrimary {
		background-color: #5197d5;
	}
`;
const CheckTh = styled.th`
	padding-bottom: 0.25em;
`;
const CssTh = styled.th`
	padding-left: 1em;
`;

const CssIconButton = styled(IconButton)`
	&.MuiIconButton-root {
		padding: 0;
	}
`;
const DeleteCheckedItems = (state: object, toast: Function) => {
	const keys = Object.keys(state);
	const values = Object.values(state);
	for (let i = 0; i < values.length; i++) {
		if (values[i] === true) {
			axios
				.post(`/api/notice/delete`, {
					id: keys[i],
				})
				.then((res: AxiosResponse<any>) => {
					toast('info', res.data.message);
					if (res.data.success) {
						Router.push('/admin/notice');
					}
				});
		}
	}
};
const WriteItem = () => {
	Router.push('/admin/notice/write'); // 에러
};
export default function NoticeList(props: Props) {
	const { items } = props;
	const [state, setState] = useState({});
	const [numberState, setNumberState] = useState(false);
	const [titleState, setTitleState] = useState(false);
	const [dateState, setDateState] = useState(false);
	const toast = useToast(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const writeButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		WriteItem();
	};
	const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		DeleteCheckedItems(state, toast.handleOpen);
	};

	const numberSortHandler = () => {
		setDateState(false);
		setTitleState(false);
		setNumberState(!numberState);
		if (numberState) {
			items.sort(function (a: any, b: any) {
				return b.id - a.id;
			});
		} else {
			items.sort(function (a: any, b: any) {
				return a.id - b.id;
			});
		}
	};
	const titleSortHandler = () => {
		setNumberState(false);
		setDateState(false);
		setTitleState(!titleState);
		if (titleState) {
			items.sort(function (a: any, b: any) {
				return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
			});
		} else {
			items.sort(function (a: any, b: any) {
				return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
			});
		}
	};
	const dateSortHandler = () => {
		setNumberState(false);
		setTitleState(false);
		setDateState(!dateState);
		if (dateState) {
			items.sort(function (a: any, b: any) {
				return a.createTime > b.createTime
					? -1
					: a.createTime < b.createTime
					? 1
					: 0;
			});
		} else {
			items.sort(function (a: any, b: any) {
				return a.createTime < b.createTime
					? -1
					: a.createTime > b.createTime
					? 1
					: 0;
			});
		}
	};
	return (
		<div>
			<UserTable>
				<thead>
					<tr>
						<CheckTh>선택</CheckTh>
						<CssTh>
							번호
							<CssIconButton onClick={numberSortHandler}>
								{numberState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh>
							공지제목
							<CssIconButton onClick={titleSortHandler}>
								{titleState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh>
							작성날짜
							<CssIconButton onClick={dateSortHandler}>
								{dateState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
					</tr>
				</thead>
				<tbody>
					{items.map((item, i) => (
						<NoticeItem
							key={item.id}
							item={item}
							state={state[i]}
							handleChange={handleChange}
						/>
					))}
				</tbody>
			</UserTable>
			<ButtonDiv>
				<WriteButton
					type='submit'
					onClick={writeButtonHandler}
					variant='contained'
					color='primary'
				>
					공지 작성
				</WriteButton>
				<DeleteButton
					type='submit'
					onClick={deleteButtonHandler}
					variant='contained'
					color='secondary'
				>
					공지 삭제
				</DeleteButton>
			</ButtonDiv>
			<Toast {...toast}>{toast.message}</Toast>
		</div>
	);
}
