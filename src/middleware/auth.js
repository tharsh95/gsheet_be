import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

export const authorization = async (req, res, next) => {
  let token = req.get("Authorization");


  if (!token || token?.length < 0) {

    return;
}
  token = token.split(" ")[1];
  if (!token) {
      return res.sendStatus(403);
    }
    const claims = jwt.verify(token, "jwtSecretKey");
  const user = await User.findOne({ email: claims.email });
  if (!user) {
    return;
  }
  await next();
};
