import React from 'react';
import styled from 'styled-components';

interface Props {}

const BoardContainer = styled.div`
	& > .title {
		display: flex;
		align-items: center;
		line-height: 160%;
		background-color: #eee;
		& > *:first-child {
			flex: 1;
			margin: 0;
		}
		& > *:last-child {
			font-size: 0.8em;
		}
	}
	& > div {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #aaa;
	}
	& .meta {
		padding: 0.25rem 1rem;
		font-size: 0.8em;
	}
	& .content {
	}
`;

const BoardDetail = (props: Props) => {
	return (
		<BoardContainer>
			{/* 제목 */}
			<div className='title'>
				<h4>제목</h4>
				<div>작성일</div>
			</div>
			{/* 작성자와 작성일, 조회수, 댓글 수 */}
			<div className='meta'>작성자, 조회수, 댓글수</div>

			{/* 버튼들 */}
			{/* 내용 */}
			<div className='content'>내용내용</div>
			{/* 버튼들 */}

			{/* 댓글 */}
			<div>댓글</div>
		</BoardContainer>
	);
};

export default BoardDetail;
