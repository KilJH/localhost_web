import React, { useState } from 'react';
import { User } from '../../interfaces';
import styled from 'styled-components';
import UserItem from './UserItem';
import Button from '@material-ui/core/Button';
import axios, { AxiosResponse } from 'axios';
import SERVER from '../../utils/url';
import Router from 'next/router';

type Props = {
	items: User[];
};

const UserTable = styled.table`
	width: 75%;
	min-width: 32rem;
	max-width: 80rem;
	margin: 0 auto;
	text-align: center;
	border-collapse: collapse;
	& th {
		font-size: 0.7rem;
	}
	& thead {
		border-bottom: 2px solid black;
	}
	& td {
		border-bottom: 1px solid black;
	}
`;

const ButtonDiv = styled.div`
	width: fit-content;
	display: flex;
	margin: 0 auto;
	margin-top: 1rem;
`;

const BlockButton = styled(Button)`
	&.MuiButton-root {
		margin: 1rem;
		width: 6rem;
	}
	&.MuiButton-containedPrimary {
		background-color: #5197d5;
	}
`;

const DeleteButton = styled(Button)`
	&.MuiButton-root {
		margin: 1rem;
		width: 6rem;
	}
	&.MuiButton-containedSecondary {
		background-color: #ff6b81;
	}
`;
const Checkbox = styled.input.attrs({
	type: 'checkbox',
})`
	border-radius: 5px;
`;

const DeleteCheckedItems = (state) => {
	const keys = Object.keys(state);
	const values = Object.values(state);
	// console.log(keys);
	// console.log(values);

	for (let i = 0; i < values.length; i++) {
		if (values[i] === true) {
			axios
				.post(`${SERVER}/api/user/delete`, {
					userId: keys[i],
				})
				.then((res: AxiosResponse<any>) => {
					console.log(res.data);
					alert(res.data.message);
					if (res.data.success) {
						Router.push('/admin/user');
					}
				});
		}
	}
};

export default function UserList({ items }: Props) {
	const [state, setState] = useState({});
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = event.target;
		setState({
			...state,
			[id]: checked,
		});
	};
	const deleteButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		DeleteCheckedItems(state);
	};
	const blockButtonHandler = (e: React.FormEvent<HTMLFormElement>) => {};
	return (
		<div>
			<UserTable>
				<caption>
					<h1>Users List</h1>
				</caption>
				<thead>
					<tr>
						<th>선택</th>
						<th>닉네임</th>
						<th>이메일</th>
						<th>이름</th>
						<th>주소</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr>
							<td>
								<Checkbox
									id={item.id}
									isChecked={state}
									onChange={handleChange}
								/>
							</td>
							<UserItem key={item.id} user={item} />
						</tr>
					))}
				</tbody>
			</UserTable>
			<ButtonDiv>
				<BlockButton
					type="button"
					onClick={blockButtonHandler}
					variant="contained"
					color="primary"
				>
					유저 차단
				</BlockButton>
				<DeleteButton
					type="submit"
					onClick={deleteButtonHandler}
					variant="contained"
					color="secondary"
				>
					유저 삭제
				</DeleteButton>
			</ButtonDiv>
		</div>
	);
}
