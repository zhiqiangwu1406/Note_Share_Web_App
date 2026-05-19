import mongoose, { Schema, type ObjectId } from "mongoose";
import bcrypt from "bcrypt";
import type { NextFunction } from "express";
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}
const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export const User = mongoose.model<IUser>("User", userSchema);
