import DateFnsUtils from '@date-io/date-fns';
import {
	LinearProgress,
	MenuItem,
	Select,
	useMediaQuery,
} from '@material-ui/core';
import { AddLocation, Image, PlaylistAdd } from '@material-ui/icons';
import {
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserStateContext } from '../../context/user';
import { useInput } from '../../client/hooks/useInput';
import { Plan, PlanDay, PlanTime } from '../../interfaces';
import Button from '../reuse/Button';
import Input from '../reuse/Input';
import Textarea from '../reuse/Textarea';
import PlanDayItem from './PlanDayItem';
import PlanWholeItem from './PlanWholeItem';
import { countries, travelStyles } from '../../client/utils/basicData';
import TravelStyleTag from '../reuse/TravelStyleTag';

interface WrapperProps {
	isFull: boolean;
	isMobile: boolean;
	step: number;
	setStep: Function;
	children?: React.ReactNode;
	plan?: Plan;
}

const types = ['이동', '식사', '관광'];

const WriteContainer = styled.div<{ isFull?: boolean; isMobile: boolean }>`
	width: 80%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: ${props => (props.isFull ? 'center' : 'flex-start')};
	height: ${props => (props.isFull ? '80vh' : '')};
	& label {
		font-weight: bold;
		margin: 0.25rem;
		font-size: 1.2em;
		display: block;
	}
	& > div,
	& > input,
	& > textarea {
		margin: 0 0 2rem 0;
	}
	& .progressWrapper {
		width: 100%;
		max-width: 800px;
		position: ${props => (props.isFull ? 'absolute' : 'sticky')};
		top: ${props => (props.isFull ? (props.isMobile ? '2.5rem' : '4rem') : 0)};
		padding: 2rem 0;
		background: white;
		z-index: 1;
	}
	& div[role='progressbar'] {
		height: ${props => (props.isMobile ? '4px' : '8px')};
		& > div {
			animation: progress 1.5s infinite;
			background: linear-gradient(
				45deg,
				rgb(58, 75, 170) 25%,
				rgb(81, 151, 213) 25%,
				rgb(81, 151, 213) 50%,
				rgb(58, 75, 170) 50%,
				rgb(58, 75, 170) 75%,
				rgb(81, 151, 213) 75%,
				rgb(81, 151, 213) 100%
			);
		}
	}
	& .dateContainer {
		& span {
			margin: 0 0.5rem;
		}
	}
	& .btnContainer {
		display: flex;
		justify-content: space-between;
		width: 100%;
		& button {
			margin: 0 0.25rem;
			flex: 1;
		}
	}

	animation: fadeIn 0.3s ease;
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes progress {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 400px 0;
		}
	}
`;

const StyledSelect = styled(Select)`
	width: 60%;
	text-align: center;

	& .MuiSelect-select {
		font-size: 1.5rem;
	}
	& .MuiSelect-select.MuiSelect-select {
		padding: 0.5rem 0 0 0;
	}
	& .MuiSelect-select:focus {
		background-color: rgba(0, 0, 0, 0);
	}
`;

const PlanWriteContainer = styled.div`
	width: 100%;
	& > * {
		margin: 0.5rem 0;
	}
	& > div {
		margin: 0.5rem;
	}
	& .flex {
		margin: 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		& > div {
			margin: 0.25rem 0.5rem;
		}
	}
	& .time,
	& .type {
		flex: 1;
	}
	& .price {
		flex: 2;
		min-width: 200px;
	}
	& .time {
		min-width: 140px;
	}
	& .type {
		min-width: 70px;
	}

	& .place button,
	& .description button {
		position: absolute;
		border: none;
		opacity: 0.5;
		transition: opacity 0.3s ease;
		border-radius: 50%;

		&:hover {
			opacity: 1;
		}
	}
	& .place button,
	& .description button.image {
		transform: translateX(-3.5em);
	}
	& .description button.add {
		transform: translate(-4em, 12em);
	}
	& .MuiFormControl-marginNormal {
		margin: 0;
	}
	& #time-picker {
		font-size: 0.8em;
		padding: 0.75rem;
		height: 2.5rem;
		box-sizing: border-box;
	}
	/* 유형 */
	& .MuiInputBase-root,
	& .MuiFormControl-root {
		width: 100%;
		height: 2.5rem;
	}
	& .MuiSelect-select {
		font-size: 0.8em;
	}
	& .MuiSelect-select.MuiSelect-select {
		padding: 0.75rem;
	}
	& .MuiSelect-select:focus {
		background-color: rgba(0, 0, 0, 0);
	}
`;

