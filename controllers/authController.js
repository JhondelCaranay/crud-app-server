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

// @desc Login
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await prisma.user.findUnique({
    where: { email: email },
  });

  // check if use exists and active
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = getAccessToken(foundUser.email, foundUser.roles);

  const refreshToken = getRefreshToken(foundUser.email);

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "strict", //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing username and roles
  res.json({ accessToken });
});

module.exports = {
  register,
  login,
};
