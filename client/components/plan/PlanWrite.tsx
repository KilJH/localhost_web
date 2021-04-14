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
import { title } from 'node:process';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserStateContext } from '../../context/user';
import { useInput } from '../../hooks/useInput';
import { Plan, PlanDay, PlanTime } from '../../interfaces';
import SERVER from '../../utils/url';
import Button from '../reuse/Button';
import PlanDayItem from './PlanDayItem';
import PlanWholeItem from './PlanWholeItem';

interface Props {}

interface WrapperProps {
	isFull: boolean;
	step: number;
	setStep: Function;
	children?: ReactNode;
	plan?: Plan;
}

interface InputProps {
	width?: string;
	border?: string;
	borderRadius?: string;
	textAlign?: string;
}

const countries = [
	{
		nation: '대한민국',
		cities: ['서울', '부산', '인천', '대구', '강릉', '여수', '제주'],
	},
	{
		nation: '일본',
		cities: ['도쿄', '오사카', '후쿠오카', '삿포로', '교토', '고베'],
	},
	{
		nation: '중국',
		cities: ['베이징', '난징', '광저우', '홍커우', '상하이'],
	},
	{
		nation: '베트남',
		cities: ['하노이', '사이공', '호이안'],
	},
	{
		nation: '태국',
		cities: ['방콕', '치앙마이'],
	},
	{
		nation: '프랑스',
		cities: ['파리', '리옹', '마르세유', '보르도'],
	},
	{
		nation: '영국',
		cities: ['런던', '맨체스터', '리버풀', '버밍엄', '글래스고', '옥스퍼드'],
	},
	{
		nation: '독일',
		cities: ['베를린', '뮌헨', '볼프스부르크', '슈투트가르트'],
	},
	{
		nation: '포르투갈',
		cities: ['리스본'],
	},
	{
		nation: '스페인',
		cities: ['마드리드', '바르셀로나', '그라나다', '빌바오', '발렌시아'],
	},
	{
		nation: '이탈리아',
		cities: ['밀라노', '로마', '베니스', '나폴리', '피사'],
	},
];

const types = ['이동', '식사', '관광'];

