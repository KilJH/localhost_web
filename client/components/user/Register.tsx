import { Container, Fade, Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';
import axios, { AxiosResponse } from 'axios';
import SERVER from '../../utils/url';
import Router from 'next/router';
import CpxBarometer from '../reuse/CpxBarometer';
import { Place } from '../../interfaces';
import SearchPlace from '../search/SearchPlace';
import Button from '../reuse/Button';

const RegisterContainer = styled(Container)`
	& > div {
		margin: 1rem 0;
	}
	& > Button {
		margin: 1rem 0;
	}
`;

const GenderButton = styled.button`
	height: 100%;
	padding: 1rem 0;
	background-color: transparent;
	border-color: transparent;
	border-radius: 0.25rem;
	width: 100%;
	outline: 0;
	font-weight: 500;
	&:hover {
		box-shadow: none;
		background-color: rgba(81, 151, 213, 0.3);
	}
	&:active {
		box-shadow: none;
		border-color: transparent;
		background-color: rgba(81, 151, 213, 0.6);
	}
	&.selected {
		border-color: transparent;
		background-color: #5197d5;
		color: white;
		box-shadow: none;
	}
	&.MuiButtonGroup-groupedOutlinedPrimary:hover {
		border-color: transparent;
	}
	& > button {
		height: 100%;
		margin: 0;
		padding: 1rem 0;
	}
`;

const CssTextField = styled(TextField)`
	width: 100%;

	&.MuiFormControl-root {
		margin-top: 0.7rem;
		margin-bottom: 0;
	}
	& .MuiOutlinedInput-root {
		&.hover fieldset {
			border-color: rgb(81, 151, 213);
		}
		&.Mui-focused fieldset {
			border-color: rgb(81, 151, 213);
		}
	}
`;

const CssButtonGroup = styled(ButtonGroup)`
	min-width: 8em;
	display: flex;
	margin-left: 0.5em;
	margin-top: 1rem;
	margin-top: 0.7rem;
`;

const FlexDiv = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;

const Caption = styled.p`
	font-size: 0.5em;
	font-weight: 600;
	margin: 0.5rem 0 0 0;
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

export default function Register() {
	const speCharReg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/i;
	const numReg = /[0-9]/;
	const numExceptReg = /[^0-9]/;

	const [isMan, setIsMan] = useState(true);

	const passwordInput = useInput('', (value: string) => value.length <= 16);
	const nicknameInput = useInput(
		'',
		(value: string) => !speCharReg.test(value),
	);
	const emailInput = useInput('');
	const nameInput = useInput(
		'',
		(value: string) => !(speCharReg.test(value) || numReg.test(value)),
	);
	const phoneNumInput = useInput(
		'',
		(value: string) => !numExceptReg.test(value) && value.length <= 12,
	);
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

	const onClickHandler = (value: boolean) => {
		setIsMan(value);
	};

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const address = `${place.formatted_address}(${place.name})`;

		axios
			.post(`${SERVER}/api/user/register`, {
				email: emailInput.value,
				pw: passwordInput.value,
				name: nameInput.value,
				sex: isMan ? 'male' : 'female',
				nickname: nicknameInput.value,
				phone: phoneNumInput.value,
				address: address,
			})
			.then((res: AxiosResponse<any>) => {
				console.log(res.data);
				alert(res.data.message);
				if (res.data.success) {
					Router.push('/');
				}
			});
	};

	return (
		<RegisterContainer maxWidth='sm'>
			<div>
				<h3 style={{ margin: '1rem 0 0 0' }}>
					회원가입을 위해 개인정보를 입력해주세요.
				</h3>
				<Caption>
					LocalHost는 고객님의 소중한 정보를 안전하게 관리합니다.
				</Caption>
			</div>
			<div>
				<CssTextField
					{...emailInput}
					label='이메일을 입력하세요.'
					variant='outlined'
					type='email'
				/>
			</div>
			<div>
				<CssTextField
					{...passwordInput}
					label='비밀번호를 입력하세요.'
					variant='outlined'
					type='password'
					margin-bottom='15px'
				/>
				<CpxBarometer value={passwordInput.value} />
				<Caption>
					비밀번호는 8~16자리의 영문 대/소문자, 숫자, 특수문자 중 2개이상을
					조합해서 비밀번호를 설정해 주세요.
				</Caption>
			</div>
			<FlexDiv>
				<div style={{ flex: 1 }}>
					<CssTextField
						label='이름을 입력하세요.'
						variant='outlined'
						type='text'
						{...nameInput}
					/>
				</div>
				<CssButtonGroup
					color='primary'
					aria-label='outlined primary button group'
					disableRipple
				>
					<GenderButton
						type='button'
						color='primary'
						className={isMan ? 'selected' : ''}
						onClick={() => onClickHandler(true)}
					>
						남
					</GenderButton>
					<GenderButton
						type='button'
						color='primary'
						className={isMan ? '' : 'selected'}
						onClick={() => onClickHandler(false)}
					>
						여
					</GenderButton>
				</CssButtonGroup>
			</FlexDiv>
			<div>
				<CssTextField
					{...nicknameInput}
					label='사용할 닉네임을 입력하세요.'
					variant='outlined'
					type='text'
				/>
			</div>
			<div>
				<CssTextField
					{...phoneNumInput}
					label='휴대폰 번호를 입력하세요.'
					variant='outlined'
				/>
			</div>
			<div>
				<CssTextField
					label='주소를 입력하세요.'
					variant='outlined'
					type='text'
					value={place.name ? `${place.formatted_address}(${place.name})` : ''}
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
			<Button width='100%' onClick={onSubmit} padding='1rem'>
				회원가입
			</Button>
		</RegisterContainer>
	);
}
