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

type Props = {
	selected?: string;
};

const NavDiv = styled.div`
	background-color: #5197d5;
`;
const NavList = styled(List)`
	&.MuiList-padding {
		padding: 0;
	}
`;
const NavTitle = styled.button`
	margin: 0 auto;
	display: block;
	border: none;
	padding: 0.5em 0;
`;
const NavTitleIcon = styled(ListItemIcon)`
	&.MuiListItemIcon-root {
		display: contents;
		align-items: center;
		margin: 0;
		color: rgb(241, 242, 246);
	}
`;
const NavTitleText = styled(ListItemText)`
	color: #f1f2f6;
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
	const [titleOpen, setTitleOpen] = React.useState(false);
	const [open, setOpen] = React.useState(true);
	const titleHandleClick = () => {
		setTitleOpen(!titleOpen);
	};
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<NavDiv>
			<NavList>
				<NavTitle button onClick={titleHandleClick}>
					<NavTitleIcon>
						<VpnKeyIcon />
					</NavTitleIcon>
					<NavTitleText primary='관리자 페이지' />
				</NavTitle>
				<Collapse in={titleOpen} timeout='auto' unmountOnExit>
					<Divider />
					<List component='div' disablePadding>
						{/* 공지 관리 */}
						{selected !== 'notice' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/notice/list')}>
								<Icon>
									<NotificationsOutlinedIcon />
								</Icon>
								<Text primary='공지 관리' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem
								button
								onClick={() => Router.push('/admin/notice/list')}
							>
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
						<Item button onClick={handleClick}>
							<Icon>
								<PeopleOutlinedIcon />
							</Icon>
							<Text primary='유저 관리' />
							<ArrowIcon>
								{open ? <ArrowDropDownOutlined /> : <ArrowLeftOutlined />}
							</ArrowIcon>
						</Item>
						{/* 일반회원 */}
						<Collapse in={open} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{selected !== 'user' ? ( // 미클릭 시
									<Item button onClick={() => Router.push('/admin/user/list')}>
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
									<ClickedItem
										button
										onClick={() => Router.push('/admin/user/list')}
									>
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
						{/* 호스트 */}
						<Collapse in={open} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{selected !== 'host' ? ( // 미클릭 시
									<Item button onClick={() => Router.push('/admin/host/list')}>
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
									<ClickedItem
										button
										onClick={() => Router.push('/admin/host/list')}
									>
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
						{selected !== 'approval' ? ( // 미클릭 시
							<Item button onClick={() => Router.push('/admin/host/approval')}>
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
								<ClickedIcon>
									<AssignmentTurnedInOutlinedIcon />
								</ClickedIcon>
								<ClickedText primary='호스트 승인' />
							</ClickedItem>
						)}
						{/* 플랜 관리 */}
						{selected !== 'plan' ? ( // 미클릭 시
							<Item button>
								<Icon>
									<AssessmentOutlinedIcon />
								</Icon>
								<Text primary='플랜 관리' />
							</Item>
						) : (
							// 클릭 시
							<ClickedItem button>
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
					</List>
				</Collapse>
			</NavList>
		</NavDiv>
	);
}
