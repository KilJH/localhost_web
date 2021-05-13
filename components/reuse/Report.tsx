import React from 'react';
import styled from 'styled-components';
import { useInput } from '../../client/hooks/useInput';
import { User } from '../../interfaces';
import Button from './Button';
import Textarea from './Textarea';

interface Props {
	reportedUser: User;
}

const ReportContainer = styled.div`
	width: 100%;

	& > * {
		margin: 0.5rem 0;
	}
	& .flex {
		display: flex;
	}
	& .nickname {
		margin-left: 1rem;
		font-weight: 600;
	}
`;

const ReportButton = styled(Button)`
	background: #e74c3c;
	font-weight: 600;

	&:hover {
		background: #d73c2c;
	}
`;

const ReportTextarea = styled(Textarea)`
	&:focus {
		outline: none;
		border: 2px solid #d73c2c;
	}
`;

const Report = (props: Props) => {
	const { reportedUser } = props;
	const content = useInput('');

	const onClick = () => {
		// 현재유저랑 상대유저정보로 보내기
	};
	return (
		<ReportContainer>
			<div className='flex'>
				<label>신고회원</label>
				<div className='nickname'>{reportedUser?.nickname || '회원닉네임'}</div>
			</div>
			<div>
				<label>신고사유를 적어주세요</label>
				<ReportTextarea {...content} />
			</div>
			<ReportButton width='100%' color='#e74c3c' onClick={onClick}>
				신고
			</ReportButton>
		</ReportContainer>
	);
};

export default Report;
