import { useState } from 'react';

export const useToast = (initialValue: boolean) => {
	// state 생성 및 초기화
	const [open, setOpen] = useState(initialValue);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return { open, handleOpen, handleClose };
};
