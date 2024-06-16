import mongoose from 'mongoose';

interface IUser {
  fullName: string;
  email: string;
  password: string;
}

const User = mongoose.model<IUser>(
  'User',
  new mongoose.Schema<IUser>({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
  }),
);

export default User;
