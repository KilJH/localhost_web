import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SelectInput from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Host } from '../../../interfaces';
import { useInput } from '../../../hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Input from '../../reuse/Input';
import SearchPlace from '../../search/SearchPlace';
import Fade from '@material-ui/core/Fade';
import { Place } from '../../../interfaces';
import Modal from '@material-ui/core/Modal';
import ReuseButton from '../../reuse/Button';
import axios from 'axios';
import SERVER from '../../../utils/url';

interface Props {
	host: Host;
}
const ComponentDiv = styled.div`
	& > h3 {
		margin: 0 auto 2em auto;
	}
`;
const Label = styled.p`
	margin: 2em 0 1em 0;
	font-size: 1em;
`;

const ButtonLabel = styled(Button)`
	&.MuiButton-root {
		color: #5197d5;
		margin: 0 1em 0 0;
		&:hover {
			color: rgb(33, 33, 33);
		}
	}
`;

const SwitchForm = styled(FormControlLabel)`
	display: inline;
	&.MuiFormControlLabel-labelPlacementStart {
		margin-left: 0;
	}
	&.MuiFormControlLabel-root {
		margin-left: 0.5em;
	}
`;

const IsOn = styled(Switch)`
	& .MuiSwitch-colorPrimary.Mui-checked {
		color: #5197d5;
	}
	& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
		background-color: #5197d5;
	}
`;

const DescriptionField = styled(TextField)`
	&.MuiFormControl-root {
		width: 100%;
	}
	& > div {
		font-size: 0.9em;
		opacity: 0.9;
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
const UpdateButton = styled(ReuseButton)`
	margin: 5em auto 2.5em auto;
	display: flex;
`;
const DialogueTitle = styled(DialogTitle)`
	color: rgb(33, 33, 33);
	text-align: center;
	& .MuiTypography-h6 {
		font-size: 0.95em;
		font-weight: bold;
	}
	&.MuiDialogTitle-root {
		padding: 2em 6em;
	}
`;
const DialogueContent = styled(DialogContent)`
	&.MuiDialogContent-root {
		margin: 2em auto 4em auto;
	}
`;

const LanguageControl = styled(FormControl)`
	width: 7em;
	&.MuiFormControl-root {
		margin: 0 0.5em;
	}
	& .MuiFormLabel-root.Mui-focused {
		color: #5197d5;
	}
	& .MuiInput-underline:after {
		border-bottom: 2px solid #5197d5;
	}
	& .MuiInput-underline:hover:not(.Mui-disabled):before {
		border-color: #5197d5;
	}
`;
const PlaceInput = styled(Input)`
	opacity: 0.7;
	background: rgba(33, 33, 33, 0.1);
	cursor: pointer;
