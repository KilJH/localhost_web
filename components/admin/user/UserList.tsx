import React, { useState } from 'react';
import { User } from '../../../interfaces';
import styled from 'styled-components';
import UserItem from '../user/UserItem';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import { useToast } from '../../../client/hooks/useToast';
import Toast from '../../reuse/Toast';

type Props = {
	items: User[];
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
		border-bottom: 2px solid #5197d5;
	}
	& td {
		border-bottom: 1px solid black;
	}
`;

const ButtonDiv = styled.div`
	width: fit-content;
	display: inline;
`;

const BlockButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		width: 8em;
		margin: 4em 1em 2em 0;
	}
	&.MuiButton-containedPrimary {
		background-color: #5197d5;
	}
`;

const DeleteButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		width: 8em;
		margin: 4em 0 2em 1em;
	}
	&.MuiButton-containedSecondary {
		background-color: #ff6b81;
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

export default function UserList(props: Props) {
	const { items } = props;
	const [state, setState] = useState({});
	const [emailState, setEmailState] = useState(false);
	const [nicknameState, setNicknameState] = useState(false);
	const [nameState, setNameState] = useState(false);
	const toast = useToast(false);

	const BlockCheckedItems = (state: object) => {
		const keys = Object.keys(state);
		const values = Object.values(state);
		for (let i = 0; i < values.length; i++) {
			if (values[i] === true) {
				axios
					.post(`/api/user/block`, {
						userId: keys[i],
					})
					.then((res: AxiosResponse<any>) => {
						if (res.data.success) {
							toast.handleOpen('info', res.data.message);
							Router.push('/admin/user');
						}
					});
			}
		}
	};

	const DeleteCheckedItems = (state: object) => {
		const keys = Object.keys(state);
		const values = Object.values(state);
		for (let i = 0; i < values.length; i++) {
			if (values[i] === true) {
				axios
					.post(`/api/user/delete`, {
						userId: keys[i],
					})
					.then((res: AxiosResponse<any>) => {
						if (res.data.success) {
							toast.handleOpen('info', res.data.message);
							Router.push('/admin/user');
						}
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
	const deleteButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		DeleteCheckedItems(state);
	};
	const blockButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		BlockCheckedItems(state);
	};

	const emailSortHandler = () => {
		setNameState(false);
		setNicknameState(false);
		setEmailState(!emailState);
		if (emailState) {
			items.sort(function (a: any, b: any) {
				return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
			});
		} else {
			items.sort(function (a: any, b: any) {
				return a.email > b.email ? -1 : a.email < b.email ? 1 : 0;
			});
		}
	};
	const nicknameSortHandler = () => {
		setEmailState(false);
		setNameState(false);
		setNicknameState(!nicknameState);
		if (nicknameState) {
			items.sort(function (a: any, b: any) {
				return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
			});
		} else {
			items.sort(function (a: any, b: any) {
				return a.nickname > b.nickname ? -1 : a.nickname < b.nickname ? 1 : 0;
			});
		}
	};
	const nameSortHandler = () => {
		setEmailState(false);
		setNicknameState(false);
		setNameState(!nameState);
		if (nameState) {
			items.sort(function (a: any, b: any) {
				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
			});
		} else {
			items.sort(function (a: any, b: any) {
				return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
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
							이메일
							<CssIconButton onClick={emailSortHandler}>
								{emailState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh>
							닉네임
							<CssIconButton onClick={nicknameSortHandler}>
								{nicknameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh>
							이름
							<CssIconButton onClick={nameSortHandler}>
								{nameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
					</tr>
				</thead>
				<tbody>
					{items.map((item, i) => {
						return (
							<UserItem
								key={item.id}
								user={item}
								state={state[i]}
								handleChange={handleChange}
							/>
						);
					})}
				</tbody>
			</UserTable>
			<ButtonDiv>
				<DeleteButton
					type='submit'
					onClick={deleteButtonHandler}
					variant='contained'
					color='secondary'
				>
					유저 삭제
				</DeleteButton>
				<BlockButton
					type='button'
					onClick={blockButtonHandler}
					variant='contained'
					color='primary'
				>
					유저 차단
				</BlockButton>
			</ButtonDiv>
			<Toast {...toast}>{toast.message}</Toast>
		</div>
	);
}
