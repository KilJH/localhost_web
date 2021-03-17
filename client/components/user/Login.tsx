import { Button, TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

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
	return (
		<LoginContainer>
			<h3>로그인</h3>
			<form>
				<div>
					<TextField label="ID" variant="outlined" fullWidth />
				</div>
				<div>
					<TextField label="Password" variant="outlined" fullWidth />
				</div>

				<div>
					<Button variant="contained" color="primary">
						로그인
					</Button>
				</div>
			</form>
		</LoginContainer>
	);
};

export default Login;