`;

export default function MyHosting(props: Props): ReactElement {
	const { host } = props;
	const [isOn, setIsOn] = useState(host.on);
	const [language, setLanguage] = useState({
		language1: host.languages[0] === null ? ' ' : host.languages[0],
		language2: host.languages[1] === null ? ' ' : host.languages[1],
		language3: host.languages[2] === null ? ' ' : host.languages[2],
	});

	const description = useInput(host.description);
	const [place, setPlace] = useState<Place>(host.place);
	const [languageSave, setLanguageSave] = useState(language);
	const [languageOpen, setLanguageOpen] = useState(false);
	const [placeOpen, setPlaceOpen] = useState(false);

	let languages = [
		'한국어',
		'일본어',
		'중국어',
		'영어',
		'프랑스어',
		'독일어',
		'스페인어',
		'포르투갈어',
		'힌디어',
	];

	const handlelanguageOpen = () => {
		setLanguageOpen(true);
	};
	const handleLanguageClose = () => {
		setLanguageSave(language);
		setLanguageOpen(false);
	};
	const handleLanguageCancle = () => {
		setLanguage(languageSave);
		setLanguageOpen(false);
	};

	const handlePlaceOpen = () => {
		setPlaceOpen(true);
	};
	const handlePlaceClose = () => {
		setPlaceOpen(false);
	};

	const language1HandleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.value === ' ') {
			if (
				event.target.value === ' ' &&
				language.language2 === ' ' &&
				language.language3 === ' '
			)
				alert('최소 언어 하나를 선택해주시기 바랍니다.');
			else {
				setLanguage({
					language1: event.target.value,
					language2: language.language2,
					language3: language.language3,
				});
			}
		} else if (
			event.target.value === language.language2 ||
			event.target.value === language.language3
		)
			alert('중복된 언어를 선택하셨습니다.');
		else {
			setLanguage({
				language1: event.target.value,
				language2: language.language2,
				language3: language.language3,
			});
		}
	};
	const language2HandleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.value === ' ') {
			if (
				event.target.value === ' ' &&
				language.language1 === ' ' &&
				language.language3 === ' '
			)
				alert('최소 언어 하나를 선택해주시기 바랍니다.');
			else {
				setLanguage({
					language1: language.language1,
					language2: event.target.value,
					language3: language.language3,
				});
			}
		} else if (
			event.target.value === language.language1 ||
			event.target.value === language.language3
		)
			alert('중복된 언어를 선택하셨습니다.');
		else {
			setLanguage({
				language1: language.language1,
				language2: event.target.value,
				language3: language.language3,
			});
		}
	};
	const language3HandleChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.value === ' ') {
			if (
				event.target.value === ' ' &&
				language.language1 === ' ' &&
				language.language2 === ' '
			)
				alert('최소 언어 하나를 선택해주시기 바랍니다.');
			else {
				setLanguage({
					language1: language.language1,
					language2: language.language2,
					language3: event.target.value,
				});
			}
		} else if (
			event.target.value === language.language1 ||
			event.target.value === language.language2
		)
			alert('중복된 언어를 선택하셨습니다.');
		else {
			setLanguage({
				language1: language.language1,
				language2: language.language2,
				language3: event.target.value,
			});
		}
	};
	const isOnHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setIsOn(!isOn);
	};
	useEffect(() => {
		axios
			.post(`${SERVER}/api/host/status`, {
				id: host.id,
				on: isOn ? 1 : 0,
			})
			.catch(err => {
				return console.log(err);
			});
	}, [isOn]);

	const onSubmitHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${SERVER}/api/host/update`, {
				id: host.id,
				language1: language.language1 === ' ' ? null : language.language1,
				language2: language.language2 === ' ' ? null : language.language2,
				language3: language.language3 === ' ' ? null : language.language3,
				description: description.value,
				latitude: place.geometry.location.lat,
				longitude: place.geometry.location.lng,
				address: place.formatted_address,
			});
			if (res.data.success) {
				alert('호스트 정보 수정이 완료되었습니다!');
				window.location.replace('/hosts/myhosting'); // 새로고침
			}
		} catch (err) {
			return console.log(err);
		}
	};

	return (
		<ComponentDiv>
			<h3>나의 호스트 정보</h3>

			{/* 호스트 설정 */}
			<Label style={{ display: 'inline' }}>호스트 활성</Label>
			<SwitchForm
				control={
					<IsOn checked={isOn} onChange={isOnHandleChange} color='primary' />
				}
				label=''
			/>

			{/* 자기소개 수정 */}
			<Label>자기소개 수정</Label>
			<DescriptionField
				{...description}
				rows={8}
				variant='outlined'
				multiline
			/>

			{/* 언어 설정 */}
			<Label>사용 가능한 언어 설정</Label>

			{/* 언어 선택 */}
			<ButtonLabel onClick={handlelanguageOpen}>언어 선택</ButtonLabel>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={languageOpen}
				onClose={handleLanguageClose}
			>
				<DialogueTitle>사용 가능한 언어를 선택해주세요</DialogueTitle>
				<DialogueContent>
					<form>
						<LanguageControl>
							<InputLabel>언어1</InputLabel>
							<Select
								value={language.language1}
								onChange={language1HandleChange}
								input={<SelectInput />}
							>
								<MenuItem value=' '>
									<em>선택안함</em>
								</MenuItem>
								{languages.map(value => (
									<MenuItem value={value}>{value}</MenuItem>
								))}
							</Select>
						</LanguageControl>
						<LanguageControl>
							<InputLabel>언어2</InputLabel>
							<Select
								value={language.language2}
								onChange={language2HandleChange}
								input={<SelectInput />}
							>
								<MenuItem value=' '>
									<em>선택안함</em>
								</MenuItem>
								{languages.map(value => (
									<MenuItem value={value}>{value}</MenuItem>
								))}
							</Select>
						</LanguageControl>
						<LanguageControl>
							<InputLabel>언어3</InputLabel>
							<Select
								value={language.language3}
								onChange={language3HandleChange}
								input={<SelectInput />}
							>
								<MenuItem value=' '>
									<em>선택안함</em>
								</MenuItem>
								{languages.map(value => (
									<MenuItem value={value}>{value}</MenuItem>
								))}
							</Select>
						</LanguageControl>
					</form>
				</DialogueContent>
				<DialogActions>
					<Button onClick={handleLanguageCancle} color='secondary'>
						취소
					</Button>
					<Button onClick={handleLanguageClose} color='primary'>
						수정
					</Button>
				</DialogActions>
			</Dialog>

			{/* 지역 수정 */}
			<Label>활동지역 수정</Label>
			<PlaceInput
				type='address'
				width='100%'
				borderRadius='0.25rem'
				border='1px solid rgba(0,0,0,0.41)'
				textAlign='left'
				value={place.formatted_address}
				onClick={handlePlaceOpen}
				onChange={handlePlaceOpen}
				readOnly
			/>
			<StyledModal open={placeOpen} onClose={handlePlaceClose}>
				<Fade in={placeOpen}>
					<div className='searchForm'>
						<SearchPlace setPlace={setPlace} />
					</div>
				</Fade>
			</StyledModal>
			<UpdateButton type='button' onClick={onSubmitHandler}>
				정보수정
			</UpdateButton>
		</ComponentDiv>
	);
}
