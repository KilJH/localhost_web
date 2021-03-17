import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

interface Props {
	// 사진 경로 배열은 필수
	imgSrcArray: Array<string>;

	// 나머지는 스타일링을 위한 것으로 선택사항 ? 연산자
	borderRadius?: string | number;
	height?: string | number;
	margin?: string | number;
}

// 스타일드컴포넌트로 만든 컴포넌트에 넣어줄 Props 타입들
interface ContainerProps {
	borderRadius?: string | number;
	margin?: string | number;
}
interface SlideProps {
	height?: string | number;
}
interface SliderBtnProps {
	borderRadius?: string | number;
}

// 이미지 한 장 한 장
const Slide = styled.img`
	width: 100%;
	min-width: 100%;
	object-fit: cover;

	/* props값이 없으면 기본으로 50vh */
	height: ${(props: SlideProps) => props.height || '50vh'};
`;

const Container = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;

	border-radius: ${(props: ContainerProps) => props.borderRadius || '0'};
	margin: ${(props: ContainerProps) => props.margin || '0'};
`;

const SliderBtnWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;

	& > button {
		height: 100%;
		padding: 0;

		/* border-radius 하나로 하려면 default 설정이 복잡해서 0으로 초기화 후 각모서리에 값 넣어줌 */
		border-radius: 0;
		border-bottom-left-radius: ${(props: SliderBtnProps) =>
			props.borderRadius || '0'};
		border-top-left-radius: ${(props: SliderBtnProps) =>
			props.borderRadius || '0'};

		&.MuiButton-root:hover {
			background: linear-gradient(90deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
		}

		& + button {
			float: right;
			border-radius: 0;
			border-bottom-right-radius: ${(props: SliderBtnProps) =>
				props.borderRadius || '0'};
			border-top-right-radius: ${(props: SliderBtnProps) =>
				props.borderRadius || '0'};

			&.MuiButton-root:hover {
				background: linear-gradient(
					90deg,
					rgba(0, 0, 0, 0),
					rgba(0, 0, 0, 0.4)
				);
			}
		}
	}
`;

// 페이지 표시를 위한 div
const Page = styled.div`
	position: absolute;
	z-index: 1;
	bottom: 1rem;
	left: 1.5rem;
	font-size: 0.8rem;
	/* mix-blend-mode: screen; // 사진 배경색의 명암에 따라 그나마 잘 보일 수 있도록 */
	color: #fdb927;
	font-weight: 700;
	text-shadow: #000 0 0 4px;
`;

const SliderContainer = styled.div`
	width: 100%;
	display: flex; //이미지들을 가로로 나열합니다.
`;

const PhotoSlider = (props: Props) => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slideRef = useRef(document.createElement('div'));

	const nextSlide = () => {
		if (currentSlide >= props.imgSrcArray!.length - 1) {
			// 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
			setCurrentSlide(0);
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	};
	const prevSlide = () => {
		if (currentSlide === 0) {
			setCurrentSlide(props.imgSrcArray!.length - 1);
		} else {
			setCurrentSlide(currentSlide - 1);
		}
	};

	useEffect(() => {
		slideRef.current.style.transition = 'all 0.5s ease-in-out';
		slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
	}, [currentSlide]);

	return (
		<Container borderRadius={props.borderRadius} margin={props.margin}>
			<SliderBtnWrapper borderRadius={props.borderRadius}>
				<Button onClick={prevSlide}>
					<ArrowBackIosIcon />
				</Button>
				<Button onClick={nextSlide}>
					<ArrowForwardIosIcon />
				</Button>
			</SliderBtnWrapper>

			<SliderContainer ref={slideRef}>
				{props.imgSrcArray!.map((src) => (
					<Slide key={src} src={src} height={props.height} />
				))}
			</SliderContainer>

			<Page>
				<p>
					{currentSlide + 1} / {props.imgSrcArray!.length}
				</p>
			</Page>
		</Container>
	);
};

export default PhotoSlider;
