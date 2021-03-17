import { useState } from 'react';

export const useTabs = (initialTab: number) => {
	// state 생성 및 초기화
	const [value, setValue] = useState(initialTab);

	const onChange = (e: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return { value, onChange };
};

// interface TabPanelProps {
// 	children?: React.ReactNode;
// 	index: any;
// 	value: any;
// }

// const TabPanel = ( props: TabPanelProps) => {

// 	const { children, value, index, ...other } = props;

// 	return (
// 		<div
// 			role="tabpanel"
// 			id={`nav-tabpanel-${index}`}
// 			aria-labelledby={`nav-tab-${index}`}
// 			{...other}
// 		>
// 			{value === index && (
// 				<Box p={3}>
// 					<Typography>{children}</Typography>
// 				</Box>
// 			)}
// 		</div>
// 	);
// }
