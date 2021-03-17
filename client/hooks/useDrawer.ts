import { useState } from 'react';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const useDrawer = (anchor: Anchor) => {
	const [open, setOpen] = useState(false);

	const onClose = () => {
		setOpen(false);
	};
	const onOpen = () => {
		setOpen(true);
	};

	return { anchor, open, onClose, onOpen };
};
