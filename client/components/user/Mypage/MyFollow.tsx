import { Avatar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';

interface Props {
	id: string;
}

const AvatarItem = styled.div`
	width: 5rem;
	& > div {
		margin: 0 auto;
	}
	& p {
		margin: 0;
	}
	text-align: center;
`;

const AvatarContainer = styled.div`
	display: flex;
`;

const MoreButton = styled.button`
	border-radius: 50%;
	width: 2.5rem;
	height: 2.5rem;
	&:hover {
		background-color: rgba(81, 151, 213, 0.6);
	}
`;

const MyFollow = (props: Props) => {
	return (
		<section id={props.id}>
			<section>
				<h3>팔로잉 1</h3>
				<AvatarContainer>
					{/* 하드코딩 */}
					<AvatarItem>
						<Avatar>KIL</Avatar>
						<p>JHKil</p>
					</AvatarItem>

					<AvatarItem>
						<MoreButton>
							<AddIcon />
						</MoreButton>
						<p>더보기</p>
					</AvatarItem>
				</AvatarContainer>
			</section>
			<section>
				<h3>팔로워 1</h3>
				<AvatarContainer>
					<AvatarItem>
						<Avatar>황</Avatar>
						<p>YelloW</p>
					</AvatarItem>

					<AvatarItem>
						<MoreButton>
							<AddIcon />
						</MoreButton>
						<p>더보기</p>
					</AvatarItem>
				</AvatarContainer>
			</section>
		</section>
	);
};

export default MyFollow;
