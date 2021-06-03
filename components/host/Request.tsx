import {
	Checkbox,
	Fade,
	FormControlLabel,
	FormGroup,
	Grid,
	Modal,
	Radio,
	RadioGroup,
	Snackbar,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from '../../client/hooks/useInput';
import Router from 'next/router';
import { UserStateContext } from '../../context/user';
import styled from 'styled-components';
import Textarea from '../reuse/Textarea';
import Input from '../reuse/Input';
import Button from '../reuse/Button';
import { Place } from '../../interfaces';
import SearchPlace from '../search/SearchPlace';
import { languages, travelStyles } from '../../client/utils/basicData';
import TravelStyleTag from '../reuse/TravelStyleTag';
import { useToast } from '../../client/hooks/useToast';
import { Alert, Color } from '@material-ui/lab';

const RequestContainer = styled.div`
	margin: 1.5rem auto;
	& > div > div {
		align-items: center;
	}
	& label {
		font-weight: 600;
		line-break: word;
	}
`;

const WarningMessage = styled.p`
	font-size: 0.7em;
	font-weight: 600;
	text-align: center;
	margin: 0.25rem 0;
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
		width: 85vw;
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

const Request = () => {
	// const country = useInput('대한민국');
	const [place, setPlace] = useState<Place>();
	const [langs, setLangs] = useState<string[]>([]);
	const [selectedStyle, setSelectedStyle] = useState('');
	const description = useInput('');
	const [reqCountry, setReqCountry] = useState(0);
	const currentUser = useContext(UserStateContext);

	const saveToast = useToast(false);
	const [errMsg, setErrMsg] = useState('');
	const [severity, setSeverity] = useState<Color>('warning');
	const setToast = (str, severity) => {
		saveToast.handleOpen();
		setSeverity(severity);
		setErrMsg(str);
	};

	let newChecked: boolean[] = [];

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

		if (place == null) {
			setToast('활동지역을 선택해주세요', 'warning');
		} else if (langs.length === 0) {
			setToast('언어를 선택해주세요', 'warning');
		} else if (selectedStyle === '') {
			setToast('여행스타일을 선택해주세요', 'warning');
		} else if (description.value === '') {
			setToast('자기소개를 작성해주세요', 'warning');
		} else {
			const hostInfo = {
				// country: country.value,
				place: place,
				languages: langs,
				description: description.value,
				reqCountry: reqCountry,
				tag: selectedStyle,
			};

			const res = await axios.post(`/api/host/request`, {
				userId: currentUser.id,
				hostInfo,
			});

			if (res.data.success) {
				setToast(res.data.message, 'success');
				Router.push('/');
			} else {
				setToast(res.data.message, 'error');
			}
		}
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

	const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReqCountry(Number(e.target.value));
	};
	return (
		<RequestContainer>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<h2>호스트 신청을 위한 정보를 입력해주세요</h2>
				</Grid>
				<Grid item container xs={12} spacing={1}>
					<Grid item xs={12} md={4}>
						<label>호스트 활동 지역을 선택해주세요</label>
					</Grid>
					<Grid item xs={12} md={8}>
						<div className='addressForm'>
							<Input
								type='address'
								width='100%'
								borderRadius='0.25rem'
								border='1px solid rgba(0,0,0,0.41)'
								textAlign='left'
								value={
									place?.name
										? `${place?.formatted_address}(${place!.name})`
										: ''
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
					</Grid>
				</Grid>
				<Grid item container xs={12} spacing={1}>
					<Grid item xs={12} md={4}>
						<label>사용가능 언어를 선택해주세요(최대 3개)</label>
					</Grid>

					<Grid item xs={12} md={8}>
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
					</Grid>
				</Grid>

				<Grid item container xs={12} spacing={1}>
					<Grid item xs={12} md={4}>
						<label>원하는 여행객의 국적을 선택해주세요</label>
					</Grid>
					<Grid item xs={12} md={8}>
						<RadioGroup
							row
							{...travelerNation}
							value={reqCountry}
							onChange={onRadioChange}
						>
							<FormControlLabel
								value={0}
								control={<Radio color='primary' />}
								label='상관없음'
							/>
							<FormControlLabel
								value={1}
								control={<Radio color='primary' />}
								label='외국인'
							/>
							<FormControlLabel
								value={2}
								control={<Radio color='primary' />}
								label='자국민'
							/>
						</RadioGroup>
					</Grid>
				</Grid>
				<Grid item container xs={12} spacing={1}>
					<Grid item xs={12} md={4}>
						<label>자신을 대표할 여행스타일을 선택해주세요</label>
					</Grid>

					<Grid item xs={12} md={8}>
						<TravelStyleInput
							value={selectedStyle}
							setValue={setSelectedStyle}
						/>
					</Grid>
				</Grid>
				<Grid item container xs={12} spacing={1}>
					<Grid item xs={12} md={4}>
						<label>간략한 자기소개를 적어주세요</label>
					</Grid>
					<Grid item xs={12} md={8}>
						<Textarea height='8em' {...description} />
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<WarningMessage>신청 후 관리자의 승인이 필요합니다.</WarningMessage>
					<BtnRequest onClick={onSubmit} width='10em' padding='0.5rem 1rem'>
						신청
					</BtnRequest>
				</Grid>
				<Snackbar
					open={saveToast.open}
					autoHideDuration={4000}
					onClose={saveToast.handleClose}
				>
					<Alert
						onClose={saveToast.handleClose}
						severity={severity}
						elevation={4}
						variant='filled'
					>
						{errMsg}
					</Alert>
				</Snackbar>
			</Grid>
		</RequestContainer>
	);
};

export default Request;
