// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	nickname: string;
	phone: string;
	address: string;
	photo: string;
}

export interface Plan {
	id: number;
	title: string;
	description: string;
	price: number;
	sleepDays: number;
	travelDays: number;
	tags: string[];
}

export interface LoginProps {
	isLogined: boolean;
	user: User;
}
