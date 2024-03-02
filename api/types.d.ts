import mongoose, { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  displayName: string;
  phone: string;
  token: string;
}

export type UserData = Omit<UserFields, 'token'>;

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface ProductsFields {
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string | null;
}
