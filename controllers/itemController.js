const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// @desc Create new item
// @route POST /notes
// @access Private
const createItem = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { email } = req.user;

  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const getUser = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: true,
    },
  });

  const newItem = await prisma.note.create({
    data: {
      name,
      description,
      userId: getUser.id,
    },
  });

  res.status(201).json(newItem);
});

module.exports = {
  createItem,
};