const WriteContainer = styled.div<{ isFull?: boolean; isMobile: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: ${(props) => (props.isFull ? 'center' : 'flex-start')};
	height: ${(props) => (props.isFull ? '80vh' : '')};
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
		width: 80%;
		max-width: 800px;
		position: ${(props) => (props.isFull ? 'absolute' : 'sticky')};
		top: ${(props) =>
			props.isFull ? (props.isMobile ? '2.5rem' : '4rem') : 0};
		padding: 2rem 0;
		background: white;
		z-index: 1;
	}
	& div[role='progressbar'] {
		height: ${(props) => (props.isMobile ? '4px' : '8px')};
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
		justify-content: center;
		& button {
			margin: 0 0.25rem;
		}
	}

	& .tags {
		& span {
			display: inline-block;
			margin: 0.25rem 0.5rem;
			padding: 0.125rem 0.25rem;
			border: 1px solid #666;
			color: #666;
			cursor: pointer;
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

const Input = styled.input<InputProps>`
	font-size: 0.8rem;
	border-radius: ${(props) => props.borderRadius || 0};
	border: ${(props) => props.border || 'none'};
	border-bottom: ${(props) =>
		props.border ? '' : '1px solid rgba(0, 0, 0, 0.42)'};
	text-align: ${(props) => props.textAlign || 'center'};
	padding: 0.75rem;
	width: ${(props) => props.width || '8em'};

	transition: box-shadow 0.3s ease,
		border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

	&:hover {
		box-shadow: ${(props) =>
			props.border
				? 'inset -1px -1px 0px rgba(0, 0, 0, 0.87), inset 1px 1px 0px rgba(0, 0, 0, 0.87)'
				: 'inset 0px -1px 0px rgba(0, 0, 0, 0.87)'};
	}
	&:focus {
		box-shadow: ${(props) =>
			props.border
				? 'inset -1px -1px 0px rgb(58, 75, 170), inset 1px 1px 0px rgb(58, 75, 170)'
				: 'inset 0px -1px 0px rgb(58, 75, 170)'};
		border-color: rgb(58, 75, 170);
	}

	&[type='number']::-webkit-inner-spin-button,
	&[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const Textarea = styled.textarea`
	font-size: 0.8rem;
	border-radius: 0.25rem;
	border: 1px solid rgba(0, 0, 0, 0.42);
	width: 100%;
	padding: 0.75rem;
	height: 16em;

	box-sizing: border-box;

	resize: none;

	font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
		'Helvetica Neue', Arial, sans-serif;

	transition: box-shadow 0.3s ease,
		border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	&:hover {
		box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.87);
		border-color: rgba(0, 0, 0, 0.87);
	}
	&:focus {
		outline: none;
		box-shadow: inset 0px 0px 0px 1px rgb(58, 75, 170);
		border-color: rgb(58, 75, 170);
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
	width: 80%;
	& > * {
		margin: 0.5rem 0;
	}
	& > div {
		margin: 0.5rem;
	}
	& .flex {
		margin: 0;
		display: flex;
		justify-content: center;
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
	& .place button {
		transform: translateX(-2.5rem);
	}
	& .description button.image {
		transform: translateX(-2.5rem);
	}
	& .description button.add {
		transform: translate(-3rem, 10rem);
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
	const { isFull, children, step, setStep, plan } = props;
	const isMobile = useMediaQuery('(max-width: 600px)');
	const currentUser = useContext(UserStateContext);

	const onNextStep = () => {
		if (step === 4) {
			const userId = currentUser.id;
			axios.post(`${SERVER}/api/plan/write`, { userId, plan }).then((res) => {
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
					<Button width='8rem' onClick={onPrevStep} default>
						이전
					</Button>
				)}
				{step === 5 ? (
					''
				) : (
					<Button width='8rem' onClick={onNextStep}>
						{step === 4 ? '완료' : '다음'}
					</Button>
				)}
			</div>
		</WriteContainer>
	);
};

const PlanWrite = (props: Props) => {
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
		countries.filter((item) => item.nation === country.value)[0].cities
	);
	const [city, setCity] = useState(cities[0]);

	//// 나라가 변하면 도시목록이 변하게
	useEffect(() => {
		setCities(
			countries.filter((item) => item.nation === country.value)[0].cities
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
	const [wholePlan, setWholePlan] = useState([]);
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
	const [time, setTime] = useState(new Date(null, null, null, 10, 0));

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
	const onAddTimePlan = () => {
		setDayPlan({
			description: '',
			planTimes: dayPlan.planTimes.concat(timePlan),
		});
		setTimePlan({
			time: new Date(null, null, null, 10, 0),
			type: '',
			price: 0,
			place: '',
			placeInfo: '',
			description: '',
			photo: [],
		});
		setTime(new Date(null, null, null, time.getHours(), time.getMinutes()));
	};

	const saveDayPlan = () => {
		setWholePlan(
			wholePlan.length < date
				? wholePlan.concat(dayPlan)
				: wholePlan.map((item, i) => (i === date - 1 ? dayPlan : item))
		);
	};

	// 이전 날
	const onPrevDate = () => {
		saveDayPlan();
		setDayPlan(wholePlan[date - 2]);
		setDate(date - 1);
	};

	// 다음 날
	const onNextDate = () => {
		saveDayPlan();
		setDayPlan(wholePlan[date] || { description: '', planTimes: [] });
		setDate(date + 1);
	};

	useEffect(() => {
		console.log(wholePlan);
	}, wholePlan);

	switch (step) {
		case 0:
			// 나라, 도시 선택
			return (
				<WriteWrapper isFull={true} step={step} setStep={setStep}>
					<label>나라를 선택해주세요</label>
					<StyledSelect {...country}>
						{countries.map((country) => (
							<MenuItem value={country.nation}>{country.nation}</MenuItem>
						))}
						<MenuItem disabled>다른 국가는 아직 서비스 전입니다.</MenuItem>
					</StyledSelect>

					<label>도시를 선택해주세요</label>
					<StyledSelect
						value={city}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setCity(e.target.value);
						}}
					>
						{cities.map((city) => (
							<MenuItem value={city}>{city}</MenuItem>
						))}
						<MenuItem disabled>다른 도시는 아직 서비스 전입니다.</MenuItem>
					</StyledSelect>
				</WriteWrapper>
			);
		case 1:
			return (
				<WriteWrapper isFull={true} step={step} setStep={setStep}>
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
			return (
				<WriteWrapper isFull={false} step={step} setStep={setStep}>
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
						{/* {dayPlan.map((plan) => {
							return <PlanTimeItem plan={plan} />;
						})} */}
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
										onChange={(date) => {
											setTime(date);
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
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
										setTimePlan({ ...timePlan, type: e.target.value });
									}}
								>
									{types.map((type) => (
										<MenuItem value={type}>{type}</MenuItem>
									))}
									<MenuItem value='기타'>기타</MenuItem>
								</Select>
							</div>
							<div className='price'>
								<label>금액</label>
								<Input
									// type='number'
									// min='0'
									// step='1000'
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
								onChange={(e) => {
									setTimePlan({ ...timePlan, place: e.target.value });
								}}
							/>
							{/* 구글 place, Map API 이용*/}
							<button>
								<AddLocation />
							</button>
						</div>
						<div className='description'>
							<label>부가설명</label>
							<Textarea
								value={timePlan.description}
								onChange={(e) => {
									setTimePlan({ ...timePlan, description: e.target.value });
								}}
							/>

							{/* input type="file" 동적으로 만들어서 하기 */}
							<button className='image'>
								<Image />
							</button>
							<button className='add' onClick={onAddTimePlan}>
								<PlaylistAdd fontSize='large' />
							</button>
						</div>
						<div className='btnContainer'>
							{date < tripDate ? (
								date === 1 ? (
									<>
										<Button
											width='8rem'
											onClick={() => {
												setStep(step - 1);
											}}
											default
										>
											이전
										</Button>
										<Button width='100%' padding='1rem' onClick={onNextDate}>
											다음 날 일정 &gt;
										</Button>
									</>
								) : (
									<>
										<Button
											width='50%'
											padding='1rem'
											onClick={onPrevDate}
											default
										>
											&lt; 이전 날 일정
										</Button>
										<Button width='50%' padding='1rem' onClick={onNextDate}>
											다음 날 일정 &gt;
										</Button>
									</>
								)
							) : (
								<>
									{tripDate === 1 ? (
										<Button
											width='50%'
											onClick={() => {
												setStep(step - 1);
											}}
											default
										>
											이전
										</Button>
									) : (
										<Button
											width='50%'
											padding='1rem'
											onClick={onPrevDate}
											default
										>
											&lt; 이전 날 일정
										</Button>
									)}
									<Button
										width='50%'
										padding='1rem'
										onClick={() => {
											saveDayPlan();
											setStep(step + 1);
										}}
									>
										완료
									</Button>
								</>
							)}
						</div>
					</PlanWriteContainer>
				</WriteContainer>
				// 전날 버튼
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
				<WriteWrapper isFull={false} step={step} setStep={setStep} plan={plan}>
					{/* 전체 개요*/}
					<div style={{ width: '80%' }}>
						<PlanWholeItem plans={wholePlan} />
					</div>
				</WriteWrapper>
			);
		case 5:
			return (
				<WriteWrapper isFull={true} step={step} setStep={setStep}>
					<h1>플랜 작성 완료!</h1>
					{/* 링크달기 */}
					<Button width='16rem'>작성한 플랜 보러가기</Button>
				</WriteWrapper>
			);
	}
};

export default PlanWrite;
