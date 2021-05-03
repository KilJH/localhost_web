import {
	Checkbox,
	Fade,
	FormControlLabel,
	FormGroup,
	Modal,
	Radio,
	RadioGroup,
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
import { languages, travelStyles } from '../../utils/basicData';
import TravelStyleTag from '../reuse/TravelStyleTag';

interface Props {}

const RequestContainer = styled.div`
	margin: 2rem auto;
	& > div > div {
		display: flex;
		margin: 1.5rem 0;
		align-items: center;
		flex-wrap: wrap;
		& > label {
			font-weight: 600;
			flex: 1;
			padding: 0 1em;
			line-break: word;
		}
		& > *:nth-child(2) {
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

const BtnRequest = styled(Button)`
	display: block;
	font-size: 1em;
	font-weight: 500;
	margin: 0 auto;
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

const TravelStyleInput = ({
	value: selectedStyle,
	setValue: setSelectedStyle,
}) => {
	const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
		if (selectedStyle === e.currentTarget.innerText) {
			setSelectedStyle('');
			return;
		}
		setSelectedStyle(e.currentTarget.innerText);
	};
	return (
		<>
			{travelStyles.map(style => (
				<TravelStyleTag
					label={style}
					checked={style === selectedStyle}
					onClick={onClick}
				/>
			))}
		</>
	);
};

const Request = (props: Props) => {
	// const country = useInput('대한민국');
	const [place, setPlace] = useState<Place>({
		name: '',
		formatted_address: '',
		geometry: { location: { lat: 0, lng: 0 } },
	});
	const [langs, setLangs] = useState([]);
	const [selectedStyle, setSelectedStyle] = useState('');
	const description = useInput('');
	const currentUser = useContext(UserStateContext);

	let newChecked = [];

	for (let i = 0; i < languages.length; i++) {
		newChecked = newChecked.concat(false);
	}

	const [checked, setChecked] = useState(newChecked);
	const travelerNation = useInput('0');

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
			travelStyle: selectedStyle,
		};

		const res = await axios.post(`${SERVER}/api/host/request`, {
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
				setLangs(langs.filter(lang => lang !== e.target.value));
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
					<label>호스트 활동 지역을 선택해주세요</label>
					<div className='addressForm'>
						<Input
							type='address'
							width='100%'
							borderRadius='0.25rem'
							border='1px solid rgba(0,0,0,0.41)'
							textAlign='left'
							value={
								place.name ? `${place.formatted_address}(${place.name})` : ''
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
					<label>사용가능 언어를 선택해주세요(최대 3개)</label>
					<FormGroup row>
						{languages.map(lang => (
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
					<RadioGroup row {...travelerNation}>
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
					<label>자신을 대표할 여행스타일을 선택해주세요</label>
					<div>
						<TravelStyleInput
							value={selectedStyle}
							setValue={setSelectedStyle}
						/>
					</div>
				</div>
				<div>
					<label>간략한 자기소개를 적어주세요</label>
					<div>
						<Textarea height='8em' {...description} />
					</div>
				</div>

				<WarningMessage>신청 후 관리자의 승인이 필요합니다.</WarningMessage>
				<BtnRequest onClick={onSubmit} width='10em' padding='0.5rem 1rem'>
					신청
				</BtnRequest>
			</div>
		</RequestContainer>
	);
};

export default Request;
