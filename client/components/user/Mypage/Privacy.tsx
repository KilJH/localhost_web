import { Grid, Avatar } from '@material-ui/core';
import React from 'react';
import { useInput } from '../../../hooks/useInput';
import { User } from '../../../interfaces';
import styled from 'styled-components';

interface Props {
	id: string;
	user: User;
}

const Button = styled.button`
	padding: 0.5rem 1rem;
	background-color: #5197d5;
	border: none;
`;

const PrivacyContainer = styled(Grid)`
	& > div {
		margin: 0.5rem 0;
	}
`;

const Privacy = (props: Props) => {
	const pwInput = useInput(props.user.password);
	const nnInput = useInput(props.user.nickname);
	const phInput = useInput(props.user.phone);
	const adInput = useInput(props.user.address);

	return (
		<section id={props.id}>
			<section>
				<header>
					<h3>기본 회원정보</h3>
				</header>
				<PrivacyContainer container alignItems='center'>
					<Grid item xs={12}>
						<Avatar alt='Profile'>KIL</Avatar>
					</Grid>
					<Grid item xs={3}>
						이메일:{' '}
					</Grid>
					<Grid item xs={9}>
						{props.user.email}
					</Grid>
					<Grid item xs={3}>
						패스워드:{' '}
					</Grid>
					<Grid item xs={9}>
						<input type='password' disabled {...pwInput} />
						<span>
							<button>변경</button>
						</span>
					</Grid>
					<Grid item xs={3}>
						이름:
					</Grid>
					<Grid item xs={9}>
						{props.user.name}
					</Grid>
					<Grid item xs={3}>
						닉네임:
					</Grid>
					<Grid item xs={9}>
						<input {...nnInput} />
					</Grid>
					<Grid item xs={3}>
						휴대폰:{' '}
					</Grid>
					<Grid item xs={9}>
						<input {...phInput} />
					</Grid>
					<Grid item xs={3}>
						주소:{' '}
					</Grid>
					<Grid item xs={9}>
						<input {...adInput} />
					</Grid>
				</PrivacyContainer>
			</section>
			<section>
				<header>
					<h3>추가 회원정보(선택)</h3>
				</header>
				<PrivacyContainer container alignItems='center'>
					<Grid item xs={3}>
						선호하는 여행스타일:
					</Grid>
					<Grid item xs={9}>
						선호하는 여행스타일:
					</Grid>
				</PrivacyContainer>
			</section>

			<Grid xs={12}>
				<button>취소</button>
				<Button>수정</Button>
			</Grid>
		</section>
	);
};

export default Privacy;
