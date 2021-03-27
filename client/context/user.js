import React, { createContext, useState } from 'react';

export const UserStateContext = createContext({
	id: 0,
	email: '',
	password: '',
	name: '',
	nickname: '',
	phone: '',
	address: '',
});

// type UserSetter = Dispatch<SetStateAction<User>>;

export const UserSetterContext = createContext((user) => {
	console.log('setUser() is default');
});

export const UserContextProvider = ({ value, children }) => {
	const [user, setUser] = useState({
		id: 0,
		email: '',
		password: '',
		name: '',
		nickname: '',
		phone: '',
		address: '',
	});
	return (
		<UserSetterContext.Provider value={value.setUser || setUser}>
			<UserStateContext.Provider value={value.user || user}>
				{children}
			</UserStateContext.Provider>
		</UserSetterContext.Provider>
	);
};

// export const useUserState = () => {
// 	const state = useContext(UserStateContext);
// 	return state;
// };

// export const useUserDispatch = () => {
// 	const dispatch = useContext(UserSetterContext);
// 	// if (!dispatch) throw new Error('UserProvider not found');
// 	return dispatch;
// };
