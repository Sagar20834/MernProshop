import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const users = [
  {
    name: "Sagar",
    email: "sagar@gmail.com",
    password: bcrypt.hashSync("123456", salt),
    isAdmin: false,
  },
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", salt),
    isAdmin: true,
  },
];

export default users;
