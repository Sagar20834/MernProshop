import jwt from "jsonwebtoken";
const setToken = (res, userFound) => {
  const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const options = {
    expiresAt: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  };

  res.cookie("token", token, options);
  return token;
};

export default setToken;
