import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { PlanDay } from '../../interfaces';
import PlanDayItem from './PlanDayItem';

interface Props {
	plans: PlanDay[];
}

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
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
}

const PlanWholeItemContainer = styled.div`
	max-width: 100%;
	& > header {
		position: sticky;
		top: 0;
		background-color: #5197d5;
	}
`;

const PlanWholeItem = (props: Props) => {
	const { plans } = props;
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	console.log(plans);
	return (
		<PlanWholeItemContainer>
			<AppBar position='static'>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='simple tabs example'
					variant='scrollable'
					scrollButtons='on'
					indicatorColor='primary'
				>
					{plans.map((plan, i) => (
						<Tab label={`${i + 1}일차`} {...a11yProps(i)} key={i} />
					))}
				</Tabs>
			</AppBar>

			{plans.map((plan, i) => {
				return (
					<TabPanel value={value} index={i} key={i}>
						<PlanDayItem planDay={plan} />
					</TabPanel>
				);
			})}
		</PlanWholeItemContainer>
	);
};

export default PlanWholeItem;
