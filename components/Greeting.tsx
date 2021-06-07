import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './reuse/Button';

const Container = styled.div`
	height: calc(100vh - 10em);
	width: 100%;
	display: flex;
	align-items: center;

	.greeting {
		&__image {
			height: inherit;
			width: inherit;
			object-fit: cover;
			position: absolute;
			left: 0;
			z-index: -1;
			transition: opacity 1s ease;
			opacity: 0;
			&--isShow {
				opacity: 1;
			}
		}

		&__text {
			flex: 1;
			color: white;
			transition: opacity 1s ease;
			opacity: 0;
			display: none;
			&--isShow {
				opacity: 1;
				display: block;
			}
			& + & {
				position: absolute;
			}
			& h1 {
				font-size: 2.5rem;
				margin: 0.5rem 0;
				text-shadow: 0px 0px 16px black;
			}
		}
	}
`;

const Greeting = () => {
	const [isShow, setIsShow] = useState(true);

	useEffect(() => {
		const time = setInterval(() => {
			setIsShow(!isShow);
		}, 5000);
		return () => {
			clearInterval(time);
		};
	}, [isShow]);
	return (
		<Container className='greeting'>
			<img
				src='https://source.unsplash.com/collection/43588404/2400x1600?1'
				className={`greeting__image ${isShow ? 'greeting__image--isShow' : ''}`}
			/>
			<img
				src='https://source.unsplash.com/collection/43588404/3000x2000?2'
				className={`greeting__image ${isShow ? '' : 'greeting__image--isShow'}`}
			/>
			<div
				className={`greeting__text ${isShow ? 'greeting__text--isShow' : ''}`}
			>
				<h1>한 번의 클릭으로 손쉽게 여행을 계획해보세요</h1>
				<Link href='/plans'>
					<Button default>베스트 플랜 보기</Button>
				</Link>
			</div>

			<div
				className={`greeting__text ${isShow ? '' : 'greeting__text--isShow'}`}
			>
				<h1>현지인만 아는 로컬맛집을 알고싶다면?</h1>
				<Link href='/hosts'>
					<Button default>호스트 보러가기</Button>
				</Link>
			</div>
		</Container>
	);
};

export default Greeting;
