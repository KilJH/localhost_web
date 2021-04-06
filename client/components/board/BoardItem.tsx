import React from 'react';
import { Board } from '../../interfaces';
import styled from 'styled-components';

interface Props {
	board: Board;
}

const ItemContainer = styled.div`
	display: flex;
	height: 5em;
	padding: 0.5em 0;
	& > img {
		width: 5em;
		height: 5em;
		margin-right: 1rem;
	}
	& > div {
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
`;
const BoardItem = (props: Props) => {
	const { board } = props;
	console.log(board);
	return (
		<ItemContainer>
			{/* 링크 */}
			<img src='/img/default.jpg' />
			<div>
				<p className='title'>
					{/* 제목 몇자 이상이면 줄이고 뒤에 ... */}
					{board.title}
					<span>[{board.hit}]</span>
				</p>
				<p className='hit'>조회 {board.hit} </p>
				<p className='author'>
					{board.author.nickname} / {board.createTime}
				</p>
			</div>
		</ItemContainer>
	);
};

export default BoardItem;
