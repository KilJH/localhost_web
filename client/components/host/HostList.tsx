import React from 'react';
import HostListItem from './HostListItem';
import styled from 'styled-components';

interface Props {}

const sampleHost = {
	id: 1,
	name: '김호스트',
	nickname: '포스틱',
	sex: '남자',
	email: 'email@naver.com',
	phone: '0100000000',
	address: '주소',
	country: '한국',
	description: '설명입니다',
	createTime: '010',
	language1: '한국어',
	language2: '영어',
	language3: '프랑스어',
};

const HostListContainer = styled.section`
	& > div {
		border-bottom: 1px solid #aaa;
	}
	& > div:last-child {
		border-bottom: none;
	}
	& > div:nth-child(even) {
		background: #eee;
	}
`;

const HostList = (props: Props) => {
	return (
		<HostListContainer>
			<HostListItem host={sampleHost} />
			<HostListItem host={sampleHost} />
			<HostListItem host={sampleHost} />
		</HostListContainer>
	);
};

export default HostList;
