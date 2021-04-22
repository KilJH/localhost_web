import 'date-fns';
import { Button, Divider, TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import styled from 'styled-components';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

import { useToggle } from '../hooks/useToggle';

interface Props {}

const FlexDiv = styled.div`
	background: rgba(92, 42, 0, 0.1);
	padding: 2rem 1rem;
	display: flex;
	flex-direction: column;
	& h2 {
		margin: 0 0 1rem 0.5rem;
	}
`;

const DateDiv = styled.div`
	display: flex;

	& > div {
		margin: 0 0.5rem 0.5rem 0.5rem;
	}
`;

const OptionDiv = styled.div`
	margin: 0 0 1rem 0.5rem;
	& > div {
		/* display: inline-flex; */
	}
	& > p {
		margin: 1rem 0 0.5rem 0;
	}
	& span {
		display: inline-block;
		margin: 0.25rem 0.5rem 0.25rem 0;
		/* margin-right: 0.25rem; */
		cursor: pointer;
		padding: 0.25rem 0.25rem;
		border: 2px solid rgba(0, 0, 0, 0.5);
		color: rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
		font-weight: 500;
		/* font-size: 0.75em; */

		transition: all ease 0.2s;

		background: #eaeaea;
		box-shadow: 0px 2px 1px -2px rgb(0 0 0 / 20%),
			0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 0px 5px 0px rgb(0 0 0 / 12%);

		&:first-child {
			margin-left: 0;
		}

		&.문화재,
		&.감성,
		&.대자연,
		&.힐링,
		&.먹부림,
		&.쇼핑,
		&.toggle-on {
			background: white;
			color: black;
		}

		&.문화재 {
			color: #e67e22;
			border: 2px solid #e67e22;
		}
		&.감성 {
			color: #8e44ad;
			border: 2px solid #8e44ad;
		}
		&.대자연 {
			color: #27ae60;
			border: 2px solid #27ae60;
		}
		&.힐링 {
			color: #ff9ff3;
			border: 2px solid #ff9ff3;
		}
		&.먹부림 {
			color: #e74c3c;
			border: 2px solid #e74c3c;
		}
		&.쇼핑 {
			color: #a7ecf2;
			border: 2px solid #a7ecf2;
		}
	}
`;

const LocationInput = styled(TextField)`
	margin: 0 0.5rem;
	margin-bottom: 0.5rem;
	flex: 1;
	& > div {
		background-color: rgba(92, 42, 0, 0.1);
	}

	& > label {
		&.Mui-focused {
			color: #5c2a00;
		}
	}
	& .MuiFilledInput-underline:after {
		border-bottom: 2px solid #5c2a00;
	}
`;

const DateInput = styled(KeyboardDatePicker)`
	flex: 1;
	background-color: rgba(92, 42, 0, 0.1);
	border-top-left-radius: 0.25rem;
	border-top-right-radius: 0.25rem;
	/* padding: 0 0.75rem; */
	height: 3.5rem;
	display: inline-flex;
	flex-direction: column;
	& > div {
		flex: 1;
		& > input {
			/* padding: 0.5rem 0 0.25rem; */
		}
	}
	& input,
	& label {
		margin-left: 0.75rem;
	}
	& label {
		color: #5c2a00;
		margin-top: 0.5rem;
	}
	& .MuiInput-underline:after {
		border-bottom: 2px solid #5c2a00;
	}
`;

const YellowButton = styled(Button)`
	margin: 0 0.5rem !important;
	background-color: #fdb927 !important;
	color: #5c2a00 !important;
	font-weight: 700 !important;
`;

const SearchDetail = (props: Props) => {
	const options = [
		useToggle(false, '문화재'),
		useToggle(false, '감성'),
		useToggle(false, '대자연'),
		useToggle(false, '힐링'),
		useToggle(false, '먹부림'),
		useToggle(false, '쇼핑'),
	];

	// 출발일, 도착일 두개로 나눠야 함
	const [selectedDate, setSelectedDate] = React.useState<Date | null>(
		new Date(),
	);

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	return (
		<StylesProvider injectFirst>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<FlexDiv>
					<h2>원하는 여행을 검색해보세요.</h2>
					<LocationInput label='목적지' variant='filled'></LocationInput>
					<LocationInput label='출발지' variant='filled'></LocationInput>
					<DateDiv>
						<DateInput
							disableToolbar
							variant='inline'
							format='MM/dd/yyyy'
							margin='normal'
							id='date-picker-inline'
							label='출발일'
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
						<DateInput
							disableToolbar
							variant='inline'
							format='MM/dd/yyyy'
							margin='normal'
							id='date-picker-inline'
							label='복귀일'
							value={selectedDate}
							onChange={handleDateChange}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</DateDiv>
					<Divider />
					<OptionDiv>
						<p>선호하는 여행스타일(선택사항)</p>
						<div>
							<span {...options[0]}>문화재</span>
							<span {...options[1]}>감성</span>
							<span {...options[2]}>먹부림</span>
							<span {...options[3]}>대자연</span>
							<span {...options[4]}>힐링</span>
							<span {...options[5]}>쇼핑</span>
						</div>
					</OptionDiv>
					<YellowButton variant='contained'>플랜 검색</YellowButton>
				</FlexDiv>
			</MuiPickersUtilsProvider>
		</StylesProvider>
	);
};

export default SearchDetail;
