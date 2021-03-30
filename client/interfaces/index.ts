// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  nickname: string;
  phone: string;
  address: string;
  isAdmin?: number;
  isHost?: number;
};

export type Plan = {
  id: number;
  title: string;
  description: string;
  price: number;
  sleepDays: number;
  travelDays: number;
  tags: string[];
};
