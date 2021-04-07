import { Visibility } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { Host } from '../../../../interfaces';
import UserPhoto from '../../../user/UserPhoto';

type Props = {
  user?: Host;
  visibility: boolean;
};

const Title = styled.h2`
  color: #5197d5;
  text-align: center;
  margin-top: 0;
  margin-bottom: 3em;
  padding-top: 1em;
  border-top: 1px solid black;
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

const Description = styled.a`
  color: #5197d5;
  font-size: 1.25em;
  margin-top: 1em;
  margin-bottom: 0;
  padding-bottom: 1em;
  border-bottom: 1px solid black;
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
  margin-bottom: 2em;
  margin-left: 0.05em;
  font-size: 0.9em;
  display: block;
`;
export default function HostApprovalDetail(props: Props) {
  const { user, visibility } = props;
  if (visibility === true) {
    return (
      <div>
        <Title>신청자 정보</Title>
        <UserPhoto src={user.photo} width={5} />
        <NameTag>
          <Nickname>{user.nickname}</Nickname>
          <Name>({user.name})</Name>
        </NameTag>
        <Email>({user.email})</Email>
        <Description>"{user.description}"</Description>
        <SubTitle>호스트 신청 날짜</SubTitle>
        <Details>{user.create_time.split('T')[0]}</Details>
        <SubTitle>사용 가능한 언어</SubTitle>
        <Details>
          {user.language1} &nbsp;
          {user.language2} &nbsp;
          {user.language3}
        </Details>
        <SubTitle>성별</SubTitle>
        <Details>{user.sex === 'male' ? '남성' : '여성'}</Details>
        <SubTitle>국가</SubTitle>
        <Details>{user.country}</Details>
        <SubTitle>주소</SubTitle>
        <Details>{user.address}</Details>
        <SubTitle>휴대폰 번호</SubTitle>
        <Details>{user.phone}</Details>
      </div>
    );
  } else {
    return <div></div>;
  }
}
