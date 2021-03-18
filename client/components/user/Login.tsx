import { Button, TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import Router from 'next/router';

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

	const onClick = () => {
		axios.post('/api/user/login', { email, pw }).then((res) => {
			console.log(res);
			console.log('로그인 성공');
			Router.push('/');
		});
	};

	return (
		<LoginContainer>
			<h3>로그인</h3>
			<form>
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
					<Button onClick={onClick} variant="contained" color="primary">
						로그인
					</Button>
				</div>
			</form>
		</LoginContainer>
	);
};

export default Login;
