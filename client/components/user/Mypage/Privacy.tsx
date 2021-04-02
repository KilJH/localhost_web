import { Grid, Avatar } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from '../../../hooks/useInput';
import { User } from '../../../interfaces';
import styled from 'styled-components';
import { UserStateContext } from '../../../context/user';
import axios from 'axios';
import SERVER from '../../../utils/url';
import UserPhoto from '../UserPhoto';

interface Props {
	id: string;
}

const Button = styled.button`
	padding: 0.5rem 1rem;
	background-color: #5197d5;
	border: none;
	color: white;
`;

const PrivacyContainer = styled(Grid)`
	margin: 0 auto;
	& > div {
		margin: 0.5rem 0;
	}
`;

const Privacy = (props: Props) => {
	const currentUser = useContext(UserStateContext);

	const pwInput = useInput(currentUser.password);
	const nnInput = useInput(currentUser.nickname);
	const phInput = useInput(currentUser.phone);
	const adInput = useInput(currentUser.address);

	const [img, setImg] = useState(null);
	const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImg(e.target.files[0]);
	};

	useEffect(() => {
		console.log(img);
	}, [img]);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const user = {
			email: currentUser.email,
			nickname: nnInput.value,
			phone: phInput.value,
			address: adInput.value,
		};

		const formData = new FormData();
		formData.append('file', img);
		formData.append('name', `user_profile_${currentUser.id}`);

		const file = {
			name: `user_profile_${currentUser.id}`,
			file: img,
		};
		// const res = await axios.post(`${SERVER}/api/user/update`, { ...user });
		const resFile = await axios.post(`${SERVER}/api/file/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		// 파일 업로드
		// if (res.data.success) alert(res.data.message);
	};

	return (
		<section id={props.id}>
			<form onSubmit={onSubmit}>
				<section>
					<header>
						<h3>기본 회원정보</h3>
					</header>
					<PrivacyContainer container alignItems='center'>
						<Grid item xs={12}>
							<UserPhoto src={currentUser.photo} width={8} />
							<input type='file' accept='image/*' onChange={onChangeFile} />
						</Grid>
						<Grid item xs={3}>
							이메일:{' '}
						</Grid>
						<Grid item xs={9}>
							{currentUser.email}
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
							{currentUser.name}
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
					<button type='button'>취소</button>
					<Button type='submit'>수정</Button>
				</Grid>
			</form>
		</section>
	);
};

export default Privacy;
