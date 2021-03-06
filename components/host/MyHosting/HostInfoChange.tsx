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
import { useInput } from '../../../client/hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Input from '../../reuse/Input';
import SearchPlace from '../../search/SearchPlace';
import Fade from '@material-ui/core/Fade';
import { Place } from '../../../interfaces';
import Modal from '@material-ui/core/Modal';
import ReuseButton from '../../reuse/Button';
import axios from 'axios';
import { travelStyles } from '../../../client/utils/basicData';
import TravelStyleTag from '../../reuse/TravelStyleTag';
import { Radio, RadioGroup } from '@material-ui/core';

interface Props {
	host: Host;
	toast: Function;
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

export default function MyHosting(props: Props): ReactElement {
	const { host, toast } = props;
	const [isOn, setIsOn] = useState(host.on);
	const [language, setLanguage] = useState({
		language1: host.languages[0] === null ? ' ' : host.languages[0],
		language2: host.languages[1] === null ? ' ' : host.languages[1],
		language3: host.languages[2] === null ? ' ' : host.languages[2],
	});

	const description = useInput(host!.description as string);
	const [place, setPlace] = useState<Place | undefined>(host!.place as Place);
	const [languageSave, setLanguageSave] = useState(language);
	const [languageOpen, setLanguageOpen] = useState(false);
	const [placeOpen, setPlaceOpen] = useState(false);
	const [selectedStyle, setSelectedStyle] = useState(host.tag || '');

	const [reqCountry, setReqCountry] = useState(host.reqCountry);
	const travelerNation = useInput('0');
	let languages = [
		'?????????',
		'?????????',
		'?????????',
		'??????',
		'????????????',
		'?????????',
		'????????????',
		'???????????????',
		'?????????',
	];

	const handlelanguageOpen = () => {
		setLanguageOpen(true);
	};
	const handleLanguageClose = () => {
		setLanguageSave(language);
		setLanguageOpen(false);
	};
	const handleLanguageCancel = () => {
		setLanguage(languageSave);
		setLanguageOpen(false);
	};

	const handlePlaceOpen = () => {
		setPlaceOpen(true);
	};
	const handlePlaceClose = () => {
		setPlaceOpen(false);
	};

	const languageHandleChange = (lang1, lang2, lang3, target) => {
		if (target === ' ') {
			if (lang1 === ' ' && lang2 === ' ' && lang3 === ' ')
				alert('?????? ?????? ????????? ?????????????????? ????????????.');
			else {
				setLanguage({
					language1: lang1,
					language2: lang2,
					language3: lang3,
				});
			}
		} else if (lang1 === lang2 || lang1 === lang3)
			alert('????????? ????????? ?????????????????????.');
		else {
			setLanguage({
				language1: lang1,
				language2: lang2,
				language3: lang3,
			});
		}
	};

	const isOnHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setIsOn(!isOn);
	};
	useEffect(() => {
		axios
			.post(`/api/host/status`, {
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
			const res = await axios.post(`/api/host/update`, {
				id: host.id,
				language1: language.language1 === null ? ' ' : language.language1,
				language2: language.language2 === null ? ' ' : language.language2,
				language3: language.language3 === null ? ' ' : language.language3,
				reqCountry: reqCountry,
				tag: selectedStyle,
				description: description.value,
				latitude: place?.geometry!.location.lat,
				longitude: place?.geometry!.location.lng,
				address: place?.formatted_address,
			});
			if (res.data.success) {
				toast('success', '????????? ?????? ????????? ?????????????????????!');
				window.location.replace('/hosts/myhosting'); // ????????????
			} else toast('error', '????????? ?????? ?????? ??????');
		} catch (err) {
			return toast('error', err);
		}
	};
	const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setReqCountry(Number(e.target.value));
	};
	return (
		<ComponentDiv>
			<h3>?????? ????????? ??????</h3>

			{/* ????????? ?????? */}
			<Label style={{ display: 'inline' }}>????????? ??????</Label>
			<SwitchForm
				control={
					<IsOn checked={isOn} onChange={isOnHandleChange} color='primary' />
				}
				label=''
			/>

			{/* ???????????? ?????? */}
			<Label>???????????? ??????</Label>
			<DescriptionField
				{...description}
				rows={8}
				variant='outlined'
				multiline
			/>
			{/* ??????????????? ?????? */}
			<Label>??????????????? ??????</Label>
			<TravelStyleInput value={selectedStyle} setValue={setSelectedStyle} />

			{/* ????????? ????????? ?????? ?????? */}
			<Label>????????? ???????????? ????????? ??????????????????</Label>
			<RadioGroup
				row
				{...travelerNation}
				value={reqCountry}
				onChange={onRadioChange}
			>
				<FormControlLabel
					value={0}
					control={<Radio color='primary' />}
					label='????????????'
				/>
				<FormControlLabel
					value={1}
					control={<Radio color='primary' />}
					label='?????????'
				/>
				<FormControlLabel
					value={2}
					control={<Radio color='primary' />}
					label='?????????'
				/>
			</RadioGroup>

			{/* ?????? ?????? */}
			<Label>?????? ????????? ?????? ??????</Label>
			<ButtonLabel onClick={handlelanguageOpen}>?????? ??????</ButtonLabel>
			<Dialog open={languageOpen} onClose={handleLanguageClose}>
				<DialogueTitle>?????? ????????? ????????? ??????????????????</DialogueTitle>
				<DialogueContent>
					<form>
						<LanguageControl>
							<InputLabel>??????1</InputLabel>
							<Select
								value={language.language1}
								onChange={e =>
									languageHandleChange(
										e.target.value,
										language.language2,
										language.language3,
										e.target.value,
									)
								}
								input={<SelectInput />}
							>
								<MenuItem value=' '>
									<em>????????????</em>
								</MenuItem>
								{languages.map(value => (
									<MenuItem value={value}>{value}</MenuItem>
								))}
							</Select>
						</LanguageControl>
						<LanguageControl>
							<InputLabel>??????2</InputLabel>
							<Select
								value={language.language2}
								onChange={e =>
									languageHandleChange(
										language.language1,
										e.target.value,
										language.language3,
										e.target.value,
									)
								}
								input={<SelectInput />}
							>
								<MenuItem value=' '>
									<em>????????????</em>
								</MenuItem>
								{languages.map(value => (
									<MenuItem value={value}>{value}</MenuItem>
								))}
							</Select>
						</LanguageControl>
						<LanguageControl>
							<InputLabel>??????3</InputLabel>
							<Select
								value={language.language3}
								onChange={e =>
									languageHandleChange(
										language.language1,
										language.language2,
										e.target.value,
										e.target.value,
									)
								}
								input={<SelectInput />}
							>
								<MenuItem value=' '>
									<em>????????????</em>
								</MenuItem>
								{languages.map(value => (
									<MenuItem value={value}>{value}</MenuItem>
								))}
							</Select>
						</LanguageControl>
					</form>
				</DialogueContent>
				<DialogActions>
					<Button onClick={handleLanguageCancel} color='secondary'>
						??????
					</Button>
					<Button onClick={handleLanguageClose} color='primary'>
						??????
					</Button>
				</DialogActions>
			</Dialog>

			{/* ?????? ?????? */}
			<Label>???????????? ??????</Label>
			<PlaceInput
				type='address'
				width='100%'
				borderRadius='0.25rem'
				border='1px solid rgba(0,0,0,0.41)'
				textAlign='left'
				value={place!.formatted_address}
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
				????????????
			</UpdateButton>
		</ComponentDiv>
	);
}
