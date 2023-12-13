const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAccessToken, getRefreshToken } = require("../utils/jwt");

const prisma = new PrismaClient();

// @desc    Create new user
// @route   POST /api/auth/register
// @access  Private
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // check if email already exists
  const duplicate = await prisma.user.findUnique({
    where: { email: email },
  });

  if (duplicate) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPwd = await bcrypt.hash(password, salt);

  // create an store new user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPwd,
    },
  });

  res.status(201).json({ message: "User created" });
});

module.exports = {
  register,
};
