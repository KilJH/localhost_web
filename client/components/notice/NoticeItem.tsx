import styled from 'styled-components';
import React from 'react';
import { Notice } from '../../interfaces';
import Layout from '../main/Layout';
import Link from 'next/link';

interface Props {
	notice: Notice;
}

const NoticeItemContainer = styled.div`
	width: 33%;
	height: 16rem;
	display: inline-block;
	padding: 1rem;
	box-sizing: border-box;
	/* flex: 1; */
	transition: all 0.3s ease;
	&:hover {
		background-color: rgba(81, 151, 213, 0.1);
	}

	& img {
		display: block;
		width: 100%;
		height: 10rem;
		border: 1px solid black;
		object-fit: contain;
	}

	& .tag {
		margin: 0.5rem 0;
		font-size: 0.7em;
	}

	& .day {
		margin: 0.5rem 0;
		text-align: right;
		font-size: 0.8em;
	}
	& .title {
		overflow: hidden;
		height: 2.5em;
	}

	& .flex {
		display: flex;
		& > * {
			flex: 1;
		}
	}
`;

const NoticeItem = ({ notice }: Props) => {
	return (
		<NoticeItemContainer>
			<Link href='/notices/[id]' as={`/notices/${notice.id}`}>
				<a>
					<img
						src={notice.thumb || '/img/logos/localhostLogoBlack.png'}
						alt='thumb'
					></img>
					<div className='flex'>
						<p className='tag'>공지사항</p>
						<p className='day'>{notice.createTime}</p>
					</div>
					<div className='title'>{notice.title}</div>
				</a>
			</Link>
		</NoticeItemContainer>
	);
};

export default NoticeItem;
