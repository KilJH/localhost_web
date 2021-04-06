export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	nickname: string;
	phone: string;
	address: string;
	photo?: string;
	isAdmin?: number;
	isHost?: number;
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
	user?: User;
}

export interface Notice {
	id: number;
	title: string;
	description: string;
	createTime: string;
	thumb: string;
}

export interface Board {
	id: number;
	title: string;
	content: string;
	author: User;
	createTime: string;
	hit: number;
}
