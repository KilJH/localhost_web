import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import ForumIcon from '@material-ui/icons/Forum';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import styled from 'styled-components';
import Router from 'next/router';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import BlockIcon from '@material-ui/icons/Block';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
				<NavTitle button>
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
							<NotificationsIcon />
						</Icon>
						<Text primary='공지 관리' />
					</Item>
				) : (
					// 클릭 시
					<ClickedItem button onClick={() => Router.push('/admin/notice')}>
						<ClickedIcon>
							<NotificationsIcon />
						</ClickedIcon>
						<ClickedText primary='공지 관리' />
					</ClickedItem>
				)}
				{/* 게시물 관리 */}
				{selected !== 'board' ? ( // 미클릭 시
					<Item button>
						<Icon>
							<ForumIcon />
						</Icon>
						<Text primary='게시물 관리' />
					</Item>
				) : (
					// 클릭 시
					<ClickedItem button>
						<ClickedIcon>
							<ForumIcon />
						</ClickedIcon>
						<ClickedText primary='게시물 관리' />
					</ClickedItem>
				)}
				{/* 유저 관리 */}
				<Item button onClick={handleUserClick}>
					<Icon>
						<PeopleIcon />
					</Icon>
					<Text primary='유저 관리' />
					<ArrowIcon>{userOpen ? <ArrowDropDown /> : <ArrowLeft />}</ArrowIcon>
				</Item>
				{/* 일반회원 */}
				<Collapse in={userOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{selected !== 'user' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/user')}>
								<ArrowIcon>
									<ArrowRight />
								</ArrowIcon>
								<Icon>
									<PersonIcon />
								</Icon>
								<Text primary='회원' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem button onClick={() => Router.push('/admin/user')}>
								<ArrowIcon>
									<ArrowDropDown />
								</ArrowIcon>
								<ClickedIcon>
									<PersonIcon />
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
									<ArrowRight />
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
									<ArrowDropDown />
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
						<AccountCircleIcon />
					</Icon>
					<Text primary='호스트 관리' />
					<ArrowIcon>{hostOpen ? <ArrowDropDown /> : <ArrowLeft />}</ArrowIcon>
				</Item>
				{/* 호스트 */}
				<Collapse in={hostOpen} timeout='auto' unmountOnExit>
					<List component='div' disablePadding>
						{selected !== 'host' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/host')}>
								<ArrowIcon>
									<ArrowRight />
								</ArrowIcon>
								<Icon>
									<AssignmentIndIcon />
								</Icon>
								<Text primary='호스트' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem button onClick={() => Router.push('/admin/host')}>
								<ArrowIcon>
									<ArrowDropDown />
								</ArrowIcon>
								<ClickedIcon>
									<AssignmentIndIcon />
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
									<ArrowRight />
								</ArrowIcon>
								<Icon>
									<AssignmentTurnedInIcon />
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
									<ArrowDropDown />
								</ArrowIcon>
								<ClickedIcon>
									<AssignmentTurnedInIcon />
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
							<AssessmentIcon />
						</Icon>
						<Text primary='플랜 관리' />
					</Item>
				) : (
					// 클릭 시
					<ClickedItem button onClick={() => Router.push('/admin/plan')}>
						<ClickedIcon>
							<AssessmentIcon />
						</ClickedIcon>
						<ClickedText primary='플랜 관리' />
					</ClickedItem>
				)}
				{/* 고객센터 관리 */}
				{selected !== 'customerService' ? (
					<Item button>
						<Icon>
							<HeadsetMicIcon />
						</Icon>
						<Text primary='고객센터 관리' />
					</Item>
				) : (
					<ClickedItem button>
						<ClickedIcon>
							<HeadsetMicIcon />
						</ClickedIcon>
						<ClickedText primary='고객센터 관리' />
					</ClickedItem>
				)}
			</NavList>
		</NavDiv>
	);
}
