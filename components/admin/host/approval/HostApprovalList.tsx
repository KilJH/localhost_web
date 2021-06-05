import React, { useState } from 'react';
import { Host } from '../../../../interfaces';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import HostApprovalItem from './HostApprovalItem';
import { useToast } from '../../../../client/hooks/useToast';
import Toast from '../../../reuse/Toast';

type Props = {
	items: Host[];
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
		border-bottom: 3px solid #5197d5;
	}
	& tr:nth-child(even) {
		border-bottom: 1px solid black;
	}
`;

const ButtonDiv = styled.div`
	width: fit-content;
	display: inline;
`;
const HostDenialButton = styled(Button)`
	&.MuiButton-root {
		float: right;
		width: 8em;
		margin: 4em 1em 2em 0;
	}
	&.MuiButton-containedSecondary {
		background-color: #ff6b81;
	}
`;
const HostApprovalButton = styled(Button)`
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

export default function HostApprovalList(props: Props) {
	const { items } = props;
	const [state, setState] = useState({});
	const [emailState, setEmailState] = useState(false);
	const [nicknameState, setNicknameState] = useState(false);
	const [nameState, setNameState] = useState(false);
	const toast = useToast(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const DenyCheckedItems = state => {
		// 호스트 승인 거부 기능
		const keys = Object.keys(state);
		const values = Object.values(state);
		for (let i = 0; i < values.length; i++) {
			if (values[i] === true) {
				axios
					.post(`/api/host/deny`, {
						userId: keys[i],
					})
					.then((res: AxiosResponse<any>) => {
						if (res.data.success) {
							toast.handleOpen('info', res.data.message);
							Router.push('/admin/host/approval');
						} else toast.handleOpen('error', res.data.message);
					});
			}
		}
	};
	const ApproveCheckedItems = state => {
		// 호스트 승인 기능
		const keys = Object.keys(state);
		const values = Object.values(state);
		for (let i = 0; i < values.length; i++) {
			if (values[i] === true) {
				axios
					.post(`/api/host/allow`, {
						userId: keys[i],
					})
					.then((res: AxiosResponse<any>) => {
						if (res.data.success) {
							toast.handleOpen('success', res.data.message);
							Router.push('/admin/host/approval');
						} else toast.handleOpen('error', res.data.message);
					});
			}
		}
	};
	const HostDenialButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		DenyCheckedItems(state);
		Router.push('/admin/host/approval');
	};
	const HostApprovalButtonHandler = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		e.preventDefault();
		ApproveCheckedItems(state);
		Router.push('/admin/host/approval');
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
						<HostApprovalItem
							key={item.id}
							user={item}
							state={state[i]}
							handleChange={handleChange}
						/>
					))}
				</tbody>
			</UserTable>
			<ButtonDiv>
				<HostApprovalButton
					type='submit'
					onClick={HostApprovalButtonHandler}
					variant='contained'
					color='primary'
				>
					승인
				</HostApprovalButton>
				<HostDenialButton
					type='submit'
					onClick={HostDenialButtonHandler}
					variant='contained'
					color='secondary'
				>
					승인거부
				</HostDenialButton>
			</ButtonDiv>
			<Toast {...toast}>{toast.message}</Toast>
		</div>
	);
}
