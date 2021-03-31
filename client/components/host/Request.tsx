import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
} from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import SERVER from '../../utils/url';
import Router from 'next/router';
import { UserStateContext } from '../../context/user';

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

const languagesBackup = [
	{ name: '한국어', checked: false },
	{ name: '일본어', checked: false },
	{ name: '중국어', checked: false },
	{ name: '영어', checked: false },
	{ name: '프랑스어', checked: false },
	{ name: '독일어', checked: false },
	{ name: '스페인어', checked: false },
	{ name: '포르투갈어', checked: false },
	{ name: '힌디어', checked: false },
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

const Request = (props: Props) => {
	const country = useInput('대한민국');
	const [langs, setLangs] = useState([]);
	const description = useInput('');
	const currentUser = useContext(UserStateContext);

	let newChecked = [];

	for (let i = 0; i < languages.length; i++) {
		newChecked = newChecked.concat(false);
	}

	const [checked, setChecked] = useState(newChecked);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const hostInfo = {
			country: country.value,
			languages: langs,
			description: description.value,
		};

		console.log(country.value, description.value);
		const res = await axios.post(`${SERVER}/api/user/host/request`, {
			userId: currentUser.id,
			hostInfo,
		});
		alert(res.data.message);
		if (res.data.success) Router.push('/');
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (langs.length < 3) {
			if (e.target.checked) {
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
		} else if (langs.length > 2) {
			if (!e.target.checked) {
				setLangs(langs.filter((lang) => lang !== e.target.value));
				setChecked([
					...checked.slice(0, Number(e.target.id) - 1),
					false,
					...checked.slice(Number(e.target.id) - 1 + 1),
				]);
			}
		}
	};

	useEffect(() => {
		console.log(langs);
		console.log(checked);
	}, [langs, checked]);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<InputLabel>거주국가를 선택해주세요</InputLabel>
					<Select {...country}>
						{countries.map((country) => (
							<MenuItem value={country}>{country}</MenuItem>
						))}
					</Select>
				</div>
				<div>
					<InputLabel>사용가능 언어를 선택해주세요(최대 3개)</InputLabel>
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
					<InputLabel>간략한 자기소개를 적어주세요</InputLabel>
					<textarea cols={64} rows={8} {...description}></textarea>
				</div>

				<span>신청 후 관리자의 승인이 필요합니다.</span>

				<button type='submit'>신청</button>
			</form>
		</div>
	);
};

export default Request;
