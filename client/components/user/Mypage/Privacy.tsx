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
	followingUsers?: User[];
	followers?: User[];
}

const Button = styled.button`
	padding: 0.5rem 1rem;
	background-color: #5197d5;
	border: none;
	color: white;
`;

const PrivacyContainer = styled.div`
	margin: 0 auto;
	& > div {
		margin: 1rem auto;
		display: flex;
		align-items: center;
		& > div {
			margin: 0 1rem;
		}
		& > div:first-child {
			flex: 1;
		}
		& > div:last-child {
			flex: 3;
		}
		& input {
			width: 16em;
		}
	}
`;

const Privacy = (props: Props) => {
	const currentUser = useContext(UserStateContext);

	const pwInput = useInput(currentUser.password);
	const nnInput = useInput(currentUser.nickname);
	const phInput = useInput(currentUser.phone);
	const adInput = useInput(currentUser.address);

	const [img, setImg] = useState(null);

	const [photoUrl, setPhotoUrl] = useState(currentUser.photo);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const user = {
			email: currentUser.email,
			nickname: nnInput.value,
			phone: phInput.value,
			address: adInput.value,
		};
		// 유저정보 변경
		const res = await axios.post(`${SERVER}/api/user/update`, { ...user });

		if (res.data.success) alert(res.data.message);
	};

	const onClickPhoto = (e: React.MouseEvent) => {
		const input: any = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.click();

		input.onchange = function (e: React.ChangeEvent<HTMLInputElement>) {
			setImg(e.target.files[0]);
		};
	};

	const onClickReset = () => {
		setPhotoUrl('');
		axios
			.post(`${SERVER}/api/user/update/photo`, {
				id: currentUser.id,
				url: '',
			})
			.then((res) => {
				console.log(res);
			});
	};

	// 이미지가 바뀌었을 때
	useEffect(() => {
		if (img !== null) {
			// formData generate
			const formData = new FormData();
			// formData에 key, value 추가
			formData.append('file', img);
			formData.append('name', `user_profile_${currentUser.id}`);
			axios
				.post(`${SERVER}/api/s3/upload`, formData)
				.then((res) => {
					// 뷰에 포토 수정
					const time = new Date().getTime();
					setPhotoUrl(`${res.data.url}?time=${time}`);
					// 디비에 포토 수정
					axios
						.post(`${SERVER}/api/user/update/photo`, {
							id: currentUser.id,
							url: res.data.url,
						})
						.then((res) => {
							console.log(res);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [img]);

	return (
		<section id={props.id}>
			<form onSubmit={onSubmit}>
				<section>
					<header>
						<h3>기본 회원정보</h3>
					</header>
					<PrivacyContainer>
						<div>
							<div>사진: </div>
							<div>
								<UserPhoto
									src={photoUrl}
									width={8}
									margin='1rem 0'
									onClick={onClickPhoto}
									hover
								/>

								<button type='button' onClick={onClickReset}>
									기본이미지로 변경
								</button>
							</div>
						</div>
						<div>
							<div>이메일: </div>
							<div>{currentUser.email}</div>
						</div>
						<div>
							<div>패스워드: </div>
							<div>
								<input type='password' disabled {...pwInput} />
								<span>
									<button>변경</button>
								</span>
							</div>
						</div>
						<div>
							<div>이름:</div>
							<div>{currentUser.name}</div>
						</div>
						<div>
							<div>닉네임:</div>
							<div>
								<input {...nnInput} />
							</div>
						</div>
						<div>
							<div>휴대폰: </div>
							<div>
								<input {...phInput} />
							</div>
						</div>
						<div>
							<div>주소: </div>
							<div>
								<input {...adInput} />
							</div>
						</div>
					</PrivacyContainer>
				</section>
				<section>
					<header>
						<h3>추가 회원정보(선택)</h3>
					</header>
					<PrivacyContainer>
						<div></div>
					</PrivacyContainer>
				</section>

				<Button type='submit'>수정</Button>
				<button type='button'>취소</button>
			</form>
		</section>
	);
};

export default Privacy;
