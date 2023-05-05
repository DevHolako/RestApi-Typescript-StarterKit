import { omit } from "lodash";

import { I_User, UserModel } from "@/models/User";

export async function createUser(input: I_User) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findUser(username: string) {
  const user = UserModel.findOne({ username });
  return user;
}

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return false;
  }

  const isValid = await user.cpPassword(password);

  if (!isValid) return false;
  return omit(user.toJSON(), "password");
}
