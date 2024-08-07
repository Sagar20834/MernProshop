import jwt from "jsonwebtoken";
const setToken = (userFound, res) => {
  const token = jwt.sign({ id: userFound._id }, process.env.JSON_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expiresIn: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default setToken;
