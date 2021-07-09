import React, { createContext, useState } from 'react';

const initialUser = {
	id: 0,
	email: '',
	password: '',
	name: '',
	nickname: '',
	phone: '',
	address: '',
	nationality: '',
	photo: '',
	isAdmin: 0,
	isHost: 0,
	follower: 0,
};

export const UserStateContext = createContext(initialUser);

// type UserSetter = Dispatch<SetStateAction<User>>;

export const UserSetterContext = createContext(user => {
	console.log('setUser() is default');
});

export const UserContextProvider = ({ value, children }) => {
	const [user, setUser] = useState(initialUser);
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
