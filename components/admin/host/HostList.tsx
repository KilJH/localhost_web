import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Router from 'next/router';
import { IconButton } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import { Host } from '../../../interfaces';
import HostItem from './HostItem';
import SERVER from '../../../client/utils/url';

type Props = {
	items: Host[];
	toast: Function;
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

const DisableHostCheckedItems = (state: object, toast: Function) => {
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
						toast('info', res.data.message);
						Router.push('/admin/host/');
					}
				});
		}
	}
};

export default function HostList(props: Props) {
	const { items, toast } = props;
	const [hosts, setHosts] = useState(items);
	const [state, setState] = useState({});
	const [emailState, setEmailState] = useState(false);
	const [nicknameState, setNicknameState] = useState(false);
	const [nameState, setNameState] = useState(false);

	useEffect(() => {
		const updateHosts = async () => {
			const list: Host[] = await (
				await axios.get(`${SERVER}/api/host/list`)
			).data.list;
			if (list) {
				setHosts(list);
			}
		};
		updateHosts();
	}, [toast]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const hostButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		DisableHostCheckedItems(state, toast);
	};
	const emailSortHandler = () => {
		setNameState(false);
		setNicknameState(false);
		setEmailState(!emailState);
		if (emailState) {
			hosts.sort(function (a: any, b: any) {
				return a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
			});
		} else {
			hosts.sort(function (a: any, b: any) {
				return a.email > b.email ? -1 : a.email < b.email ? 1 : 0;
			});
		}
	};
	const nicknameSortHandler = () => {
		setEmailState(false);
		setNameState(false);
		setNicknameState(!nicknameState);
		if (nicknameState) {
			hosts.sort(function (a: any, b: any) {
				return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
			});
		} else {
			hosts.sort(function (a: any, b: any) {
				return a.nickname > b.nickname ? -1 : a.nickname < b.nickname ? 1 : 0;
			});
		}
	};
	const nameSortHandler = () => {
		setEmailState(false);
		setNicknameState(false);
		setNameState(!nameState);
		if (nameState) {
			hosts.sort(function (a: any, b: any) {
				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
			});
		} else {
			hosts.sort(function (a: any, b: any) {
				return a.name > b.name ? -1 : a.name < b.name ? 1 : 0;
			});
		}
	};
	return (
		<div>
			<UserTable>
				<thead>
					<tr>
						<CheckTh style={{ width: '5%' }}>선택</CheckTh>
						<CssTh style={{ width: '40%' }}>
							이메일
							<CssIconButton onClick={emailSortHandler}>
								{emailState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh style={{ width: '20%' }}>
							닉네임
							<CssIconButton onClick={nicknameSortHandler}>
								{nicknameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
						<CssTh style={{ width: '15%' }}>
							이름
							<CssIconButton onClick={nameSortHandler}>
								{nameState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
					</tr>
				</thead>
				<tbody>
					{hosts.map((item, i) => (
						<HostItem
							key={item.id}
							host={item}
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
