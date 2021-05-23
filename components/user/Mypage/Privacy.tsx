import {
	Modal,
	Fade,
	Snackbar,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from '../../../client/hooks/useInput';
import { Place, User } from '../../../interfaces';
import styled from 'styled-components';
import { UserSetterContext, UserStateContext } from '../../../context/user';
import axios from 'axios';
import UserPhoto from '../UserPhoto';
import Button from '../../reuse/Button';
import CpxBarometer from '../../reuse/CpxBarometer';
import Input from '../../reuse/Input';
import SearchPlace from '../../search/SearchPlace';
import Alert from '@material-ui/lab/Alert';

interface Props {
	id: string;
	followingUsers?: User[];
	followers?: User[];
}

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
		& > p {
			margin: 0 0 1em 2em;
			font-size: 1em;
			font-weight: bold;
		}
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
	const setCurrentUser = useContext(UserSetterContext);

	// 입력받는 데이터
	const pwInput = useInput('');
	const nnInput = useInput(currentUser.nickname);
	const phInput = useInput(currentUser.phone);
	const [place, setPlace] = useState<Place>();

	const [img, setImg] = useState<File>();
	const [photoUrl, setPhotoUrl] = useState(currentUser.photo);

	// 패스워드 수정 on/off
	const [enabledPw, setEnabledPw] = useState(false);

	// 국적
	const [nationality, setNationality] = useState(currentUser.nationality);
	const nationalities = [
		'대한민국',
		'일본',
		'중국',
		'베트남',
		'태국',
		'프랑스',
		'영국',
		'독일',
		'포르투갈',
		'스페인',
		'이탈리아',
	];
	const [dialogueOpen, setDialogueOpen] = useState(false);
	const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNationality(String(e.target.value));
	};
	const handleDialogueOpen = () => {
		setDialogueOpen(true);
	};
	const handleDialogueClose = () => {
		setDialogueOpen(false);
	};

	// 정보변경 알림
	const [onToast, setOnToase] = useState(false);
	const onOpenToast = () => {
		setOnToase(true);
	};
	const onCloseToast = (_event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOnToase(false);
	};
	// 패스워드 변경 알림
	const [onPwToast, setOnPwToase] = useState(false);
	const onOpenPwToast = () => {
		setOnPwToase(true);
	};
	const onClosePwToast = (_event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOnPwToase(false);
	};

	// 취소버튼
	const onReset = () => {
		pwInput.setValue('');
		nnInput.setValue(currentUser.nickname);
		phInput.setValue(currentUser.phone);
		setPlace({
			name: '',
			formatted_address: currentUser.address,
			geometry: { location: { lat: 0, lng: 0 } },
		});
		setEnabledPw(false);
	};
	// 수정버튼
	const onSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		const address =
			place?.name === '' || !place?.name
				? place?.formatted_address
				: `${place?.formatted_address}(${place?.name})`;
		const user = {
			email: currentUser.email,
			nickname: nnInput.value,
			phone: phInput.value,
			address: address,
			nationality: nationality,
		};
		// 유저정보 변경
		const res = await axios.post(`/api/user/update`, { ...user });

		if (res.data.success) {
			setCurrentUser({ ...currentUser, ...user });
			onOpenToast();
			// Router.push('/users/mypage');
		}
	};

	// 비밀번호 변경버튼
	const onClickPw = () => {
		if (enabledPw) {
			axios
				.post(`/api/user/updatePW`, {
					email: currentUser.email,
					pw: pwInput.value,
				})
				.then(res => {
					res.data.success ? onOpenPwToast() : '';
				});
		}
		pwInput.setValue('');
		setEnabledPw(!enabledPw);
	};
	// 비밀번호 취소버튼
	const onResetPw = () => {
		pwInput.setValue('');
		setEnabledPw(false);
	};

	const onClickPhoto = () => {
		const input: any = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.click();

		input.onchange = function (e: React.ChangeEvent<HTMLInputElement>) {
			setImg(e.target!.files![0]);
		};
	};

	const onClickReset = () => {
		setPhotoUrl('');
		axios
			.post(`/api/user/update/photo`, {
				id: currentUser.id,
				url: '',
			})
			.then(res => {
				console.log(res);
			});
	};

	// 이미지가 바뀌었을 때
	useEffect(() => {
		if (img) {
			// formData generate
			const formData = new FormData();
			// formData에 key, value 추가
			formData.append('file', img!);
			formData.append('name', `user_profile_${currentUser.id}`);
			axios
				.post(`/api/s3/upload`, formData)
				.then(res => {
					// 뷰에 포토 수정
					const time = new Date().getTime();
					setPhotoUrl(`${res.data.url}?time=${time}`);
					// 디비에 포토 수정
					axios
						.post(`/api/user/update/photo`, {
							id: currentUser.id,
							url: res.data.url,
						})
						.then(() => {
							location.href = '/users/mypage';
						});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [img]);

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
							<div>
								<div style={{ display: 'flex' }}>
									<Input
										type='password'
										{...inputProps}
										disabled={!enabledPw}
										{...pwInput}
									/>
									<span style={{ whiteSpace: 'nowrap' }}>
										<Button
											{...btnProps}
											type='button'
											onClick={onClickPw}
											default={!enabledPw}
										>
											변경
										</Button>
										{enabledPw ? (
											<Button
												{...btnProps}
												default
												type='button'
												onClick={onResetPw}
											>
												취소
											</Button>
										) : (
											''
										)}
									</span>
								</div>
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
										place?.name
											? `${place?.formatted_address}(${place?.name})`
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
						<div>
							<div>국적: </div>
							<div>
								<RadioGroup value={nationality} onChange={onRadioChange}>
									<Input
										{...inputProps}
										value={nationality}
										onClick={handleDialogueOpen}
										onChange={handleDialogueOpen}
									/>
									<StyledModal
										open={dialogueOpen}
										onClose={handleDialogueClose}
									>
										<Fade in={dialogueOpen}>
											<div className='searchForm'>
												<p>국적을 선택해주세요</p>
												{nationalities.map(value => (
													<FormControlLabel
														className='NationalityLabel'
														value={value}
														control={<Radio color='primary' />}
														label={value}
														onClick={handleDialogueClose}
													/>
												))}
											</div>
										</Fade>
									</StyledModal>
								</RadioGroup>
							</div>
						</div>
					</PrivacyContainer>
				</section>
				<div style={{ textAlign: 'right', marginTop: '2rem' }}>
					<Button
						type='reset'
						default
						padding='0.75rem 2rem'
						style={{ marginRight: '0.25rem' }}
						onClick={onReset}
					>
						취소
					</Button>
					<Button type='submit' onClick={onSubmit} padding='0.75rem 2rem'>
						수정
					</Button>
				</div>
			</div>
			<Snackbar open={onToast} autoHideDuration={4000} onClose={onCloseToast}>
				<Alert
					onClose={onCloseToast}
					severity='success'
					elevation={6}
					variant='filled'
				>
					정보 수정에 성공했습니다.
				</Alert>
			</Snackbar>

			<Snackbar
				open={onPwToast}
				autoHideDuration={4000}
				onClose={onClosePwToast}
			>
				<Alert
					onClose={onClosePwToast}
					severity='success'
					elevation={6}
					variant='filled'
				>
					패스워드 변경에 성공했습니다.
				</Alert>
			</Snackbar>
		</section>
	);
};

export default Privacy;
