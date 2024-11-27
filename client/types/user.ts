export enum StatusUser {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  BANNED = "BANNED",
}

export enum RoleTypes {
  User = "user",
  Admin = "admin",
}
export interface Member {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  status: StatusUser;
}

export interface User {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  password?: string;
  role: RoleTypes;
}
