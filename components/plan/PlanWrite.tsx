import DateFnsUtils from '@date-io/date-fns';
import {
	Fade,
	LinearProgress,
	MenuItem,
	Modal,
	Select,
	useMediaQuery,
} from '@material-ui/core';
import { AddLocation, Image, PlaylistAdd } from '@material-ui/icons';
import {
	KeyboardTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import React, { SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserStateContext } from '../../context/user';
import { useInput } from '../../client/hooks/useInput';
import { Place, Plan, PlanDay, PlanTime } from '../../interfaces';
import Button from '../reuse/Button';
import Input from '../reuse/Input';
import Textarea from '../reuse/Textarea';
import PlanDayItem from './PlanDayItem';
import PlanWholeItem from './PlanWholeItem';
import { countries, travelStyles } from '../../client/utils/basicData';
import TravelStyleTag from '../reuse/TravelStyleTag';
import { useToast } from '../../client/hooks/useToast';
import { useModal } from '../../client/hooks/useModal';
import SearchPlace from '../search/SearchPlace';
import WritingImages from '../reuse/WritingImages';
import Link from 'next/link';
import Toast from '../reuse/Toast';
import ThumbnailPicker from './ThumbnailPicker';
import { usePreventLeave } from '../../client/hooks/usePreventLeave';

interface WrapperProps {
	isFull?: boolean;
	isMobile: boolean;
	step: number;
	setStep: Function;
	children?: React.ReactNode;
	plan?: Plan;
	saveProps: SaveProps;
	images?: File[];
	titleState: string;
	descState: string;
	setPlanId: React.Dispatch<SetStateAction<number>>;
}

interface SaveProps {
	step: number;
	sleepDate: number;
	tripDate: number;
	country: string;
	city: string;
	planName: string;
	planDesc: string;

	wholePlan: PlanDay[];
}

const types = ['이동', '식사', '관광'];

const WriteContainer = styled.div<{
	isFull?: boolean;
	isMobile: boolean;
	step: number;
}>`
	width: ${props => (props.isMobile ? '100%' : '80%')};
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
	/* & > div, */
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
		z-index: 2;
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
		justify-content: ${props => {
			const { step } = props;
			if (step < 2) return 'center';
			if (step < 4) return 'space-between';
			return 'flex-end';
		}};
		width: 100%;
		margin: 1rem 0;
		& .prevNext button {
			margin: 0 0.25rem;
			min-width: 6rem;
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

	& .place {
		& .place_address {
			font-size: 0.8em;
			padding: 0.25rem;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	& .place,
	& .description {
		position: relative;
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
		right: 0;
	}
	& .description button.add {
		right: 0;
		transform: translateY(12em);
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

	& .imageBtnContainer {
		position: relative;
		right: 0;
		top: 0;
	}
	& .description #plan_image {
		width: 0;
		height: 0;
		opacity: 0;
		padding: 0;
		margin: 0;
		border: none;
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

const SaveBtn = (props: SaveProps) => {
	// 저장 알림
	const saveToast = useToast(false);

	// 작성 중에 창을 닫거나 새로고침할 경우 한 번 물어보기
	// 현재 대부분의 브라우저에서 사용자 지정 대화상자를 출력할 수 없음
	useEffect(() => {
		const prevent = usePreventLeave();
		prevent.enablePrevent();
		return prevent.disablePrevent;
	}, []);

	const onSave = () => {
		localStorage.setItem('tempPlan', JSON.stringify(props));
		saveToast.handleOpen();
	};
	return (
		<>
			<Button default padding='1rem' className='save' onClick={onSave}>
				임시저장
			</Button>

			<Toast {...saveToast} type='success'>
				임시저장을 완료하였습니다.
			</Toast>
		</>
	);
};

const WriteWrapper = (props: WrapperProps) => {
	const {
		isFull = false,
		children,
		plan,
		step,
		setStep,
		isMobile,
		saveProps,
		titleState,
		descState,
		setPlanId,
	} = props;
	const currentUser = useContext(UserStateContext);

	const noDataErr = useToast(false);

	const onNextStep = () => {
		if (step === 2 && (titleState === '' || descState === '')) {
			noDataErr.handleOpen();
			return;
		}
		if (step === 4) {
			onSubmit();
		} else {
			setStep(step + 1);
		}
	};
	const onPrevStep = () => {
		setStep(step - 1);
	};

	const onSubmit = () => {
		const userId = currentUser.id;
		axios.post(`/api/plan/write`, { userId, plan }).then(res => {
			if (res.data.success) {
				// localstorage.clear();
				setPlanId(res.data.planId);
				setStep(step + 1);
			} else {
				alert('플랜 작성에 실패했습니다.');
			}
		});
	};

	return (
		<WriteContainer isFull={isFull} isMobile={isMobile} step={step}>
			<div className='progressWrapper'>
				<LinearProgress variant='determinate' value={((step + 1) * 100) / 6} />
			</div>
			{children}
			<div className='btnContainer'>
				{step > 1 && step < 4 ? <SaveBtn {...saveProps} /> : ''}
				<div className='prevNext'>
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
			</div>

			<Toast {...noDataErr} type='warning'>
				내용을 입력해주세요
			</Toast>
		</WriteContainer>
	);
};

const PlanWrite = () => {
	const currentUser = useContext(UserStateContext);
	const [planId, setPlanId] = useState(0);
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
		type: '기타',
		price: 0,
		place: { name: '' },
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

	useEffect(() => {
		saveDayPlan();
	}, [dayPlan]);

	useEffect(() => {
		const temp = JSON.parse(localStorage.getItem('tempPlan') || '{}');

		if (Object.keys(temp).length > 0) {
			const res = confirm('임시저장된 여행계획이 있습니다. 불러오시겠습니까?');
			if (res) {
				setStep(temp.step);
				country.setValue(temp.country);
				setCity(temp.city);
				planName.setValue(temp.planName);
				planDesc.setValue(temp.planDesc);
				setSleepDate(temp.sleepDate);
				setTripDate(temp.tripDate);
				setWholePlan([...temp.wholePlan]);
				if (temp.wholePlan[0]) setDayPlan(temp.wholePlan[0]);
			}
		}
	}, []);

	// 장소 정보
	const [placeDetail, setPlaceDetail] = useState<Place>();
	const placeModal = useModal(false);

	useEffect(() => {
		if (placeDetail) {
			placeModal.handleClose();
			setTimePlan({
				...timePlan,
				place: {
					formatted_address: `${placeDetail?.formatted_address}(${placeDetail?.name})`,
					name: timePlan.place.name,
					geometry: placeDetail?.geometry,
				},
			});
		}
	}, [placeDetail]);

	// 에러메세지 처리
	const toast = useToast(false);

	const [thumb, setThumb] = useState('');

	// 이미지 업로드
	const [images, setImages] = useState<File[]>([]);
	const onUploadImage = () => {
		const input = document.getElementById('plan_image');
		input!.click();
	};
	const onChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target!.files!;
		const fileArray: File[] = Array.from(files);

		setImages([...images, ...fileArray]);
	};

	// 일정 하나 추가
	async function onAddTimePlan() {
		if (timePlan.place.name === '' && timePlan.description === '') {
			toast.handleOpen('warning', '내용을 입력해주세요');
			return;
		}
		const existingPlans = dayPlan.planTimes;
		const plansLength = existingPlans.length;
		for (let i = 0; i < plansLength; i++) {
			if (timePlan.time === existingPlans[i].time) {
				toast.handleOpen('warning', '같은 시간에 일정이 이미 존재합니다.');
				return;
			}
		}

		// 1. 파일 먼저 업로드
		const userId = currentUser.id;
		const formData = new FormData();
		let imageUrls: string[] = [];
		if (images.length > 0) {
			images.forEach(img => {
				formData.append('file', img);
			});
			formData.append('userId', `${userId}`);

			const imgRes = await axios.post('/api/s3/upload/plan/image', formData);
			imageUrls = imgRes.data.urls;
		}

		setDayPlan({
			description: '',
			planTimes: dayPlan.planTimes
				.concat({ ...timePlan, photo: imageUrls })
				.sort((a, b) => (a.time < b.time ? -1 : 1)),
		});
		setTimePlan({
			time: new Date(0, 0, 0, 10, 0),
			type: '기타',
			price: 0,
			place: { name: '' },
			description: '',
			photo: [],
		});
		setImages([]);
		setTime(new Date(0, 0, 0, time.getHours(), time.getMinutes()));
		setPlaceDetail(undefined);
	}

	const onDeleteTimePlan = (i: number) => {
		const existingPlans = dayPlan.planTimes;
		const newPlans = [
			...existingPlans.slice(0, i),
			...existingPlans.slice(i + 1, existingPlans.length),
		];

		setDayPlan({
			...dayPlan,
			planTimes: newPlans,
		});
	};

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

	const saveProps = {
		step,
		sleepDate,
		tripDate,
		country: country.value as string,
		city,
		planName: planName.value as string,
		planDesc: planDesc.value as string,
		wholePlan,
	};

	const wrapperProps = {
		isMobile,
		step,
		setStep,
		saveProps,
		images,
		titleState: planName.value as string,
		descState: planDesc.value as string,
		setPlanId,
	};

	switch (step) {
		case 0:
			// 나라, 도시 선택
			return (
				<WriteWrapper isFull={true} {...wrapperProps}>
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
				<WriteWrapper isFull={true} {...wrapperProps}>
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
				<WriteWrapper isFull={true} {...wrapperProps}>
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
						</div>
					</PlanWriteContainer>
				</WriteWrapper>
			);
		case 3:
			return (
				<WriteContainer isFull={false} isMobile={isMobile} step={step}>
					<div className='progressWrapper'>
						<LinearProgress
							variant='determinate'
							value={((step + 1) * 100) / 6}
						/>
					</div>
					{/* 일별 일정 작성*/}
					<PlanWriteContainer>
						<PlanDayItem planDay={dayPlan} onDelete={onDeleteTimePlan} />
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
									<MenuItem value='기타' selected={true}>
										기타
									</MenuItem>
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
								value={timePlan.place.name}
								onChange={e => {
									setTimePlan({
										...timePlan,
										place: { ...timePlan.place, name: e.target.value },
									});
								}}
							/>
							{/* 구글 place, Map API 이용*/}
							<button onClick={placeModal.handleOpen}>
								<AddLocation fontSize={isMobile ? 'small' : 'default'} />
							</button>
							<div className='place_address'>
								{timePlan.place.formatted_address
									? `세부주소: ${timePlan.place.formatted_address}`
									: ''}
							</div>
							<StyledModal
								open={placeModal.open}
								onClose={placeModal.handleClose}
							>
								<Fade in={placeModal.open}>
									<div className='searchForm'>
										<SearchPlace setPlace={setPlaceDetail} />
									</div>
								</Fade>
							</StyledModal>
						</div>
						<div className='description'>
							<label>부가설명</label>
							<Textarea
								value={timePlan.description}
								onChange={e => {
									setTimePlan({ ...timePlan, description: e.target.value });
								}}
							/>

							<button className='image' onClick={onUploadImage}>
								<Image fontSize={isMobile ? 'small' : 'default'} />
							</button>
							<button className='add' onClick={onAddTimePlan}>
								<PlaylistAdd fontSize={isMobile ? 'default' : 'large'} />
							</button>
							<input
								id='plan_image'
								type='file'
								multiple
								accept='image/*'
								onChange={onChangeFileInput}
							/>

							<WritingImages images={images} setImages={setImages} />
						</div>
					</PlanWriteContainer>

					<div className='btnContainer'>
						<SaveBtn {...saveProps} />
						<div className='prevNext'>
							{/* 이전 단계냐 이전 날 일정이냐 */}
							{date === 1 ? (
								<Button
									onClick={() => {
										setStep(step - 1);
									}}
									default
									padding='1rem'
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
										// wholePlan의 길이로 반복문을 돌리면
										// 작성 중 날짜를 수정했을 때 빈 배열이 생기고
										// 작성할 수 없는 상황에서 유효성검사에 걸리게 된다.
										for (let i = 0; i < tripDate; i++) {
											if (wholePlan[i].planTimes.length < 1) {
												toast.handleOpen(
													'warning',
													'일정이 존재하지않는 날짜가 있습니다.',
												);
												return;
											}
										}
										saveDayPlan();
										setStep(step + 1);
									}}
								>
									완료
								</Button>
							)}
						</div>

						<Toast {...toast}>{toast.message}</Toast>
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
				thumb: thumb,
				planDays: wholePlan,
			};

			// 썸네일을 고르기 위해 업로드한 모든 사진 배열화
			let wholeImage: string[] = [];
			wholePlan.forEach(planDay => {
				planDay.planTimes.forEach(planTime => {
					if (planTime.photo!.length > 0) {
						wholeImage = [...wholeImage, ...(planTime.photo as string[])];
					}
				});
			});

			return (
				<WriteWrapper plan={plan} {...wrapperProps}>
					{/* 썸네일 사진 고르기 */}
					{wholeImage.length > 0 ? (
						<ThumbnailPicker images={wholeImage} setThumb={setThumb} />
					) : (
						''
					)}
					{/* 전체 개요*/}
					<div style={{ width: '100%' }}>
						<h2 style={{ margin: '0.5rem 0' }}>작성한 플랜을 확인하세요</h2>
						<PlanWholeItem plans={wholePlan} />
					</div>
				</WriteWrapper>
			);
		case 5:
			return (
				<WriteWrapper isFull={true} {...wrapperProps}>
					<h1>플랜 작성 완료!</h1>
					{/* 링크달기 */}
					<Link href='/plans/[id]' as={`/plans/${planId}`}>
						<Button width='16rem'>작성한 플랜 보러가기</Button>
					</Link>
				</WriteWrapper>
			);
	}
	return <></>;
};

export default PlanWrite;
