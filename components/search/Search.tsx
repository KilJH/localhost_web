import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import _app from '../../pages/_app';
import { useInput } from '../../client/hooks/useInput';
import { IconButton, InputBase, Paper } from '@material-ui/core';

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
	width?: string | number;
	marginTop?: string | number;
	marginBottom?: string | number;
	marginLeft?: string | number;
	marginRight?: string | number;

	// select와 input의 width를 %로 받음(기본값 20:80)
	selectWidth?: string;
	inputWidth?: string;
};

// 검색 폼 전체 Props
interface FormProps {
	width?: string | number;
	marginTop?: string | number;
	marginBottom?: string | number;
	marginLeft?: string | number;
	marginRight?: string | number;
}

interface SelectProps {
	selectWidth?: string;
}

interface InputProps {
	inputWidth?: string;
}

// 검색 바디
const SearchForm = styled.form<FormProps>`
	display: flex;
	height: 2.5em;
	width: ${(props: FormProps) => props.width || 'auto'};
	margin-top: ${(props: FormProps) => props.marginTop || 0};
	margin-bottom: ${(props: FormProps) => props.marginBottom || 0};
	margin-left: ${(props: FormProps) => props.marginLeft || 0};
	margin-right: ${(props: FormProps) => props.marginRight || 0};
`;

const SelectControl = styled(FormControl)<SelectProps>`
	& div {
		height: 2.5em;
	}
	&.MuiFormControl-root {
		width: ${(props: SelectProps) => props.selectWidth || '20%'};
		margin-right: 0.5rem;
	}
	& .MuiOutlinedInput-root {
		font-size: 1em;
		&.hover fieldset {
			border-color: rgb(81, 151, 213);
		}
		&.Mui-focused fieldset {
			border-color: rgb(81, 151, 213);
		}
	}
`;
const CssSelect = styled(Select)`
	& .MuiSelect-selectMenu {
		display: flex;
		align-items: center;
		padding: 0 1em;
	}
	& .MuiSelect-select:focus {
		background-color: rgba(0, 0, 0, 0);
	}
`;
const CssInputBase = styled(InputBase)`
	font-size: 1em !important;
	width: 90%;
	margin-left: 0.75em;
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
const PaperForm = styled(Paper)<InputProps>`
	display: flex;
	align-items: center;
	height: 2.5em;
	width: ${(props: InputProps) => props.inputWidth || '80%'};
	border: 1px solid rgba(0, 0, 0, 0.25);
	&.MuiPaper-elevation1 {
		box-shadow: none;
	}
	&:hover {
		border-color: rgb(0, 0, 0);
	}
	&:focus-within {
		border: 2px solid rgb(81, 151, 213);
	}
`;

export default function Search(props: Props) {
	const { options, label, selectLabel, inputLabel, onSubmit } = props;

	const sLabel = selectLabel ? selectLabel : '선택';
	const item = useInput('');
	const type = useInput(options[0]);

	return (
		<SearchForm
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
				onSubmit(e, type.value, item.value);
			}}
			width={props.width}
			marginTop={props.marginTop}
			marginBottom={props.marginBottom}
			marginLeft={props.marginLeft}
			marginRight={props.marginRight}
		>
			<SelectControl variant='outlined' selectWidth={props.selectWidth}>
				<CssSelect
					{...type}
					inputProps={{ 'aria-label': 'Without label' }}
					displayEmpty
				>
					<MenuItem value='' disabled>
						{sLabel}
					</MenuItem>
					{options.map((op, i) => (
						<MenuItem value={op} key={i}>
							{label[i]}
						</MenuItem>
					))}
				</CssSelect>
			</SelectControl>
			<PaperForm inputWidth={props.inputWidth}>
				<CssInputBase
					{...item}
					placeholder={inputLabel ? inputLabel : '입력'}
					type='text'
				/>

				<IconButton type='submit'>
					<SearchIcon />
				</IconButton>
			</PaperForm>
		</SearchForm>
	);
}
// }
