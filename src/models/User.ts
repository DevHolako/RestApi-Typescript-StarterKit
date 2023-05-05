import { Document, Schema, model } from "mongoose";
import * as b from "bcrypt";

export interface I_User {
  username: string;
  password: string;
}

export interface I_UserDocument extends I_User, Document {
  createdAt: Date;
  updatedAt: Date;
  cpPassword(incPassword: string): Promise<boolean>;
}
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this as I_UserDocument;
  const salt = await b.genSalt(10);
  const hash = b.hashSync(this.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.cpPassword = async function (
  incPassword: string
): Promise<boolean> {
  const user = this as I_UserDocument;
  return b.compare(incPassword, user.password).catch((e: unknown) => false);
};
const UserModel = model<I_UserDocument>("User", UserSchema);

export { UserModel };
