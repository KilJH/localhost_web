import { Snackbar, SnackbarCloseReason } from '@material-ui/core';
import { Alert, Color } from '@material-ui/lab';
import React from 'react';

interface Props {
	open: boolean;
	handleClose: (
		event?: React.SyntheticEvent<any, Event>,
		reason?: SnackbarCloseReason,
	) => void;
	type: Color;
	children: string;
}

const Toast = (props: Props) => {
	const { open, handleClose, type, children } = props;
	return (
		<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
			<Alert
				onClose={handleClose}
				severity={type}
				elevation={4}
				variant='filled'
			>
				{children}
			</Alert>
		</Snackbar>
	);
};

export default Toast;
