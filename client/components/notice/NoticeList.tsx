import React from 'react';
import { Notice } from '../../interfaces';
import NoticeItem from './NoticeItem';
import styled from 'styled-components';

interface Props {
	notices: Notice[];
}

const NoticeListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0 0 2rem 0;
`;

const NoticeList = (props: Props) => {
	return (
		// id가 큰 순서대로 앞으로 오게ㅂ
		<NoticeListContainer>
			{props.notices.map(notice => (
				<NoticeItem notice={notice} key={notice.id} />
			))}
		</NoticeListContainer>
	);
};

export default NoticeList;
