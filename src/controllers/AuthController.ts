import { CreateUserInput } from "@/intrefaces/User";
import { createUser, findUser, validatePassword } from "@/utils/UserUtils";
import { Request, Response } from "express";

export async function RegisterHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const isExisted = await findUser(req.body.username);
    if (isExisted)
      return res.status(490).json({
        message: "username already exists",
      });
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    console.log(e);
    return res.status(409).send(e.message);
  }
}

const LoginHandler = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  //*  here i create the token & seesion & send it back to clinet *//
  return res.status(200).send("test working");
};

export { LoginHandler };
