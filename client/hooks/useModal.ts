import { useState } from 'react';

export const useModal = (initialValue: boolean) => {
	// state 생성 및 초기화
	const [open, setOpen] = useState(initialValue);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return { open, handleOpen, handleClose };
};
