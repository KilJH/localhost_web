import {
	Fade,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
import Router from 'next/router';
import CpxBarometer from '../reuse/CpxBarometer';
import { Place } from '../../interfaces';
import SearchPlace from '../search/SearchPlace';
import Button from '../reuse/Button';
import { countries } from '../../client/utils/basicData';
import { useModal } from '../../client/hooks/useModal';
import { useToast } from '../../client/hooks/useToast';
import Toast from '../reuse/Toast';

const RegisterContainer = styled.div`
	width: 90%;
	max-width: 900px;
	margin: auto;
	& > * {
		margin: 1.25em 0;
	}
	& .nationality {
		display: flex;
	}
	& .MuiInputBase-root,
	& .MuiFormLabel-root {
		font-size: inherit;
	}
`;

const GenderButton = styled.button`
	border-radius: 0.25rem;
	width: 5em;
	&.selected {
		background-color: #5197d5;
		color: white;
		border-color: #5197d5;
		z-index: 1;
	}
	transition: all 0.2s ease;
`;

const FlexDiv = styled.div`
	display: flex;
	align-items: center;
`;

const Caption = styled.div`
	font-size: 0.9em;
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

const VALIDATION = {
	name: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"0-9]/i,
	phone: /[^0-9]/,
	nickname: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/i,
};

export default function Register() {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
		name: '',
		nickname: '',
		phone: '',
		nationality: '',
	});
	const { email, password, name, nickname, phone, nationality } = inputs;

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;

		if (VALIDATION[name]?.test(value)) return;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const [place, setPlace] = useState<Place>();

	const [isMan, setIsMan] = useState(true);
	const onClickHandler = (value: boolean) => {
		setIsMan(value);
	};

	const modal = useModal(false);
	useEffect(() => {
		modal.handleClose();
	}, [place]);

	const toast = useToast(false);

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const address = `${place?.formatted_address}(${place?.name})`;

		// ?????? ?????? ????????? ??????
		if (Object.values(inputs).includes('')) {
			return toast.handleOpen('error', '????????? ??????????????????');
		}

		axios
			.post(`/api/user/register`, {
				...inputs,
				sex: isMan ? 'male' : 'female',
				address: address,
			})
			.then((res: AxiosResponse<any>) => {
				alert(res.data.message);
				if (res.data.success) {
					Router.push('/');
				}
			});
	};
	return (
		<RegisterContainer>
			<div>
				<h2 style={{ margin: '1rem 0 0 0' }}>
					??????????????? ?????? ??????????????? ??????????????????.
				</h2>
				<Caption>
					LocalHost??? ???????????? ????????? ????????? ???????????? ???????????????.
				</Caption>
			</div>
			<div>
				<TextField
					name='email'
					onChange={onInputChange}
					value={email}
					label='???????????? ???????????????.'
					variant='outlined'
					type='email'
					fullWidth
				/>
			</div>
			<div>
				<TextField
					name='password'
					onChange={onInputChange}
					value={password}
					label='??????????????? ???????????????.'
					variant='outlined'
					type='password'
					margin-bottom='15px'
					fullWidth
				/>
				<CpxBarometer value={password} />
				<Caption>
					??????????????? 8~16????????? ?????? ???/?????????, ??????, ???????????? ??? 2????????????
					???????????? ??????????????? ????????? ?????????.
				</Caption>
			</div>
			<FlexDiv>
				<div style={{ flex: 1 }}>
					<TextField
						name='name'
						onChange={onInputChange}
						value={name}
						label='????????? ???????????????.'
						variant='outlined'
						type='text'
						fullWidth
					/>
				</div>
				<ButtonGroup
					disableRipple
					style={{ marginLeft: '0.5em', height: '3rem' }}
				>
					<GenderButton
						type='button'
						className={isMan ? 'selected' : ''}
						onClick={() => onClickHandler(true)}
					>
						???
					</GenderButton>
					<GenderButton
						type='button'
						className={isMan ? '' : 'selected'}
						onClick={() => onClickHandler(false)}
					>
						???
					</GenderButton>
				</ButtonGroup>
			</FlexDiv>
			<div>
				<TextField
					name='nickname'
					onChange={onInputChange}
					value={nickname}
					label='????????? ???????????? ???????????????.'
					variant='outlined'
					type='text'
					fullWidth
				/>
			</div>
			<div>
				<TextField
					name='phone'
					onChange={onInputChange}
					value={phone}
					label='????????? ????????? ???????????????.'
					variant='outlined'
					type='phone'
					fullWidth
				/>
			</div>
			<div>
				<FormControl variant='outlined' className='nationality'>
					<InputLabel id='select'>????????? ??????????????????.</InputLabel>
					<Select
						name='nationality'
						value={nationality}
						onChange={(e: any) => onInputChange(e)}
						label='????????? ??????????????????.'
					>
						{countries.map((value, i) => (
							<MenuItem value={value.nation} key={i}>
								{value.nation}
							</MenuItem>
						))}
						<MenuItem value='??????'>??????</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div>
				<TextField
					label='????????? ???????????????.'
					variant='outlined'
					type='text'
					fullWidth
					value={
						place?.name ? `${place?.formatted_address}(${place?.name})` : ''
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
			<Button width='100%' onClick={onSubmit} padding='1rem'>
				????????????
			</Button>
			<Toast {...toast}>{toast.message}</Toast>
		</RegisterContainer>
	);
}
