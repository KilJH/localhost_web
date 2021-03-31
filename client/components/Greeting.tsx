import { Button } from '@material-ui/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {}

const MainImg = styled.img`
	height: 80vh;
	width: 100%;

	object-fit: cover;

	display: block;
	position: absolute;
	/* top: 0; */
	left: 0;
	z-index: -1;

	transition: opacity 1s ease;
	&.isShow {
		opacity: 1;
	}
	&.isHide {
		opacity: 0;
	}
`;

const Introduction = styled.div`
	height: 80vh;
	width: 100%;

	display: flex;
	/* flex-direction: column; */
	align-items: center;

	color: white;
	margin-bottom: 1rem;

	& > div {
		flex: 1;

		transition: opacity 1s ease;
		&.isShow {
			opacity: 1;
		}
		&.isHide {
			opacity: 0;
		}
		& + div {
			position: absolute;
		}
	}

	& > * > h1 {
		font-size: 2.5rem;
		font-weight: 900;
		margin: 0.5rem 0;
		text-shadow: 0px 0px 16px black;
	}
`;

const Greeting = (props: Props) => {
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
		<div>
			<MainImg
				src='https://source.unsplash.com/collection/43588404/2400x1600'
				className={isShow ? 'isShow' : 'isHide'}
			/>
			<MainImg
				src='https://source.unsplash.com/collection/43588404/3000x2000'
				className={isShow ? 'isHide' : 'isShow'}
			/>

			<Introduction>
				<div className={isShow ? 'isShow' : 'isHide'}>
					<h1>한 번의 클릭으로 손쉽게 여행을 계획해보세요</h1>
					<Link href='/plans'>
						<Button variant='contained' size='small'>
							베스트 플랜 보기
						</Button>
					</Link>
				</div>

				<div className={isShow ? 'isHide' : 'isShow'}>
					<h1>현지인만 아는 로컬맛집을 알고싶다면?</h1>
					<Link href='/hosts'>
						<Button variant='contained' size='small'>
							호스트 보러가기
						</Button>
					</Link>
				</div>
			</Introduction>
		</div>
	);
};

export default Greeting;
