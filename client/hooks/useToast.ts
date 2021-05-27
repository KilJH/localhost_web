import { useState } from 'react';
import { Color } from '@material-ui/lab';

export const useToast = (initialValue: boolean) => {
	// state 생성 및 초기화
	const [open, setOpen] = useState(initialValue);
	const [option, setOption] = useState<{ type: Color; message: string }>({
		type: 'success',
		message: '',
	});

	const handleOpen = (type?: Color, message?: string) => {
		if (type || message)
			setOption({ type: type as Color, message: message as string });
		setOpen(true);
	};

	const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return { open, handleOpen, handleClose, ...option };
};
