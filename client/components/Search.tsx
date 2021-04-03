import React, { useState, useEffect } from 'react';
import { User } from '../interfaces';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components';
import _app from '../pages/_app';
import { useInput } from '../hooks/useInput';

type Props = {
	// 필수 Props
	options: Array<string>;
	label: Array<string>;
	onSubmit: Function;

	// 호스트, 호스트 신청자와 일반유저 구분(선택)
	isHost?: boolean;
	isPreHost?: boolean;

	// 라벨
	selectLabel?: string;
	inputLabel?: string;
	buttonLabel?: string;

	// 스타일링
	marginTop?: string | number;
	marginBottom?: string | number;
	marginLeft?: string | number;
	marginRight?: string | number;
};

// 검색 폼 전체 Props
interface FormProps {
	marginTop?: string | number;
	marginBottom?: string | number;
	marginLeft?: string | number;
	marginRight?: string | number;
}

// 검색 바디
const SearchForm = styled.form<FormProps>`
	display: flex;
	margin-top: ${(props: FormProps) => props.marginTop || 0};
	margin-bottom: ${(props: FormProps) => props.marginBottom || 0};
	margin-left: ${(props: FormProps) => props.marginLeft || 0};
	margin-right: ${(props: FormProps) => props.marginRight || 0};
`;

const SelectControl = styled(FormControl)`
	&.MuiFormControl-root {
		width: 25%;
		margin-right: 0.5rem;
	}
	& .MuiOutlinedInput-root {
		height: -webkit-fill-available;
		&.hover fieldset {
			border-color: rgb(81, 151, 213);
		}
		&.Mui-focused fieldset {
			border-color: rgb(81, 151, 213);
		}
	}
`;

const CssTextField = styled(TextField)`
	&.MuiFormControl-root {
		width: 80%;
		margin-right: 0.5rem;
	}
	& .MuiOutlinedInput-root {
		height: -webkit-fill-available;
		&.hover fieldset {
			border-color: rgb(81, 151, 213);
		}
		&.Mui-focused fieldset {
			border-color: rgb(81, 151, 213);
		}
	}
`;

const SearchButton = styled(Button)`
	&.MuiButton-root {
		width: 20%;
	}
	&.MuiButton-containedPrimary {
		background-color: #5197d5;
	}
`;

export default function Search(props: Props) {
	const {
		options,
		label,
		selectLabel,
		inputLabel,
		buttonLabel,
		onSubmit,
	} = props;

	const sLabel = selectLabel ? selectLabel : '선택';
	const item = useInput('');
	const type = useInput('nickname');

	return (
		<SearchForm
			onSubmit={(e: React.FormEvent) => {
				onSubmit(e, type.value, item.value);
			}}
			marginTop={props.marginTop}
			marginBottom={props.marginBottom}
			marginLeft={props.marginLeft}
			marginRight={props.marginRight}
		>
			<SelectControl variant='outlined'>
				<Select
					//defaultValue={1}
					{...type}
					inputProps={{ 'aria-label': 'Without label' }}
					displayEmpty
					// {...type}
				>
					<MenuItem value='' disabled>
						{sLabel}
					</MenuItem>
					{options.map((op, i) => (
						<MenuItem value={op}>{label[i]}</MenuItem>
					))}
				</Select>
			</SelectControl>
			<CssTextField
				// onChange={onTextChange}
				{...item}
				label={inputLabel ? inputLabel : '입력'}
				variant='outlined'
				type='text'
				// {...item}
			/>
			<SearchButton type='submit' variant='contained' color='primary'>
				{buttonLabel ? buttonLabel : '검색'}
			</SearchButton>
		</SearchForm>
	);
}
// }
