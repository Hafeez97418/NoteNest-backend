import { Request } from "express";

export type TypeUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
    role?: "user" | "admin";
  _id?: String;
};
export interface RequestWithUserObject extends Request {
  user?: TypeUser;
}

export interface RequestWithUserId extends Request {
  user?: string;
}

export type TypeTheme = {
  _id?:string,
  color: string,
  name:string,
}