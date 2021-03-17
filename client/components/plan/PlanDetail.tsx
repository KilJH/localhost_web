import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

interface Props {}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const Main = styled.div`
	padding-left: 3rem;
`;

const PlanDetailContainer = styled.div`
	& > header {
		position: sticky;
		top: 0;
		background-color: #5197d5;
	}
`;

const PlanDetail = (props: Props) => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<PlanDetailContainer>
			<AppBar position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
					variant="scrollable"
					scrollButtons="on"
					indicatorColor="primary"
				>
					<Tab label="1일차" {...a11yProps(0)} />
					<Tab label="2일차" {...a11yProps(1)} />
					<Tab label="3일차" {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Main>
					<strong>Interaken Ost 역 도착</strong>
					<p>시내버스 환승</p>
					<br />
					<strong>이젤트발트</strong>
					<p>브리엔츠호수</p>
					<br />
					<strong>진격의카페</strong>
					<p>티타임 즐기며 사색</p>
					<br />
					<strong>인터라켄숙소</strong>
					<br />
				</Main>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Main>
					<strong>아이거글렛처</strong>
					<p>하이킹즐기기</p>
					<br />
				</Main>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<Main>
					<strong>이젤트발트</strong>
					<p>브리엔츠호수</p>
					<br />
					<strong>베른</strong>
					<p>프라이탁 쇼핑</p>
				</Main>
			</TabPanel>
		</PlanDetailContainer>
	);
};

export default PlanDetail;
