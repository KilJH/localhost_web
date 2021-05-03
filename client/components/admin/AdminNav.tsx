import React, { ReactNode } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { ArrowDropDownOutlined, ArrowRightOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import Router from 'next/router';
import ArrowLeftOutlined from '@material-ui/icons/ArrowLeftOutlined';
import BlockIcon from '@material-ui/icons/Block';

type Props = {
	selected?: string;
};

const NavDiv = styled.div`
	text-align: center;
	align-items: left;
	background-color: #5197d5;
	min-width: 13em;
	position: fixed;
	height: 100vh;
	z-index: 1;
	top: 0em;
`;
const NavList = styled(List)`
	&.MuiList-padding {
		padding-top: 7rem;
	}
`;
const NavTitle = styled(ListItem)`
	width: inherit;
	&.MuiListItem-gutters {
		display: contents;
		padding: 0;
		margin-bottom: 0.25em;
	}
	min-width: 12em;
`;
const NavTitleIcon = styled(ListItemIcon)`
	&.MuiListItemIcon-root {
		display: inline;
		align-items: center;
		margin: 0;
		color: rgb(241, 242, 246);
	}
`;
const NavTitleText = styled(ListItemText)`
	display: contents;
	text-align: center;
	margin-bottom: 0.5em;
	color: #f1f2f6;

	& span {
		font-weight: bold;
		font-size: 0.9em;
		margin-bottom: 1em;
	}
`;
const Item = styled(ListItem)`
	&.MuiListItem-gutters {
		display: flex;
		padding: 0.5em 0.25em;
		&:hover {
			background-color: rgb(33, 33, 33);
			& div {
				color: rgb(255, 255, 255);
			}
		}
	}
`;
const ClickedItem = styled(ListItem)`
	&.MuiListItem-gutters {
		display: flex;
		padding: 0.5em 0.25em;
		background-color: rgba(255, 255, 255, 0.9);
	}
	&:hover {
		& div {
			color: rgba(255, 255, 255, 0.9);
		}
	}
`;
const Icon = styled(ListItemIcon)`
	&.MuiListItemIcon-root {
		min-width: 1.25em;
		margin: 0;
		margin-left: 0.5em;
		margin-right: 0.5em;
		color: rgba(241, 242, 246, 0.65);
	}
`;
const ClickedIcon = styled(ListItemIcon)`
	&.MuiListItemIcon-root {
		min-width: 1.25em;
		margin: 0;
		margin-left: 0.5em;
		margin-right: 0.5em;
		color: #5197d5;
	}
`;
const ArrowIcon = styled(ListItemIcon)`
	&.MuiListItemIcon-root {
		min-width: 1.25em;
		margin: 0;
		color: rgb(33, 33, 33);
	}
`;

const Text = styled(ListItemText)`
	display: flex;
	text-align: center;
	color: #f1f2f6;

	& span {
		display: inline;
		font-weight: bold;
		font-size: 0.75em;
	}
`;
const ClickedText = styled(ListItemText)`
	display: flex;
	text-align: center;
	color: #5197d5;

	& span {
		display: inline;
		font-weight: bold;
		font-size: 0.75em;
	}
`;
export default function AdminLayout(props: Props) {
	const { selected } = props;
	const [userOpen, setUserOpen] = React.useState(true);
	const [hostOpen, setHostOpen] = React.useState(true);
	const handleUserClick = () => {
		setUserOpen(!userOpen);
	};
	const handleHostClick = () => {
		setHostOpen(!hostOpen);
	};
	return (
		<NavDiv>
			<NavList>
				<NavTitle>
					<NavTitleIcon>
						<VpnKeyIcon />
					</NavTitleIcon>
					<NavTitleText primary='관리자 페이지' />
				</NavTitle>
				<Divider />
				{/* 공지 관리 */}
				{selected !== 'notice' ? ( // 미클릭 시
					<Item button onClick={() => Router.push('/admin/notice')}>
						<Icon>
							<NotificationsOutlinedIcon />
						</Icon>
						<Text primary='공지 관리' />
					</Item>
				) : (
					// 클릭 시
					<ClickedItem button onClick={() => Router.push('/admin/notice')}>
						<ClickedIcon>
							<NotificationsOutlinedIcon />
						</ClickedIcon>
						<ClickedText primary='공지 관리' />
					</ClickedItem>
				)}
				{/* 게시물 관리 */}
				{selected !== 'board' ? ( // 미클릭 시
					<Item button>
						<Icon>
							<ForumOutlinedIcon />
						</Icon>
						<Text primary='게시물 관리' />
					</Item>
				) : (
					// 클릭 시
					<ClickedItem button>
						<ClickedIcon>
							<ForumOutlinedIcon />
						</ClickedIcon>
						<ClickedText primary='게시물 관리' />
					</ClickedItem>
				)}
				{/* 유저 관리 */}
				<Item button onClick={handleUserClick}>
					<Icon>
						<PeopleOutlinedIcon />
					</Icon>
					<Text primary='유저 관리' />
					<ArrowIcon>
						{userOpen ? <ArrowDropDownOutlined /> : <ArrowLeftOutlined />}
					</ArrowIcon>
				</Item>
				{/* 일반회원 */}
				<Collapse in={userOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{selected !== 'user' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/user')}>
								<ArrowIcon>
									<ArrowRightOutlined />
								</ArrowIcon>
								<Icon>
									<PersonOutlinedIcon />
								</Icon>
								<Text primary='회원' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem button onClick={() => Router.push('/admin/user')}>
								<ArrowIcon>
									<ArrowDropDownOutlined />
								</ArrowIcon>
								<ClickedIcon>
									<PersonOutlinedIcon />
								</ClickedIcon>
								<ClickedText primary='회원' />
							</ClickedItem>
						)}
					</List>
				</Collapse>
				{/* 차단회원 */}
				<Collapse in={userOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{selected !== 'blacklist' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/user/blacklist')}>
								<ArrowIcon>
									<ArrowRightOutlined />
								</ArrowIcon>
								<Icon>
									<BlockIcon />
								</Icon>
								<Text primary='차단회원' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem
								button
								onClick={() => Router.push('/admin/user/blacklist')}
							>
								<ArrowIcon>
									<ArrowDropDownOutlined />
								</ArrowIcon>
								<ClickedIcon>
									<BlockIcon />
								</ClickedIcon>
								<ClickedText primary='차단회원' />
							</ClickedItem>
						)}
					</List>
				</Collapse>
				{/* 호스트 관리 */}
				<Item button onClick={handleHostClick}>
					<Icon>
						<PeopleOutlinedIcon />
					</Icon>
					<Text primary='호스트 관리' />
					<ArrowIcon>
						{hostOpen ? <ArrowDropDownOutlined /> : <ArrowLeftOutlined />}
					</ArrowIcon>
				</Item>
				{/* 호스트 */}
				<Collapse in={hostOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{selected !== 'host' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/host')}>
								<ArrowIcon>
									<ArrowRightOutlined />
								</ArrowIcon>
								<Icon>
									<AssignmentIndOutlinedIcon />
								</Icon>
								<Text primary='호스트' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem button onClick={() => Router.push('/admin/host')}>
								<ArrowIcon>
									<ArrowDropDownOutlined />
								</ArrowIcon>
								<ClickedIcon>
									<AssignmentIndOutlinedIcon />
								</ClickedIcon>
								<ClickedText primary='호스트' />
							</ClickedItem>
						)}
					</List>
				</Collapse>
				{/* 호스트 승인 */}
				<Collapse in={hostOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{selected !== 'approval' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/host/approval')}>
								<ArrowIcon>
									<ArrowRightOutlined />
								</ArrowIcon>
								<Icon>
									<AssignmentTurnedInOutlinedIcon />
								</Icon>
								<Text primary='호스트 승인' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem
								button
								onClick={() => Router.push('/admin/host/approval')}
							>
								<ArrowIcon>
									<ArrowDropDownOutlined />
								</ArrowIcon>
								<ClickedIcon>
									<AssignmentTurnedInOutlinedIcon />
								</ClickedIcon>
								<ClickedText primary='호스트 승인' />
							</ClickedItem>
						)}
					</List>
				</Collapse>
				{/* 플랜 관리 */}
				{selected !== 'plan' ? ( // 미클릭 시
					<Item button onClick={() => Router.push('/admin/plan')}>
						<Icon>
							<AssessmentOutlinedIcon />
						</Icon>
						<Text primary='플랜 관리' />
					</Item>
				) : (
					// 클릭 시
					<ClickedItem button onClick={() => Router.push('/admin/plan')}>
						<ClickedIcon>
							<AssessmentOutlinedIcon />
						</ClickedIcon>
						<ClickedText primary='플랜 관리' />
					</ClickedItem>
				)}
				{/* 고객센터 관리 */}
				{selected !== 'customerService' ? (
					<Item button>
						<Icon>
							<HeadsetMicOutlinedIcon />
						</Icon>
						<Text primary='고객센터 관리' />
					</Item>
				) : (
					<ClickedItem button>
						<ClickedIcon>
							<HeadsetMicOutlinedIcon />
						</ClickedIcon>
						<ClickedText primary='고객센터 관리' />
					</ClickedItem>
				)}
			</NavList>
		</NavDiv>
	);
}
