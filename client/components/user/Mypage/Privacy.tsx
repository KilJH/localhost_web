import { Grid, Avatar, Modal, Fade } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from '../../../hooks/useInput';
import { Place, User } from '../../../interfaces';
import styled from 'styled-components';
import { UserStateContext } from '../../../context/user';
import axios from 'axios';
import SERVER from '../../../utils/url';
import UserPhoto from '../UserPhoto';
import Button from '../../reuse/Button';
import CpxBarometer from '../../reuse/CpxBarometer';
import Input from '../../reuse/Input';
import SearchPlace from '../../search/SearchPlace';
import Router from 'next/router';

interface Props {
	id: string;
	followingUsers?: User[];
	followers?: User[];
}

// const Button = styled.button`
// 	padding: 0.5rem 1rem;
// 	background-color: #5197d5;
// 	border: none;
// 	color: white;
// `;

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
const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;

	& .searchForm {
		width: 80vw;
		max-width: 800px;
		background: rgba(255, 255, 255, 0.9);
		padding: 1rem;
		border-radius: 0.25rem;
		outline: 0;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
	}
`;

const inputProps = {
	width: '100% !important',
	borderRadius: '0.25rem',
	border: '1px solid rgba(0,0,0,0.41)',
	textAlign: 'left',
};

const btnProps = {
	padding: '0.75rem 1rem',
};

const Privacy = (props: Props) => {
	const currentUser = useContext(UserStateContext);

	const pwInput = useInput('');
	const nnInput = useInput(currentUser.nickname);
	const phInput = useInput(currentUser.phone);

	const [disabledPw, setDisabledPw] = useState(true);

	const [img, setImg] = useState(null);

	const [photoUrl, setPhotoUrl] = useState(currentUser.photo);

	const onSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		const user = {
			email: currentUser.email,
			nickname: nnInput.value,
			phone: phInput.value,
			address: `${place.formatted_address}(${place.name})`,
		};
		// 유저정보 변경
		const res = await axios.post(`${SERVER}/api/user/update`, { ...user });

		if (res.data.success) alert(res.data.message);
	};

	const onClickPhoto = (e: React.MouseEvent<HTMLButtonElement>) => {
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
			.then(res => {
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
				.then(res => {
					// 뷰에 포토 수정
					const time = new Date().getTime();
					setPhotoUrl(`${res.data.url}?time=${time}`);
					// 디비에 포토 수정
					axios
						.post(`${SERVER}/api/user/update/photo`, {
							id: currentUser.id,
							url: res.data.url,
						})
						.then(res => {
							location.href = '/users/mypage';
						});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [img]);

	const [place, setPlace] = useState<Place>({
		name: '',
		formatted_address: '',
		geometry: { location: { lat: 0, lng: 0 } },
	});
	// 모달을 위한 State
	const [open, setOpen] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		setOpen(false);
	}, [place]);

	return (
		<section id={props.id}>
			<div>
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

								<Button
									{...btnProps}
									default
									type='button'
									onClick={onClickReset}
								>
									기본이미지로 변경
								</Button>
							</div>
						</div>
						<div>
							<div>이메일: </div>
							<div>{currentUser.email}</div>
						</div>
						<div>
							<div>패스워드: </div>
							<div style={{ display: 'flex' }}>
								<Input
									type='password'
									{...inputProps}
									disabled={disabledPw}
									{...pwInput}
								/>
								<span style={{ whiteSpace: 'nowrap' }}>
									<Button
										{...btnProps}
										type='button'
										onClick={() => {
											if (!disabledPw) {
												axios
													.post(`${SERVER}/api/user/updatePW`, {
														email: currentUser.email,
														pw: pwInput.value,
													})
													.then(res => {
														alert(
															res.data.success
																? res.data.message
																: '비밀번호 변경에 실패했습니다.',
														);
													});
											}
											pwInput.setValue('');
											setDisabledPw(!disabledPw);
										}}
										default={disabledPw}
									>
										변경
									</Button>
									{disabledPw ? (
										''
									) : (
										<Button
											{...btnProps}
											default
											type='button'
											onClick={() => {
												setDisabledPw(!disabledPw);
											}}
										>
											취소
										</Button>
									)}
								</span>
								<CpxBarometer value={pwInput.value} />
							</div>
						</div>
						<div>
							<div>이름:</div>
							<div>{currentUser.name}</div>
						</div>
						<div>
							<div>닉네임:</div>
							<div>
								<Input {...inputProps} {...nnInput} />
							</div>
						</div>
						<div>
							<div>휴대폰: </div>
							<div>
								<Input {...inputProps} {...phInput} />
							</div>
						</div>
						<div>
							<div>주소: </div>
							<div>
								<Input
									{...inputProps}
									value={
										place.name
											? `${place.formatted_address}(${place.name})`
											: currentUser.address
									}
									onClick={handleOpen}
									onChange={handleOpen}
								/>

								<StyledModal open={open} onClose={handleClose}>
									<Fade in={open}>
										<div className='searchForm'>
											<SearchPlace setPlace={setPlace} />
										</div>
									</Fade>
								</StyledModal>
							</div>
						</div>
					</PrivacyContainer>
				</section>
				<section>
					<header>{/* <h3>추가 회원정보(선택)</h3> */}</header>
					<PrivacyContainer>
						<div></div>
					</PrivacyContainer>
				</section>
				<div style={{ textAlign: 'right' }}>
					<Button
						type='button'
						default
						padding='0.75rem 2rem'
						style={{ marginRight: '0.25rem' }}
					>
						취소
					</Button>
					<Button type='submit' onClick={onSubmit} padding='0.75rem 2rem'>
						수정
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Privacy;
