import React from 'react';
import { Board } from '../../interfaces';
import styled from 'styled-components';
import Link from 'next/link';

interface Props {
	board: Board;
}

const ItemContainer = styled.div`
	height: 5em;
	padding: 0.5em;
	transition: all 0.1s ease;
	& > a {
		display: flex;
	}
	& img {
		width: 5em;
		height: 5em;
		margin-right: 1rem;
	}
	& div {
		display: flex;
		flex-direction: column;
	}
	& p {
		margin: 0;
	}
	& .title {
		font-weight: 500;
		& > span {
			color: #5197d5;
		}
	}
	& .hit {
		font-size: 0.8em;
		flex: 1;
	}
	& .author {
		font-size: 0.8em;
	}

	&:hover {
		background-color: #eee;
	}
`;
const BoardItem = (props: Props) => {
	const { board } = props;
	return (
		<ItemContainer>
			{/* 링크 */}
			<Link as={`board/${board.id}`} href='board/[id]'>
				<a>
					<img src='/img/default.jpg' />
					<div>
						<p className='title'>
							{/* 제목 몇자 이상이면 줄이고 뒤에 ... */}
							{board.title}
							<span>[{board.numOfComment}]</span>
						</p>
						<p className='hit'>조회 {board.hit} </p>
						<p className='author'>
							{board.author.nickname} / {board.createTime}
						</p>
					</div>
				</a>
			</Link>
		</ItemContainer>
	);
};

export default BoardItem;
