import { Button, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useInput } from '../../client/hooks/useInput';
import axios from 'axios';
import Link from 'next/link';
import { UserSetterContext } from '../../context/user';

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

const Login = () => {
	const email = useInput('');
	const pw = useInput('', (value: string) => !value.includes(';'));
	const setCurrentUser = useContext(UserSetterContext);

	const onSubmit = (e: any) => {
		e.preventDefault();

		axios
			.post(
				`/api/auth/login`,
				{
					email: email.value,
					pw: pw.value,
				},
				{ withCredentials: true },
			)
			.then(res => {
				if (res.data.success) {
					setCurrentUser(res.data.user);
					// setCookie('token', res.data.token, 1);

					location.href = '/';
				} else {
					alert(res.data.message);
				}
			});

		// axios.get(`${SERVER}/api/auth/check`, { withCredentials: true });
	};

	return (
		<LoginContainer>
			<h3>로그인</h3>
			<form onSubmit={onSubmit}>
				<div>
					<TextField
						{...email}
						label='Email'
						variant='outlined'
						type='email'
						fullWidth
					/>
				</div>
				<div>
					<TextField
						{...pw}
						label='Password'
						variant='outlined'
						type='password'
						fullWidth
					/>
				</div>

				<div>
					<Button
						type='submit'
						// onClick={onSubmit}
						variant='contained'
						color='primary'
						fullWidth
					>
						로그인
					</Button>
				</div>
			</form>

			<hr />
			<Link href='/users/register'>
				<Button fullWidth variant='contained'>
					회원가입
				</Button>
			</Link>
		</LoginContainer>
	);
};

export default Login;
