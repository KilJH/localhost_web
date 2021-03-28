import React from 'react';
import { Notice } from '../../interfaces';
import styled from 'styled-components';

interface Props {
	notice: Notice;
}

const NoticeDetailContainer = styled.section`
	& img {
		width: 100%;
		/* height: 20rem; */
		object-fit: contain;
		border: 1px solid black;

		& + div {
			display: flex;
			text-align: center;
			margin: 1rem 0;
			border: 1px solid black;
			font-size: 0.8em;
			font-weight: 600;

			& div {
				flex: 1;
				padding: 0.5rem 0;
			}
			& div:last-child {
				border-left: 1px solid black;
				flex: 3;
			}
		}
	}
	& div.content {
		display: flex;
		margin: 2rem 0 4rem 0;
		& div {
			flex: 1;
			padding: 0.5rem;
		}
		& div:last-child {
			flex: 3;
		}
		& .title {
			font-size: 1.5em;
			font-weight: 600;
		}
	}
`;

const NoticeDetail = ({ notice }: Props) => {
	return (
		<NoticeDetailContainer>
			<img src={notice.thumb || '/img/logos/localhostLogoBlack.png'} />

			<div>
				<div>{notice.createTime}</div>
				<div>공지사항</div>
			</div>
			<div className='content'>
				<div className='title'>{notice.title}</div>
				<div>{notice.description}</div>
			</div>
		</NoticeDetailContainer>
	);
};

export default NoticeDetail;
