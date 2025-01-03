import { readFileSync } from "fs";
import { TypeUser } from "../types";
import  jwt  from "jsonwebtoken";
import  bcrypt from "bcrypt";
const createToken = (user: TypeUser) => {
  const secret = readFileSync("private.key", "utf8");
  if (!secret) throw new Error("secret is undefined");
  const token = jwt.sign({ user: user._id }, secret, {
    algorithm: "RS256",
  });
  return token;
};

const HashPassword = async (password:string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


export { createToken, HashPassword };