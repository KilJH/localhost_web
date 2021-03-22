import { Button, TextField } from '@material-ui/core';
import React, { ReactEventHandler, useContext } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import SERVER from '../../utils/url';
import Link from 'next/link';

interface Props {}

const LoginContainer = styled.div`
	width: 16rem;
	padding: 2rem;
	& > form {
		padding: 1rem 0;
		& > div {
			margin: 1rem 0;
		}
	}
`;

const Login = (props: Props) => {
	const email = useInput('');
	const pw = useInput('', (value: string) => !value.includes(';'));

	const onSubmit = (e: any) => {
		e.preventDefault();

		axios
			.post(`${SERVER}/api/user/login_check`, {
				email: email.value,
				pw: pw.value,
			})
			.then((res) => {
				if (res.data.success) {
					location.href = '/';
				} else {
					alert(res.data.message);
				}
			});
	};

	return (
		<LoginContainer>
			<h3>로그인</h3>
			<form onSubmit={onSubmit}>
				<div>
					<TextField
						{...email}
						label="Email"
						variant="outlined"
						type="email"
						fullWidth
					/>
				</div>
				<div>
					<TextField
						{...pw}
						label="Password"
						variant="outlined"
						type="password"
						fullWidth
					/>
				</div>

				<div>
					<Button
						type="submit"
						// onClick={onSubmit}
						variant="contained"
						color="primary"
						fullWidth
					>
						로그인
					</Button>
				</div>
			</form>

			<hr />
			<Link href="/users/register">
				<Button fullWidth variant="contained">
					회원가입
				</Button>
			</Link>
		</LoginContainer>
	);
};

export default Login;
