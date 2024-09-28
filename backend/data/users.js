import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    role: "admin",
  },
  {
    name: "Alex Lee",
    email: "alex@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    role: "customer",
  },
  {
    name: "Peter Maria",
    email: "peter@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    role: "customer",
  },
];

export default users;
