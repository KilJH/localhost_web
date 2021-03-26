import React, { createContext, useState } from 'react';

const ScrollContext = createContext({
	state: { isUp: true },
	actions: {
		setIsUp: (bool) => {},
	},
});

const ScrollProvider = ({ children }) => {
	const [isUp, setIsUp] = useState(true);

	const value = {
		state: { isUp },
		actions: { setIsUp },
	};

	return (
		<ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
	);
};

export { ScrollProvider };

export default ScrollContext;
