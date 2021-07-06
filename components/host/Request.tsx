import {
	Checkbox,
	Fade,
	FormControlLabel,
	FormGroup,
	Grid,
	Modal,
	Radio,
	RadioGroup,
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
import Toast from '../reuse/Toast';
import { useModal } from '../../client/hooks/useModal';

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
					key={style}
					label={style}
					checked={style === selectedStyle}
					onClick={onClick}
				/>
			))}
		</>
	);
};

const Request = () => {
	const [place, setPlace] = useState<Place>();
	const [langs, setLangs] = useState(
		languages.map(lang => ({ ...lang, checked: false })),
	);
	const [selectedStyle, setSelectedStyle] = useState('');
	const description = useInput('');
	const [reqCountry, setReqCountry] = useState(0);
	const currentUser = useContext(UserStateContext);

	const toast = useToast(false);

	// 모달을 위한 State
	const modal = useModal(false);
	useEffect(() => {
		modal.handleClose();
	}, [place]);

	const onSubmit = async () => {
		// e.preventDefault();
		const selectedLangs = langs.filter(lang => lang.checked);

		if (place == null) {
			toast.handleOpen('warning', '활동지역을 선택해주세요');
		} else if (selectedLangs.length === 0) {
			toast.handleOpen('warning', '언어를 선택해주세요');
		} else if (selectedStyle === '') {
			toast.handleOpen('warning', '여행스타일을 선택해주세요');
		} else if (description.value === '') {
			toast.handleOpen('warning', '자기소개를 작성해주세요');
		} else {
			const hostInfo = {
				place: place,
				languages: selectedLangs.map(lang => lang.name),
				description: description.value,
				reqCountry: reqCountry,
				tag: selectedStyle,
			};

			const res = await axios.post(`/api/host/request`, {
				userId: currentUser.id,
				hostInfo,
			});

			if (res.data.success) {
				alert(res.data.message);
				Router.push('/');
			} else {
				toast.handleOpen('error', res.data.message);
			}
		}
	};

	const onChange = (id: number) => {
		const count = langs.filter(lang => lang.checked).length;
		if (count < 3) {
			setLangs(
				langs.map(lang =>
					id === lang.id ? { ...lang, checked: !lang.checked } : lang,
				),
			);
		} else {
			// 3개로 꽉 찼을 때
			if (!langs.filter(lang => lang.id === id)[0].checked) {
				// 새로운 거 누를 때
				toast.handleOpen('warning', '최대 3개까지만 선택할 수 있습니다.');
				return;
			}

			// 이미 눌러져있는 거 누를 때
			setLangs(
				langs.map(lang =>
					id === lang.id ? { ...lang, checked: false } : lang,
				),
			);
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
					</Grid>
				</Grid>
				<Grid item container xs={12} spacing={1}>
					<Grid item xs={12} md={4}>
						<label>사용가능 언어를 선택해주세요(최대 3개)</label>
					</Grid>

					<Grid item xs={12} md={8}>
						<FormGroup row>
							{langs.map(lang => (
								<FormControlLabel
									key={lang.id}
									control={
										<Checkbox
											color='primary'
											onChange={() => onChange(lang.id)}
											checked={lang.checked}
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
						<RadioGroup row value={reqCountry} onChange={onRadioChange}>
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
				<Toast {...toast}>{toast.message}</Toast>
			</Grid>
		</RequestContainer>
	);
};

export default Request;
