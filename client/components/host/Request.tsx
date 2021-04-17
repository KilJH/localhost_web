import {
	Checkbox,
	Fade,
	FormControlLabel,
	FormGroup,
	MenuItem,
	Modal,
	Radio,
	RadioGroup,
	Select,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import SERVER from '../../utils/url';
import Router from 'next/router';
import { UserStateContext } from '../../context/user';
import styled from 'styled-components';
import Textarea from '../reuse/Textarea';
import Input from '../reuse/Input';
import Button from '../reuse/Button';
import { Place } from '../../interfaces';
import SearchPlace from '../search/SearchPlace';

interface Props {}

const countries = [
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

const languages = [
	{ id: 1, name: '한국어' },
	{ id: 2, name: '일본어' },
	{ id: 3, name: '중국어' },
	{ id: 4, name: '영어' },
	{ id: 5, name: '프랑스어' },
	{ id: 6, name: '독일어' },
	{ id: 7, name: '스페인어' },
	{ id: 8, name: '포르투갈어' },
	{ id: 9, name: '힌디어' },
];

const RequestContainer = styled.div`
	margin: 2rem auto;
	& > div > div {
		display: flex;
		margin: 1.5rem 0;
		align-items: center;
		flex-wrap: wrap;
		& label {
			font-weight: 600;
		}
		& > *:first-child {
			flex: 1;
		}
		& > *:last-child {
			flex: 2;
		}
	}
`;

const WarningMessage = styled.p`
	font-size: 0.7em;
	font-weight: 600;
	text-align: center;
	margin: 2rem 0 0.25rem 0;
`;

const BtnRequest = styled.button`
	display: block;
	color: white;
	background-color: rgb(81, 151, 213, 1);
	font-size: 1em;
	font-weight: 500;
	border: none;
	width: 10em;
	margin: 0 auto;
	padding: 0.5rem 1rem;
	transition: all 0.3s ease;
	&:hover {
		background-color: rgb(61, 131, 203, 1);
	}
`;

const StyledModal = styled(Modal)`
	display: flex;
	align-items: center;
	justify-content: center;

	& .searchForm {
		width: 50vw;
		background: rgba(255, 255, 255, 0.9);
		padding: 1rem;
		border-radius: 0.25rem;
		outline: none;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(0, 0, 0, 0.3);
	}
`;

const Request = (props: Props) => {
	// const country = useInput('대한민국');
	const [place, setPlace] = useState<Place>({
		name: '',
		formatted_address: '',
		geometry: { location: { lat: 0, lng: 0 } },
	});
	const [langs, setLangs] = useState([]);
	const description = useInput('');
	const currentUser = useContext(UserStateContext);

	let newChecked = [];

	for (let i = 0; i < languages.length; i++) {
		newChecked = newChecked.concat(false);
	}

	const [checked, setChecked] = useState(newChecked);
	const favorite = useInput('0');

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

	const onSubmit = async () => {
		// e.preventDefault();

		const hostInfo = {
			// country: country.value,
			place: place,
			languages: langs,
			description: description.value,
		};

		const res = await axios.post(`${SERVER}/api/user/host/request`, {
			userId: currentUser.id,
			hostInfo,
		});
		alert(res.data.message);
		if (res.data.success) Router.push('/');
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (langs.length < 4) {
			if (e.target.checked && langs.length < 3) {
				setLangs([...langs, e.target.value]);
				setChecked([
					...checked.slice(0, Number(e.target.id) - 1),
					true,
					...checked.slice(Number(e.target.id) - 1 + 1),
				]);
			} else {
				setLangs(langs.filter((lang) => lang !== e.target.value));
				setChecked([
					...checked.slice(0, Number(e.target.id) - 1),
					false,
					...checked.slice(Number(e.target.id) - 1 + 1),
				]);
			}
		}
	};

	return (
		<RequestContainer>
			<div>
				<h2>호스트 신청을 위한 정보를 입력해주세요</h2>
				<div>
					<div>
						<label>호스트 활동 지역을 선택해주세요</label>
					</div>
					<div className='addressForm' onClick={handleOpen}>
						<Input
							type='address'
							width='100%'
							borderRadius='0.25rem'
							border='1px solid rgba(0,0,0,0.41)'
							textAlign='left'
							value={
								place.name ? `${place.formatted_address}(${place.name})` : ''
							}
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
					<label>사용가능 언어를 선택해주세요(최대 3개)</label>
					<FormGroup row>
						{languages.map((lang) => (
							<FormControlLabel
								key={lang.name}
								control={
									<Checkbox
										id={`${lang.id}`}
										color='primary'
										onChange={onChange}
										value={lang.name}
										checked={checked[lang.id - 1]}
									/>
								}
								label={lang.name}
							/>
						))}
					</FormGroup>
				</div>
				<div>
					<label>원하는 여행객의 국적을 선택해주세요</label>
					<RadioGroup row {...favorite}>
						<FormControlLabel
							value='0'
							control={<Radio color='primary' />}
							label='상관없음'
						/>
						<FormControlLabel
							value='1'
							control={<Radio color='primary' />}
							label='외국인'
						/>
						<FormControlLabel
							value='2'
							control={<Radio color='primary' />}
							label='자국민'
						/>
					</RadioGroup>
				</div>
				<div>
					<label>간략한 자기소개를 적어주세요</label>
					<Textarea height='8em' {...description}></Textarea>
				</div>

				<WarningMessage>신청 후 관리자의 승인이 필요합니다.</WarningMessage>
				<BtnRequest type='submit' onClick={onSubmit}>
					신청
				</BtnRequest>
			</div>
		</RequestContainer>
	);
};

export default Request;