const WriteWrapper = (props: WrapperProps) => {
	const { isMobile, isFull, children, step, setStep, plan } = props;
	const currentUser = useContext(UserStateContext);

	const onNextStep = () => {
		if (step === 4) {
			const userId = currentUser.id;
			axios.post(`/api/plan/write`, { userId, plan }).then(res => {
				if (res.data.success) {
					setStep(step + 1);
				} else {
					alert('플랜 작성에 실패했습니다.');
				}
			});
		} else {
			setStep(step + 1);
		}
	};
	const onPrevStep = () => {
		setStep(step - 1);
	};

	return (
		<WriteContainer isFull={isFull} isMobile={isMobile}>
			<div className='progressWrapper'>
				<LinearProgress variant='determinate' value={((step + 1) * 100) / 6} />
			</div>
			{children}
			<div className='btnContainer'>
				{step === 0 || step === 5 ? (
					''
				) : (
					<Button onClick={onPrevStep} default padding='1rem'>
						이전
					</Button>
				)}
				{step === 5 ? (
					''
				) : (
					<Button onClick={onNextStep} padding='1rem'>
						{step === 4 ? '완료' : '다음'}
					</Button>
				)}
			</div>
		</WriteContainer>
	);
};

const PlanWrite = () => {
	// 모바일인지
	const isMobile = useMediaQuery('(max-width: 600px)');
	// 단계
	const [step, setStep] = useState(0);

	// 숙박일
	const [date, setDate] = useState(1); // 현재 작성중인 날짜
	const [sleepDate, setSleepDate] = useState(0);
	const [tripDate, setTripDate] = useState(1);

	//// 숙박일수를 올리면 여행일수도 그만큼 올리기
	useEffect(() => {
		if (sleepDate >= tripDate) setTripDate(sleepDate + 1);
	}, [sleepDate]);
	//// 여행일수를 조정하면 숙박일수도 조정
	useEffect(() => {
		setSleepDate(tripDate - 1);
	}, [tripDate]);

	// 나라와 도시
	const country = useInput(countries[0].nation);
	const [cities, setCities] = useState(
		countries.filter(item => item.nation === country.value)[0].cities,
	);
	const [city, setCity] = useState(cities[0]);

	//// 나라가 변하면 도시목록이 변하게
	useEffect(() => {
		setCities(
			countries.filter(item => item.nation === country.value)[0].cities,
		);
	}, [country]);
	//// 도시목록이 변하면 도시상태가 첫번째로 변하게
	useEffect(() => {
		setCity(cities[0]);
	}, [cities]);

	// 제목과 소개
	const planName = useInput('');
	const planDesc = useInput('');

	// 총 플랜
	const [wholePlan, setWholePlan] = useState<PlanDay[]>([]);
	const [dayPlan, setDayPlan] = useState<PlanDay>({
		description: '',
		planTimes: [],
	});
	const [timePlan, setTimePlan] = useState<PlanTime>({
		// time: new Date(null, null, null, 10, 0),
		time: '',
		type: '',
		price: 0,
		place: '',
		placeInfo: '',
		description: '',
		photo: [],
	});
	// TimePicker 사용을 위한 Date 타입의 state
	const [time, setTime] = useState(new Date(0, 0, 0, 10, 0));

	useEffect(() => {
		setTimePlan({
			...timePlan,
			time: `${
				time.getHours() < 10 ? `0${time.getHours()}` : time.getHours()
			}:${
				time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
			}`,
		});
	}, [time]);

	// 일정 하나 추가
	function onAddTimePlan(): void {
		setDayPlan({
			description: '',
			planTimes: dayPlan.planTimes.concat(timePlan),
		});
		setTimePlan({
			time: new Date(0, 0, 0, 10, 0),
			type: '',
			price: 0,
			place: '',
			placeInfo: '',
			description: '',
			photo: [],
		});
		setTime(new Date(0, 0, 0, time.getHours(), time.getMinutes()));
	}

	// 하루 일정 추가
	function saveDayPlan(): void {
		setWholePlan(
			wholePlan.length < date
				? wholePlan.concat(dayPlan)
				: wholePlan.map((item, i) => (i === date - 1 ? dayPlan : item)),
		);
	}
	// 이전 날
	function onPrevDate(): void {
		saveDayPlan();
		setDayPlan(wholePlan[date - 2]);
		setDate(date - 1);
	}
	// 다음 날
	function onNextDate(): void {
		saveDayPlan();
		setDayPlan(wholePlan[date] || { description: '', planTimes: [] });
		setDate(date + 1);
	}

	switch (step) {
		case 0:
			// 나라, 도시 선택
			return (
				<WriteWrapper
					isFull={true}
					step={step}
					setStep={setStep}
					isMobile={isMobile}
				>
					<label>나라를 선택해주세요</label>
					<StyledSelect {...country}>
						{countries.map(country => (
							<MenuItem value={country.nation}>{country.nation}</MenuItem>
						))}
						<MenuItem disabled>다른 국가는 아직 서비스 전입니다.</MenuItem>
					</StyledSelect>

					<label>도시를 선택해주세요</label>
					<StyledSelect
						value={city}
						// 셀렉트에서 온체인지핸들러 타입이 이상함...
						onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
							setCity(e.target.value as string);
						}}
					>
						{cities.map(city => (
							<MenuItem value={city}>{city}</MenuItem>
						))}
						<MenuItem disabled>다른 도시는 아직 서비스 전입니다.</MenuItem>
					</StyledSelect>
				</WriteWrapper>
			);
		case 1:
			// 여행일수 선택
			return (
				<WriteWrapper
					isFull={true}
					step={step}
					setStep={setStep}
					isMobile={isMobile}
				>
					<label>여행일수를 선택해주세요</label>
					<div className='dateContainer'>
						<Input
							type='number'
							min='0'
							value={sleepDate}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setSleepDate(Number(e.target.value));
							}}
						/>
						<span> 박 </span>
						<Input
							type='number'
							min='1'
							value={tripDate}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setTripDate(Number(e.target.value));
							}}
						/>
						<span> 일 </span>
					</div>
				</WriteWrapper>
			);
		case 2:
			// 기본정보 입력
			return (
				<WriteWrapper
					isFull={false}
					step={step}
					setStep={setStep}
					isMobile={isMobile}
				>
					<PlanWriteContainer>
						<div>
							<label>플랜의 이름을 정해주세요</label>
							<Input
								width='100%'
								border='1px solid rgba(0,0,0,0.42)'
								borderRadius='0.25rem'
								textAlign='left'
								{...planName}
							/>
						</div>
						<div>
							<label>플랜에 대한 간략한 소개를 적어주세요</label>
							<Textarea {...planDesc} />
						</div>
						<div>
							<label>여행테마를 선택해주세요(복수선택 가능)</label>
							{travelStyles.map(style => (
								<TravelStyleTag label={style} onClick={() => {}} />
							))}
							<div className='tags'>
								<span>먹부림</span>
								<span>감성</span>
								<span>대자연</span>
								<span>문화재</span>
								<span>힐링</span>
								<span>핫스팟</span>
							</div>
						</div>
					</PlanWriteContainer>
				</WriteWrapper>
			);
		case 3:
			return (
				<WriteContainer isFull={false} isMobile={isMobile}>
					<div className='progressWrapper'>
						<LinearProgress
							variant='determinate'
							value={((step + 1) * 100) / 6}
						/>
					</div>
					{/* 일별 일정 작성*/}
					<PlanWriteContainer>
						<PlanDayItem planDay={dayPlan} />
						<h2>{date}일차 일정</h2>
						<div className='flex'>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<div className='time'>
									<label>시간</label>
									<KeyboardTimePicker
										margin='normal'
										id='time-picker'
										value={time}
										onChange={date => {
											setTime(date!);
										}}
										KeyboardButtonProps={{
											'aria-label': 'change time',
										}}
									/>
								</div>
							</MuiPickersUtilsProvider>
							<div className='type'>
								<label>유형</label>

								<Select
									value={timePlan.type}
									onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
										setTimePlan({
											...timePlan,
											type: e.target.value as string,
										});
									}}
								>
									{types.map(type => (
										<MenuItem value={type}>{type}</MenuItem>
									))}
									<MenuItem value='기타'>기타</MenuItem>
								</Select>
							</div>
							<div className='price'>
								<label>금액</label>
								<Input
									width='100%'
									textAlign='left'
									value={timePlan.price.toLocaleString()}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										setTimePlan({
											...timePlan,
											price: Number(e.target.value.replaceAll(/[\D]/gi, '')),
										});
									}}
								/>
							</div>
						</div>
						<div className='place'>
							<label>장소</label>
							<Input
								width='100%'
								borderRadius='0.25rem'
								border='1px solid rgba(0,0,0,0.41)'
								textAlign='left'
								value={timePlan.place}
								onChange={e => {
									setTimePlan({ ...timePlan, place: e.target.value });
								}}
							/>
							{/* 구글 place, Map API 이용*/}
							<button>
								<AddLocation fontSize={isMobile ? 'small' : 'default'} />
							</button>
						</div>
						<div className='description'>
							<label>부가설명</label>
							<Textarea
								value={timePlan.description}
								onChange={e => {
									setTimePlan({ ...timePlan, description: e.target.value });
								}}
							/>

							{/* input type="file" 동적으로 만들어서 하기 */}
							<button className='image'>
								<Image fontSize={isMobile ? 'small' : 'default'} />
							</button>
							<button className='add' onClick={onAddTimePlan}>
								<PlaylistAdd fontSize={isMobile ? 'default' : 'large'} />
							</button>
						</div>
					</PlanWriteContainer>
					<div className='btnContainer'>
						{/* 이전 단계냐 이전 날 일정이냐 */}
						{date === 1 ? (
							<Button
								onClick={() => {
									setStep(step - 1);
								}}
								default
							>
								이전
							</Button>
						) : (
							<Button padding='1rem' onClick={onPrevDate} default>
								&lt; 이전 날 일정
							</Button>
						)}
						{/* 완료냐 다음 날 일정이냐 */}
						{date < tripDate ? (
							<Button padding='1rem' onClick={onNextDate}>
								다음 날 일정 &gt;
							</Button>
						) : (
							<Button
								padding='1rem'
								onClick={() => {
									saveDayPlan();
									setStep(step + 1);
								}}
							>
								완료
							</Button>
						)}
					</div>
				</WriteContainer>
				// 일정 삭제버튼
			);
		case 4:
			const plan: Plan = {
				title: planName.value as string,
				description: planDesc.value as string,
				sleepDays: sleepDate,
				travelDays: tripDate,
				tags: [],
				planDays: wholePlan,
			};
			return (
				<WriteWrapper
					isFull={false}
					step={step}
					setStep={setStep}
					isMobile={isMobile}
					plan={plan}
				>
					{/* 전체 개요*/}
					<div style={{ width: '100%' }}>
						<PlanWholeItem plans={wholePlan} />
					</div>
				</WriteWrapper>
			);
		case 5:
			return (
				<WriteWrapper
					isFull={true}
					step={step}
					setStep={setStep}
					isMobile={isMobile}
				>
					<h1>플랜 작성 완료!</h1>
					{/* 링크달기 */}
					<Button width='16rem'>작성한 플랜 보러가기</Button>
				</WriteWrapper>
			);
	}
	return <></>;
};

export default PlanWrite;
