import React, { useState } from 'react';
import styled from 'styled-components';
import UserItem from '../user/UserItem';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { Host } from '../../../interfaces';

type Props = {
	items: Host[];
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

const HostButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		display: block;
		margin: 4em 0 2em 0;
		width: 9em;
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
const DisableHostCheckedItems = state => {
	// 호스트 해제 기능
	const keys = Object.keys(state);
	const values = Object.values(state);
	for (let i = 0; i < values.length; i++) {
		if (values[i] === true) {
			axios
				.post(`/api/host/demote`, {
					userId: keys[i],
				})
				.then((res: AxiosResponse<any>) => {
					if (res.data.success) {
						alert(res.data.message);
						Router.push('/admin/host/list');
					}
				});
		}
	}
};
export default function HostList(props: Props) {
	const { items } = props;
	const [state, setState] = useState({});
	const [emailState, setEmailState] = useState(false);
	const [nicknameState, setNicknameState] = useState(false);
	const [nameState, setNameState] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const hostButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		DisableHostCheckedItems(state);
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
					{items.map((item, i) => (
						<UserItem
							key={item.id}
							user={item}
							state={state[i]}
							handleChange={handleChange}
						/>
					))}
				</tbody>
			</UserTable>
			<HostButton
				type='submit'
				onClick={hostButtonHandler}
				variant='contained'
				color='secondary'
			>
				호스트 해제
			</HostButton>
		</div>
	);
}
