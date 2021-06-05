import { Modal, Fade, Select, MenuItem } from '@material-ui/core';
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
import { useModal } from '../../../client/hooks/useModal';
import { useToast } from '../../../client/hooks/useToast';
import Toast from '../../reuse/Toast';
import { countries } from '../../../client/utils/basicData';

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
		& .Nationality {
			width: 100%;
			height: 2.5rem;
			font-size: 0.8em;
			box-sizing: border-box;
			transition: all 0.2s ease;
			border: 1px solid rgba(0, 0, 0, 0.41);
		}

		& .MuiOutlinedInput-root {
			&:hover {
				border-width: 2px;
				border-color: rgba(0, 0, 0, 0.87);
			}
			&.Mui-focused {
				border: 2px solid rgb(81, 151, 213);
			}
		}
		& .MuiOutlinedInput-notchedOutline {
			border: none;
		}
	}

	& #user_image {
		margin: 0;
		padding: 0;
		opacity: 0;
		width: 0;
		height: 0;
		border: none;
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

	const time = new Date().getTime();
	const [photoUrl, setPhotoUrl] = useState(
		currentUser.photo ? `${currentUser.photo}?time=${time}` : '',
	);

	// 패스워드 수정 on/off
	const [enabledPw, setEnabledPw] = useState(false);

	// 국적
	const [nationality, setNationality] = useState(currentUser.nationality);

	const toast = useToast(false);

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
			address: address || currentUser.address,
			nationality: nationality,
		};
		// 유저정보 변경
		const res = await axios.post(`/api/user/update`, { ...user });

		if (res.data.success) {
			setCurrentUser({ ...currentUser, ...user });
			toast.handleOpen('success', '회원정보 변경을 완료했습니다.');
		} else {
			toast.handleOpen('error', '회원정보 변경을 실패했습니다.');
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
					res.data.success
						? toast.handleOpen('success', '패스워드 변경에 성공했습니다.')
						: toast.handleOpen('error', '패스워드 변경에 실패했습니다.');
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
		const input: any = document.getElementById('user_image');
		input.click();
	};

	const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setImg(e.target!.files![0]);
	};

	const onClickResetPhoto = () => {
		setPhotoUrl('');
		setCurrentUser({ ...currentUser, photo: '' });
		axios
			.post(`/api/user/update/photo`, {
				userId: currentUser.id,
				url: '',
			})
			.then(res => {
				res.data.success
					? toast.handleOpen(
							'success',
							'프로필사진을 기본이미지로 변경했습니다.',
					  )
					: toast.handleOpen('error', '프로필사진 변경에 실패했습니다.');
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
							userId: currentUser.id,
							url: res.data.url,
						})
						.then(res2 => {
							res2.data.success
								? toast.handleOpen('success', '프로필사진을 변경했습니다.')
								: toast.handleOpen('error', '프로필사진 변경에 실패했습니다.');

							setCurrentUser({
								...currentUser,
								photo: `${res.data.url}?time=${time}`,
							});
						});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [img]);

	// 모달을 위한 State
	const placeModal = useModal(false);

	useEffect(() => {
		placeModal.handleClose();
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
								{/* 파일 업로드를 위한 보이지않는 input */}
								{/* 아이폰 사파리 이슈 해결을 위해 정적으로 만들어 줌 */}
								<input
									id='user_image'
									type='file'
									accept='image/*'
									onChange={onChangeFileInput}
								/>

								<Button
									{...btnProps}
									default
									type='button'
									onClick={onClickResetPhoto}
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
										{enabledPw && (
											<Button
												{...btnProps}
												default
												type='button'
												onClick={onResetPw}
											>
												취소
											</Button>
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
									onClick={placeModal.handleOpen}
									onChange={placeModal.handleOpen}
								/>

								<StyledModal {...placeModal}>
									<Fade in={placeModal.open}>
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
								<Select
									variant='outlined'
									className='Nationality'
									defaultValue={nationality}
								>
									{countries.map(value => (
										<MenuItem
											value={value.nation}
											onClick={() => setNationality(value.nation)}
										>
											{value.nation}
										</MenuItem>
									))}
									<MenuItem value='기타' onClick={() => setNationality('기타')}>
										기타
									</MenuItem>
								</Select>
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

			<Toast {...toast}>{toast.message}</Toast>
		</section>
	);
};

export default Privacy;
