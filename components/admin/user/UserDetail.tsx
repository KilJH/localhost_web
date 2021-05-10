import React from 'react';
import styled from 'styled-components';
import { User } from '../../../interfaces';
import UserPhoto from '../../user/UserPhoto';

type Props = {
	user?: User;
	visibility: boolean;
};

const MainTitle = styled.h2`
	color: #5197d5;
	text-align: center;
	margin-top: 0;
	margin-bottom: 3em;
	padding-top: 2em;
	border-top: 3px solid #5197d5;
`;
const NameTag = styled.div`
	margin-top: 1em;
	margin-bottom: 0;
	display: block;
	text-align: center;
`;
const Nickname = styled.h2`
	display: inline;
	text-align: center;
`;
const Name = styled.h4`
	color: rgba(0, 0, 0, 0.5);
	margin-left: 0.15em;
	display: inline;
	text-align: center;
`;
const Email = styled.h4`
	color: rgba(0, 0, 0, 0.5);
	margin-top: 0;
	margin-bottom: 0;
	display: block;
	text-align: center;
`;

const SubTitle = styled.h4`
	margin-top: 2rem;
	margin-bottom: 0;
	display: block;
`;
const Details = styled.a`
	color: #5197d5;
	margin-top: 0.5em;
	margin-bottom: 3em;
	margin-left: 0.05em;
	font-size: 0.9em;
	display: block;
`;
const DetailsDiv = styled.div`
	border-bottom: 3px solid #5197d5;
`;
export default function UserDetail(props: Props) {
	const { user, visibility } = props;
	if (visibility === true) {
		return (
			<DetailsDiv>
				<MainTitle>{user!.isHost === 0 ? '유저' : '호스트'} 정보</MainTitle>
				<UserPhoto src={user!.photo} width={5} />
				<NameTag>
					<Nickname>{user!.nickname}</Nickname>
					<Name>#{user!.name}</Name>
				</NameTag>
				<Email>({user!.email})</Email>
				<SubTitle>성별</SubTitle>
				<Details>{user!.sex === 'male' ? '남성' : '여성'}</Details>
				<SubTitle>주소</SubTitle>
				<Details>{user!.address}</Details>
				<SubTitle>휴대폰 번호</SubTitle>
				<Details>{user!.phone}</Details>
			</DetailsDiv>
		);
	} else {
		return <div></div>;
	}
}
