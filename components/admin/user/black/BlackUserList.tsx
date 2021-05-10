import React, { useState } from 'react';
import { BlackUser } from '../../../../interfaces';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { IconButton } from '@material-ui/core';
import BlackUserItem from './BlackUserItem';

type Props = {
	black: BlackUser[];
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
// const BlockCheckedItems = state => {
// 	// const keys = Object.keys(state);
// 	// const values = Object.values(state);
// 	// for (let i = 0; i < values.length; i++) {
// 	// 	if (values[i] === true) {
// 	// 		axios
// 	// 			.post(`${SERVER}/api/user/block`, {
// 	// 				userId: keys[i],
// 	// 			})
// 	// 			.then((res: AxiosResponse<any>) => {
// 	// 				if (res.data.success) {
// 	// 					alert(res.data.message);
// 	// 					Router.push('/admin/user/list');
// 	// 				}
// 	// 			});
// 	// 	}
// 	// }
// };

export default function BlackUserList(props: Props) {
	const { black } = props;
	const [state, setState] = useState({});
	const [reasonState, setReasonState] = useState(false);
	const [nicknameState, setNicknameState] = useState(false);
	const [nameState, setNameState] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// BlockCheckedItems(state);
	};

	const reasonSortHandler = () => {
		setNameState(false);
		setNicknameState(false);
		setReasonState(!reasonState);
		if (reasonState) {
			black.sort(function (a: any, b: any) {
				return a.reason < b.reason ? -1 : a.reason > b.reason ? 1 : 0;
			});
		} else {
			black.sort(function (a: any, b: any) {
				return a.reason > b.reason ? -1 : a.reason < b.reason ? 1 : 0;
			});
		}
	};
	const nicknameSortHandler = () => {
		setReasonState(false);
		setNameState(false);
		setNicknameState(!nicknameState);
		if (nicknameState) {
			black.sort(function (a: any, b: any) {
				return a.user.nickname < b.user.nickname
					? -1
					: a.user.nickname > b.user.nickname
					? 1
					: 0;
			});
		} else {
			black.sort(function (a: any, b: any) {
				return a.user.nickname > b.user.nickname
					? -1
					: a.user.nickname < b.user.nickname
					? 1
					: 0;
			});
		}
	};
	const nameSortHandler = () => {
		setReasonState(false);
		setNicknameState(false);
		setNameState(!nameState);
		if (nameState) {
			black.sort(function (a: any, b: any) {
				return a.user.name < b.user.name
					? -1
					: a.user.name > b.user.name
					? 1
					: 0;
			});
		} else {
			black.sort(function (a: any, b: any) {
				return a.user.name > b.user.name
					? -1
					: a.user.name < b.user.name
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
						<CssTh>
							차단사유
							<CssIconButton onClick={reasonSortHandler}>
								{reasonState ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
							</CssIconButton>
						</CssTh>
					</tr>
				</thead>
				<tbody>
					{black.map((item, i) => {
						return (
							<BlackUserItem
								black={item}
								state={state[i]}
								handleChange={handleChange}
							/>
						);
					})}
				</tbody>
			</UserTable>
			<ButtonDiv>
				<BlockButton
					type='button'
					onClick={buttonHandler}
					variant='contained'
					color='primary'
				>
					차단 해제
				</BlockButton>
			</ButtonDiv>
		</div>
	);
}
