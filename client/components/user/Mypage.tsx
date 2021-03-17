import { Tab, Tabs } from '@material-ui/core';
import React, { ReactNode } from 'react';
import { useTabs } from '../../hooks/useTabs';
import { User } from '../../interfaces/index';
import MyBoard from './Mypage/MyBoard';
import MyFollow from './Mypage/MyFollow';
import Privacy from './Mypage/Privacy';

interface Props {
	user: User;
}

interface TabProps {
	children?: ReactNode;
	value: number;
	index: number;
}
function TabPanel(props: TabProps) {
	const { children, value, index } = props;

	return (
		<div
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
}

const Mypage = (props: Props) => {
	const tabs = useTabs(0);

	return (
		<div>
			<Tabs {...tabs} indicatorColor="primary" variant="fullWidth">
				<Tab label="회원정보" />
				<Tab label="팔로우" />
				<Tab label="내가 쓴 글" />
				<Tab label="위시리스트" />
			</Tabs>

			<TabPanel value={tabs.value} index={0}>
				<Privacy user={props.user} />
			</TabPanel>
			<TabPanel value={tabs.value} index={1}>
				<MyFollow />
			</TabPanel>
			<TabPanel value={tabs.value} index={2}>
				<MyBoard />
			</TabPanel>
		</div>
	);
};

export default Mypage;
