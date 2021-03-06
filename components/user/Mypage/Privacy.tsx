import { Modal, Fade, Select, MenuItem } from '@material-ui/core';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useInput } from '../../../client/hooks/useInput';
import { Place } from '../../../interfaces';
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
		& .nationality {
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

const VALIDATION = {
	phone: /[^0-9]/,
	nickname: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/i,
};

const Privacy = () => {
	const currentUser = useContext(UserStateContext);
	const setCurrentUser = useContext(UserSetterContext);

	// ???????????? ?????????
	const [inputs, setInputs] = useState({
		nickname: currentUser.nickname,
		phone: currentUser.phone,
		nationality: currentUser.nationality,
	});
	const { nickname, phone, nationality } = inputs;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (VALIDATION[name]?.test(value)) return;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const pwInput = useInput('');
	const [place, setPlace] = useState<Place>();

	const [img, setImg] = useState<File>();

	// ?????? URL??? ?????? ????????? ????????? ?????? time??? ????????? ??????
	const time = new Date().getTime();
	const [photoUrl, setPhotoUrl] = useState(
		currentUser.photo ? `${currentUser.photo}?time=${time}` : '',
	);

	// ???????????? ?????? on/off
	const [enabledPw, setEnabledPw] = useState(false);

	const toast = useToast(false);

	// ????????????
	const onReset = () => {
		pwInput.setValue('');
		setInputs({
			nickname: currentUser.nickname,
			phone: currentUser.phone,
			nationality: currentUser.nationality,
		});
		setPlace({
			name: '',
			formatted_address: currentUser.address,
			geometry: { location: { lat: 0, lng: 0 } },
		});
		setEnabledPw(false);
	};
	// ????????????
	const onSubmit = async (e: React.MouseEvent) => {
		e.preventDefault();
		const address =
			place?.name === '' || !place?.name
				? place?.formatted_address
				: `${place?.formatted_address}(${place?.name})`;
		const user = {
			email: currentUser.email,
			address: address || currentUser.address,
			...inputs,
		};
		// ???????????? ??????
		const res = await axios.post(`/api/user/update`, { ...user });

		if (res.data.success) {
			setCurrentUser({ ...currentUser, ...user });
			toast.handleOpen('success', '???????????? ????????? ??????????????????.');
		} else {
			toast.handleOpen('error', '???????????? ????????? ??????????????????.');
		}
	};

	// ???????????? ????????????
	const onClickPw = () => {
		if (enabledPw) {
			axios
				.post(`/api/user/updatePW`, {
					email: currentUser.email,
					pw: pwInput.value,
				})
				.then(res => {
					res.data.success
						? toast.handleOpen('success', '???????????? ????????? ??????????????????.')
						: toast.handleOpen('error', '???????????? ????????? ??????????????????.');
				});
		}
		pwInput.setValue('');
		setEnabledPw(!enabledPw);
	};
	// ???????????? ????????????
	const onResetPw = () => {
		pwInput.setValue('');
		setEnabledPw(false);
	};

	const onClickPhoto = () => {
		const input: any = document.getElementById('user_image');
		input.click();
	};

	const onChangeFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setImg(e.target!.files![0]);
		},
		[],
	);

	const onClickResetPhoto = useCallback(() => {
		setPhotoUrl('');
		setCurrentUser(currentUser => ({ ...currentUser, photo: '' }));
		axios
			.post(`/api/user/update/photo`, {
				userId: currentUser.id,
				url: '',
			})
			.then(res => {
				res.data.success
					? toast.handleOpen(
							'success',
							'?????????????????? ?????????????????? ??????????????????.',
					  )
					: toast.handleOpen('error', '??????????????? ????????? ??????????????????.');
			});
	}, []);

	// ???????????? ???????????? ???
	useEffect(() => {
		if (img) {
			// formData generate
			const formData = new FormData();
			// formData??? key, value ??????
			formData.append('file', img!);
			formData.append('name', `user_profile_${currentUser.id}`);
			axios
				.post(`/api/s3/upload`, formData)
				.then(res => {
					// ?????? ?????? ??????
					const time = new Date().getTime();
					setPhotoUrl(`${res.data.url}?time=${time}`);
					// ????????? ?????? ??????
					axios
						.post(`/api/user/update/photo`, {
							userId: currentUser.id,
							url: res.data.url,
						})
						.then(res2 => {
							res2.data.success
								? toast.handleOpen('success', '?????????????????? ??????????????????.')
								: toast.handleOpen('error', '??????????????? ????????? ??????????????????.');

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

	// ????????? ?????? State
	const modal = useModal(false);

	useEffect(() => {
		modal.handleClose();
	}, [place]);

	return (
		<section>
			<div>
				<section>
					<header>
						<h3>?????? ????????????</h3>
					</header>
					<PrivacyContainer>
						<div>
							<div>??????: </div>
							<div>
								<UserPhoto
									src={photoUrl}
									width={8}
									margin='1rem 0'
									onClick={onClickPhoto}
									hover
								/>
								{/* ?????? ???????????? ?????? ??????????????? input */}
								{/* ????????? ????????? ?????? ????????? ?????? ???????????? ????????? ??? */}
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
									?????????????????? ??????
								</Button>
							</div>
						</div>
						<div>
							<div>?????????: </div>
							<div>{currentUser.email}</div>
						</div>
						<div>
							<div>????????????: </div>
							<div>
								<div style={{ display: 'flex' }}>
									<Input
										type='password'
										{...inputProps}
										disabled={!enabledPw}
										{...pwInput}
									/>
									<div
										style={{
											whiteSpace: 'nowrap',
											display: 'flex',
											marginLeft: '0.5em',
										}}
									>
										<Button
											{...btnProps}
											type='button'
											onClick={onClickPw}
											default={!enabledPw}
										>
											??????
										</Button>
										{enabledPw && (
											<Button
												{...btnProps}
												default
												type='button'
												onClick={onResetPw}
												style={{ marginLeft: '0.25em' }}
											>
												??????
											</Button>
										)}
									</div>
								</div>
								<CpxBarometer value={pwInput.value} />
							</div>
						</div>
						<div>
							<div>??????:</div>
							<div>{currentUser.name}</div>
						</div>
						<div>
							<div>?????????:</div>
							<div>
								<Input
									{...inputProps}
									name='nickname'
									value={nickname}
									onChange={onInputChange}
								/>
							</div>
						</div>
						<div>
							<div>?????????: </div>
							<div>
								<Input
									{...inputProps}
									name='phone'
									value={phone}
									onChange={onInputChange}
								/>
							</div>
						</div>
						<div>
							<div>??????: </div>
							<div>
								<Input
									{...inputProps}
									value={
										place?.name
											? `${place?.formatted_address}(${place?.name})`
											: currentUser.address
									}
									onClick={modal.handleOpen}
									onChange={modal.handleOpen}
								/>

								<StyledModal open={modal.open} onClose={modal.handleClose}>
									<Fade in={modal.open}>
										<div className='searchForm'>
											<SearchPlace setPlace={setPlace} />
										</div>
									</Fade>
								</StyledModal>
							</div>
						</div>
						<div>
							<div>??????: </div>
							<div>
								<Select
									name='nationality'
									variant='outlined'
									className='nationality'
									value={nationality}
									onChange={(e: any) => onInputChange(e)}
								>
									{countries.map((value, i) => (
										<MenuItem value={value.nation} key={i}>
											{value.nation}
										</MenuItem>
									))}
									<MenuItem value='??????'>??????</MenuItem>
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
						??????
					</Button>
					<Button type='submit' onClick={onSubmit} padding='0.75rem 2rem'>
						??????
					</Button>
				</div>
			</div>

			<Toast {...toast}>{toast.message}</Toast>
		</section>
	);
};

export default Privacy;
