import { createMuiTheme, TextField, ThemeProvider } from '@material-ui/core';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { useInput } from '../../client/hooks/useInput';
import axios from 'axios';
import Link from 'next/link';
import { UserSetterContext } from '../../context/user';
import Button from '../reuse/Button';

const LoginContainer = styled.div`
	width: 16rem;
	padding: 2rem;
	& > form {
		& > div {
			margin: 1rem 0;
		}
	}
`;

const theme = createMuiTheme({
	palette: {
		primary: { main: '#5197d5' },
	},
});

const Login = () => {
	const email = useInput('');
	const pw = useInput('', (value: string) => !value.includes(';'));
	const setCurrentUser = useContext(UserSetterContext);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const { data } = await axios.post(`/api/auth/login`, {
			email: email.value,
			pw: pw.value,
		});
		if (data.success) {
			setCurrentUser(data.user);

			location.href = '/';
		} else {
			alert(data.message);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<LoginContainer>
				<h2>로그인</h2>
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
						<Button type='submit' width='100%'>
							로그인
						</Button>
					</div>
				</form>

				<hr />
				<Link href='/users/register'>
					<a>
						<Button width='100%' default>
							회원가입
						</Button>
					</a>
				</Link>
			</LoginContainer>
		</ThemeProvider>
	);
};

export default Login;
