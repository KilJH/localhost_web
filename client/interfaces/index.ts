export interface User {
	id?: number;
	name?: string;
	email: string;
	password?: string;
	nickname?: string;
	sex?: string;
	country?: string;
	phone?: string;
	address?: string;
	photo?: string;
	isAdmin?: number;
	isHost?: number;
}

export interface Host {
	id: number;
	name?: string;
	nickname?: string;
	sex?: string;
	email?: string;
	password?: string;
	phone?: string;
	address?: string;
	photo?: string;
	description?: string;
	reqCountry?: number;
	createTime?: string;
	languages: string[];
	rating?: number;
	on?: boolean;
	place?: Place;
	follower?: number;
}

export interface Plan {
	id?: number;
	title: string;
	description: string;
	price?: number;
	sleepDays: number;
	travelDays: number;
	tags?: string[];
	planDays: PlanDay[];
	createTime?: string;
	hit?: number;
	author?: User;
}

export interface PlanDay {
	day?: number;
	description: string;
	planTimes: PlanTime[];
}

export interface PlanTime {
	time: string | Date;
	type: string;
	price: number;
	place: string;
	placeInfo?: string;
	description: string;
	photo?: string[];
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
	description: string;
	author: User;
	createTime: string;
	hit: number;
	numOfComment?: number;
}

export interface Comment {
	id: number;
	user: User;
	description: string;
	createTime: string;
}

export interface Place {
	formatted_address: string;
	geometry: { location: { lat: number; lng: number }; distance?: number };
	name?: string;
}
